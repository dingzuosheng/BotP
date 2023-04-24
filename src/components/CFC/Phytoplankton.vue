<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Phytoplankton: {{ Math.floor(this.phytoplankton / Math.pow(10,9)  * 100) / 100 }} billion tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Phytoplankton = Normal Phytoplankton * (1 - Phytoplankton Damage Rate * Ultraviolet Light)</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Normal Phytoplankton</span> <span>= {{ Math.floor(normalPhytoplankton / Math.pow(10,9)  * 100)/100 }} billion</span> <span><input type="range" min="10000000000" max="30000000000" step="100000000" v-model="normalPhytoplanktonFactor" @change="changeNormalPhytoplanktonFactor"/>(watts/m2)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Phytoplakton Damage Rate</span> <span>= {{ Math.floor(phytoplanktonDamageRate * 1000)/1000 }} </span> <span><input type="range" min="0.01" max="1" step="0.001" v-model="phytoplanktonDamageRateFactor" @change="changePhytoplanktonDamageRateFactor"/></span>
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
        name: 'Phytoplankton',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                normalPhytoplankton:17.6*Math.pow(10,9),
                normalPhytoplanktonFactor:17.6*Math.pow(10,9),
                phytoplanktonDamageRate:0.307,
                phytoplanktonDamageRateFactor:0.307,
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
            phytoplankton:Number,
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
                this.name = toRaw(res.data.Phytoplankton.name);
                this.causes = toRaw(res.data.Phytoplankton.causes);
                this.effects = toRaw(res.data.Phytoplankton.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeNormalPhytoplanktonFactor() {
                this.normalPhytoplankton = parseInt(this.normalPhytoplanktonFactor);
                this.$emit('changeNormalPhytoplanktonFactor', this.normalPhytoplankton);
            },
            changePhytoplanktonDamageRateFactor() {
                this.phytoplanktonDamageRate = parseInt(this.phytoplanktonDamageRateFactor * Math.pow(10,3)) / Math.pow(10,3);
                this.$emit('changePhytoplanktonDamageRateFactor', this.phytoplanktonDamageRate);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).phytoplankton)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Phytoplankton (Unit: billion tons)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>