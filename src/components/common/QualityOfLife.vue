<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>   
            <div v-if="!this.show">
                <div>
                    Quality of Life: {{ Math.ceil(this.qualityOfLife*100)/100 }} Happies/CAP
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Quality of Life = (Northern Value * Northern Lifestyle + Southern Value * Southern Lifestyle) / Population</div>
                        <br/>
                        Where:<br/>
                        <div class="formula">
                            <div class="row-formula">
                                <span>Northern Value</span> <span>= {{ northernLifeValue }}</span> <span><input type="range" min="0.1" max="10" step="0.1" v-model="northernValue" @change="changeNorthernLifeValue" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Southern Value</span> <span>= {{ southernValue }}</span> <span><input type="range" min="0.1" max="10" step="0.01" v-model="southernValueFactor" @change="changeSouthernValueFactor" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Northern Lifestyle</span> <span>= {{ Math.floor(this.northernLifestyle/Math.pow(10,9)*100)/100 }} billion </span>(happies)
                            </div>
                            <div class="row-formula">
                                <span>Southern Lifestyle</span> <span>= {{ Math.floor(this.southernLifestyle/Math.pow(10,9)*100)/100 }} billion </span>(happies)
                            </div>
                            <div class="row-formula">
                                <span>Population</span> <span>= {{ Math.floor(this.population/Math.pow(10,9)*100)/100 }} billion </span>(people)
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
    name:'QualityOfLife',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            northernValue:2,
            northernLifeValue:2,
            southernValue:0.4,
            southernValueFactor:0.4,
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
        qualityOfLife:Number,
        northernLifestyle:Number,
        southernLifestyle:Number,
        population:Number,
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
            this.name = toRaw(res.data.Quality_of_Life.name);
            this.causes = toRaw(res.data.Quality_of_Life.causes);
            this.effects = toRaw(res.data.Quality_of_Life.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeNorthernLifeValue(){
            this.northernLifeValue = parseInt(this.northernValue*10)/10;
            this.$emit('changeNorthernLifeValue',this.northernLifeValue);
        },
        changeSouthernValueFactor(){
            this.southernValue = parseInt(this.southernValueFactor*100)/100;
            this.$emit('changeSouthernValueFactor',this.southernValue);
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).qualityOfLife*100)/100)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Quality of Life(Unit:Happies/CAP)',
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