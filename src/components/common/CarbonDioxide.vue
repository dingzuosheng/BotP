<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>    
            <div v-if="!this.show">
                <div>
                    CO2: {{ this.co2 }}
                </div> 
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Carbon Dioxide = Carbon Dioxide + CO2 * (Coal Use + Oil Use + Natural Gas Use)</div>
                            <br />
                            Where:<br />
                            <div class="formula">
                                <div class="row-formula">
                                    <span>CO2</span> <span>= {{ co2Quantity }} million</span> <span><input type="range" min="10" max="100" step="10" v-model="quantity" @change="changeCO2Quanty" /> (tons/Exajoule)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Carbon Dioxide</span> <span>= {{ this.co2 / Math.pow(10,12)}} trillion</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Coal Use</span> <span>= {{ this.coalUse }}</span> <span>(Exajoules)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Oil Use</span> <span>= {{ this.oilUse }}</span> <span>(Exajoules)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Natural Gas Use</span> <span>= {{ this.naturalGasUse }}</span> <span>(Exajoules)</span>
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
import {toRaw} from '@vue/reactivity'
import axios from 'axios'
const service = axios.create({
    baseURL:'',
    timeout:3000000000,
})
import BarChart from '../chart/BarChart.vue'
export default {
    name:'Carbon Dioxide',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            quantity:20,
            co2Quantity:20,
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
        coalUse:Number,
        oilUse:Number,
        naturalGasUse:Number,
        co2:Number,
        show:Boolean,
        executed:Number
    },
    watch:{
        executed(newValue,oldValue){
            this.draw();
        }
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Carbon_Dioxide.name);
            this.causes = toRaw(res.data.Carbon_Dioxide.causes);
            this.effects = toRaw(res.data.Carbon_Dioxide.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeCO2Quanty(){
            this.co2Quantity = parseInt(this.quantity) * Math.pow(10,6);
            this.$emit('changeCO2Quantity',this.co2Quantity);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).co2)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'CO2',
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