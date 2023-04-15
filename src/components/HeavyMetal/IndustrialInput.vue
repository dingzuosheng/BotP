<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Industrial Input: {{  Math.floor(this.industrialInput/Math.pow(10,12)*100)/100 }} trillion stuff
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Industrial Input = Net Energy * Sqrt(Global Gene Pool) * (Heavy Metal Use + CFC Production)</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Net Energy</span> <span>= {{ Math.floor(this.netEnergy * 100)/100 }}</span> <span>(Exajoules)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Global Gene Pool</span> <span>= {{ Math.floor(this.globalGenePool / Math.pow(10,6) * 100)/100 }} million</span> <span>(species)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Heavy Metal Use</span> <span>= {{ Math.floor(this.heavyMetalUse / Math.pow(10,6) * 100)/100 }} million</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>CFC Production</span> <span>= {{ Math.floor(this.cfcProduction / Math.pow(10,3) * 100)/100 }} thousand</span> <span>(tons)</span>
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
    name:'IndustrialInput',
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
        industrialInput:Number,
        netEnergy:Number,
        globalGenePool:Number,
        heavyMetalUse:Number,
        cfcProduction:Number,
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
            this.name = toRaw(res.data.Industrial_Input.name);
            this.causes = toRaw(res.data.Industrial_Input.causes);
            this.effects = toRaw(res.data.Industrial_Input.effects);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).coalTaxIncome)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Coal Tax Income(Unit: billion dollars)',
                backgroundColor:'#000000',
                data: data,

            }
            this.chartData.datasets = [dataset];
            console.log(JSON.stringify(this.chartData))
        }
    }
}
</script>
