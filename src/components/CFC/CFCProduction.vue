<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                CFC Production: {{ Math.floor(this.cfcProduction / Math.pow(10,3)*100)/100 }} thousand tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>CFC Production = Use Rate * Materials Demand / (Cost to Produce + Tax Effect * CFC Tax)</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Use Rate</span> <span>= {{ Math.floor(useRate_cfcPro * 10000)/10000 }}</span> <span><input type="range" min="0.001" max="0.1" step="0.0001" v-model="useRateFactor" @change="changeUseRateFactorCFCPro" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Cost to Produce</span> <span>= {{ Math.floor(costToProduce_cfcPro) }}</span> <span><input type="range" min="1000" max="10000" step="10" v-model="costFactor" @change="changeCostToProduceFactorCFCPro"/>($/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Tax Effect</span> <span>= {{ Math.floor(taxEffect_cfcPro * 100)/100 }}</span> <span><input type="range" min="1" max="10" step="0.01" v-model="taxEffectRate" @change="changeTaxEffectRateCFCPro"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Materials Demand</span> <span>= {{ Math.floor(this.materialsDemand / Math.pow(10,9)*100)/100}} billion</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>CFC Tax</span> <span>= {{ Math.floor(this.cfcTax * 100)/100 }} </span> <span>($/ton)</span>
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
        name: 'CFCProduction',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                useRate_cfcPro:0.00880,
                useRateFactor:0.00880,
                costToProduce_cfcPro:2000,
                costToProduceFactor:2000,
                taxEffectRate:5.00,
                taxEffect_cfcPro:5.00,
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
            cfcProduction:Number,
            cfcTax:Number,
            materialsDemand: Number,
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
                this.name = toRaw(res.data.CFC_Production.name);
                this.causes = toRaw(res.data.CFC_Production.causes);
                this.effects = toRaw(res.data.CFC_Production.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeUseRateFactorCFCPro() {
                this.useRate_cfcPro = parseInt(this.useRateFactor * 10000) / 10000;
                this.$emit('changeUseRateFactorCFCPro', this.useRate_cfcPro);
            },
            changeCostToProduceFactorCFCPro(){
                this.costToProduce_cfcPro = parseInt(this.costToProduceFactor);
                this.$emit('changeCostToProduceFactorCFCPro',this.costToProduce_cfcPro);
            },
            changeTaxEffectRateCFCPro(){
                this.taxEffect_cfcPro = parseInt(this.taxEffectRate * 100)/100;
                this.$emit('changeTaxEffectRateCFCPro',this.taxEffect_cfcPro);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).cfcProduction)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'CFC Production (Unit: thousand tons)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>