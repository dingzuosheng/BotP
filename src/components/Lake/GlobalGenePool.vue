<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Global Gene Pool: {{ Math.floor(this.globalGenePool / Math.pow(10,6)*100)/100 }} million species
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Global Gene Pool = Forest Habitats + C1 * Marine Life + Riparian Hbaitats + Lake Habitats</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>C1</span> <span>= {{ Math.floor(c1 * 10000000)/10000000 }}</span> <span><input type="range" min="0.00001" max="0.0001" step="0.00001" v-model="c1Factor" @change="changeC1GlobalGenePoolFactor"/>(Points/species)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Forest Habitats</span> <span>= {{ Math.floor(this.forestHabitats/ Math.pow(10,6) * 100)/100 }} million </span> <span>(species)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Marine Life</span> <span>= {{ Math.floor(this.marineLife/ Math.pow(10,9) * 100)/100 }} billion </span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Riparian Habitats</span> <span>= {{ Math.floor(this.riparianHabitats/ Math.pow(10,3) * 100)/100 }} thousand </span> <span>(species)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Lake Habitats</span> <span>= {{ Math.floor(this.lakeHabitats/ Math.pow(10,3) * 100)/100 }} thousand </span> <span>(species)</span>
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
        name: 'GlobalGenePool',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                c1:6.0*Math.pow(10,-5),
                c1Factor:6.0*Math.pow(10,-5),
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
            forestHabitats:Number,
            globalGenePool:Number,
            marineLife:Number,
            riparianHabitats:Number,
            lakeHabitats:Number,
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
                this.name = toRaw(res.data.Global_Gene_Pool.name);
                this.causes = toRaw(res.data.Global_Gene_Pool.causes);
                this.effects = toRaw(res.data.Global_Gene_Pool.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeC1GlobalGenePoolFactor() {
                this.c1 = parseInt(this.c1Factor * Math.pow(10,5))/Math.pow(10,5);
                this.$emit('changeC1GlobalGenePoolFactor', this.c1);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).globalGenePool)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Global Gene Pool (Unit: million species)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>