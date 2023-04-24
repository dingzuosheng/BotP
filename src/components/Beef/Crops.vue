<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Crops: {{ Math.floor(this.crops / Math.pow(10,9)*100)/100 }} billion tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Crops = Crop Yields * Farm Land - Beef Grain Consumption * Beef Production</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Beef Grain Consumption</span> <span>= {{ beefGrainConsumption }}</span> <span><input type="range" min="1.0" max="20.0" step="0.1" v-model="beefGrainConsumptionRate" @change="changeBeefGrainConsumptionRate"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Crop Yields</span> <span>= {{ Math.floor(this.cropYields * 100) / 100}} </span> <span>(tons/hectare)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Farm Land</span> <span>= {{ Math.floor(this.farmLand / Math.pow(10,9)*100)/100}} billion</span> <span>(hectares)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Beef Production</span> <span>= {{ Math.floor(this.beefProduction / Math.pow(10,6)*100)/ 100}} million </span> <span>(tons)</span>
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
        name: 'Crops',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                beefGrainConsumption:5.0,
                beefGrainConsumptionRate:5.0,
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
            crops:Number,
            cropYields:Number,
            beefProduction:Number,
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
                this.name = toRaw(res.data.Crops.name);
                this.causes = toRaw(res.data.Crops.causes);
                this.effects = toRaw(res.data.Crops.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeBeefGrainConsumptionRate() {
                this.beefGrainConsumption = parseInt(this.beefGrainConsumptionRate * 10) / 10;
                this.$emit('changeBeefGrainConsumptionRate', this.beefGrainConsumption);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).crops)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Crops (Unit: billion tons)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>