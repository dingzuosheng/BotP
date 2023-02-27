<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Fall Points: {{ this.fallPoints }} points
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Fall Points = value of one human life * falls from roofs</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Value of One Human Life</span> <span>= {{ this.valueOfOneHumanLife_FallPts }}</span><span><input type="range" min="0.0001" max="0.1" step="0.0001" v-model="value" @change="changeValueOfOneHumanLife_FallPts"/>(points/death)</span>
                            </div>
                            <div class="row-formula">
                                <span>Falls From Roofs</span><span>= {{ this.fallsFromRoofs }}</span> <span> (deaths)</span>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                </el-collapse>  
            </div>      
            <div v-if="this.show">
                <BarChart :chartData="chartData"></BarChart>
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
    name:'RadWastePoints',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            value:0.0029,
            valueOfOneHumanLife_FallPts:0.0029,
            chartData:{
                labels:[],
                datasets:[] 
            },
        }
    },
    components:{
        BarChart
    },
    props:{
        fallsFromRoofs:Number,
        fallPoints:Number,
        show:Boolean,
        executed:Number
    },
    watch: {
        executed(newVal, oldVal) {
            console.log("watch:"+newVal, oldVal)
            this.draw();
        }
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Fall_Points.name);
            this.causes = toRaw(res.data.Fall_Points.causes);
            this.effects = toRaw(res.data.Fall_Points.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeValueOfOneHumanLife_FallPts(){
            this.valueOfOneHumanLife_FallPts = parseInt(this.value*10000)/10000;
            this.$emit("changeValueOfOneHumanLife_FallPts",this.changeValueOfOneHumanLife_FallPts);
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
                coalUses.push(JSON.parse(localStorage.getItem(labels[i])).fallPoints)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Fall Points(Unit:points)',
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