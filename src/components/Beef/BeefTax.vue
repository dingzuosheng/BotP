<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Beef Tax Income: {{  Math.floor(this.beefTaxIncome/Math.pow(10,6)*100)/100 }} million $
                </div>        
                <div class="range">
                    <h3>Beef Tax {{ this.beefTaxRate }}  $/Ton</h3>
                    <input type="range" min="1.5" max="226" step="0.1"  v-model="rate" @change="changeBeefTaxRate"/><!--value is string-->
                    <div>
                        <p class="text">
                            This is the tax that you levy on Beef Production. Increasing it will discourage production. This 
                            will have both environmental and economic consequences. Although you can change the numbers
                            now and see immediate effects in the bar chart, the effects on the world will not take place 
                            untill you execute policies.
                        </p>
                    </div>
                </div>
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
    name:'Beef Tax',
    data(){
        return{
            name:"",
            rate:6,
            beefTaxRate:6,
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
        beefTaxIncome:Number,
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
            this.name = toRaw(res.data.Beef_Tax.name);
            this.causes = toRaw(res.data.Beef_Tax.causes);
            this.effects = toRaw(res.data.Beef_Tax.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeBeefTaxRate(){
            this.beefTaxRate = parseInt(this.rate*10)/10;
            this.$emit('changeBeefTaxRate',this.beefTaxRate);
        },
        draw(){
            const labels = [];
            for(let i = localStorage.length - 1; i > -1; i--){
                labels.push(localStorage.key(i));
            }
            labels.sort();
            this.chartData.labels =  labels;
            const beefTaxIncomes = [];
            
            for(let i = 0; i < labels.length; i++){
                beefTaxIncomes.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).beefTaxIncome/Math.pow(10,6)*100)/100)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Beef Tax Income(Unit: million dollars)',
                backgroundColor:'orange',
                data: beefTaxIncomes,

            }
            this.chartData.datasets = [dataset];
            console.log(JSON.stringify(this.chartData))
        }
    }
}
</script>
