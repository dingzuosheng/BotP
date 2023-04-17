<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Consumer Goods: {{ Math.floor(this.consumerGoods / Math.pow(10,6) * 100) / 100 }} million goodies
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Consumer Goods = Consumer Goods Ratio * Industrial Output </div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Consumer Goods Ratio</span> <span>= {{ consumerGoodsRatio }}</span> <span><input type="range" min="0.0001" max="0.001" step="0.0001" v-model="consumerGoodsRatioFactor" @change="changeConsumerGoodsRatioFactor"/>(goodies/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Industrial Output</span> <span>= {{ Math.floor(this.industrialOutput / Math.pow(10,12)*100)/100}} trillion</span> <span>(stuff)</span>
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
        name: 'ConsumerGoods',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                consumerGoodsRatio:2.5*Math.pow(10,-4),
                consumerGoodsRatioFactor:2.5*Math.pow(10,-4),
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
            consumerGoods:Number,
            industrialOutput:Number,
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
                this.name = toRaw(res.data.Consumer_Goods.name);
                this.causes = toRaw(res.data.Consumer_Goods.causes);
                this.effects = toRaw(res.data.Consumer_Goods.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeConsumerGoodsRatioFactor() {
                this.consumerGoodsRatio = parseInt(this.consumerGoodsRatioFactor * 10000) / 10000;
                this.$emit('changeConsumerGoodsRatioFactor', this.consumerGoodsRatio);
            },
            draw(){
                const labels = [];
                for(let i = localStorage.length - 1; i > -1; i--){
                    labels.push(localStorage.key(i));
                }
                labels.sort();
                this.chartData.labels =  labels;
                const coalUses = [];
                
                for(let i = 0; i < labels.length; i++){
                    coalUses.push(JSON.parse(localStorage.getItem(labels[i])).coalUse)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Coal Use (Unit: Exajoules)',
                    backgroundColor:'#000000',
                    data: coalUses
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>