<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Drinking Water: {{ Math.floor(drinkingWater / Math.pow(10,9)*100)/100 }} billion tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Drinking Water = Drinking Fraction * Water Supply</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Drinking Fraction</span> <span>= {{ Math.floor(drinkingFraction * 10000)/10000 }}</span> <span><input type="range" min="0.01" max="0.1" step="0.0001" v-model="drinkingFractionFactor" @change="changeDrinkingFractionFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Water Supply</span> <span>= {{ Math.floor(this.waterSupply / Math.pow(10,12) * 100)/100 }} trillion</span> <span>(tons)</span>
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
        name: 'DrinkingWater',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                drinkingFraction:0.0326,
                drinkingFractionFactor:0.0326,
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
            waterSupply:Number,
            drinkingWater:Number,
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
                this.name = toRaw(res.data.Drinking_Water.name);
                this.causes = toRaw(res.data.Drinking_Water.causes);
                this.effects = toRaw(res.data.Drinking_Water.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeDrinkingFractionFactor() {
                this.drinkingFraction = parseInt(this.drinkingFractionFactor * 10000) / 10000;
                this.$emit('changeDrinkingFractionFactor', this.drinkingFraction);
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