<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Nuclear Technology: {{ this.nuclearTechnology }} Whizbangs
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Nuclear Technology = Nuclear Technology + NuclearTechnological Optimism * Nuclear Research $ * Basic Research $</div>
                        <br />
                        Where:<br />
                        <div>
                            <div class="row-formula">
                                <span>Nuclear Optimism</span> <span>= {{ nuclearOptimism }}</span> <span><input type="range" min="0.0001" max="0.01" step="0.0001" v-model="optimism" @change="changeNuclearOptimism" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Technology</span> <span>= {{ this.nuclearTechnology }}</span> <span>(Whizbangs)</span>
                            </div>
                            <div class="row-formula">
                                <span>Nuclear Research</span> <span>= {{ this.nuclearResearchBudget / Math.pow(10,9) }} billion</span> <span>($)</span>
                            </div>
                            <div class="row-formula">
                                <span>Basic Research</span> <span>= {{ this.basicResearchBudget / Math.pow(10,9) }} billion</span> <span>($)</span>
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
import {
    toRaw
} from '@vue/reactivity'
import axios from 'axios'
const service = axios.create({
    baseURL: '',
    timeout: 3000000000,
})
import BarChart from '../chart/BarChart.vue'
export default {
    name: 'NuclearTechnology',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            optimism:0.0012,
            nuclearOptimism:0.0012,
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
        nuclearTechnology:Number,
        nuclearResearchBudget:Number,
        basicResearchBudget:Number,
        show:Boolean,
        executed:Number
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Nuclear_Technology.name);
            this.causes = toRaw(res.data.Nuclear_Technology.causes);
            this.effects = toRaw(res.data.Nuclear_Technology.effects);
        })
    },
    watch: {
        executed(newVal, oldVal) {
            console.log("watch:"+newVal, oldVal)
            this.draw();
        }
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeNuclearOptimism(){
           this.nuclearOptimism = parseInt(this.optimism * 10000)/10000;
           this.$emit('changeNuclearOptimism',this.nuclearOptimism); 
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).nuclearTechnology)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Nuclear Technology',
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
