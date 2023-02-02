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
                                <span>Energy Demand</span> <span>= {{ this.energyDemand }} (Exajoules)</span>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div v-if="this.show">
            <h1>{{ this.show }}</h1>
            <canvas id="energyDemandChart" width="800" height="800"></canvas>
        </div>
    </div>
    <div class="side-nav">
        <div>
            <h2>Causes</h2>
            <div v-if="this.causes">
                <div v-for="cause in this.causes" :key="cause.name">
                    <button @click="toPage(cause)">{{ cause.name }}</button>
                </div>
            </div>
        </div>
        <div>
            <h2>Effects</h2>
            <div v-if="this.effects">
                <div v-for="effect in this.effects" :key="effect.name">
                    <button @click="toPage(effect)">{{ effect.name }}</button>
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
import Chart from 'chart.js/auto'
export default {
    name: 'Coal Use',
    data() {
        return {
            name: "",
            causes: [],
            effects: []
        }
    },
    props: {
        energyDemand: Number,
        show:Boolean
    },
    mounted() {
        const ctx = document.getElementById('energyDemandChart');
        const labels = [1990];
        const data = {
            labels: labels,
            datasets: [{
                label: 'Energy Demand Dataset',
                data: [this.energyDemand],
                fill:false,
                borderCorlor:'rgb(75,192,192)',
                tension:0.1
            }]
        };
        const energyDemandChart = new Chart(ctx,{
            type:'bar',
            data:data
        });
        energyDemandChart;
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
        }
    }
}
</script>

<style>

</style>
