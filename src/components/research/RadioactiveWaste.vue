<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Radioactive Waste: {{ this.radioactiveWaste }} tons
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Radioactive Waste = Radioactive Waste + Nuclear Use * Waste Production / Nuclear Technology</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Waste Production</span> <span>= {{ wasteProduction }}</span><span><input type="range" min="10" max="10000" step="10" v-model="wasteProductionFactor" @change="changeWasteProductionFactor"/></span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Use</span><span>= {{ this.nuclearUse }}</span><span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Technology</span>= {{ this.nuclearTechnology }}<span></span><span>(Whizbangs)</span>
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
    name:'RadioactiveWaste',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            wasteProductionFactor:984,
            wasteProduction:984,
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
        nuclearUse:Number,
        nuclearTechnology:Number,
        radioactiveWaste:Number,
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
            this.name = toRaw(res.data.Radioactive_Waste.name);
            this.causes = toRaw(res.data.Radioactive_Waste.causes);
            this.effects = toRaw(res.data.Radioactive_Waste.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeWasteProductionFactor(){
            this.wasteProduction = parseInt(this.wasteProductionFactor);
            this.$emit("changeWasteProductionFactor",this.wasteProduction);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).radioactiveWaste)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Radioactive Waste(Unit:tons)',
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