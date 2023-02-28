<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Radiation Cancer: {{ this.radiationCancer }} deaths
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Radiation Cancer = Radiation Danger * Radiation + Accident Danger * Nuclear Accidents</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Radiation Danger</span> <span>= {{ radiationDanger }}</span><span><input type="range" min="0.0001" max="0.001" step="0.0001" v-model="radiationDangerFactor" @change="changeRadiationDangerFactor"/></span>
                            </div>
                            <div class="row-formula">
                                <span>Accident Danger</span> <span>= {{ accidentDanger }}</span><span><input type="range" min="1000" max="100000" step="1000" v-model="accidentDangerFactor" @change="changeAccidentDangerFactor"/></span>
                            </div>
                            <div class="row-formula">
                                <span>Radiation</span><span>= {{ this.radiation }}</span><span>(p-rems)</span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Accidents</span><span>= {{ this.nuclearAccidents }} </span><span>(accidents)</span>
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
    name:'RadiationCancer',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            radiationDangerFactor:0.0029,
            radiationDanger:0.0029,
            accidentDangerFactor:5000,
            accidentDanger:5000,
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
        nuclearAccidents:Number,
        radiation:Number,
        radiationCancer:Number,
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
            this.name = toRaw(res.data.Radiation_Cancer.name);
            this.causes = toRaw(res.data.Radiation_Cancer.causes);
            this.effects = toRaw(res.data.Radiation_Cancer.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeRadiationDangerFactor(){
            this.radiationDanger = parseInt(this.radiationDangerFactor * 10000) / 10000;
            this.$emit("changeRadiationDangerFactor",this.radiationDanger);
        },
        changeAccidentDangerFactor(){
            this.accidentDanger = parseInt(this.accidentDangerFactor * 10000) / 10000;
            this.$emit("changeAccidentDangerFactor",this.accidentDanger);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).radiationCancer)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Radiation Cancer(Unit: deaths)',
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