<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div> 
            <div v-if="!this.show">
                <div>
                    Sustainability: {{ Math.ceil(this.sustainability*100)/100 }} Permenence
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Sustainability = Renewable Energy * (4 - Birth Rate) / (Renewable Energy + Nonrenewable Energy)</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Renewable Energy</span><span>= {{ Math.ceil(this.renewableEnergy*100)/100 }}</span>  (Exajoules)
                            </div>
                            <div class="row-formula">
                                <span>Birth Rate</span><span>= {{ Math.floor(this.birthRate * 100)/100 }}%</span><span></span>
                            </div>
                            <div class="row-formula">
                                <span>Nonrenewable Energy</span><span>= {{ Math.ceil(this.nonrenewableEnergy*100)/100 }}</span>(Exajoules)
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
    timeout:30000,
})
import BarChart from '../chart/BarChart.vue'
export default {
    name:'Sustainability',
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
        sustainability:Number,
        solarUse:Number,
        damUse:Number,
        renewableEnergy:Number,
        nonrenewableEnergy:Number,
        birthRate:Number,
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
            this.name = toRaw(res.data.Sustainability.name);
            this.causes = toRaw(res.data.Sustainability.causes);
            this.effects = toRaw(res.data.Sustainability.effects);
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).sustainability*100)/100)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Sustainability(Unit:Permenence)',
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