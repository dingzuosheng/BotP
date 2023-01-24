<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div>
            Solar Energy Price: {{ this.solarPrice }}
        </div>
        <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Solar Energy Price = Solar Energy Use / (Solar Energy Potential * Solar Technology)</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Solar Energy Potential</span> <span>= {{ solarEnergyPotential }}</span> <span><input type="range" min="0.00000000001" max="0.00000001" step="0.00000000001" v-model="potential" @change="changeSolarEnergyPotential" /></span>
                        </div>
                        <div class="row-formula">
                            <span>Solar Energy Use</span> <span>= {{ this.solarUse }}</span> <span>(Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Solar Technology</span> <span>= {{ this.solarTechnology }}</span> <span>(Whizbangs)</span>
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
    name: 'SolarEnergyPrice',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            potential:0.00000000001,
            solarEnergyPotential:0.00000000001,
        }
    },
    props:{
        solarUse:Number,
        solarTechnology:Number,
        solarPrice:Number
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Solar_Energy_Price.name);
            this.causes = toRaw(res.data.Solar_Energy_Price.causes);
            this.effects = toRaw(res.data.Solar_Energy_Price.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeSolarEnergyPotential(){
            this.solarEnergyPotential = parseInt(this.potential * Math.pow(10,11))/Math.pow(10,11);
            this.$emit('changeSoalrEnergyPotential',this.solarEnergyPotential);
        }
    }
}
</script>

<style>

</style>
