<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Rad Waste Points: {{ this.radWastePoints }} points
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Rad Waste Points = Radioactive Waste * Danger Value</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Danger Value</span> <span>= {{ this.dangerValue }}</span><span><input type="range" min="0.001" max="0.1" step="0.001" v-model="dangerValueFactor" @change="changeDangerValueFactor"/>(points/ton)</span>
                            </div>
                            <div class="row-formula">
                                <span>Radioactive Waste</span> <span>= {{ this.radioactiveWaste }} (tons)</span>
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
    name:'RadWastePoints',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            dangerValueFactor:0.045,
            dangerValue:0.045,
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
        radioactiveWaste:Number,
        radWastePoints:Number,
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
            this.name = toRaw(res.data.Rad_Waste_Points.name);
            this.causes = toRaw(res.data.Rad_Waste_Points.causes);
            this.effects = toRaw(res.data.Rad_Waste_Points.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeDangerValueFactor(){
            this.dangerValue = parseInt(this.dangerValue*1000)/1000;
            this.$emit("changeDangerValueFactor",this.dangerValue);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).radWastePoints)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Rad Waste Points',
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