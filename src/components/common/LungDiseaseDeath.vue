<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Lung Disease Death: {{ Math.floor(this.lungDiseaseDeath/Math.pow(10,3)*100)/100 }} thousand (deaths)
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Lung Disease Death = SO2 Toxicity * Sulfur Dioxide + NO2 Toxicity * Nitrous Dioxide</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>SO2 Toxicity</span> <span>= {{ so2Toxicity }}</span><span><input type="range" min="0.0001" max="0.01" step="0.0001" v-model="so2ToxicityFactor" @change="changeSO2ToxicityFactor"/>(deaths/ton)</span>
                            </div>
                            <div class="row-formula">
                                <span>NO2 Toxicity</span> <span>= {{ no2Toxicity }}</span><span><input type="range" min="0.0001" max="0.01" step="0.0001" v-model="no2ToxicityFactor" @change="changeNO2ToxicityFactor"/>(deaths/ton)</span>
                            </div>
                            <div class="row-formula">
                                <span>Sulfur Dioxide</span><span>= {{ this.so2 }}</span> <span> (tons)</span>
                            </div>
                            <div class="row-formula">
                                <span>Nitrous Dioxide</span><span>= {{ this.no2 }}</span> <span>(tons)</span>
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
    name:'LungDiseaseDeath',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            so2ToxicityFactor:0.005,
            so2Toxicity:0.005,
            no2ToxicityFactor:0.002,
            no2Toxicity:0.002,
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
        so2:Number,
        no2:Number,
        lungDiseaseDeath:Number,
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
            this.name = toRaw(res.data.Lung_Disease_Death.name);
            this.causes = toRaw(res.data.Lung_Disease_Death.causes);
            this.effects = toRaw(res.data.Lung_Disease_Death.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeSO2ToxicityFactor(){
            this.so2Toxicity = parseInt(this.so2ToxicityFactor*10000)/10000;
            this.$emit("changeSO2ToxicityFactor",this.so2Toxicity);
        },
        changeNO2ToxicityFactor(){
            this.no2Toxicity = parseInt(this.no2ToxicityFactor*10000)/10000;
            this.$emit("changeNO2ToxicityFactor",this.no2Toxicity);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).lungDiseaseDeath)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Lung Disease Death(Unit: thousand deaths)',
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