<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Water Pollution: {{ Math.floor(this.waterPollution / Math.pow(10,9)*100)/100 }} billion tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Water Pollution = HM Toxic * Heavy Metal Use + P Toxic * Pesticide Use + F Toxic * Fertilizer Use</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>HM Toxic</span> <span>= {{ Math.floor(hmToxic * 100)/100 }}</span> <span><input type="range" min="100" max="10000" step="0.01" v-model="hmToxicFactor" @change="changeHMToxicFactor" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>P Toxic</span> <span>= {{ Math.floor(pToxic * 100)/100 }}</span> <span><input type="range" min="100" max="10000" step="0.01" v-model="pToxicFactor" @change="changePToxicFactor" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>F Toxic</span> <span>= {{ Math.floor(fToxic * 10)/10 }}</span> <span><input type="range" min="10" max="1000" step="0.1" v-model="fToxicFactor" @change="changeFToxicFactor" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Heavy Metal Use</span> <span>= {{ Math.floor(this.heavyMetalUse / Math.pow(10,6) * 100)/100 }} million</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Pesticide Use</span> <span>= {{ Math.floor(this.pesticideUse / Math.pow(10,6) * 100)/100 }} million</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Fertilizer Use</span> <span>= {{ Math.floor(this.fertilizerUse / Math.pow(10,6) * 100)/100 }} million</span> <span>(tons)</span>
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
        name: 'WaterPollution',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                hmToxic:2000,
                hmToxicFactor:2000,
                pToxic:1000,
                pToxicFactor:1000,
                fToxic:100,
                fToxicFactor:100,
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
            waterPollution:Number,
            heavyMetalUse:Number,
            pesticideUse:Number,
            fertilizerUse:Number,
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
                this.name = toRaw(res.data.Water_Pollution.name);
                this.causes = toRaw(res.data.Water_Pollution.causes);
                this.effects = toRaw(res.data.Water_Pollution.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeHMToxicFactor() {
                this.hmToxic = parseInt(this.hmToxicFactor * 100) / 100;
                this.$emit('changeHMToxicFactor', this.hmToxic);
            },
            changePToxicFactor(){
                this.pToxic = parseInt(this.pToxicFactor * 100)/100;
                this.$emit('changePToxicFactor',this.pToxic);
            },
            changeFToxicFactor(){
                this.fToxic = parseInt(this.fToxicFactor * 10)/10;
                this.$emit('changeFToxicFactor',this.fToxic);
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