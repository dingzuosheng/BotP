<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Energy Conservation: {{ this.energyConservation }} Exajoules
                </div> 
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Energy Conservation = Price Elasticity * Sqrt(Ave Energy Price)</div>
                            <br />
                            Where:<br />
                            <div class="formula">
                                <div class="row-formula">
                                    <span>Price Elasticity</span> <span>= {{ priceEleasticity }}</span> <span><input type="range" min="0.0001" max="0.01" step="0.0001" v-model="elasticity" @change="changePriceElasticity" /> (degrees)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Ave Energy Price</span> <span>= {{ Math.floor(this.aveEnergyPrice/Math.pow(10,9)*100)/100 }} billion </span>($/Exajoule)
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
    name:'EnergyConservation',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            elasticity:0.0001,
            priceEleasticity:0.0001,
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
        energyConservation:Number,
        aveEnergyPrice:Number,
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
            this.name = toRaw(res.data.Energy_Conservation.name);
            this.causes = toRaw(res.data.Energy_Conservation.causes);
            this.effects = toRaw(res.data.Energy_Conservation.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changePriceElasticity(){
            this.priceEleasticity = parseInt(this.elasticity*10000)/10000;
            this.$emit('changePriceElasticity',this.priceEleasticity);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).energyConservation)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Energy Conservation(Unit: Exajoules)',
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