<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Norenewable Energy: {{ Math.ceil(this.nonrenewableEnergy*100)/100 }} Exajoules
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Norenewable Energy = Coal Use + Oil Use + Natural Gas Use + Nuclear Use</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Coal Use</span> <span>= {{ Math.ceil(this.coalUse*100)/100 }}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Oil Use</span> <span>= {{ Math.ceil(this.oilUse*100)/100 }}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Natural Gas Use</span> <span>= {{ Math.ceil(this.naturalGasUse*100)/100 }}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Use</span> <span>= {{ Math.ceil(this.nuclearUse*100)/100 }}</span> <span>(Exajoules)</span>
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
    name: 'NonrenewableEnergy',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
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
        coalUse:Number,
        oilUse:Number,
        naturalGasUse:Number,
        nonrenewableEnergy:Number,
        nuclearUse:Number,
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
            this.name = toRaw(res.data.Nonrenewable_Energy.name);
            this.causes = toRaw(res.data.Nonrenewable_Energy.causes);
            this.effects = toRaw(res.data.Nonrenewable_Energy.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).nonrenewableEnergy))
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Non-Renewable Energy(Unit:Exajoules)',
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
