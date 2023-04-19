<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Lake Habitats: {{ Math.floor(this.lakeHabitats / Math.pow(10,3) * 100) / 100 }} thousand species
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Lake Habitats = Virgin Lake Habitats / ((Natural Lake Acidity + Lake Acidity) * Destruction)</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Virgin Lake Habitats</span> <span>= {{ Math.floor(virginLakeHabitats / Math.pow(10,3) * 100)/100 }} thousand</span> <span><input type="range" min="100000" max="1000000" step="1000" v-model="virginLakeHabitatsFactor" @change="changeVirginLakeHabitatsFactor"/>species</span>
                                </div>
                                <div class="row-formula">
                                    <span>Natural Lake Acidity</span> <span>= {{ Math.floor(naturalLakeAcidity * 100000)/100000 }}</span> <span><input type="range" min="0.000001" max="0.0001" step="1000" v-model="naturalLakeAcidityFactor" @change="changeNaturalLakeAcidityFactor"/>tons</span>
                                </div>
                                <div class="row-formula">
                                    <span>Destruction</span> <span>= {{ Math.floor(destruction / Math.pow(10,3) * 100)/100 }} thousand</span> <span><input type="range" min="10000" max="1000000" step="1000" v-model="destructionFactor" @change="changeDestructionFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Lake Acidity</span> <span>= {{ Math.floor(this.lakeAcidity *1000000)/1000000}} </span> <span>(ouchies)</span>
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
        name: 'LakeHabitats',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                virginLakeHabitats:500*Math.pow(10,3),
                virginLakeHabitatsFactor:500*Math.pow(10,3),
                naturalLakeAcidity:5.0*Math.pow(10,-5),
                naturalLakeAcidityFactor:5.0*Math.pow(10,-5),
                destruction:20*Math.pow(10,3),
                destructionFactor:20*Math.pow(10,3),
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
            lakeHabitats:Number,
            lakeAcidity:Number,
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
                this.name = toRaw(res.data.Lake_Habitats.name);
                this.causes = toRaw(res.data.Lake_Habitats.causes);
                this.effects = toRaw(res.data.Lake_Habitats.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeVirginLakeHabitatsFactor() {
                this.virginLakeHabitats = parseInt(this.virginLakeHabitatsFactor);
                this.$emit('changeVirginLakeHabitatsFactor', this.virginLakeHabitats);
            },
            changeNaturalLakeAcidityFactor(){
                this.naturalLakeAcidity = parseInt(this.naturalLakeAcidityFactor * Math.pow(10,6))/Math.pow(10,6);
                this.$emit('changeNaturalLakeAcidity',this.naturalLakeAcidity);
            },
            changeDestructionFactor(){
                this.destruction = parseInt(this.destruction);
                this.$emit('changeDestructionFactor',this.destruction);
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