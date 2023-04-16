<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Reservoir Capacity: {{ Math.floor(this.reservoirCapacity / Math.pow(10,9)*100)/100 }} billion tons
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Reservoir Capacity = Capacity per Dam * Dam Use</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Capacity per Dam</span> <span>= {{ Math.floor(capacityPerDam/Math.pow(10,9) * 100)/100 }} billion</span> <span><input type="range" min="1000000000" max="10000000000" step="10000000" v-model="capacity" @change="changeCapacityPerDam" />(tons/Exajoule)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Dam Use</span> <span>= {{ Math.floor(this.damUse * 100)/100 }} </span> <span>(Exajoules)</span>
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
                capacityPerDam:5.56*Math.pow(10,9),
                capacity:5.56*Math.pow(10,9),
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
            reservoirCapacity:Number,
            damUse:Number,
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
                this.name = toRaw(res.data.Reservoir_Capacity.name);
                this.causes = toRaw(res.data.Reservoir_Capacity.causes);
                this.effects = toRaw(res.data.Reservoir_Capacity.effects);
            })
            
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeCapacityPerDam() {
                this.capacityPerDam = parseInt(this.capacity * 100) / 100;
                this.$emit('changeCapacityPerDam', this.capacityPerDam);
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