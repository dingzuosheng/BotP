<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Ultraviolet Light: {{ Math.floor(this.ultravioletLight  * 1000) / 1000 }} watts/sq m
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Ultraviolet Light = Solar UV / (Ozone Absorption * Ozone)</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Solar UV</span> <span>= {{ Math.floor(solarUV  * 100)/100 }}</span> <span><input type="range" min="10" max="100" step="0.1" v-model="solarUVFactor" @change="changeSolarUVFactor"/>(watts/m2)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Ozone Absorption</span> <span>= {{ Math.floor(ozoneAbsorption * 100000000)/100000000 }} </span> <span><input type="range" min="0.00000001" max="0.0000001" step="0.00000001" v-model="ozoneAbsorptionFactor" @change="changeOzoneAbsorptionFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Ozone</span><span>= {{ Math.floor(this.ozone / Math.pow(10,9)*100)/100}} billion</span> <span>(tons)</span>
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
        name: 'UltravioletLight',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                solarUV:50.0,
                solarUVFactor:50.0,
                ozoneAbsorption:2.5*Math.pow(10,-8),
                ozoneAbsorptionFactor:2.5*Math.pow(10,-8),
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
            ozone:Number,
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
                this.name = toRaw(res.data.Ultraviolet_Light.name);
                this.causes = toRaw(res.data.Ultraviolet_Light.causes);
                this.effects = toRaw(res.data.Ultraviolet_Light.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeSolarUVFactor() {
                this.solarUV = parseInt(this.solarUVFactor * 10)/10;
                this.$emit('changeSolarUVFactor', this.solarUV);
            },
            changeOzoneAbsorptionFactor() {
                this.ozoneAbsorption = parseInt(this.ozoneAbsorptionFactor * Math.pow(10,8)) / Math.pow(10,8);
                this.$emit('changeOzoneAbsorptionFactor', this.ozoneAbsorption);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).ultravioletLight)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Ultraviolet Light (Unit: watts/sq m)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>