<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Acid Rain: {{ Math.floor(this.acidRain / Math.pow(10,6) * 100) / 100 }} million tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Acid Rain = Sulfur Dioxide + Nitrous Dioxide</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Sulfur Dioxide</span> <span>= {{ Math.floor(this.so2/ Math.pow(10,6) * 100)/100 }} million</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Nitrous Dioxide</span> <span>= {{ Math.floor(this.no2 / Math.pow(10,6)*100)/100}} million </span> <span>(tons)</span>
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
        name: 'AcidRain',
        data() {
            return {
                name:"",
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
        props: {
            acidRain:Number,
            so2:Number,
            no2:Number,
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
                this.name = toRaw(res.data.Acid_Rain.name);
                this.causes = toRaw(res.data.Acid_Rain.causes);
                this.effects = toRaw(res.data.Acid_Rain.effects);
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).acidRain/Math.pow(10,6)*10)/10)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Acid Rain (Unit: million tons)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>