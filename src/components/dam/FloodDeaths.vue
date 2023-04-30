<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Flood Deaths: {{ Math.floor(this.floodDeaths/Math.pow(10,3)*100)/100 }} thousand Deaths
                </div>
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Flood Deaths = Flood Rate * Soil Erosion / Dam Use</div>
                            <br />
                            Where:<br />
                            <div class="formula">
                                <div class="row-formula">
                                    <span>Flood Rate</span> <span>= {{ Math.floor(floodRate*Math.pow(10,5))/Math.pow(10,5) }}</span> <span><input type="range" min="0.001" max="0.01" step="0.00001" v-model="rate" @change="changeFloodRate" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Soil Erosion</span> <span>= {{ Math.floor(this.soilErosion/ Math.pow(10,6) * 10)/10 }} million</span> <span>(hectares)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Dam Use</span> <span>= {{ this.damUse }}</span> <span>(Exajoules)</span>
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
    import {
        toRaw
    } from '@vue/reactivity'
    import axios from 'axios'
    const service = axios.create({
        baseURL: '',
        timeout: 3000000000,
    })
    import BarChart from "../chart/BarChart.vue"
    export default {
        name: 'FloodDeaths',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                floodRate:0.004,
                rate:0.004,
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
            floodDeaths:Number,
            damUse:Number,
            soilErosion:Number,
            show:Boolean,
            executed:Number
        },
        watch:{
            executed(newValue,oldValue){
                this.draw();
                this.chartKey++;
            }
        },
        created() {
            service.get('/data/data.json').then(res => {
                this.name = toRaw(res.data.Flood_Deaths.name);
                this.causes = toRaw(res.data.Flood_Deaths.causes);
                this.effects = toRaw(res.data.Flood_Deaths.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeFloodRate(){
                this.floodRate = parseInt(this.rate * Math.pow(10,5))/Math.pow(10,5);
                this.$emit('changeFloodRate',this.floodRate);
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).floodDeaths/Math.pow(10,3)*100)/100)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Flood Deaths(Unit:thousand Deaths)',
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
    