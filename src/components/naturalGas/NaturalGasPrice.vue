<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div>
            Natural Gas Price: {{ this.naturalGasPrice / Math.pow(10,9)}} billion
        </div>
        <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Natural Gas Price = Natural Gas Price Factor * Natural Gas Use / Natural Gas Supply</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Natural Gas Price Factor</span> <span>= {{ naturalGasPriceFactor }}billion</span> <span><input type="range" min="100" max="10000" step="100" v-model="factor" @change="changeNaturalGasPriceFactor" /></span>
                        </div>
                        <div class="row-formula">
                            <span>Natural Gas Use</span> <span>= {{ this.naturalGasUse }}</span> <span>(Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Natural Gas Supply</span> <span>= {{ this.naturalGasSupply/1000 }} thousand</span> <span>(Exajoules)</span>
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
    name: 'NaturalGasPrice',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            factor:1000,
            naturalGasPriceFactor:1000,
        }
    },
    props:{
        naturalGasPrice:Number,
        naturalGasUse:Number,
        naturalGasSupply:Number
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Natural_Gas_Price.name);
            this.causes = toRaw(res.data.Natural_Gas_Price.causes);
            this.effects = toRaw(res.data.Natural_Gas_Price.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeNaturalGasPriceFactor(){
            this.naturalGasPriceFactor = parseInt(this.factor);
            this.$emit('changeNaturalGasPriceFactor',this.naturalGasPriceFactor);
        }
    }
}
</script>

<style>

</style>
