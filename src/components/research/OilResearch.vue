<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div v-if="!this.show">
                <div>
                    Oil Research Budget {{ Math.floor(this.oilResearchBudget/Math.pow(10,9)*100)/100 }} billion $
                </div>
                <div class="range">
                    <h3>OilResearch Subsidy {{ this.oilResearchSubsidy * 100}}%</h3>
                    <input type="range" min="0" max="0.08" step="0.01" v-model="percent" @change="changeOilResearchSusidyPercent"/><!--value is string-->
                    <div>
                        <p class="text">
                            This is your subsidy for Oil Research. You can see incresase its precentage of your budget, 
                            but only if you have budget percentage points to spare. Although you can change the numbers
                            now and see immediate effects in the bar chart, the effects on the world will not take place 
                            untill you execute policies.
                        </p>
                    </div>
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
    name:'OilResearch',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            percent:0.08,
            oilResearchSubsidy:0.08,
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
        oilResearchBudget:Number,
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
            this.name = toRaw(res.data.Oil_Research.name);
            this.causes = toRaw(res.data.Oil_Research.causes);
            this.effects = toRaw(res.data.Oil_Research.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeOilResearchSusidyPercent(){
            this.oilResearchSubsidy = parseInt(this.percent*100)/100;
            this.$emit('changeOilResearchSubsidy',this.oilResearchSubsidy);
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
                coalUses.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).oilResearchBudget/Math.pow(10,9)*100)/100)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Oil Research Budget(Unit: billion dollars)',
                backgroundColor:'orange',
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