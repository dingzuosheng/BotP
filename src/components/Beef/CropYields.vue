<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Crop Yields: {{ this.cropYields }} tons/hectare
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Crop Yields = Weight1 * Crop Technology + Weight2 * Water Supply - Weight3 * Ultraviolet Light</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Weight1</span> <span>= {{ weight1 }}</span> <span><input type="range" min="0.00000001" max="0.000001" step="0.00000001" v-model="weight1Factor" @change="changeWeight1Factor" />($/hectare)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Weight2</span> <span>= {{ weight2 }}</span> <span><input type="range" min="0.00000000000001" max="0.000000000001" step="0.00000000000001" v-model="weight2Factor" @change="changeWeight2Factor" />($/hectare)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Weight3</span> <span>= {{ weight3 }}</span> <span><input type="range" min="0.1" max="10" step="0.001" v-model="weight3Factor" @change="changeWeight3Factor" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Crop Technology</span> <span>= {{ Math.floor(this.cropTechnology / Math.pow(10,6)*100)/100}} million</span> <span>(whizbangs)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Water Supply</span> <span>= {{ Math.floor(this.waterSupply / Math.pow(10,12) * 100) / 100 }} trillion </span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Ultraviolet Light</span> <span>= {{ this.ultravioletLight }} </span> <span>(watts/sq m)</span>
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
        name: 'CropYields',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                weight1:1.6*Math.pow(10,-7),
                weight1Factor:1.6*Math.pow(10,-7),
                weight2:1.5*Math.pow(10,-13),
                weight2Factor:1.5*Math.pow(10,-13),
                weight3:0.344,
                weight3Factor:0.344,
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
            cropYields:Number,
            cropTechnology:Number,
            waterSupply:Number,
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
                this.name = toRaw(res.data.Crop_Yields.name);
                this.causes = toRaw(res.data.Crop_Yields.causes);
                this.effects = toRaw(res.data.Crop_Yields.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeWeight1Factor() {
                this.weight1 = parseInt(this.weight1Factor * Math.pow(10,8)) / Math.pow(10,8);
                this.$emit('changeWeight1Factor', this.weight1);
            },
            changeWeight2Factor(){
                this.weight2 = parseInt(this.weight2Factor * Math.pow(10,14)) / Math.pow(10,14);
                this.$emit('changeWeight2Factor',this.weight2);
            },
            changeWeight3Factor(){
                this.weight3 = parseInt(this.weight3Factor * 1000)/1000;
                this.$emit('changeWeight1Factor',this.weight3);
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