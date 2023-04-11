<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Desertification: {{ Math.floor(this.desertification / Math.pow(10,6)*100)/100 }} million hectares
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Desertification = (Fuelwood Use - Sustainable Fuelwood Use) * Damage Rate + Overgrazing</div>
                            <br />
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Sustainable Fuelwood Use</span> <span>= {{ Math.floor(sustainableFuelwoodUse/Math.pow(10,9)*100)/100 }} billion</span> <span><input type="range" min="0.1" max="10" step="0.1" v-model="sustainableFuelwoodUseRate" @change="changeSustainableFuelwoodUseRate" />(hectare)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Damage Rate</span> <span>= {{ this.damageRate }}</span> <span><input type="range" min="0.1" max="1.000" step="0.001" v-model="rate" @change="changeDamageRate" />(hectares/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Fuelwood Use</span> <span>= {{ Math.floor(this.fuelwoodUse / Math.pow(10,9)*100)/100}} billion</span> <span>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Overgrazing</span> <span>= {{ Math.floor(this.overgrazing / Math.pow(10,6)*100)/100}} million </span> <span>(hectares)</span>
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
        name: 'Desertification',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                sustainableFuelwoodUseRate:1.40 * Math.pow(10,9),
                sustainableFuelwoodUse:1.40 * Math.pow(10,9),
                rate:0.220,
                damageRate:0.220,
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
            desertification:Number,
            fuelwoodUse:Number,
            overgrazing:Number,
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
                this.name = toRaw(res.data.Desertification.name);
                this.causes = toRaw(res.data.Desertification.causes);
                this.effects = toRaw(res.data.Desertification.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeSustainableFuelwoodUseRate() {
                this.sustainableFuelwoodUse = parseInt(this.sustainableFuelwoodUseRate * Math.pow(10,9) * 10) / 10;
                this.$emit('changeSustainableFuelwoodUseRate', this.sustainableFuelwoodUse);
            },
            changeDamageRate(){
                this.damageRate = parseInt(this.rate * 1000)/1000;
                this.$emit('changeDamageRate',this.damageRate);
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