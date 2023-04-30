<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Marine Life Points: {{ Math.floor(this.marineLifePoints * 100) / 100 }} points
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Marine Life Points= Value of Marine Life * Marine Life</div>
                            <br/>
                            Where:<br/>
                            <div>
                                <div class="row-formula">
                                    <span>Value of Marine Life</span><span>= {{ Math.floor(valueOfMarineLife * Math.pow(10,10))/Math.pow(10,10) }}</span> <span><input type="range" min="0.0000000001" max="0.000001" step="0.0000000001" v-model="valueOfMarineLifeFactor" @change="changeValueOfMarineLifeFactor"/></span>
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
                valueOfMarineLife:1.3*Math.pow(10,-8),
                valueOfMarineLifeFactor:1.3*Math.pow(10,-8),
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
            marineLifePoints:Number,
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
                this.name = toRaw(res.data.Marine_Life_Points.name);
                this.causes = toRaw(res.data.Marine_Life_Points.causes);
                this.effects = toRaw(res.data.Marine_Life_Points.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeValueOfMarineLifeFactor() {
                this.valueOfMarineLife = parseInt(this.valueOfMarineLifeFactor*Math.pow(10,10))/Math.pow(10,10);
                this.$emit('changeValueOfMarineLifeFactor', this.valueOfMarineLife);
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).marineLifePoints))
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Marine Life Points (Unit: Points)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>