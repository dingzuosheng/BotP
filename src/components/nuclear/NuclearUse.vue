<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Nuclear Use: {{ this.nuclearUse }}
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Nuclear Use = Use Rate * Energy Demand * Ave Energy Price / (Nuclear Price + Nuclear Tax)</div>
                        <br />
                        Where:<br />
                        <div>
                            <div class="row-formula">
                                <span>Use Rate</span> <span>= {{ nuclearUseRate }}</span> <span><input type="range" min="0.01" max="1.00" step="0.01" v-model="useRate" @change="changeNuclearUseRate" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Energy Demand</span> <span>= {{ this.energyDemand }}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Ave Energy Price</span> <span>= {{ this.aveEnergyPrice/Math.pow(10,9) }} billion</span> <span>($/Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Price</span> <span>= {{ this.nuclearPrice/Math.pow(10,9) }} billion</span> <span>($/Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Tax</span> <span>= {{ this.nuclearTaxRate/Math.pow(10,9) }} billion</span> <span>($/Exajoules)</span>
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
    name: 'NuclearUse',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            useRate:0.215,
            nuclearUseRate:0.215,
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
        nuclearUse: Number,
        nuclearTaxRate: Number,
        nuclearPrice:Number,
        energyDemand:Number,
        aveEnergyPrice:Number,
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
            this.name = toRaw(res.data.Nuclear_Use.name);
            this.causes = toRaw(res.data.Nuclear_Use.causes);
            this.effects = toRaw(res.data.Nuclear_Use.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeNuclearUseRate(){
            this.nuclearUseRate = parseInt(this.useRate * 1000) / 1000;
            this.$emit('changeNuclearUseRate', this.nuclearUseRate);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).nuclearUse)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Nuclear Use',
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
