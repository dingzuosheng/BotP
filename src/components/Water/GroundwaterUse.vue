<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Groundwater Use: {{ Math.floor(this.groundwaterUse / Math.pow(10,12)*100)/100 }} trillion tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Groundwater Use = C1 * (Groundwater Supply - Land Abuse * Contamination) / Sqrt(Ave Energy Price)</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>C1</span> <span>= {{ Math.floor(c1GroundwaterUse * 100)/100 }}</span> <span><input type="range" min="10.0" max="1000" step="0.1" v-model="c1" @change="changeC1GroundwateerUse" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Contamination</span> <span>= {{ Math.floor(contamination/Math.pow(10,6) * 10000)/10000 }} million</span> <span><input type="range" min="100000" max="100000000" step="100000" v-model="contaminationFactor" @change="changeContaminationFactor" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Groundwater Supply</span> <span>= {{ Math.floor(this.groundwaterSupply / Math.pow(10,12) * 100)/100 }} trillion</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Land Abuse</span> <span>= {{ Math.floor(this.landAbuse / Math.pow(10,6) * 100)/100 }} million</span> <span>(hectares)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Ave Energy Price</span> <span>= {{ Math.floor(this.aveEnergyPrice / Math.pow(10,9) * 100)/100 }} billion</span> <span>($/Exajoule)</span>
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
        name: 'GroundwaterUse',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                c1GroundwaterUse:84.1,
                c1:84.1,
                contamination:5*Math.pow(10,6),
                contaminationFactor:5*Math.pow(10,6),
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
            groundwaterSupply:Number,
            landAbuse:Number,
            aveEnergyPrice:Number,
            groundwaterUse:Number,
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
                this.name = toRaw(res.data.Groundwater_Use.name);
                this.causes = toRaw(res.data.Groundwater_Use.causes);
                this.effects = toRaw(res.data.Groundwater_Use.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeC1GroundwateerUse() {
                this.c1GroundwaterUse = parseInt(this.c1 * 100) / 100;
                this.$emit('changeC1GroundwateerUse', this.c1GroundwaterUse);
            },
            changeContaminationFactor(){
                this.contamination = parseInt(this.contaminationFactor * 10000)/10000;
                this.$emit('changeContaminationFactor',this.contamination);
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
                    data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).groundwaterUse/Math.pow(10,12)*100)/100)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Groundwater Use (Unit: trillion tons)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>