<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Ozone: {{ Math.floor(this.ozone / Math.pow(10,9) * 100) / 100 }} billion tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Ozone = Equilibrium Ozone - CFC Killer Rate * Stratospheric CFC</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Equilibrium Ozone</span> <span>= {{ Math.floor(equilibriumOzone / Math.pow(10,9) * 100)/100 }} billion</span> <span><input type="range" min="1000000000" max="10000000000" step="1000000000" v-model="equilibriumOzoneFactor" @change="changeEquilibriumOzoneFactor"/>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>CFC Killer Rate</span> <span>= {{ Math.floor(cfcKillerRate / Math.pow(10,3) * 100)/100 }} thousand</span> <span><input type="range" min="100" max="10000" step="10" v-model="cfcKillerRateFactor" @change="changeCFCKillerRateFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Stratospheric CFCs</span> <span>= {{ Math.floor(this.stratosphericCFCs / Math.pow(10,3)*100)/100}} thousand</span> <span>(tons)</span>
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
        name: 'Ozone',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                equilibriumOzone:5*Math.pow(10,9),
                equilibriumOzoneFactor:5*Math.pow(10,9),
                cfcKillerRate:5000,
                cfcKillerRateFactor:5000,
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
            ozone:Number,
            stratosphericCFCs:Number,
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
                this.name = toRaw(res.data.Ozone.name);
                this.causes = toRaw(res.data.Ozone.causes);
                this.effects = toRaw(res.data.Ozone.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeEquilibriumOzoneFactor() {
                this.equilibriumOzone = parseInt(this.equilibriumOzoneFactor);
                this.$emit('changeEquilibriumOzoneFactor', this.equilibriumOzone);
            },
            changeCFCKillerRateFactor() {
                this.cfcKillerRate = parseInt(this.cfcKillerRateFactor);
                this.$emit('changeCFCKillerRateFactor', this.cfcKillerRate);
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