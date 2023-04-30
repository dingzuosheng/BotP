<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Methane: {{ Math.floor(this.methane/Math.pow(10,9)*100)/100 }} billion tons
                </div>
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Methane = Methane * (1 - Decay Rate) + Beef Production * Burp Factor + Acid Rain * Soil Factor</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Decay Rate</span> <span>= {{  Math.floor(this.decayRate*1000)/1000 }} </span> <span><input type="range" min="0" max="1" step="0.001" v-model="decayRateFactor" @change="changeDecayRateFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Burp Factor</span> <span>= {{  Math.floor(this.burpFactor*100)/100 }} </span> <span><input type="range" min="0.1" max="10" step="0.01" v-model="burp" @change="changeBurpFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Soil Factor</span> <span>= {{  Math.floor(this.soilFactor*10)/10 }} </span> <span><input type="range" min="1" max="100" step="0.1" v-model="soil" @change="changeSoilFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Methane</span> <span>= {{ Math.floor(this.methane/Math.pow(10,9)*100)/100}} billion</span><span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Beef Production</span> <span>= {{ Math.floor(this.beefProduction/Math.pow(10,6)*100)/100}} million</span><span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Acid Rain</span> <span>= {{ Math.floor(this.acidRain/Math.pow(10,6)*100)/100}} million</span><span>(tons)</span>
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
        name: 'Methane',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                decayRate:0.100,
                decayRateFactor:0.100,
                burpFactor:2.00,
                burp:2.00,
                soilFactor:10.0,
                soil:10.0,
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
            methane:Number,
            beefProduction:Number,
            acidRain:Number,
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
                this.name = toRaw(res.data.Methane.name);
                this.causes = toRaw(res.data.Methane.causes);
                this.effects = toRaw(res.data.Methane.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeDecayRateFactor(){
                this.decayRate = parseInt(this.decayRate * 1000)/1000;
                this.$emit('changeDecayRateFactor',this.dacayRate);
            },
            changeBurpFactor(){
                this.burpFactor = parseInt(this.burp * 100)/100;
                this.$emit('changeBurpFactor',this.burpFactor);
            },
            changeSoilFactor(){
                this.soilFactor = parseInt(this.soil * 10)/10;
                this.$emit('changeSoilFactor',this.soilFactor);
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).methane/Math.pow(10,9)*100)/100)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Methane (Unit: billion tons)',
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
    