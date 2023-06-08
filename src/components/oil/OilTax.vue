<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div v-if="!this.show">
                <div>
                    Oil Tax Income: {{ Math.floor(this.oilTaxIncome/Math.pow(10,9) * 100)/100 }} billion $
                </div>
                <div class="range">
                    <h3>Oil Tax {{ Math.floor(this.oilTaxRate/Math.pow(10,6)*100)/100 }} million $/Exajoule</h3>
                    <input type="range" min="6250000" max="9440000000" step="10000" v-model="rate" @change="changeOilTaxRate"/><!--value is string-->
                    <div>
                        <button @click="add(1000000)">+1M</button>
                        <button @click="add(10000)">+10K</button>
                        <button @click="minus(1000000)">-1M</button>
                        <button @click="minus(10000)">-10K</button>
                    </div>
                    <div>
                        <p class="text">
                            This is the tax that you levy on Oil Use. Increasing it will discourage production. This 
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
    timeout:300000000,
})
import BarChart from '../chart/BarChart.vue'
export default {
    name:'OilTax',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            rate:250*Math.pow(10,6),
            oilTaxRate:250*Math.pow(10,6),
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
        oilTaxIncome:Number,
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
            this.name = toRaw(res.data.Oil_Tax.name);
            this.causes = toRaw(res.data.Oil_Tax.causes);
            this.effects = toRaw(res.data.Oil_Tax.effects);
        }) 
    },
    methods:{
        add(number){
            let n = parseFloat(this.rate);
            if(n < 9439 * Math.pow(10,6)){
                n += number;
            }else{
                n = 9440 * Math.pow(10,6);
            }
            this.rate = n.toString();
            this.changeOilTaxRate();
        },
        minus(number){
            let n = parseFloat(this.rate);
            if(n > 7.25 * Math.pow(10,6)){
                n -= number;
            }else{
                n = 6.25 * Math.pow(10,6);
            }
            this.rate = n.toString();
            this.changeOilTaxRate();
        },
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeOilTaxRate(){
            this.oilTaxRate = parseInt(this.rate*10000)/10000;
            this.$emit('changeOilTaxRate',this.oilTaxRate);
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).oilTaxIncome/Math.pow(10,9)*10)/10)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Oil Tax Income (Unit: billion dollars)',
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