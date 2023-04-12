<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Forest Land: {{ Math.floor(this.forestLand / Math.pow(10,9)*100)/100 }} billion hectares
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Forest Land = Forest Land - Logging - Fuelwood Use * Wood - Forest Clearing - Acid Rain * Damage</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Wood</span> <span>= {{ wood }}</span> <span><input type="range" min="0.01" max="0.1" step="0.0001" v-model="woodRate" @change="changeWoodRate" />(hectares/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Damage</span> <span>= {{ this.damage }}</span> <span><input type="range" min="0.0001" max="0.1" step="0.0001" v-model="rate" @change="changeDamage" />(hectares/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Forest Land</span> <span>= {{ Math.floor(this.forestLand / Math.pow(10,9)*100)/100}} billion</span> <span>(hectares)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Logging</span> <span>= {{ Math.floor(this.logging / Math.pow(10,6)*100)/ 100}} million </span> <span>(hectares)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Fuelwood Use</span> <span>= {{ Math.floor(this.fuelwoodUse / Math.pow(10,9)*100)/ 100}} billion </span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Forest Clearing</span> <span>= {{ Math.floor(this.forestClearing / Math.pow(10,6)*100)/ 100}} million </span> <span>(hectares)</span>
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
        name: 'ForestLand',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                wood:0.05,
                woodRate:0.05,
                rate:0.02,
                damage:0.02,
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
            forestLand:Number,
            fuelwoodUse:Number,
            logging:Number,
            forestClearing:Number,
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
                this.name = toRaw(res.data.Forest_Land.name);
                this.causes = toRaw(res.data.Forest_Land.causes);
                this.effects = toRaw(res.data.Forest_Land.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeWoodRate() {
                this.wood = parseInt(this.woodRate * 10000) / 10000;
                this.$emit('changeWoodRate', this.wood);
            },
            changeDamage(){
                this.damage = parseInt(this.rate * 10000)/10000;
                this.$emit('changeDamage',this.damage);
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