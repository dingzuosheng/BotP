<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Fuelwood Use: {{ Math.floor(this.fuelwoodUse / Math.pow(10,9)*100)/100 }} billion tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Fuelwood Use = Population * Demand per Capita - Wood Saved per $ * Wood Stove $</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Demand per Capita</span> <span>= {{ demandPerCapita }} </span> <span><input type="range" min="0.1" max="1" step="0.001" v-model="rate" @change="changeDemandPerCapitaRate" />(tons/capita)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Wood Saved per $</span> <span>= {{ this.woodSavedPerDollar }}</span> <span><input type="range" min="0.1" max="1.000" step="0.001" v-model="woodSavedPerDollarRate" @change="changeWoodSavedPerDollarRate" />(tons/$)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Population</span> <span>= {{ Math.floor(this.population / Math.pow(10,9)*100)/100}} billion</span> <span>(people)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Wood Stove $</span> <span>= {{ Math.floor(this.woodStoveDollar / Math.pow(10,9)*100)/100}} billion </span> <span>($)</span>
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
        name: 'FuelwoodUse',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                rate:0.346,
                demandPerCapita:0.346,
                woodSavedPerDollar:0.100,
                woodSavedPerDollarRate:0.100,
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
            fuelwoodUse:Number,
            population:Number,
            woodStoveDollar:Number,
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
                this.name = toRaw(res.data.Fuelwood_Use.name);
                this.causes = toRaw(res.data.Fuelwood_Use.causes);
                this.effects = toRaw(res.data.Fuelwood_Use.effects);
            })  
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeDemandPerCapitaRate() {
                this.demandPerCapita = parseInt(this.rate * 1000) / 1000;
                this.$emit('changeDemandPerCapitaRate', this.demandPerCapita);
            },
            changeWoodSavedPerDollarRate(){
                this.woodSavedPerDollar = parseInt(this.woodSavedPerDollarRate * 1000)/1000;
                this.$emit('changeWoodSavedPerDollarRate',this.woodSavedPerDollar);
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