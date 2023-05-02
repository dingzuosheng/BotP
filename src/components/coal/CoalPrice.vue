<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Coal Price: {{ Math.floor(this.coalPrice / Math.pow(10,9)*100)/100 }} billion $/Exajoule
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Coal Price = Coal Price Factor * Coal Use / Coal Supply</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Coal Price Factor</span> <span>= {{ coalPriceFactor }} trillion</span> <span><input type="range" min="10" max="100" step="0.1" v-model="factor" @change="changeCoalPriceFactor" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Use</span> <span>= {{ Math.ceil(this.coalUse*100)/100 }}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Supply</span> <span>= {{ Math.floor(this.coalSupply/1000 * 100)/100 }} thousand</span> <span>(Exajoules)</span>
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
    name: 'Coal Price',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            factor: 97.4,
            coalPriceFactor: 97.4,
            chartData:{
                labels:[],
                datasets:[] 
            },
            chartKey:0,
        }
    },
    components:{
        BarChart
    },
    props: {
        coalPrice:Number,
        coalUse: Number,
        coalSupply: Number,
        show:Boolean,
        executed:Number
    },
    watch: {
        executed(newVal, oldVal) {
            this.draw();
            this.chartKey++;
        }
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Coal_Price.name);
            this.causes = toRaw(res.data.Coal_Price.causes);
            this.effects = toRaw(res.data.Coal_Price.effects);
            console.log(this.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeCoalPriceFactor() {
            this.coalPriceFactor = parseInt(this.factor*10)/10;
            this.$emit('changeCoalPriceFactor',this.coalPriceFactor);
        },
        draw(){
            const labels = [];
            for(let i = localStorage.length - 1; i > -1; i--){
                labels.push(localStorage.key(i));
            }
            labels.sort();
            this.chartData.labels =  labels;
            const coalPrices = [];
            
            for(let i = 0; i < labels.length; i++){
                coalPrices.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).coalPrice/Math.pow(10,9)*10)/10)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Coal Price (Unit: billion dollars)',
                backgroundColor:'orange',
                data: coalPrices
            }
            this.chartData.datasets = [dataset];
            console.log(JSON.stringify(this.chartData))
        }
    }
}
</script>

<style>

</style>
