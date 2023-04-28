<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Nuclear Supply: {{ Math.floor(this.nuclearSupply/1000 * 100)/100 }} thousand Exajoules
                </div> 
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Nuclear Supply = Nuclear Supply Elasticity * Nuclear Price - Total Nuclear Use</div>
                            <br />
                            Where:<br />
                            <div class="formula">
                                <div class="row-formula">
                                    <span>Nuclear Supply Elasticity</span> <span>= {{ Math.floor(nuclearSupplyElasticity*Math.pow(10,9))/Math.pow(10,9) }}</span> <span><input type="range" min=0.0000001 max="0.000001" step="0.0000001" v-model="elasticity" @change="changeNuclearSupplyElasticity" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Nuclear Price</span> <span>= {{ Math.floor(this.nuclearPrice/Math.pow(10,9)*100)/100 }} billion</span> <span>($/Exajoule)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Total Nuclear Use</span> <span>= {{ this.totalNuclearUse }}</span> <span>(Exajoules)</span>
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
    name:'NuclearSupply',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            elasticity:4.8*Math.pow(10,-7),
            nuclearSupplyElasticity:4.8*Math.pow(10,-7),
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
        nuclearSupply:Number,
        nuclearPrice:Number,
        totalNuclearUse:Number,
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
            this.name = toRaw(res.data.Nuclear_Supply.name);
            this.causes = toRaw(res.data.Nuclear_Supply.causes);
            this.effects = toRaw(res.data.Nuclear_Supply.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeNuclearSupplyElasticity(){
            this.nuclearSupplyElasticity = parseInt(this.elasticity*Math.pow(10,7))/Math.pow(10,7);
            this.$emit('changeNuclearSupply',this.nuclearSupplyElasticity)
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).nuclearSupply)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Nuclear Supply(Unit:thousand Exajoules)',
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