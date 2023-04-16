<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Housing: {{ Math.floor(this.housing / Math.pow(10,9)*100)/100 }} billion Dwellings
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Housing = Wood Requirements * Logging + Scale Factor * Industiral Output</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Wood Requirements</span> <span>= {{ Math.floor(woodRequirements * 10)/10 }}</span> <span><input type="range" min="10" max="100" step="0.1" v-model="woodRequirementsFactor" @change="changeWoodRequirementsFactor" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Scale Factor</span> <span>= {{ Math.floor(scaleFactorHousing * 100000)/100000 }}</span> <span><input type="range" min="0.00001" max="0.001" step="0.00001" v-model="scaleFactor" @change="changeHousingScaleFactor" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Logging</span> <span>= {{ Math.floor(this.logging / Math.pow(10,6) * 100)/100 }} million</span> <span>(hectares)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Industrial Output</span> <span>= {{ Math.floor(this.industrialOutput / Math.pow(10,12) * 100)/100 }} trillion</span> <span>(stuff)</span>
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
        name: 'Housing',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                woodRequirements:25.0,
                woodRequirementsFactor:25.0,
                scaleFactorHousing:1.2*Math.pow(10,-4),
                scaleFactor:1.2*Math.pow(10,-4),
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
            housing:Number,
            logging:Number,
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
                this.name = toRaw(res.data.Housing.name);
                this.causes = toRaw(res.data.Housing.causes);
                this.effects = toRaw(res.data.Housing.effects);
            })    
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeWoodRequirementsFactor() {
                this.woodRequirements = parseInt(this.woodRequirementsFactor * 10) / 10;
                this.$emit('changeWoodRequirementsFactor', this.woodRequirements);
            },
            changeHousingScaleFactor() {
                this.scaleFactorHousing = parseInt(this.scaleFactor * 100000) / 100000;
                this.$emit('changeHousingScaleFactor', this.scaleFactorHousing);
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