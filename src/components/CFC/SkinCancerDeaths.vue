<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                SkinCancerDeaths: {{ Math.floor(this.skinCancerDeaths / Math.pow(10,3)  * 100) / 100 }} thousand Deaths
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Skin Cancer Deaths = Skin Cancer Incidence * Ultraviolet Light</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Skin Cancer Incidence</span> <span>= {{ Math.floor(skinCancerIncidence / Math.pow(10,3)  * 100)/100 }} thousand</span> <span><input type="range" min="10000" max="1000000" step="1000" v-model="skinCancerIncidenceFactor" @change="changeSkinCancerIncidenceFactor"/>(watts/m2)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Ultraviolet Light</span><span>= {{ Math.floor(this.ultravioletLight *1000)/1000}}</span> <span>(watts/sq m)</span>
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
        name: 'SkinCancerDeaths',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                skinCancerIncidence:100*Math.pow(10,3),
                skinCancerIncidenceFactor:100*Math.pow(10,3),
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
            skinCancerDeaths:Number,
            ultravioletLight:Number,
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
                this.name = toRaw(res.data.Skin_Cancer_Deaths.name);
                this.causes = toRaw(res.data.Skin_Cancer_Deaths.causes);
                this.effects = toRaw(res.data.Skin_Cancer_Deaths.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeSkinCancerIncidenceFactor() {
                this.skinCancerIncidence = parseInt(this.skinCancerIncidenceFactor);
                this.$emit('changeSkinCancerIncidenceFactor', this.skinCancerIncidence);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).skinCancerDeaths)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Skin Cancer Deaths (Unit: thousand deaths)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>