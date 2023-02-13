<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Coal Tax Income: {{ this.coalTaxIncome }} $
                </div>        
                <div class="range">
                    <h3>Coal Tax {{ this.coalTaxRate }} billion $/Exajoule</h3>
                    <input type="range" min="0.0625" max="9.44" step="0.0005"  v-model="rate" @change="changeCoalTaxRate"/><!--value is string-->
                    <div>
                        <p class="text">
                            This is the tax that you levy on Coal Use. Increasing it will discourage production. This 
                            will have both environmental and economic consequences. Although you can change the numbers
                            now and see immediate effects in the bar chart, the effects on the world will not take place 
                            untill you execute policies.
                        </p>
                    </div>
                </div>
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
    name:'Coal Tax',
    data(){
        return{
            name:"",
            rate:1.0001,
            coalTaxRate:1.0001,
            causes:[],
            effects:[],
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
        coalTaxIncome:Number,
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
            this.name = toRaw(res.data.Coal_Tax.name);
            this.causes = toRaw(res.data.Coal_Tax.causes);
            this.effects = toRaw(res.data.Coal_Tax.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeCoalTaxRate(){
            this.coalTaxRate = parseInt(this.rate*10000)/10000;
            this.$emit('changeCoalTaxRate',this.coalTaxRate);
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
                label:'Coal Tax Income',
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
.text{
    font-size: 20px;
    font-style: italic;
    background-color: darkgray;
    line-height: 30pt;
    letter-spacing: 1.5pt;
}
.side-nav button{
    height:70px;
    width:250px;
    font-size:x-large;
}
</style>