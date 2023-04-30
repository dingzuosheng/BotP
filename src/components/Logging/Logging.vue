<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Logging: {{ Math.floor(this.logging / Math.pow(10,6)*100)/100 }} million heactares
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Logging = (Materials Demand * Use Rate / (Cost + Tax Eff * Logging Tax)) * (1 - .3 * Recycled Paper)</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Use Rate</span> <span>= {{ Math.floor(useRate_logging * 100000)/100000 }}</span> <span><input type="range" min="0.001" max="0.01" step="0.00001" v-model="useRateFactor" @change="changeUseRateFactorLogging" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Cost</span> <span>= {{ Math.floor(cost_logging * 10)/10 }}</span> <span><input type="range" min="10" max="100" step="0.1" v-model="costFactor" @change="changeCostFactorLogging"/>($/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Tax Effect</span> <span>= {{ Math.floor(taxEffect_logging * 100)/100 }}</span> <span><input type="range" min="1" max="10" step="0.01" v-model="taxEffectRate" @change="changeTaxEffectRateLogging"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>materialsDemand</span> <span>= {{ Math.floor(this.materialsDemand / Math.pow(10,9)*100)/100}} billion</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Logging Tax</span> <span>= {{ Math.floor(this.loggingTax * 1000)/1000 }} </span> <span>($/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Recycled Paper</span> <span>= {{ Math.floor(this.recycledPaper * 1000)/1000 }} </span> <span></span>
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
        name: 'Logging',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                useRate_logging:0.00653,
                useRateFactor:0.00653,
                cost_logging:40.0,
                costFactor:40.0,
                taxEffectRate:3.00,
                taxEffect_logging:3.00,
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
            logging:Number,
            loggingTax:Number,
            recycledPaper:Number,
            materialsDemand: Number,
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
                this.name = toRaw(res.data.Logging.name);
                this.causes = toRaw(res.data.Logging.causes);
                this.effects = toRaw(res.data.Logging.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeUseRateFactorLogging() {
                this.useRate_logging = parseInt(this.useRateFactor * 100000) / 100000;
                this.$emit('changeUseRateFactorLogging', this.useRate_logging);
            },
            changeCostFactorLogging(){
                this.cost_logging = parseInt(this.costFactor * 10)/10;
                this.$emit('changeCostFactorLogging',this.cost_logging);
            },
            changeTaxEffectRateLogging(){
                this.taxEffect_logging = parseInt(this.taxEffectRate * 100)/100;
                this.$emit('changeTaxEffectRateLogging',this.taxEffect_logging);
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).logging/Math.pow(10,6)*100)/100)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Logging (Unit: million heactares)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>