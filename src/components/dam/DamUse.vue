<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Dam Use: {{ Math.ceil(this.damUse) }} Exajoules
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Dam Use = (Use Rate * Energy Demand * Ave Energy Price + Dam Use $) / Dam Price</div>
                        <br />
                        Where:<br />
                        <div>
                            <div class="row-formula">
                                <span>Use Rate</span> <span>= {{ Math.ceil(damUseRate * 100)/100 }}</span> 
                                <span>
                                    <button @click="add">+0.01</button>
                                    <input type="range" min="0.01" max="1.00" step="0.01" v-model="useRate" @change="changeDamUseRate" />
                                    <button @click="minus">-0.01</button>
                                </span>
                            </div>
                            <div class="row-formula">
                                <span>Energy Demand</span> <span>= {{ Math.ceil(this.energyDemand) }}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Ave Energy Price</span> <span>= {{ Math.floor(this.aveEnergyPrice/Math.pow(10,9)*100)/100 }} billion</span> <span>($/Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Dam Use $</span> <span>= {{ Math.floor(this.damUseBudget/Math.pow(10,9)*100)/100}} billion</span> <span>($)</span>
                            </div>
                            <div class="row-formula">
                                <span>Dam Price</span> <span>= {{ Math.floor(this.damPrice / Math.pow(10,9) * 100)/100}} billion</span> <span>($/Exajoules)</span>
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
    name: 'DamUse',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            useRate:0.0596,
            damUseRate:0.0596,
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
        damUse:Number,
        energyDemand:Number,
        aveEnergyPrice:Number,
        damUseBudget:Number,
        damPrice:Number,
        show:Boolean,
        executed:Number
    },
    watch:{
        executed(newValue,oldValue){
            this.draw();
            this.chartKey++;
        }
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Dam_Use.name);
            this.causes = toRaw(res.data.Dam_Use.causes);
            this.effects = toRaw(res.data.Dam_Use.effects);
        })
    },
    methods: {
        add(){
            let n = parseFloat(this.useRate);
            if(n < 0.99){
                n += 0.01;
            }else{
                n = 1;
            }
            this.useRate = n.toString();
            this.changeDamUseRate();
        },
        minus(){
            let n = parseFloat(this.useRate);
            if(n > 0.02){
                n -= 0.01;
            }else{
                n = 0.01;
            }
            this.useRate = n.toString();
            this.changeDamUseRate();
        },
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeDamUseRate(){
            this.damUseRate = parseInt(this.useRate * 100)/100;
            this.$emit('changeDamUseRate',this.damUseRate);
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).damUse*100)/100)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Dam Use(Unit:Exajoules)',
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
