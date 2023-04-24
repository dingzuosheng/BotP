<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Starvation: {{ Math.floor(this.starvation/Math.pow(10,6)*100)/100 }} million People
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Starvation = (Base Level - Food Supply / Population) * Death Rate * Population</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Base Level</span> <span>= {{ this.baseLevel }}</span><span><input type="range" min="0.25" max="1.0" step="0.05" v-model="baseLevelFactor" @change="changeBaseLevelFactor"/>(tons/person)</span>
                            </div>
                            <div class="row-formula">
                                <span>Death Rate</span> <span>= {{ this.deathRate }}</span><span><input type="range" min="0.01" max="0.1" step="0.01" v-model="deathRateFactor" @change="changeDeathRateFactor"/>(deaths/ton)</span>
                            </div>
                            <div class="row-formula">
                                <span>Food Supply</span> <span>= {{ Math.floor(this.foodSupply/Math.pow(10,9)*100)/100 }} billion</span> (tons)
                            </div>
                            <div class="row-formula">
                                <span>Population</span> <span>= {{ Math.floor(this.population/Math.pow(10,9)*100)/100 }} billion</span> (people)
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
    name:'Starvation',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            baseLevelFactor:0.43,
            baseLevel:0.43,
            deathRateFactor:0.06,
            deathRate:0.06,
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
        population:Number,
        starvation:Number,
        foodSupply:Number,
        show:Boolean,
        executed:Number
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Starvation.name);
            this.causes = toRaw(res.data.Starvation.causes);
            this.effects = toRaw(res.data.Starvation.effects);
        }) 
    },
    watch:{
        executed(newValue,oldValue){
            this.draw();
            this.chartKey++;
        }
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeBaseLevelFactor(){
            this.baseLevel = parseInt(this.baseLevelFactor*100)/100;
            this.$emit("changeBaseLevelFactor",this.baseLevel);
        },
        changeDeathRateFactor(){
            this.deathRate = parseInt(this.deathRateFactor*100)/100;
            this.$emit("changeDeathRateFactor",this.deathRate);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).starvation)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Starvation(Unit:million people)',
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