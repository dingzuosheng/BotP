<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Solar Energy Price: {{ Math.floor(this.solarPrice/Math.pow(10,9)*100)/100 }} billion $
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Solar Energy Price = Solar Energy Use / (Solar Energy Potential * Solar Technology)</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Solar Energy Potential</span> <span>= {{ Math.floor(solarEnergyPotential*Math.pow(10,11))/Math.pow(10,11) }}</span> <span><input type="range" min="0.00000000001" max="0.00000001" step="0.00000000001" v-model="potential" @change="changeSolarEnergyPotential" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Solar Energy Use</span> <span>= {{ this.solarUse }}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Solar Technology</span> <span>= {{ this.solarTechnology }}</span> <span>(Whizbangs)</span>
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
    name: 'SolarEnergyPrice',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            potential:0.00000000001,
            solarEnergyPotential:0.00000000001,
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
        solarUse:Number,
        solarTechnology:Number,
        solarPrice:Number,
        show:Boolean,
        executed:Number
    },
    watch: {
        executed(newVal, oldVal) {
            console.log("watch:"+newVal, oldVal)
            this.draw();
        }
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Solar_Energy_Price.name);
            this.causes = toRaw(res.data.Solar_Energy_Price.causes);
            this.effects = toRaw(res.data.Solar_Energy_Price.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeSolarEnergyPotential(){
            this.solarEnergyPotential = parseInt(this.potential * Math.pow(10,11))/Math.pow(10,11);
            this.$emit('changeSoalrEnergyPotential',this.solarEnergyPotential);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).solarPrice)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Solar Price(Unit:billion)',
                backgroundColor:'#000000',
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
