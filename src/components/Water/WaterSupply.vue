<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Water Supply: {{ Math.floor(this.waterSupply/ Math.pow(10,12) *100)/100 }}  trillion tons
                </div>
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Water Supply = Groundwater Use + Reservoir Capacity - Water Pollution</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Groundwater Use</span> <span>= {{ Math.floor(this.groundwaterUse/Math.pow(10,12)*100)/100 }} trillion</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Reservoir Capacity</span> <span>= {{ Math.floor(this.reservoirCapacity/Math.pow(10,9) * 100) / 100 }} billion</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Water Pollution</span> <span>= {{ Math.floor(this.waterPollution/Math.pow(10,9) * 100) / 100 }} billion</span> <span>(tons)</span>
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
    import BarChart from "../chart/BarChart.vue"
    export default {
        name: 'WaterSupply',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
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
            groundwaterUse:Number,
            reservoirCapacity:Number,
            waterPollution:Number,
            waterSupply:Number,
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
                this.name = toRaw(res.data.Water_Supply.name);
                this.causes = toRaw(res.data.Water_Supply.causes);
                this.effects = toRaw(res.data.Water_Supply.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).waterSupply/Math.pow(10,12)*100)/100)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Water Supply (Unit: trillion tons)',
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
    