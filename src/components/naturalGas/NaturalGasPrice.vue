<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Natural Gas Price: {{ Math.floor(this.naturalGasPrice / Math.pow(10,9)*100)/100}} billion
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Natural Gas Price = Natural Gas Price Factor * Natural Gas Use / Natural Gas Supply</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Natural Gas Price Factor</span> <span>= {{ naturalGasPriceFactor }} trillion</span> <span><input type="range" min="0.1" max="10" step="0.1" v-model="factor" @change="changeNaturalGasPriceFactor" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Natural Gas Use</span> <span>= {{ this.naturalGasUse }}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Natural Gas Supply</span> <span>= {{ Math.floor(this.naturalGasSupply/1000*100)/100 }} thousand</span> <span>(Exajoules)</span>
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
    name: 'NaturalGasPrice',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            factor:2.84,
            naturalGasPriceFactor:2.84,
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
        naturalGasPrice:Number,
        naturalGasUse:Number,
        naturalGasSupply:Number,
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
            this.name = toRaw(res.data.Natural_Gas_Price.name);
            this.causes = toRaw(res.data.Natural_Gas_Price.causes);
            this.effects = toRaw(res.data.Natural_Gas_Price.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeNaturalGasPriceFactor(){
            this.naturalGasPriceFactor = parseInt(this.factor*10)/10;
            this.$emit('changeNaturalGasPriceFactor',this.naturalGasPriceFactor);
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).naturalGasPrice/Math.pow(10,9)*10)/10)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Natural Gas Price(Unit: billion dollars)',
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
