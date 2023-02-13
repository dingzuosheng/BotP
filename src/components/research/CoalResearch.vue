<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Coal Research Treasury: {{ this.coalResearchTreasury }} $
                </div>
                <div class="range">
                    <h3>Coal Research Subsidy {{ this.coalResearchSubsidy * 100}}%</h3>
                    <input type="range" min="0" max="0.08" step="0.01" v-model="percent" @change="changeCoalResearchSusidyPercent"/><!--value is string-->
                    <div>
                        <p class="text">
                            This is your subsidy for Coal Research. You can see incresase its precentage of your budget, 
                            but only if you have budget percentage points to spare. Although you can change the numbers
                            now and see immediate effects in the bar chart, the effects on the world will not take place 
                            untill you execute policies.
                        </p>
                    </div>
                </div> 
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
                        <button @click="toPage(cause)">{{ cause.name }}</button>
                    </div>
                </div>
            </div>
            <div>
                <h2>Effects</h2>
                <div v-if="this.effects">
                    <div v-for="effect in this.effects" :key="effect.name">
                        <button @click="toPage(effect)">{{ effect.name }}</button>
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
    name:'CoalResearch',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            percent:0.08,
            coalResearchSubsidy:0.08,
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
        coalResearchTreasury:Number,
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
            this.name = toRaw(res.data.Coal_Research.name);
            this.causes = toRaw(res.data.Coal_Research.causes);
            this.effects = toRaw(res.data.Coal_Research.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeCoalResearchSusidyPercent(){
            this.coalResearchSubsidy = parseInt(this.percent * 100)/100;
            this.$emit('changeCoalResearchSubsidy',this.coalResearchSubsidy);
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
                coalUses.push(JSON.parse(localStorage.getItem(labels[i])).coalResearchTreasury)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Coal Research Treasury',
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