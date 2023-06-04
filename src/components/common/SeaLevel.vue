<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div v-if="!this.show"> 
                <div>
                    See Level: {{ Math.ceil(this.seeLevel*1000)/1000 }} meters
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>See Level = (Global Temperature - Base Temperature) * Melting Rate</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Base Temperature</span> <span>= {{ basicTemperature }}</span> <span><input type="range" min="55" max="65" step="1" v-model="temperature" @change="changeBasicTemperature" /> (degrees)</span>
                            </div>
                            <div class="row-formula">
                                <span>Melting Rate</span> <span>= {{ meltingRate }}</span> <span><input type="range" min="0.1" max="2" step="0.1" v-model="rate" @change="changeMeltingRate" /> (meters/degrees)</span>
                            </div>
                            <div class="row-formula">
                                <span>Global Temperature</span> <span>= {{ Math.ceil(this.globalTemperature*10)/10 }}</span>(degrees)
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
    name:'SeaLevel',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            temperature:60,
            basicTemperature:60,
            rate:0.5,
            meltingRate:0.5,
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
        seeLevel:Number,
        globalTemperature:Number,
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
            this.name = toRaw(res.data.Sea_Level.name);
            this.causes = toRaw(res.data.Sea_Level.causes);
            this.effects = toRaw(res.data.Sea_Level.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeBasicTemperature(){
            this.basicTemperature = parseInt(this.temperature);
            this.$emit('changeBasicTemperature',this.basicTemperature);
        },
        changeMeltingRate(){
            this.meltingRate = parseInt(this.rate*100)/100;
            this.$emit('changeMeltingRate',this.meltingRate);
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).seeLevel*100)/100)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Seelevel(Unit:meters)',
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