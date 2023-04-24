<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Recycled Aluminum: {{ Math.floor(this.recycledAluminum / Math.pow(10,6) * 100) / 100 }} million tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Recycled Aluminum = Aluminum Recycling * Recycling Center $ </div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Aluminum Recycling</span> <span>= {{ aluminumRecycling }}</span> <span><input type="range" min="0.0001" max="0.01" step="0.0001" v-model="aluminumRecyclingFactor" @change="changeAluminumRecyclingFactor"/>(tons/$)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Recycling Center $</span> <span>= {{ Math.floor(this.recyclingCenterBudget / Math.pow(10,9)*100)/100}} billion</span> <span>($)</span>
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
        name: 'RecycledAluminum',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                aluminumRecycling: 0.00173,
                aluminumRecyclingFactor: 0.00173,
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
            recyclingCenterBudget:Number,
            recycledAluminum:Number,
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
                this.name = toRaw(res.data.Recycled_Aluminum.name);
                this.causes = toRaw(res.data.Recycled_Aluminum.causes);
                this.effects = toRaw(res.data.Recycled_Aluminum.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeAluminumRecyclingFactor() {
                this.aluminumRecycling = parseInt(this.aluminumRecyclingFactor * 10000) / 10000;
                this.$emit('changeAluminumRecyclingFactor', this.aluminumRecycling);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).recycledAluminum)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Recycled Aluminum (Unit: million tons)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>