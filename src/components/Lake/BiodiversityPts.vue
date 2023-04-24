<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Biodiversity Points: {{ Math.floor(this.biodiversityPoints / Math.pow(10,3) * 100) / 100 }} thousand points
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Ozone = Equilibrium Ozone - CFC Killer Rate * Stratospheric CFC</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Value of Biodiversity</span> <span>= {{ Math.floor(valueOfBiodiversity * 100000)/100000 }}</span> <span><input type="range" min="0.000001" max="0.01" step="0.000001" v-model="valueOfBiodiversityFactor" @change="changeValueOfBiodiversityFactor"/>(Points/species)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Global Gene Pool</span> <span>= {{ Math.floor(this.globalGenePool / Math.pow(10,6)*100)/100}} million </span> <span>(species)</span>
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
        name: 'BiodiversityPts',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                valueOfBiodiversity:2.0*Math.pow(10,-4),
                valueOfBiodiversityFactor:2.0*Math.pow(10,-4),
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
            biodiversityPoints:Number,
            globalGenePool:Number,
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
                this.name = toRaw(res.data.Biodiversity_Pts.name);
                this.causes = toRaw(res.data.Biodiversity_Pts.causes);
                this.effects = toRaw(res.data.Biodiversity_Pts.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeValueOfBiodiversityFactor() {
                this.valueOfBiodiversity = parseInt(this.valueOfBiodiversityFactor * Math.pow(10,6))/Math.pow(10,6);
                this.$emit('changeValueOfBiodiversityFactor', this.valueOfBiodiversity);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).biodiversityPoints)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Biodiversity Points (Unit: thousand points)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>