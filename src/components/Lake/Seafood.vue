<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Seafood: {{ Math.floor(this.seafood / Math.pow(10,6) * 100) / 100 }} million tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Seafood = Marine Life * Max Sutstainable Fraction</div>
                            <br/>
                            Where:<br/>
                            <div>
                                <div class="row-formula">
                                    <span>Max Sustainable Fraction</span><span>= {{ Math.floor(maxSustainableFraction * Math.pow(10,5))/Math.pow(10,5) }}</span> <span><input type="range" min="0.001" max="0.01" step="0.00001" v-model="maxSustainableFractionFactor" @change="changeMaxSustainableFractionFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Marine Life</span> <span>= {{ Math.floor(this.marineLife / Math.pow(10,9) *100)/100 }} billion</span> <span>(tons)</span>
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
        name: 'MarineLifePoints',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                maxSustainableFraction:0.00443,
                maxSustainableFractionFactor:0.00443,
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
            seafood:Number,
            marineLife:Number,
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
                this.name = toRaw(res.data.Seafood.name);
                this.causes = toRaw(res.data.Seafood.causes);
                this.effects = toRaw(res.data.Seafood.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeMaxSustainableFractionFactor() {
                this.maxSustainableFraction = parseInt(this.maxSustainableFractionFactor*Math.pow(10,5))/Math.pow(10,5);
                this.$emit('changeMaxSustainableFractionFactor', this.maxSustainableFraction);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).seafood)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Seafood (Unit: million tons)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>