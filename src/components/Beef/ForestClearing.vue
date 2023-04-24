<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Forest Clearing: {{ Math.floor(this.forestClearing / Math.pow(10,6)*100)/100 }} million hectares
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Forest Clearing = Starvation * Clearing Rate - Debt for Nature $ / Price of Forest Land</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Clearing Rate</span> <span>= {{ clearingRate }}</span> <span><input type="range" min="0.1" max="1" step="0.001" v-model="clearingrate" @change="changeClearingRate" />(hectares/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Price of Forest Land</span> <span>= {{ this.priceOfForestLand }}</span> <span><input type="range" min="100" max="10000" step="100" v-model="priceRate" @change="changePriceOfForestLand" />(hectares/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Starvation</span> <span>= {{ Math.floor(this.starvation / Math.pow(10,6)*100/100)}} million</span> <span>(deaths)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Debt for Nature $</span> <span>= {{ Math.floor(this.debtForNatureSubsidy / Math.pow(10,9)*100 ) / 100}} billion </span> <span>($)</span>
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
        name: 'ForestClearing',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                clearingRate:0.450,
                clearingrate:0.450,
                priceOfForestLand:1000,
                priceRate:1000,
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
            forestClearing:Number,
            starvation:Number,
            debtForNatureSubsidy:Number,
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
                this.name = toRaw(res.data.Forest_Clearing.name);
                this.causes = toRaw(res.data.Forest_Clearing.causes);
                this.effects = toRaw(res.data.Forest_Clearing.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeClearingRate() {
                this.clearingRate = parseInt(this.clearingrate * 1000) / 1000;
                this.$emit('changeClearingRate', this.clearingRate);
            },
            changePriceOfForestLand(){
                this.priceOfForestLand = parseInt(this.priceRate);
                this.$emit('changePriceOfForestLand',this.priceOfForestLand);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).forestClearing)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Forest Clearing (Unit: million hectares)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>