<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Radiation Points: {{ Math.ceil(this.radiationPoints) }} points
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Radiation Points = Value of One Human Life * Radiation Cancer</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Value of One Human Life</span> <span>= {{ this.valueOfOneHumanLife_RadiationPts }}</span><span><input type="range" min="0.0001" max="0.1" step="0.0001" v-model="valueOfOneHumanLifeFactor" @change="changeValueOfOneHumanLife_RadiationPts"/>(tons/person)</span>
                            </div>
                            <div class="row-formula">
                                <span>Radiation Cancer</span><span>= {{ Math.ceil(this.radiationCancer) }}</span><span>(deaths)</span>
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
    name:'RadiationPoints',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            valueOfOneHumanLifeFactor:0.01,
            valueOfOneHumanLife_RadiationPts:0.01,
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
        radiationCancer:Number,
        radiationPoints:Number,
        show:Boolean,
        executed:Number
    },
    watch: {
        executed(newVal, oldVal) {
            console.log("watch:"+newVal, oldVal)
            this.draw();
            this.chartKey++;
        }
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Radiation_Points.name);
            this.causes = toRaw(res.data.Radiation_Points.causes);
            this.effects = toRaw(res.data.Radiation_Points.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeValueOfOneHumanLife_RadiationPts(){
            this.valueOfOneHumanLife_RadiationPts = parseInt(this.valueOfOneHumanLifeFactor*10000)/10000;
            this.$emit("changeValueOfOneHumanLife_RadiationPts",this.valueOfOneHumanLife_RadiationPts);
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).radiationPoints*100)/100)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Radiation Points(Unit:points)',
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