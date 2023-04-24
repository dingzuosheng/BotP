<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Recycled Paper: {{ Math.floor(this.recycledPaper *100)/100 }} 
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Recycled Paper = 1 - exp(-Recycling Effectiveness * Recycling Center $)</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Recycling Effectiveness</span> <span>= {{ Math.floor(recyclingEffectiveness * Math.pow(10,11))/Math.pow(10,11) }}</span> <span><input type="range" min="0.00000000001" max="0.000000001" step="0.00000000001" v-model="recyclingEffectivenessFactor" @change="changeRecyclingEffectivenessFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Recycling Center $</span> <span>= {{ Math.floor(this.recyclingCenterSubsidy / Math.pow(10,9) * 100)/100 }} billion</span> <span>($)</span>
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
        name: 'RecycledPaper',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                recyclingEffectiveness:9.6*Math.pow(10,-11),
                recyclingEffectivenessFactor:9.6*Math.pow(10,-11),
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
            recycledPaper:Number,
            recyclingCenterSubsidy:Number,
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
                this.name = toRaw(res.data.Recycled_Paper.name);
                this.causes = toRaw(res.data.Recycled_Paper.causes);
                this.effects = toRaw(res.data.Recycled_Paper.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeRecyclingEffectivenessFactor() {
                this.recyclingEffectiveness = parseInt(this.recyclingEffectivenessFactor * Math.pow(10,11)) / Math.pow(10,11);
                this.$emit('changeRecyclingEffectivenessFactor', this.recyclingEffectiveness);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).recycledPaper)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Recycled Paper (Unit: )',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>