<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>   
            <div v-if="!this.show">
                <div>
                    NO2: {{ Math.floor(this.no2 / Math.pow(10,6)*100)/100}} million tons
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Nitrous Dioxide = (C1 * Coal Use / Coal Technology) + (C2 * Oil Use / Oil Technology)</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>C1</span> <span>= {{ Math.ceil(c1/1000*100)/100 }} thousand</span> <span><input type="range" min="10" max="1000" step="10" v-model="quantity1" @change="changeC1Quanty" /> (tons/Exajoule)</span>
                            </div>
                            <div class="row-formula">
                                <span>C2</span> <span>= {{ Math.ceil(c2/1000 * 100)/100 }} thousand</span> <span><input type="range" min="100" max="500" step="1" v-model="quantity2" @change="changeC2Quanty" /> (tons/Exajoule)</span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Use</span> <span>= {{ Math.ceil(this.coalUse*100)/100 }}</span> <span>(Exajoule)</span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Technology</span> <span>= {{ Math.ceil(this.coalTechnology*100)/100 }}</span><span>(Whizbangs)</span>
                            </div>
                            <div class="row-formula">
                                <span>Oil Use</span> <span>= {{ Math.ceil(this.oilUse*100)/100 }}</span> <span>(Exajoule)</span>
                            </div>
                            <div class="row-formula">
                                <span>Oil Technology</span> <span>= {{ Math.ceil(this.oilTechnology*100)/100 }}</span><span>(Whizbangs)</span>
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
    name:'Nitrous Dioxide',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            quantity1:280,
            c1:280000,
            quantity2:158,
            c2:158000,
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
        no2:Number,
        coalUse:Number,
        coalTechnology:Number,
        oilUse:Number,
        oilTechnology:Number,
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
            this.name = toRaw(res.data.Nitrous_Dioxide.name);
            this.causes = toRaw(res.data.Nitrous_Dioxide.causes);
            this.effects = toRaw(res.data.Nitrous_Dioxide.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeC1Quanty(){
            this.c1 = parseInt(this.quantity1)*1000;
            this.$emit('changeC1Quantity',this.c1);
        },
        changeC2Quanty(){
            this.c2 = parseInt(this.quantity2)*1000;
            this.$emit('changeNO2Quantity',this.c2);
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).no2/Math.pow(10,6)*10)/10)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'NO2(Unit: million tons)',
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