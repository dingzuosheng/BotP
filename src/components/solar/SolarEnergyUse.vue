<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Solar Use: {{ this.solarUse }} Exajoules
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Solar Use = (Use Rate * Energy Demand * Ave Energy Price + Solar Energy $) / Solar Energy Price</div>
                        <br />
                        Where:<br />
                        <div>
                            <div class="row-formula">
                                <span>Use Rate</span> <span>= {{ solarUserate }}</span> <span><input type="range" min="0.01" max="1.00" step="0.01" v-model="userate" @change="changeSolarUseRate" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Energy Demand</span> <span>= {{ this.energyDemand }}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Ave Energy Price</span> <span>= {{ Math.floor(this.aveEnergyPrice/Math.pow(10,9)*100)/100 }} billion</span> <span>($/Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Solar Energy $</span> <span>= {{ Math.floor(this.solarEnergyBudget/Math.pow(10,9)*100)/100}} billion</span> <span>($)</span>
                            </div>
                            <div class="row-formula">
                                <span>Solar Energy Price</span> <span>= {{ Math.floor(this.solarPrice/Math.pow(10,9)*100)/100}} billion</span> <span>($/Exajoules)</span>
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
    name: 'SolarEnergyUse',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            userate:0.0396,
            solarUserate:0.0396,
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
        solarPrice:Number,
        solarUse:Number,
        energyDemand:Number,
        solarEnergyBudget:Number,
        aveEnergyPrice:Number,
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
            this.name = toRaw(res.data.Solar_Energy_Use.name);
            this.causes = toRaw(res.data.Solar_Energy_Use.causes);
            this.effects = toRaw(res.data.Solar_Energy_Use.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeSolarUseRate(){
            this.solarUserate = parseInt(this.userate * 100) / 100;
            this.$emit('changeSolarUseRate',this.solarUserate);
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).solarUse*100)/100)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Solar Use(Unit:Exajoules)',
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
