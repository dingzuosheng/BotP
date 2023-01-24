<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div>
            Solar Use: {{ this.solarUse }} Exajoules
        </div>
        <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Solar Use = (Use Rate * Energy Demand * Ave Energy Price + Solar Energy $) / Solar Energy Price</div>
                    <br />
                    Where:<br />
                    <div>
                        <div class="row-formula">
                            <span>Use Rate</span> <span>= {{ solarUserate }}</span> <span><input type="range" min="0.01" max="1.00" step="0.01" v-model="userate" @change="changeSolarUseRate" /></span>
                        </div>
                        <div class="row-formula">
                            <span>Energy Demand</span> <span>= {{ this.energyDemand }}</span> <span>(Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Ave Energy Price</span> <span>= {{ this.aveEnergyPrice }}</span> <span>($/Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Solar Energy $</span> <span>= {{ this.solarEnergyTreasury}}</span> <span>($)</span>
                        </div>
                        <div class="row-formula">
                            <span>Solar Energy Price</span> <span>= {{ this.solarPrice}}</span> <span>($/Exajoules)</span>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
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
    timeout: 30000,
})
export default {
    name: 'SolarEnergyUse',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            userate:0.12,
            solarUserate:0.12,
        }
    },
    props:{
        solarPrice:Number,
        solarUse:Number,
        energyDemand:Number,
        solarEnergyTreasury:Number,
        aveEnergyPrice:Number
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Solar_Energy_Use.name);
            this.causes = toRaw(res.data.Solar_Energy_Use.causes);
            this.effects = toRaw(res.data.Solar_Energy_Use.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeSolarUseRate(){
            this.solarUserate = parseInt(this.userate * 100) / 100;
            this.$emit('changeSolarUseRate',this.solarUserate);
        }
    }
}
</script>

<style>

</style>
