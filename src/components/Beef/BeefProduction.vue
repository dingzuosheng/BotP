<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Beef Production: {{ Math.floor(this.beefProduction / Math.pow(10,9)*100)/100 }} billion tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Beef Production = Cow Factor * Grasslands / (Cost to Produce + Tax Effect * Beef Tax)</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Cow Factor</span> <span>= {{ cowFactor }}</span> <span><input type="range" min="50" max="200" step="0.5" v-model="cowFactorRate" @change="changeCowFactorRate" />($/hectare)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Cost to Produce</span> <span>= {{ this.costToProduce }}</span> <span><input type="range" min="200" max="1000" step="1" v-model="costToProduceRate" @change="changeCostToProduceRate" />(ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Tax Effect</span> <span>= {{ this.taxEffect }}</span> <span><input type="range" min="1" max="10" step="0.01" v-model="taxEffectRate" @change="changeTaxEffectRate" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Grasslands</span> <span>= {{ Math.floor(this.grasslands / Math.pow(10,9)*100)/100}} billion</span> <span>(hectares)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Beef Tax</span> <span>= {{ this.beefTaxRate }} </span> <span>($/ton)</span>
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
        name: 'Beef Production',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                cowFactorRate: 52.5,
                cowFactor: 52.5,
                costToProduceRate:600,
                costToProduce:600,
                taxEffectRate:4.00,
                taxEffect:4.00,
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
            beefProduction:Number,
            grasslands:Number,
            beefTaxRate:Number,
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
                this.name = toRaw(res.data.Beef_Production.name);
                this.causes = toRaw(res.data.Beef_Production.causes);
                this.effects = toRaw(res.data.Beef_Production.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeCowFactorRate() {
                this.cowFactor = parseInt(this.cowFactorRate * 10) / 10;
                this.$emit('changeCowFactorRate', this.cowFactor);
            },
            changeCostToProduceRate(){
                this.costToProduce = parseInt(this.costToProduceRate);
                this.$emit('changeCostToProduceRate',this.costToProduce);
            },
            changeTaxEffectRate(){
                this.taxEffect = parseInt(this.taxEffectRate * 100)/100;
                this.$emit('changeTaxEffectRate',this.taxEffect);
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