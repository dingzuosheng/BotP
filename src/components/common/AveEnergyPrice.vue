<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div> 
            <div v-if="!this.show">
                <div>
                    Average Energy Price: {{ Math.floor(this.aveEnergyPrice/Math.pow(10,9)*100)/100 }} billion
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Average Energy Price = Sum of ((Price + Tax) * Energy Use) / Sum of Energy Use</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Coal Price</span> <span>= {{ Math.ceil(this.coalPrice/Math.pow(10,9)*100)/100 }} billion</span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Tax</span> <span>= {{ Math.ceil(this.coalTaxRate/Math.pow(10,6)*100)/100 }} million</span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Use</span> <span>= {{ this.coalUse }} </span>
                            </div>
                            <div class="row-formula">
                                <span>Oil Price</span> <span>= {{ Math.ceil(this.oilPrice/Math.pow(10,9)*100)/100 }} billion</span>
                            </div>
                            <div class="row-formula">
                                <span>Oil Tax</span> <span>= {{ Math.ceil(this.oilTaxRate/Math.pow(10,6)*100)/100 }} million</span>
                            </div>
                            <div class="row-formula">
                                <span>Oil Use</span> <span>= {{ this.oilUse }}</span>
                            </div>
                            <div class="row-formula">
                                <span>Natural Gas Price</span> <span>= {{  Math.ceil(this.naturalGasPrice/Math.pow(10,9)*100)/100 }} billion</span>
                            </div>
                            <div class="row-formula">
                                <span>Natural Gas Tax</span> <span>= {{ Math.ceil(this.naturalGasTaxRate/Math.pow(10,6)*100)/100 }} million</span>
                            </div>
                            <div class="row-formula">
                                <span>Natural Gas Use</span> <span>= {{ this.naturalGasUse }}</span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Price</span> <span>= {{ Math.ceil(this.nuclearPrice/Math.pow(10,9)*100)/100 }} billion</span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Tax</span> <span>= {{ Math.ceil(this.nuclearTaxRate/Math.pow(10,6)*100)/100 }} million</span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Use</span> <span>= {{ this.nuclearUse }}</span>
                            </div>
                            <div class="row-formula">
                                <span>Solar Energy Price</span> <span>= {{ Math.ceil(this.solarPrice/Math.pow(10,9)*100)/100 }} billion</span>
                            </div>
                            <div class="row-formula">
                                <span>Solar Energy Use</span> <span>= {{ this.solarUse }}</span>
                            </div>
                            <div class="row-formula">
                                <span>Dam Price</span> <span>= {{ Math.ceil(this.damPrice/Math.pow(10,9)*100)/100 }} billion</span>
                            </div>
                            <div class="row-formula">
                                <span>Dam Use</span> <span>= {{ this.damUse }}</span>
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
import {toRaw} from '@vue/reactivity'
import axios from 'axios'
const service = axios.create({
    baseURL:'',
    timeout:3000000000,
})
import BarChart from '../chart/BarChart.vue'
export default {
    name:'AveEnergyPrice',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
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
        aveEnergyPrice:Number,
        coalPrice:Number,
        coalUse:Number,
        coalTaxRate:Number,
        oilPrice:Number,
        oilTaxRate:Number,
        oilUse:Number,
        naturalGasPrice:Number,
        naturalGasTaxRate:Number,
        naturalGasUse:Number,
        nuclearPrice:Number,
        nuclearTaxRate:Number,
        nuclearUse:Number,
        solarPrice:Number,
        solarUse:Number,
        damUse:Number,
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
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Ave_Energy_Price.name);
            this.causes = toRaw(res.data.Ave_Energy_Price.causes);
            this.effects = toRaw(res.data.Ave_Energy_Price.effects);
        })
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).aveEnergyPrice/Math.pow(10,9)*100)/100)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Average Energy Price(billion dollars)',
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