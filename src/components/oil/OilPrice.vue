<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Oil Price: {{ Math.floor(this.oilPrice / Math.pow(10,9) * 100)/100}} billion $/Exajoules
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Oil Price = Oil Price Factor * Oil Use / Oil Supply</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Oil Price Factor</span> <span>= {{ oilPriceFactor }} trillion</span> <span><input type="range" min="0.1" max="10" step="0.1" v-model="factor" @change="changeOilPriceFactor" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Oil Use</span> <span>= {{ this.oilUse }}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Oil Supply</span> <span>= {{ Math.floor(this.oilSupply/1000*100)/100 }} thousand</span> <span>(Exajoules)</span>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div v-if="this.show">
            <BarChart :chart-data="chartData" :key="chartKey"></BarChart>
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
    name: 'OilPrice',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            factor:1.39,
            oilPriceFactor:1.39,
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
        oilPrice:Number,
        oilUse:Number,
        oilSupply:Number,
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
            this.name = toRaw(res.data.Oil_Price.name);
            this.causes = toRaw(res.data.Oil_Price.causes);
            this.effects = toRaw(res.data.Oil_Price.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeOilPriceFactor(){
            this.oilPriceFactor = parseInt(this.factor*10)/10;
            this.$emit('changeOilPriceFactor',this.oilPriceFactor);
        },
        draw(){
            const labels = [];
            for(let i = localStorage.length - 1; i > -1; i--){
                labels.push(localStorage.key(i));
            }
            labels.sort();
            this.chartData.labels =  labels;
            const oilPrices = [];
            
            for(let i = 0; i < labels.length; i++){
                oilPrices.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).oilPrice/Math.pow(10,9)*10)/10)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Oil Price(Unit: billion dollars)',
                backgroundColor:'orange',
                data: oilPrices
            }
            this.chartData.datasets = [dataset];
            console.log(JSON.stringify(this.chartData))
        }
    }
}
</script>

<style>

</style>
