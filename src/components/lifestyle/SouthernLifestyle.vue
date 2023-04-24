<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Southern Lifestyle: {{ Math.floor(this.southernLifestyle / Math.pow(10,9)*100)/100 }} billion happiness
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Southern Lifestyle = W1* Housing + W2 * Drinking Water + W3 * Food Supply</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>W1</span> <span>= {{ Math.floor(w1_s * 100)/100 }}</span> <span><input type="range" min="0.1" max="10" step="0.01" v-model="w1Factor" @change="changeW1SFactor" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>W2</span> <span>= {{ Math.floor(w2_s * 100000)/100000 }}</span> <span><input type="range" min="0.001" max="1" step="0.001" v-model="w2Factor" @change="changeW2SFactor" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>W3</span> <span>= {{ Math.floor(w3_s * 1000)/1000 }}</span> <span><input type="range" min="0.1" max="1" step="0.001" v-model="w3Factor" @change="changeW3SFactor" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Housing</span> <span>= {{ Math.floor(this.housing / Math.pow(10,9) * 100)/100 }} billion</span> <span>(dwellings)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Drinking Water</span> <span>= {{ Math.floor(this.drinkingWater / Math.pow(10,9) * 100)/100 }} billion</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Food Supply</span> <span>= {{ Math.floor(this.foodSupply / Math.pow(10,9) * 100)/100 }} billion</span> <span>(tons)</span>
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
        name: 'SouthernLifestyle',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                w1_s:1.00,
                w1Factor:1.00,
                w2_s:0.006,
                w2Factor:0.006,
                w3_s:0.526,
                w3Factor:0.526,
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
            housing:Number,
            drinkingWater:Number,
            foodSupply:Number,
            southernLifestyle:Number,
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
                this.name = toRaw(res.data.Southern_Lifestyle.name);
                this.causes = toRaw(res.data.Southern_Lifestyle.causes);
                this.effects = toRaw(res.data.Southern_Lifestyle.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeW1SFactor() {
                this.w1_s = parseInt(this.w1Factor * 100) / 100;
                this.$emit('changeW1SFactor', this.w1_s);
            },
            changeW2SFactor() {
                this.w2_s = parseInt(this.w2Factor * 100000) / 100000;
                this.$emit('changeW2SFactor', this.w2_s);
            },
            changeW3SFactor() {
                this.w3_s = parseInt(this.w3Factor * 1000) / 1000;
                this.$emit('changeW3SFactor', this.w3_s);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).southernLifestyle)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Southern Life Style (Unit: billion happiness)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>