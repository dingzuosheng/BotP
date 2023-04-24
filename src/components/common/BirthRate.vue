<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div v-if="!this.show">
                <div>
                    Birth Rate: {{ this.birthRate}} %
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Birth Rate = Maximal Birth Rate / (1 + Quality of Life)</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Maximal Birth Rate</span> <span>= {{ maximalBirthRate }}</span> <span><input type="range" min="2" max="5" step="1" v-model="value" @change="changeMaximalBirthRate" /></span>
                            </div>
                            <div class="row-formula">
                                <span>C1</span> <span>= {{ c1 }}</span> <span><input type="range" min="0.0000001" max="0.00001" step="0.0000001" v-model="c1Factor" @change="changeC1Factor" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Family Planning Budget</span> <span>= {{ Math.floor(this.familyPlanningBudget/Math.pow(10,9) * 100)/100 }}</span>($)
                            </div>
                            <div class="row-formula">
                                <span>Quality of Life</span> <span>= {{ this.qualityOfLife }}</span>(Happies/Cap)
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
    name:'BirthRate',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            value:2,
            maximalBirthRate:2,
            c1:5.5*Math.pow(10,-7),
            c1Factor:5.5*Math.pow(10,-7),
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
        birthRate:Number,
        qualityOfLife:Number,
        familyPlanningBudget:Number,
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
            this.name = toRaw(res.data.Birth_Rate.name);
            this.causes = toRaw(res.data.Birth_Rate.causes);
            this.effects = toRaw(res.data.Birth_Rate.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeMaximalBirthRate(){
            this.maximalBirthRate = parseInt(this.value);
            this.$emit('changeBirthRate',this.maximalBirthRate);
        },
        changeC1Factor(){
            this.c1 = parseInt(this.c1Factor*Math.pow(10,7))/Math.pow(10,7);
            this.$emit('changeC1FactorBirthRate',this.c1);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).birthRate)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Birth Rate (Unit: %)',
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