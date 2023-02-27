<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div v-if="!this.show">
                <div>
                    Natural Gas Supply: {{ this.naturalGasSupply }} Exajoules
                </div> 
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Natural Gas Supply = Natural Gas Supply Elasticity * Natural Gas Price - Total Natural Gas Use</div>
                            <br />
                            Where:<br />
                            <div class="formula">
                                <div class="row-formula">
                                    <span>Supply Elasticity</span> <span>= {{ Math.floor(naturalGasSupplyElasticity*Math.pow(10,7))/Math.pow(10,7) }}</span> <span><input type="range" min=0.0000001 max="0.000001" step="0.0000001" v-model="elasticity" @change="changeNaturalGasSupplyElasticity" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Natural Gas Price</span> <span>= {{ Math.floor(this.naturalGasPrice/Math.pow(10,9)*100)/100 }} billion</span> <span>($/Exajoule)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Total Natural Gas Use</span> <span>= {{ Math.floor(this.totalNaturalGasUse /1000 * 100)/100}} thousand</span> <span>(Exajoules)</span>
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
    name:'Natural Gas Supply',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            elasticity:Math.pow(10,-6),
            naturalGasSupplyElasticity:Math.pow(10,-6),
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
        naturalGasSupply:Number,
        naturalGasPrice:Number,
        totalNaturalGasUse:Number,
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
            this.name = toRaw(res.data.Natural_Gas_Supply.name);
            this.causes = toRaw(res.data.Natural_Gas_Supply.causes);
            this.effects = toRaw(res.data.Natural_Gas_Supply.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeNaturalGasSupplyElasticity(){
            this.naturalGasSupplyElasticity = parseInt(this.elasticity*Math.pow(10,7))/Math.pow(10,7);
            this.$emit('changeNaturalGasSupplyElasticity',this.naturalGasSupplyElasticity)
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).naturalGasSupply)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Natural Gas Supply(Unit:thousand)',
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