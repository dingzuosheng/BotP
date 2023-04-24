<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Heavy Metal Use: {{ Math.floor(this.heavyMetalUse / Math.pow(10,6)*100)/100 }} million tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Heavy Metal Use = Use Rate * Materials Demand / (Heavy Metal Price + Tax Effect * Heavy Metal Tax)</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Use Rate</span> <span>= {{ Math.floor(useRate_heavyMetalUse * 10000)/10000 }}</span> <span><input type="range" min="0.001" max="0.1" step="0.0001" v-model="useRateFactor" @change="changeUseRateFactor_heavyMetalUse" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Tax Effect</span> <span>= {{ Math.floor(taxEffect_heavyMetalUse * 100)/100 }}</span> <span><input type="range" min="1" max="10" step="0.01" v-model="taxEffectRate" @change="changeTaxEffectRate_heavyMetalUse" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>materialsDemand</span> <span>= {{ Math.floor(this.materialsDemand / Math.pow(10,9)*100)/100}} billion</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Heavy Metal Price</span> <span>= {{ Math.floor(this.heavyMetalPrice * 100)/100 }} </span> <span>($/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Heavy Metal Tax</span> <span>= {{ Math.floor(this.heavyMetalTax * 100)/100 }} </span> <span>($/ton)</span>
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
        name: 'HeavyMetalUse',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                useRate_heavyMetalUse:0.0198,
                useRateFactor:0.0198,
                taxEffectRate:5.00,
                taxEffect_heavyMetalUse:5.00,
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
            heavyMetalTax:Number,
            heavyMetalPrice:Number,
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
                this.name = toRaw(res.data.Heavy_Metal_Use.name);
                this.causes = toRaw(res.data.Heavy_Metal_Use.causes);
                this.effects = toRaw(res.data.Heavy_Metal_Use.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeUseRateFactor_heavyMetalUse() {
                this.useRate_heavyMetalUse = parseInt(this.useRateFactor * 10000) / 10000;
                this.$emit('changeUseRateFactor_heavyMetalUse', this.useRate_heavyMetalUse);
            },
            changeTaxEffectRate_heavyMetalUse(){
                this.taxEffect_heavyMetalUse = parseInt(this.taxEffectRate * 100)/100;
                this.$emit('changeTaxEffectRate_heavyMetalUse',this.taxEffect_heavyMetalUse);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).heavyMetalUse)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Heavy Metal Use (Unit: million tons)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>