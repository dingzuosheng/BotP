<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Starvation Points: {{ Math.floor(this.starvationPoints/1000*100)/100 }} thousand points
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Starvation Points = Value of One Human Life * Starvation</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Value of One Human Life</span> <span>= {{ this.valueOfOneHumanLife }}</span><span><input type="range" min="0.0001" max="0.1" step="0.0001" v-model="valueOfOneHumanLifeFactor" @change="changeValueOfOneHumanLifeFactor"/>(tons/person)</span>
                            </div>
                            <div class="row-formula">
                                <span>Starvation</span> <span>= {{ Math.floor(this.starvation/Math.pow(10,9)*100)/100 }} billion </span> (deaths)
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
    name:'StarvationPoints',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            valueOfOneHumanLifeFactor:1.0*Math.pow(10,-4),
            valueOfOneHumanLife:1.0*Math.pow(10,-4),
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
        starvation:Number,
        starvationPoints:Number,
        show:Boolean,
        executed:Number
    },
    watch:{
        executed(newValue,oldValue){
            this.draw();
        }
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Starvation_Points.name);
            this.causes = toRaw(res.data.Starvation_Points.causes);
            this.effects = toRaw(res.data.Starvation_Points.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeValueOfOneHumanLifeFactor(){
            this.valueOfOneHumanLife = parseInt(this.valueOfOneHumanLifeFactor*10000)/10000;
            this.$emit("changeValueOfOneHumanLifeFactor",this.valueOfOneHumanLife);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).starvationPoints)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Starvation Points(Unit:thousand points)',
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