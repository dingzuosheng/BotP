<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Garbage: {{ Math.floor(this.grossGlobalProduction / Math.pow(10,12) * 100) / 100 }} trillion tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Recycled Aluminum = Aluminum Recycling * Recycling Center $ </div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Value of Industrial Output</span> <span>= {{ valueOfIndustrialOutput }}</span> <span><input type="range" min="1" max="10" step="0.01" v-model="valueOfIndustrialOutputFactor" @change="changeValueOfIndustrialOutputFactor"/>(tons/$)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Industrial Output</span> <span>= {{ Math.floor(this.industrialOutput / Math.pow(10,12)*100)/100}} trillion</span> <span>(stuff)</span>
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
        name: 'GrossGrlobalProduction',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                valueOfIndustrialOutput:3.69,
                valueOfIndustrialOutputFactor:3.69,
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
            grossGlobalProduction:Number,
            industrialOutput:Number,
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
                this.name = toRaw(res.data.Gross_Global_Production.name);
                this.causes = toRaw(res.data.Gross_Global_Production.causes);
                this.effects = toRaw(res.data.Gross_Global_Production.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeValueOfIndustrialOutputFactor() {
                this.valueOfIndustrialOutput = parseInt(this.valueOfIndustrialOutputFactor * 100) / 100;
                this.$emit('changeValueOfIndustrialOutputFactor', this.valueOfIndustrialOutput);
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).grossGlobalProduction/Math.pow(10,12)*100)/100)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Gross Global Production (Unit: trillion tons)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>