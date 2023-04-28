<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Land Abuse Points: {{ this.landAbusePoints }}  points
                </div>
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Land Abuse Points = Value of Land Abuse * LandAbuse</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Value of Land Abuse</span> <span>= {{ valueOfLandAbuse }}</span> <span><input type="range" min="0.0001" max="0.1" step="0.0001" v-model="value" @change="changeValueOfLandAbuse" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Land Abuse</span> <span>= {{ this.landAbuse}}</span> <span>(hectares)</span>
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
        name: 'DamUse',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                value:1.5*Math.pow(10,-3),
                valueOfLandAbuse:1.5*Math.pow(10,-3),
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
        props:{
            landAbuse:Number,
            landAbusePoints:Number,
            show:Boolean,
            executed:Number
        },
        watch:{
            executed(newValue,oldValue){
                this.draw();
                this.chartKey++;
            }
        },
        created() {
            service.get('/data/data.json').then(res => {
                this.name = toRaw(res.data.Land_Abuse_Points.name);
                this.causes = toRaw(res.data.Land_Abuse_Points.causes);
                this.effects = toRaw(res.data.Land_Abuse_Points.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeValueOfLandAbuse(){
                this.valueOfLandAbuse = parseInt(this.value * 10000)/10000;
                this.$emit('changeValueOfLandAbuse',this.valueOfLandAbuse);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).landAbusePoints)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Land Abuse Points(Unit:thousand points)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>
    
    <style>
    
    </style>
    