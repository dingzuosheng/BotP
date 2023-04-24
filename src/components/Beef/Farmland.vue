<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Farm Land: {{ Math.floor(this.farmLand / Math.pow(10,9)*100)/100 }} billion hectares
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Farm Land = Farm Land + Forest Clearing * Value of Cleared Land</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Value of Cleared Land</span> <span>= {{ valueOfClearedLand }}</span> <span><input type="range" min="0" max="1" step="0.001" v-model="valueOfClearedLandRate" @change="changeValueOfClearedLandRate"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Farm Land</span> <span>= {{ Math.floor(this.farmLand / Math.pow(10,9)*100)/100}} billion</span> <span>(hectares)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Forest Clearing</span> <span>= {{ Math.floor(this.forestClearing / Math.pow(10,6)*100)/ 100}} million </span> <span>(hectares)</span>
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
        name: 'FarmLand',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                valueOfClearedLand:0.1,
                valueOfClearedLandRate:0.1,
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
            farmLand:Number,
            forestClearing:Number,
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
                this.name = toRaw(res.data.Farm_Land.name);
                this.causes = toRaw(res.data.Farm_Land.causes);
                this.effects = toRaw(res.data.Farm_Land.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeValueOfClearedLandRate() {
                this.valueOfClearedLand = parseInt(this.valueOfClearedLandRate * 1000) / 1000;
                this.$emit('changeValueOfClearedLandRate', this.valueOfClearedLand);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).farmLand)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Farm Land (Unit: billion hectares)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>