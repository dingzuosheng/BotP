<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Stratospheric CFCs: {{ Math.floor(this.stratosphericCFCs / Math.pow(10,6) * 100) / 100 }} million tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Stratospheric CFC = Equilibrium Constant * Tropospheric CFCs</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Equilibrium Constant</span> <span>= {{ Math.floor(equilibriumConstant * 10000)/10000 }}</span> <span><input type="range" min="0.001" max="0.1" step="0.0001" v-model="equilibriumConstantFactor" @change="changeEquilibriumConstantFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Tropospheric CFCs</span> <span>= {{ Math.floor(this.troposphericCFCs / Math.pow(10,6)*100)/100}} million</span> <span>(tons)</span>
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
        name: 'StratosphericCFCs',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                equilibriumConstant:0.01,
                equilibriumConstantFactor:0.01,
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
            stratosphericCFCs:Number,
            troposphericCFCs:Number,
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
                this.name = toRaw(res.data.Stratospheric_CFCs.name);
                this.causes = toRaw(res.data.Stratospheric_CFCs.causes);
                this.effects = toRaw(res.data.Stratospheric_CFCs.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeEquilibriumConstantFactor() {
                this.equilibriumConstant = parseInt(this.equilibriumConstantFactor * 10000) / 10000;
                this.$emit('changeEquilibriumConstantFactor', this.equilibriumConstant);
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