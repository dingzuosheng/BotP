<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Strip Mining: {{ Math.floor(this.stripMining/Math.pow(10,3)*100)/100 }} thousand hectares
                </div>
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Strip Mining = StripMiningProductivity * Coal Use</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>StripMiningProductivity</span> <span>= {{ stripMiningProductivity }}</span> <span><input type="range" min="100" max="1000" step="100" v-model="productivity" @change="changeStripMiningProductivity" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Coal Use</span> <span>= {{ this.coalUse}}</span> <span>(Exajoules)</span>
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
        name: 'DamUse',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                productivity:300,
                stripMiningProductivity:300,
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
            stripMining:Number,
            coalUse:Number,
            show:Boolean,
            executed:Number
        },
        watch:{
            executed(newValue,oldValue){
                this.draw();
            }
        },
        created() {
            service.get('/data/data.json').then(res => {
                this.name = toRaw(res.data.Strip_Mining.name);
                this.causes = toRaw(res.data.Strip_Mining.causes);
                this.effects = toRaw(res.data.Strip_Mining.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeStripMiningProductivity(){
                this.stripMiningProductivity = parseInt(this.productivity);
                this.$emit('changeStripMiningProductivity',this.stripMiningProductivity);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).stripMining)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Strip Mining(Unit:thousand hectares)',
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
    