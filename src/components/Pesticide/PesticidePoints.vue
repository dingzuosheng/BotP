<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Pesticide Points: {{ Math.floor(this.pesticidePoints * 100) / 100 }} points
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Pesticide Points = Value of Farm Laborer's Life * Pesticide Deaths</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Value of Farm Laborer's Life</span> <span>= {{ valueOfFarmLaborersLife }}</span> <span><input type="range" min="0.0001" max="0.1" step="0.0001" v-model="factor" @change="changeValueOfFarmLaborersLife"/>(points/death)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Pesticide Deaths</span> <span>= {{ Math.floor(this.pesticideDeaths / Math.pow(10,3)*100)/100}} thousand</span> <span>(deaths)</span>
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
    import BarChart from '../chart/BarChart.vue'
    export default {
        name: 'PesticideDeaths',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                factor:0.00150,
                valueOfFarmLaborersLife:0.00150,
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
        props: {
            pesticidePoints:Number,
            pesticideDeaths:Number,
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
        created() {
            service.get('/data/data.json').then(res => {
                this.name = toRaw(res.data.Pesticide_Points.name);
                this.causes = toRaw(res.data.Pesticide_Points.causes);
                this.effects = toRaw(res.data.Pesticide_Points.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeValueOfFarmLaborersLife() {
                this.valueOfFarmLaborersLife = parseInt(this.factor * 1000) / 1000;
                this.$emit('changeValueOfFarmLaborersLife', this.valueOfFarmLaborersLife);
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).data*100)/100)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Pesticide Points (Unit: Points)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>