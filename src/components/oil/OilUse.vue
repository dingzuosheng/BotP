<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Oil Use: {{ this.oilUse }} Exajoules
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Oil Use = Use Rate * Energy Demand * Ave Energy Price / (Oil Price + Oil Tax)</div>
                        <br />
                        Where:<br />
                        <div>
                            <div class="row-formula">
                                <span>Use Rate</span> <span>= {{ oilUseRate }}</span> <span><input type="range" min="0.01" max="1.00" step="0.01" v-model="useRate" @change="changeOilUseRate"/></span>
                            </div>
                            <div class="row-formula">
                                <span>Energy Demand</span> <span>= {{ this.energyDemand}}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Ave Energy Price</span> <span>= {{ Math.floor(this.aveEnergyPrice/Math.pow(10,9) * 100)/100 }} billion</span> <span>($/Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Oil Price</span> <span>= {{ Math.floor(this.oilPrice / Math.pow(10,9) * 100)/100}} billion</span> <span>($/Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Oil Tax</span> <span>= {{ Math.floor(this.oilTaxRate / Math.pow(10,9)*100)/100}} billion</span> <span>($/Exajoules)</span>
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
    name: 'OilUse',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            useRate: 0.600,
            oilUseRate: 0.600,
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
    props: {
        oilUse: Number,
        oilTaxRate: Number,
        oilPrice: Number,
        oilTaxRate: Number,
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
            this.name = toRaw(res.data.Oil_Use.name);
            this.causes = toRaw(res.data.Oil_Use.causes);
            this.effects = toRaw(res.data.Oil_Use.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeOilUseRate() {
            this.oilUseRate = parseInt(this.useRate * 100) / 100;
            this.$emit('changeOilUseRate', this.oilUseRate);
        },
        draw(){
            const labels = [];
            for(let i = localStorage.length - 1; i > -1; i--){
                labels.push(localStorage.key(i));
            }
            labels.sort();
            this.chartData.labels =  labels;
            const oilUses = [];
            
            for(let i = 0; i < labels.length; i++){
                oilUses.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).oilUse))
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Oil Use (Unit:Exajoules)',
                backgroundColor:'orange',
                data: oilUses
            }
            this.chartData.datasets = [dataset];
            console.log(JSON.stringify(this.chartData))
        }
    }
}
</script>

<style>

</style>
