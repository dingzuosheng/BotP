<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!this.show">
            Energy Demand: {{ this.energyDemand }} Exajoules
            <!-- Hier gibt es noch ein Problem, weil der Wert gerade nicht generieren kann-->
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Energy Demand = 1.01 * Energy Demand</div>
                        <br>
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Energy Demand</span> <span>= {{ this.energyDemand }}</span><span>(Exajoules)</span>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div v-if="this.show">
            <!-- <canvas id="energyDemandChart" width="800" height="800"></canvas> -->
            <LineChartEnergyDemand :chartData="chartData" :key="chartKey"></LineChartEnergyDemand>
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
//import Chart from 'chart.js/auto'
import LineChartEnergyDemand from '../chart/LineChartEnergyDemand.vue'
export default {
    name: 'Coal Use',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            chartData:{
                labels:[],
                datasets:[] 
            }, 
            chartKey:0
        }
    },
    props: {
        energyDemand: Number,
        show:Boolean,
        executed:Number
    },
    components: { LineChartEnergyDemand },
    watch: {
        executed(newVal, oldVal) {
            console.log("watch:"+newVal, oldVal)
            this.draw();
            this.chartKey++;
        }
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Energy_Demand.name);
            this.causes = toRaw(res.data.Energy_Demand.causes);
            this.effects = toRaw(res.data.Energy_Demand.effects);
        });
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        draw(){
            const labels = [];
            for(let i = localStorage.length - 1; i > -1; i--){
                labels.push(localStorage.key(i));
            }
            labels.sort();
            this.chartData.labels =  labels;
            const energyDemands = [];
            
            for(let i = 0; i < labels.length; i++){
                energyDemands.push(JSON.parse(localStorage.getItem(labels[i])).energyDemand)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Energy Demand(Unit: Exajoules)',
                backgroundColor:'#38A700',
                data: energyDemands
            }
            this.chartData.datasets = [dataset];
            console.log(JSON.stringify(this.chartData))
        }
    }
}
</script>

<style>

</style>
