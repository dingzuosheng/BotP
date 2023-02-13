<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            <div>
                Coal Technology: {{ this.coalTechnology }} Whizbangs
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Coal Technology = Coal Technology + CoalTechnological Optimism * log(Coal Research $ * Basic Research $)</div>
                        <br />
                        Where:<br />
                        <div>
                            <div class="row-formula">
                                <span>Coal Optimism</span> <span>= {{ coalOptimism }}</span> <span><input type="range" min="0.0001" max="0.01" step="0.0001" v-model="optimism" @change="changeCoalOptimism" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Technology</span> <span>= {{ this.coalTechnology }}</span> <span>(Whizbangs)</span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Research $</span> <span>= {{ this.coalResearchBudget/Math.pow(10,9) }} billion</span> <span>($)</span>
                            </div>
                            <div class="row-formula">
                                <span>Basic Research $</span> <span>= {{ this.basicResearchBudget/Math.pow(10,9) }} billion</span> <span>($)</span>
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
    name: 'CoalTechnology',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            optimism:0.0012,
            coalOptimism:0.0012,
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
        coalTechnology:Number,
        coalResearchBudget:Number,
        basicResearchBudget:Number,
        show:Boolean,
        executed:Number
    },
    watch: {
        executed(newVal, oldVal) {
            console.log("watch:"+newVal, oldVal)
            this.draw();
        }
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Coal_Technology.name);
            this.causes = toRaw(res.data.Coal_Technology.causes);
            this.effects = toRaw(res.data.Coal_Technology.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeCoalOptimism(){
            this.coalOptimism = parseInt(this.optimism*10000)/10000;
            this.$emit('changeCoalOptimism',this.coalOptimism);
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
                data.push(JSON.parse(localStorage.getItem(labels[i])).coalTechnology)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Coal Technology',
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
