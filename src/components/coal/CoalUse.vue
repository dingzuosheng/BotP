<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div v-if="!show">
            Coal Use: {{ this.coalUse }} Exajoules
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Coal Use = Use Rate * Energy Demand * Ave Energy Price / (Coal Price + Coal Tax)</div>
                        <br />
                        Where:<br />
                        <div>
                            <div class="row-formula">
                                <span>Use Rate</span> <span>= {{ coalUserate }}</span> <span><input type="range" min="0.01" max="1.00" step="0.01" v-model="userate" @change="changeCoalUserate" /></span>
                            </div>
                            <div class="row-formula">
                                <span>Energy Demand</span> <span>= {{ this.energyDemand }}</span> <span>(Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Ave Energy Price</span> <span>= {{ this.aveEnergyPrice / Math.pow(10,9)}} billion</span> <span>($/Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Price</span> <span>= {{ this.coalPrice / Math.pow(10,9)}} billion</span> <span>($/Exajoules)</span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Tax</span> <span>= {{ this.coalTaxRate / Math.pow(10,9)}} billion</span> <span>($/Exajoules)</span>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <!-- <div v-if="show">
            <canvas id="coalUseChart" width="400" height="400"></canvas>
        </div> -->
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
            effects: [],
            userate: 0.257,
            coalUserate: 0.257,
        }
    },
    // mounted() {
    //     const ctx = document.getElementById('coalUseChart');
    //     const labels = [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050];
    //     const data = {
    //         labels: labels,
    //         datasets: [{
    //             label: 'Coal Use Dataset',
    //             data: [this.coalUse,1,2,3,4,5,6,7,7,8,9,10,11],
    //             fill:false,
    //             borderCorlor:'rgb(75,192,192)',
    //             tension:0.1
    //         }]
    //     };
    //     const coalUseChart = new Chart(ctx,{
    //         type:'bar',
    //         data:data
    //     });
    //     coalUseChart;
    // },
    props: {
        coalUse: Number,
        coalPrice: Number,
        coalTaxRate: Number,
        energyDemand: Number,
        aveEnergyPrice: Number,
        show:Boolean,
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Coal_Use.name);
            this.causes = toRaw(res.data.Coal_Use.causes);
            this.effects = toRaw(res.data.Coal_Use.effects);
        })
        
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeCoalUserate() {
            this.coalUserate = parseInt(this.userate * 100) / 100;
            this.$emit('changeCoalUseRate', this.coalUserate);
        }
    }
}
</script>

<style>
.main {
    height: 900px;
    display: grid;
    grid-template-columns: 65% 35%;
    grid-template-areas: "content side-nav";
}

.content {
    grid-area: "content";
    background-color: #E9EEF3;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.side-nav {
    grid-area: "side-nav";
    background-color: #D3DCE6;
    color: #333;
    padding: 50px;
}

.range {
    margin: 200px 400px;
}

.range input {
    width: 500px;
    height: 100px;
}

.el-collapse-item {
    font-size: 30px;
}

.formula {
    display: flex;
    flex-direction: column;
    padding: 50px;
    font-size: 20px;
}

.row-formula {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
}
</style>
