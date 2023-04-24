<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                Lake Acidity: {{ Math.floor(this.lakeAcidity * 1000000) / 1000000 }} ouchies
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Lake Acidity = (Lake Acidty * Lake Water + Acid Rain) * Purge Rate</div>
                            <br/>
                            Where:<br />
                            <div>
                                <div class="row-formula">
                                    <span>Lake Water</span><span>= {{ Math.floor(lakeWater / Math.pow(10,12) * 100)/100 }} trillion</span> <span><input type="range" min="10000000000000" max="1000000000000000" step="1000000000000" v-model="lakeWaterFactor" @change="changeLakeWaterFactor"/>(tons)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Purge Rate</span> <span>= {{ Math.floor(purgeRate * 100000)/100000 }}</span> <span><input type="range" min="0" max="1" step="0.001" v-model="purgeRateFactor" @change="changePurgeRateFactor"/></span>
                                </div>
                                <div class="row-formula">
                                    <span>Lake Acidity</span> <span>= {{ Math.floor(this.lakeAcidity * 1000000)/1000000 }}</span> <span>(ouchies)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Acid Rain</span> <span>= {{ Math.floor(this.acidRain / Math.pow(10,6) * 1000000)/1000000}} million</span> <span>(tons)</span>
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
        name: 'LakeAcidity',
        data() {
            return {
                name:"",
                causes: [],
                effects: [],
                lakeWater:230*Math.pow(10,12),
                lakeWaterFactor:230*Math.pow(10,12),
                purgeRate:0.950,
                purgeRateFactor:0.950,
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
            acidRain:Number,
            lakeAcidity:Number,
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
                this.name = toRaw(res.data.Lake_Acidity.name);
                this.causes = toRaw(res.data.Lake_Acidity.causes);
                this.effects = toRaw(res.data.Lake_Acidity.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeLakeWaterFactor() {
                this.lakeWater = parseInt(this.lakeWaterFactor);
                this.$emit('changeLakeWaterFactor', this.lakeWater);
            },
            changePurgeRateFactor(){
                this.purgeRate = parseInt(this.purgeRateFactor * Math.pow(10,3))/Math.pow(10,3);
                this.$emit('changePurgeRateFactor',this.purgeRate);
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
                    data.push(JSON.parse(localStorage.getItem(labels[i])).lakeAcidity)
                    console.log(labels[i],localStorage.key(i))
                }
                const dataset = {
                    label:'Lake Acidity (Unit: ouchies)',
                    backgroundColor:'orange',
                    data: data
                }
                this.chartData.datasets = [dataset];
                console.log(JSON.stringify(this.chartData))
            }
        }
    }
    </script>