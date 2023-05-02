<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div> 
            <div v-if="!this.show">  
                <div>
                    Sustainability Pts: {{ this.sustainabilityPts }} Points
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Sustainability Pts = Value of Sustainability * Sustainability</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Value of Sustainability</span> <span>= {{ valueOfSustainability }}</span> <span><input type="range" min="100" max="10000" step="10" v-model="value" @change="changeValueOfSustainability" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Sustainability</span> <span>= {{ this.sustainability }} </span><span>(Permanences)</span>
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
    name:'SustainabilityPts',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            value:4000,
            valueOfSustainability:4000,
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
        sustainability:Number,
        sustainabilityPts:Number,
        show:Boolean,
        executed:Number,
    },
    watch:{
        executed(newValue,oldValue){
            this.draw();
            this.chartKey++;
        }
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Sustainability_Pts.name);
            this.causes = toRaw(res.data.Sustainability_Pts.causes);
            this.effects = toRaw(res.data.Sustainability_Pts.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeValueOfSustainability(){
            this.valueOfSustainability = parseInt(this.value);
            this.$emit('changeSustainability',this.valueOfSustainability);
        },
        draw(){
            const labels = [];
            for(let i = localStorage.length - 1; i > -1; i--){
                labels.push(localStorage.key(i));
            }
            labels.sort();
            this.chartData.labels =  labels;
            const data = [];
            
            for(let i = 0; i < labels.length; i++){
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).sustainabilityPts*10)/10)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Sustainability Points(Unit:Permenence)',
                backgroundColor:'orange',
                data: data
            }
            this.chartData.datasets = [dataset];
            console.log(JSON.stringify(this.chartData))
        }
    }
}
</script>
<style>

</style>