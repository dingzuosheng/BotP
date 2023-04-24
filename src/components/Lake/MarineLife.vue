<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Marine Life: {{ Math.floor(this.marineLife / Math.pow(10,9) * 100) / 100 }} billion tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Marine Life = Pyramid Factor * Phytoplankton - Seafood - P Toxicity * Pesticide Use - Oil Toxicity * Oil Spills</div>
                            <br/>
                            Where:<br/>
                            <div>
                                <div class="row-formula">
                                    <span>Pyramid Factor</span><span>= {{ Math.floor(pyramidFactor * 100)/100 }}</span> <span><input type="range" min="1" max="2" step="0.01" v-model="pyramid" @change="changePyramidFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>P Toxicity</span> <span>= {{ pToxicity }}</span> <span><input type="range" min="10" max="1000" step="10" v-model="pToxicityFactor" @change="changePToxicityFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Oil Toxicity</span> <span>= {{ oilToxicity }}</span> <span><input type="range" min="10" max="1000" step="10" v-model="oilToxicityFactor" @change="changeOilToxicityFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Phytoplankton</span> <span>= {{ Math.floor(this.phytoplankton / Math.pow(10,9) *100)/100 }} billion</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Seafood</span> <span>= {{ Math.floor(this.seafood / Math.pow(10,6) *100)/100 }} million</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Pesticide Use</span> <span>= {{ Math.floor(this.pesticideUse / Math.pow(10,6) *100)/100 }} million</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Oil Spills</span> <span>= {{ Math.floor(this.oilSpills / Math.pow(10,6) *100)/100 }} million</span> <span>(tons)</span>
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
        name: 'MarineLife',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                pyramidFactor:1.30,
                pyramid:1.30,
                pToxicity:100,
                pToxicityFactor:100,
                oilToxicity:10.0,
                oilToxicityFactor:10.0,
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
            marineLife:Number,
            phytoplankton:Number,
            seafood:Number,
            pesticideUse:Number,
            oilSpills:Number,
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
                this.name = toRaw(res.data.Marine_Life.name);
                this.causes = toRaw(res.data.Marine_Life.causes);
                this.effects = toRaw(res.data.Marine_Life.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changePyramidFactor() {
                this.pyramidFactor = parseInt(this.pyramid*100)/100;
                this.$emit('changeInitialRiparianHabitatsFactor', this.pyramidFactor);
            },
            changePToxicityFactor(){
                this.pToxicity = parseInt(this.pToxicityFactor);
                this.$emit('changePToxicityFactor',this.pToxicity);
            },
            changeOilToxicityFactor(){
                this.oilToxicity = parseInt(this.oilToxicityFactor);
                this.$emit('changeOilToxicityFactor',this.oilToxicity);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).marineLife)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Marine Life (Unit: billion tons)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>