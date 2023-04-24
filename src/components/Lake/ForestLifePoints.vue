<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Forest Life Points: {{ Math.floor(this.forestLifePoints * 100)/100 }} points
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Forest Life Points = Value of Forest Life * Forest Habitats</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Value of Forest Life</span> <span>= {{ Math.floor(valueOfForestLife * 100000)/100000 }}</span> <span><input type="range" min="0.0001" max="0.01" step="0.0001" v-model="value" @change="changeValueOfForestLife"/>(Points/species)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Forest Habitats</span> <span>= {{ Math.floor(this.forestHabitats / Math.pow(10,6)*100)/100}} million </span> <span>(species)</span>
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
        name: 'ForestLifePoints',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                valueOfForestLife:3.3*Math.pow(10,-4),
                value:3.3*Math.pow(10,-4),
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
            forestLifePoints:Number,
            forestHabitats:Number,
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
                this.name = toRaw(res.data.Forest_Life_Points.name);
                this.causes = toRaw(res.data.Forest_Life_Points.causes);
                this.effects = toRaw(res.data.Forest_Life_Points.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeValueOfForestLife() {
                this.valueOfForestLife = parseInt(this.value * Math.pow(10,5))/Math.pow(10,5);
                this.$emit('changeValueOfForestLife', this.valueOfForestLife);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).coalUse)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Forest Life Points (Unit: points)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>