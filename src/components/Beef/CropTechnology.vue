<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Crop Technology: {{ Math.floor(this.cropTechnology / Math.pow(10,6) * 100) / 100 }} million whizbangs
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Crop Technology = Weight1 * Crop Strains + Weight2 * Pesticide Use - Weight3 * Fertilizer Use</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Weight1</span> <span>= {{ weight1_tech }}</span> <span><input type="range" min="10" max="1000" step="1" v-model="weight1_techFactor" @change="changeWeight1_techFactor" />($/hectare)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Weight2</span> <span>= {{ weight2_tech }}</span> <span><input type="range" min="1" max="10" step="0.01" v-model="weight2_techFactor" @change="changeWeight2_techFactor" />($/hectare)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Weight3</span> <span>= {{ weight3_tech }}</span> <span><input type="range" min="0.1" max="10" step="0.001" v-model="weight3_techFactor" @change="changeWeight3_techFactor" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Crop Strains</span> <span>= {{ Math.floor(this.cropStrains / Math.pow(10,3)*100)/100}} thousand</span> <span>(strains)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Pesticide Use</span> <span>= {{ Math.floor(this.pesticideUse / Math.pow(10,6) * 100) / 100 }} million </span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Fertilizer Use</span> <span>= {{ Math.floor(this.fertilizerUse / Math.pow(10,6) * 100) / 100 }} million </span> <span>(tons)</span>
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
        name: 'CropTechnology',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                weight1_tech:25.0,
                weight1_techFactor:25.0,
                weight2_tech:2.00,
                weight2_techFactor:2.00,
                weight3_tech:3.51,
                weight3_techFactor:3.51,
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
            cropStrains:Number,
            cropTechnology:Number,
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
                this.name = toRaw(res.data.Crop_Technology.name);
                this.causes = toRaw(res.data.Crop_Technology.causes);
                this.effects = toRaw(res.data.Crop_Technology.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeWeight1_techFactor() {
                this.weight1_tech = parseInt(this.weight1_techFactor);
                this.$emit('changeWeight1_techFactor', this.weight1_tech);
            },
            changeWeight2_techFactor(){
                this.weight2_tech = parseInt(this.weight2_techFactor * 100) / 100;
                this.$emit('changeWeight2_techFactor',this.weight2_tech);
            },
            changeWeight3_techFactor(){
                this.weight3_tech = parseInt(this.weight3_techFactor * 1000)/1000;
                this.$emit('changeWeight1_techFactor',this.weight3_tech);
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