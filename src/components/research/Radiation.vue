<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Radiation: {{ Math.floor(this.radiation/1000*100)/100 }} thousand p-rems
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Radiation = Exposure Rate * Nuclear Use / Nuclear Technology</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Exposure Rate</span> <span>= {{ exposureRate }}</span><span><input type="range" min="10000" max="1000000" step="10000" v-model="exposureRateFactor" @change="changeExposureRateFactor"/></span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Use</span><span>= {{ this.nuclearUse }}</span><span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Technology</span><span>= {{ this.nuclearTechnology }}</span><span>(Whizbangs)</span>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                </el-collapse>  
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
    name:'Radiation',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            exposureRateFactor:30000,
            exposureRate:30000,
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
        nuclearUse:Number,
        nuclearTechnology:Number,
        radiation:Number,
        show:Boolean,
        executed:Number
    },
    watch: {
        executed(newVal, oldVal) {
            console.log("watch:"+newVal, oldVal)
            this.draw();
        }
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Radiation.name);
            this.causes = toRaw(res.data.Radiation.causes);
            this.effects = toRaw(res.data.Radiation.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeExposureRateFactor(){
            this.exposureRate = parseInt(this.exposureRateFactor);
            this.$emit("changeExposureRateFactor",this.exposureRate);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).radiation)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Radiation(Unit: p-rems)',
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