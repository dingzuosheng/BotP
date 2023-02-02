<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div>
            Oil Use: {{ this.oilUse }} Exajoules
        </div>
        <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Oil Use = Use Rate * Energy Demand * Ave Energy Price / (Oil Price + Oil Tax)</div>
                    <br />
                    Where:<br />
                    <div>
                        <div class="row-formula">
                            <span>Use Rate</span> <span>= {{ oilUseRate }}</span> <span><input type="range" min="0.01" max="1.00" step="0.01" v-model="useRate" @change="changeOilUseRate"/></span>
                        </div>
                        <div class="row-formula">
                            <span>Energy Demand</span> <span>= {{ this.energyDemand}}</span> <span>(Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Ave Energy Price</span> <span>= {{ this.aveEnergyPrice }}</span> <span>($/Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Oil Price</span> <span>= {{ this.oilPrice}}</span> <span>($/Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Oil Tax</span> <span>= {{ this.oilTaxRate }}</span> <span>($/Exajoules)</span>
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
    timeout: 3000000000,
})
export default {
    name: 'OilUse',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            useRate: 0.600,
            oilUseRate: 0.600,
        }
    },
    props: {
        oilUse: Number,
        oilTaxRate: Number,
        oilPrice: Number,
        oilTaxRate: Number,
        energyDemand:Number,
        aveEnergyPrice:Number
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Oil_Use.name);
            this.causes = toRaw(res.data.Oil_Use.causes);
            this.effects = toRaw(res.data.Oil_Use.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeOilUseRate() {
            this.oilUseRate = parseInt(this.useRate * 100) / 100;
            this.$emit('changeOilUseRate', this.oilUseRate);
        }
    }
}
</script>

<style>

</style>
