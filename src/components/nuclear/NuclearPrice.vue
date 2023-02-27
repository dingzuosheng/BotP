<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Nuclear Price: {{ Math.floor(this.nuclearPrice / Math.pow(10,9)*100)/100}} billion
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Nuclear Price = Nuclear Price Factor * Nuclear Use / Nuclear Supply</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Nuclear Price Factor</span> <span>= {{ nuclearPriceFactor }} billion</span> <span><input type="range" min="100" max="1000000" step="100" v-model="factor" @change="changeNuclearPriceFactor" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Use</span> <span>= {{ this.nuclearUse }}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Supply</span> <span>= {{ Math.floor(this.nuclearSupply/1000*100)/100 }} thousand</span> <span>(Exajoules)</span>
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
    name: 'NuclearPrice',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            factor:23000,
            nuclearPriceFactor:23000,
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
        nuclearPrice:Number,
        nuclearUse:Number,
        nuclearSupply:Number,
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
            this.name = toRaw(res.data.Nuclear_Price.name);
            this.causes = toRaw(res.data.Nuclear_Price.causes);
            this.effects = toRaw(res.data.Nuclear_Price.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeNuclearPriceFactor(){
            this.nuclearPriceFactor = parseInt(this.factor);
            this.$emit('changeNuclearPriceFactor',this.nuclearPriceFactor);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).nuclearPrice)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Nuclear Price (Unit: billion)',
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
