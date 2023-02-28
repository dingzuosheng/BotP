<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div v-if="!this.show">
                <div>
                    Global Temperature: {{ this.globalTemperature }} degrees
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Global Temperature = T0 + CO2 Eff * Carbon Dioxide</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>T0</span> <span>= {{ t0 }}</span> <span><input type="range" min="56" max="60" step="1" v-model="temperature" @change="changeTemperature" /> (degrees)</span>
                            </div>
                            <div class="row-formula">
                                <span>CO2 Eff</span> <span>= {{ co2Eff }}</span> <span><input type="range" min="1" max="50" step="1" v-model="eff" @change="changeCO2Eff" /> (degrees/tons)</span>
                            </div>
                            <div class="row-formula">
                                <span>CO2</span> <span>= {{ Math.floor(this.co2/Math.pow(10,9)*100)/100 }} billion </span>(tons)
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
    name:'GlobalTemperature',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            temperature:58,
            t0:58,
            eff:10,
            co2Eff:1.5*Math.pow(10,-12),
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
        globalTemperature:Number,
        co2:Number,
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
            this.name = toRaw(res.data.Global_Temperature.name);
            this.causes = toRaw(res.data.Global_Temperature.causes);
            this.effects = toRaw(res.data.Global_Temperature.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeTemperature(){
            this.t0 = parseInt(this.temperature);
            this.$emit('changeTemperatureT0',this.t0);
        },
        changeCO2Eff(){
            this.co2Eff = parseInt(this.eff) * Math.pow(10,-13);
            this.$emit('changeCO2Eff',this.co2Eff);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).globalTemperature)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Global Temperature (Unit: degrees)',
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