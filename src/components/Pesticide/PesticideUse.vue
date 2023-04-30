<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Pesticide Use: {{ Math.floor(this.pesticideUse / Math.pow(10,6)*100)/100 }} million tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Pesticide Use = (Industrial Output * Use Rate) / (Cost to Produce + Tax Effect * Pesticide Tax)</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Use Rate</span> <span>= {{ this.useRate }}</span> <span><input type="range" min="0.0001" max="0.001" step="0.0001" v-model="useRateFactor" @change="changeUseRateFactor" />($/hectare)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Cost to Produce</span> <span>= {{ this.costToProduce_pesticide }}</span> <span><input type="range" min="200" max="1000" step="1" v-model="costToProduceRate" @change="changeCostToProduceRate" />($/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Tax Effect</span> <span>= {{ this.taxEffect_pesticide }}</span> <span><input type="range" min="1" max="10" step="0.01" v-model="taxEffectRate" @change="changeTaxEffectRate" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Industrial Output</span> <span>= {{ Math.floor(this.industrialOutput / Math.pow(10,12)*100)/100}} trillion</span> <span>(stuff)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Pesticide Tax</span> <span>= {{ this.pesticideTax }} </span> <span>($/ton)</span>
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
        name: 'Peticide Use',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                useRate: 6.1 * Math.pow(10,-4),
                useRateFactor: 6.1 * Math.pow(10,-4),
                costToProduceRate:1000,
                costToProduce_pesticide:1000,
                taxEffectRate:2.00,
                taxEffect_pesticide:2.00,
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
            pesticideUse:Number,
            industrialOutput:Number,
            pesticideTax:Number,
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
                this.name = toRaw(res.data.Pesticide_Use.name);
                this.causes = toRaw(res.data.Pesticide_Use.causes);
                this.effects = toRaw(res.data.Pesticide_Use.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeCowFactorRate() {
                this.cowFactor = parseInt(this.cowFactorRate * 10) / 10;
                this.$emit('changeCowFactorRate', this.cowFactor);
            },
            changeCostToProduceRate(){
                this.costToProduce = parseInt(this.costToProduceRate);
                this.$emit('changeCostToProduceRate',this.costToProduce);
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).pesticideUse/Math.pow(10,6)*100)/100)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Pesticide Use (Unit: million tons)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>