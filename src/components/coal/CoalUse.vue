<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            Coal Use: {{ this.coalUse }} Exajoules
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Coal Use = Use Rate * Energy Demand * Ave Energy Price / (Coal Price + Coal Tax)</div>
                        <br />
                        Where:<br />
                        <div>
                            <div class="row-formula">
                                <span>Use Rate</span> <span>= {{ coalUserate }}</span> <span><input type="range" min="0.01" max="1.00" step="0.01" v-model="userate" @change="changeCoalUserate" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Energy Demand</span> <span>= {{ this.energyDemand }}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Ave Energy Price</span> <span>= {{ Math.floor(this.aveEnergyPrice / Math.pow(10,9)*100)/100}} billion</span> <span>($/Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Price</span> <span>= {{ Math.floor(this.coalPrice / Math.pow(10,9)*100)/100}} billion</span> <span>($/Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Tax</span> <span>= {{ Math.floor(this.coalTaxRate / Math.pow(10,9)*100)/100}} billion</span> <span>($/Exajoules)</span>
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
    name: 'Coal Use',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            userate: 0.257,
            coalUserate: 0.257,
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
        coalUse: Number,
        coalPrice: Number,
        coalTaxRate: Number,
        energyDemand: Number,
        aveEnergyPrice: Number,
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
            this.name = toRaw(res.data.Coal_Use.name);
            this.causes = toRaw(res.data.Coal_Use.causes);
            this.effects = toRaw(res.data.Coal_Use.effects);
        })
        
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeCoalUserate() {
            this.coalUserate = parseInt(this.userate * 100) / 100;
            this.$emit('changeCoalUseRate', this.coalUserate);
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
                coalUses.push(JSON.parse(localStorage.getItem(labels[i])).coalUse)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Coal Use (Unit: Exajoules)',
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
.main {
    height: 700px;
    display: grid;
    grid-template-columns: 65% 35%;
    grid-template-areas: "content side-nav";
}

.content {
    grid-area: "content";
    background-color: #E9EEF3;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-left:50px;
}

.side-nav {
    grid-area: "side-nav";
    background-color: #D3DCE6;
    color: #333;
    padding: 50px;
}

.range {
    margin: 50px 50px;
    justify-content: center;
    text-align: center;
}

.range input {
    width: 500px;
    height: 100px;
}

.el-collapse-item {
    font-size: 30px;
}

.formula {
    display: flex;
    flex-direction: column;
    padding: 50px;
    font-size: 20px;
}

.row-formula {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
}
</style>
