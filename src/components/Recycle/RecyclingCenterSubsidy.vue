<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Recycling Center Subsidy: {{ Math.floor(this.recyclingCenterBudget/Math.pow(10,9) * 100)/100 }} billion $
                </div>
                <div class="range">
                    <h3>Recycling Center Subsidy {{ Math.floor(this.recyclingCenterSubsidyRate * 100) / 100 * 100}}  %</h3>
                    <input type="range" min="0" max="0.08" step="0.01"  v-model="rate" @change="changeRecyclingCenterSubsidyRate"/><!--value is string-->
                </div>
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
    name:'RecyclingCenterSubsidy',
    data(){
        return{
            name:"",
            recyclingCenterSubsidyRate:0.08,
            rate:0.08,
            causes:[],
            effects:[],
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
        recyclingCenterBudget:Number,
        show:Boolean,
        executed:Number
    },
    watch:{
        executed(newValue,oldValue){
            this.draw();
            this.chartKey++;
        }
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Recycling_Center_Subsidy.name);
            this.causes = toRaw(res.data.Recycling_Center_Subsidy.causes);
            this.effects = toRaw(res.data.Recycling_Center_Subsidy.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeRecyclingCenterSubsidyRate(){
            this.recyclingCenterSubsidyRate = parseInt(this.rate*100)/100;
            this.$emit('changeRecyclingCenterSubsidyRate',this.recyclingCenterSubsidyRate);
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).recyclingCenterBudget/Math.pow(10,9)*100)/100)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Recycling Center Budget(Unit: billion dollars)',
                backgroundColor:'orange',
                data: data,

            }
            this.chartData.datasets = [dataset];
            console.log(JSON.stringify(this.chartData))
        }
    }
}
</script>
