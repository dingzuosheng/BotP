<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Inundation Points: {{ this.inundationPoints }} points
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Inundation Points = Point Cost * Sea Level</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Point Cost</span> <span>= {{ this.pointCost }}</span><span><input type="range" min="100" max="10000" step="100" v-model="pointCostFactor" @change="changePointCostFactor"/>(points/meter)</span>
                            </div>
                            <div class="row-formula">
                                <span>Sea Level</span> <span>= {{ this.seeLevel }}</span><span> (meters)</span>
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
    name:'InundationPoints',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            pointCostFactor:2000,
            pointCost:2000,
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
        seeLevel:Number,
        inundationPoints:Number,
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
            this.name = toRaw(res.data.Inundation_Points.name);
            this.causes = toRaw(res.data.Inundation_Points.causes);
            this.effects = toRaw(res.data.Inundation_Points.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changePointCostFactor(){
            this.pointCost = parseInt(this.pointCostFactor);
            this.$emit("changePointCostFactor",this.pointCost);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).inundationPoints)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Inundation Points(Unit: points)',
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