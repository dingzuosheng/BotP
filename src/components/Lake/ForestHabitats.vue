<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Forest Habitats: {{ Math.floor(this.forestHabitats / Math.pow(10,6) * 100) / 100 }} million species
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Forest Habitats = Proportionality Constant * Sqrt( Forest Land)</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Proportionality Constant</span> <span>= {{ Math.floor(proportionalityConstant * 10)/10 }}</span> <span><input type="range" min="10" max="100" step="0.1" v-model="proportionalityConstantFactor" @change="changeProportionalityConstantFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Forest Land</span> <span>= {{ Math.floor(this.forestLand / Math.pow(10,9)*100)/100}} billion </span> <span>(hectares)</span>
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
        name: 'ForestHabitats',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                proportionalityConstant:33.5,
                proportionalityConstantFactor:33.5,
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
            forestHabitats:Number,
            forestLand:Number,
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
                this.name = toRaw(res.data.Forest_Habitats.name);
                this.causes = toRaw(res.data.Forest_Habitats.causes);
                this.effects = toRaw(res.data.Forest_Habitats.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeProportionalityConstantFactor() {
                this.proportionalityConstant = parseInt(this.proportionalityConstantFactor * 10)/10;
                this.$emit('changeProportionalityConstantFactor', this.proportionalityConstant);
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).forestHabitats/Math.pow(10,6)))
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Forest Habitats (Unit: million species)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>