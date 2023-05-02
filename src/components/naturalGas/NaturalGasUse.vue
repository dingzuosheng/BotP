<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Natural Gas Use: {{ this.naturalGasUse }} Exajoules
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Natural Gas Use = Use Rate * Energy Demand * Ave Energy Price / (Natural Gas Price + Natural Gas Tax)</div>
                        <br/>
                        Where:<br />
                        <div>
                            <div class="row-formula">
                                <span>Use Rate</span> <span>= {{ naturalGasUseRate }}</span> <span><input type="range" min="0.01" max="1.00" step="0.01" v-model="useRate" @change="changeNaturalGasUseRate" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Energy Demand</span> <span>= {{ this.energyDemand}}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Ave Energy Price</span> <span>= {{ Math.floor(this.aveEnergyPrice/Math.pow(10,9)*100)/100 }} billion</span> <span>($/Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Natural Gas Price</span> <span>= {{ Math.floor(this.naturalGasPrice/Math.pow(10,9)*100)/100}} billion</span> <span>($/Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Natural Gas Tax</span> <span>= {{ Math.floor(this.naturalGasTaxRate/Math.pow(10,9)*100)/100 }} billion</span> <span>($/Exajoules)</span>
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
    name: 'Natural Gas Use',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            useRate:0.220,
            naturalGasUseRate:0.220,
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
        naturalGasUse:Number,
        naturalGasPrice:Number,
        naturalGasTaxRate:Number,
        energyDemand:Number,
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
            this.name = toRaw(res.data.Natural_Gas_Use.name);
            this.causes = toRaw(res.data.Natural_Gas_Use.causes);
            this.effects = toRaw(res.data.Natural_Gas_Use.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeNaturalGasUseRate(){
            this.naturalGasUseRate = parseInt(this.useRate * 100) / 100;
            this.$emit('changeNaturalGasUseRate', this.naturalGasUseRate);
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).naturalGasUse*10)/10)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Natural Gas Use(Unit:Exajoules)',
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
