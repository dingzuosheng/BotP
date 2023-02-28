<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Falls From Roofs: {{ this.fallsFromRoofs }} deaths
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Falls From Roofs = Fall Rate * Solar Energy Use</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Fall Rate</span> <span>= {{ fallRate }}</span><span><input type="range" min="10" max="1000" step="10" v-model="fallRateFactor" @change="changeFallRateFactor"/> (deaths/Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Solar Energy Use</span> <span>= {{ this.solarUse }}</span><span>(Exajoules)</span>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                </el-collapse>  
            </div>      
            <div v-if="this.show">
                <BarChart :chartData="chartData" :key="chartKey"></BarChart>
            </div>      
        </div>
        <div class="side-nav">
            <div>
                <h2>Causes</h2>
                <div v-if="this.causes">
                    <div v-for="cause in this.causes" :key="cause.name">
                        <el-button type="primary" @click="toPage(cause)">{{ cause.name }}</el-button>
                    </div>
                </div>
            </div>
            <div>
                <h2>Effects</h2>
                <div v-if="this.effects">
                    <div v-for="effect in this.effects" :key="effect.name">
                        <el-button type="primary" @click="toPage(effect)">{{ effect.name }}</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {toRaw} from '@vue/reactivity'
import axios from 'axios'
const service = axios.create({
    baseURL:'',
    timeout:3000000000,
})
import BarChart from '../chart/BarChart.vue'
export default {
    name:'FallsFromRoofs',
    data(){
        return{
            name:"",
            causes:[],
            effects:[], 
            fallRateFactor:200,
            fallRate:200,
            chartData:{
                labels:[],
                datasets:[] 
            },
            chartKey:0
        }       
    },
    components:{
        BarChart
    },
    props:{
        solarUse:Number,
        fallsFromRoofs:Number,
        show:Boolean,
        executed:Number
    },
    watch: {
        executed(newVal, oldVal) {
            console.log("watch:"+newVal, oldVal)
            this.draw();
            this.chartKey++;
        }
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Falls_From_Roofs.name);
            this.causes = toRaw(res.data.Falls_From_Roofs.causes);
            this.effects = toRaw(res.data.Falls_From_Roofs.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeFallRateFactor(){
            this.fallRate = parseInt(this.fallRateFactor);
            this.$emit("changeFallRateFactor",this.fallRate);
        },
        draw(){
            const labels = [];
            for(let i = localStorage.length - 1; i > -1; i--){
                labels.push(localStorage.key(i));
            }
            labels.sort();
            this.chartData.labels =  labels;
            const coalUses = [];
            
            for(let i = 0; i < labels.length; i++){
                coalUses.push(JSON.parse(localStorage.getItem(labels[i])).fallsFromRoofs)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Falls From Roofs(Unit:deaths)',
                backgroundColor:'#000000',
                data: coalUses
            }
            this.chartData.datasets = [dataset];
            console.log(JSON.stringify(this.chartData))
        }
    }
}
</script>
<style>

</style>