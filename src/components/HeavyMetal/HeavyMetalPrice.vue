<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Heavy Metal Price: {{ Math.floor(this.heavyMetalPrice *1000)/100 }} $/ton
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Heavy Metal Price = Heavy Metal Price Factor * Heavy Metal Use / Heavy Metal Supply</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Heavy Metal Price Factor</span> <span>= {{ Math.floor(heavyMetalPriceFactor / Math.pow(10,3) * 10)/10 }} thousand </span> <span><input type="range" min="10000" max="100000" step="100" v-model="priceFactor" @change="changeHeavyMetalPriceFactor" />($/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Heavy Metal Use</span> <span>= {{ Math.floor(this.heavyMetalUse / Math.pow(10,6) * 100)/100}} million</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Heavy Metal Supply</span> <span>= {{ Math.floor(this.heavyMetalSupply / Math.pow(10,6) * 100)/100 }} million </span> <span>(tons)</span>
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
        name: 'HeavyMetalPrice',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                heavyMetalPriceFactor:29.6*Math.pow(10,3),
                priceFactor: 29.6*Math.pow(10,3),
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
            heavyMetalSupply:Number,
            heavyMetalPrice:Number,
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
                this.name = toRaw(res.data.Heavy_Metal_Price.name);
                this.causes = toRaw(res.data.Heavy_Metal_Price.causes);
                this.effects = toRaw(res.data.Heavy_Metal_Price.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeHeavyMetalPriceFactor() {
                this.heavyMetalPriceFactor = parseInt(this.priceFactor);
                this.$emit('changeHeavyMetalPriceFactor', this.heavyMetalPriceFactor);
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).heavyMetalPrice))
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Heavy Metal Price (Unit: $/ton)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>