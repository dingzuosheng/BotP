<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Fertilizer Use: {{ Math.floor(this.fertilizerUse / Math.pow(10,6)*100)/100 }} million tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Fertilizer Use = (Industrial Output * Scale Factor) / (Cost to Produce + Tax Effect * Fertilizer Tax)</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Scale Factor</span> <span>= {{ Math.floor(scaleFactor * 100000)/100000 }}</span> <span><input type="range" min="0.0001" max="0.001" step="0.0001" v-model="factor" @change="changeScaleFactorRate" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Cost to Produce</span> <span>= {{ this.costToProduce_fertilizerUse }}</span> <span><input type="range" min="100" max="10000" step="100" v-model="costToProduceRate" @change="changeCostToProduceRate_fertilizerUse" />($/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Tax Effect</span> <span>= {{ this.taxEffect_fertilizerUse }}</span> <span><input type="range" min="1" max="10" step="0.01" v-model="taxEffectRate" @change="changeTaxEffectRate_fertilizerUse" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Industrial Output</span> <span>= {{ Math.floor(this.industrialOutput / Math.pow(10,12)*100)/100}} trillion</span> <span>(stuff)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Fertilizer Tax</span> <span>= {{ Math.floor(this.fertilizerTax * 100)/100 }} </span> <span>($/ton)</span>
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
        name: 'FertilizerUse',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                scaleFactor: 3.9 * Math.pow(10,-4),
                factor: 3.9 * Math.pow(10,-4),
                costToProduce_fertilizerUse:1000,
                costToProduceRate:1000,
                taxEffectRate:4.00,
                taxEffect_fertilizerUse:4.00,
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
            fertilizerUse:Number,
            industrialOutput:Number,
            fertilizerTax:Number,
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
                this.name = toRaw(res.data.Fertilizer_Use.name);
                this.causes = toRaw(res.data.Fertilizer_Use.causes);
                this.effects = toRaw(res.data.Fertilizer_Use.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeScaleFactorRate() {
                this.scaleFactor = parseInt(this.factor * 10000) / 10000;
                this.$emit('changeScaleFactorRate', this.scaleFactor);
            },
            changeCostToProduceRate_fertilizerUse(){
                this.costToProduce_fertilizerUse = parseInt(this.costToProduceRate);
                this.$emit('changeCostToProduceRate_fertilizerUse',this.costToProduce_fertilizerUse);
            },
            changeTaxEffectRate(){
                this.taxEffect = parseInt(this.taxEffectRate * 100)/100;
                this.$emit('changeTaxEffectRate',this.taxEffect);
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).fertilizerUse/Math.pow(10,6)*100)/100)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Fertilizer Use (Unit: million tons)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>