<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Solar Technology: {{ Math.ceil(this.solarTechnology *100)/100 }} Whizbangs
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Solar Technology = Solar Technology + Solar Optimism * Solar Research $ * Basic Research $</div>
                        <br />
                        Where:<br />
                        <div>
                            <div class="row-formula">
                                <span>Solar Optimism</span> <span>= {{ solarOptimism }}</span> <span><input type="range" min="0.0001" max="0.01" step="0.0001" v-model="optimism" @change="changeSolarOptimism" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Solar Technology</span> <span>= {{ Math.ceil(this.solarTechnology*100)/100 }}</span> <span>(Whizbangs)</span>
                            </div>
                            <div class="row-formula">
                                <span>Solar Research $</span> <span>= {{ Math.floor(this.solarResearchBudget/Math.pow(10,9)*100)/100 }} billion $</span> <span>($)</span>
                            </div>
                            <div class="row-formula">
                                <span>Basic Research $</span> <span>= {{ Math.floor(this.basicResearchBudget/Math.pow(10,9)*100)/100 }} billion $</span> <span>($)</span>
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
import {
    toRaw
} from '@vue/reactivity'
import axios from 'axios'
const service = axios.create({
    baseURL: '',
    timeout: 3000000000,
})
import BarChart from '../chart/BarChart.vue'
export default {
    name: 'SolarEnergyTechnology',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            optimism:0.001,
            solarOptimism:0.001,
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
        solarTechnology:Number,
        solarResearchBudget:Number,
        basicResearchBudget:Number,
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
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Solar_Energy_Technology.name);
            this.causes = toRaw(res.data.Solar_Energy_Technology.causes);
            this.effects = toRaw(res.data.Solar_Energy_Technology.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeSolarOptimism(){
            this.solarOptimism = parseInt(this.optimism * Math.pow(10,4))/Math.pow(10,4);
            this.$emit('changeSolarOptimism',this.solarOptimism);
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).solarTechnology*100)/100)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Solar Energy Technology(Unit:whizbangs)',
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
