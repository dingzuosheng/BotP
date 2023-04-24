<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Heavy Metal Deaths: {{ Math.floor(this.heavyMetalDeaths/Math.pow(10,3) *100)/100 }} thousand deaths
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Heavy Metal Deaths = Death Rate * Heavy Metal Use</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Death Rate</span> <span>= {{ Math.floor(heavyMetalDeathRate * 10000)/10000 }}</span> <span><input type="range" min="0.001" max="0.1" step="0.0001" v-model="deathRate" @change="changeHeavyMetalDeathRate" />(deaths/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Heavy Metal Use</span> <span>= {{ Math.floor(this.heavyMetalUse / Math.pow(10,6) * 100)/100}} million</span> <span>(tons)</span>
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
        name: 'HeavyMetalDeaths',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                heavyMetalDeathRate:0.0270,
                deathRate:0.0270,
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
            heavyMetalUse:Number,
            heavyMetalDeaths:Number,
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
                this.name = toRaw(res.data.Heavy_Metal_Deaths.name);
                this.causes = toRaw(res.data.Heavy_Metal_Deaths.causes);
                this.effects = toRaw(res.data.Heavy_Metal_Deaths.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeHeavyMetalDeathRate() {
                this.heavyMetalDeathRate = parseInt(this.deathRate * 10000) / 10000;
                this.$emit('changeHeavyMetalDeathRate', this.heavyMetalDeathRate);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).heavyMetalDeaths)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Heavy Metal Deaths (Unit: thousand deaths)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>