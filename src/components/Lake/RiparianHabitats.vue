<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Riparian Habitats: {{ Math.floor(this.riparianHabitats / Math.pow(10,3) * 100) / 100 }} thousand species
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Riparian Habitats = Initial Riparian Habitats - Damage Rate of Dams * Dam Use</div>
                            <br/>
                            Where:<br/>
                            <div>
                                <div class="row-formula">
                                    <span>Initial Riparian Habitats</span><span>= {{ Math.floor(initialRiparianHabitats / Math.pow(10,3) * 100)/100 }} thousand</span> <span><input type="range" min="400000" max="600000" step="1000" v-model="initialRiparianHabitatsFactor" @change="changeInitialRiparianHabitatsFactor"/>(species)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Damage Rate of Dams</span> <span>= {{ Math.floor(damageRateOfDams * 100)/100 }}</span> <span><input type="range" min="100" max="1000" step="100" v-model="damageRateOfDamsFactor" @change="changeDamageRateOfDamsFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Dam Use</span> <span>= {{ Math.floor(this.damUse*100)/100 }}</span> <span>(Exajoules)</span>
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
        name: 'LakeAcidity',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                initialRiparianHabitats:500*Math.pow(10,3),
                initialRiparianHabitatsFactor:500*Math.pow(10,3),
                damageRateOfDams:500,
                damageRateOfDamsFactor:500,
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
            riparianHabitats:Number,
            damUse:Number,
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
                this.name = toRaw(res.data.Lake_Acidity.name);
                this.causes = toRaw(res.data.Lake_Acidity.causes);
                this.effects = toRaw(res.data.Lake_Acidity.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeInitialRiparianHabitatsFactor() {
                this.initialRiparianHabitats = parseInt(this.initialRiparianHabitatsFactor);
                this.$emit('changeInitialRiparianHabitatsFactor', this.initialRiparianHabitats);
            },
            changeDamageRateOfDamsFactor(){
                this.damageRateOfDams = parseInt(this.damageRateOfDamsFactor);
                this.$emit('changeDamageRateOfDamsFactor',this.damageRateOfDams);
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).riparianHabitats/Math.pow(10,3)*100)/100)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Riparian Habitats (Unit: thousand species)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>