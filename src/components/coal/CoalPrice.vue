<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div>
            Coal Price: {{ this.coalPrice }} $/Exajoule
        </div>
        <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Coal Price = Coal Price Factor * Coal Use / Coal Supply</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Coal Price Factor</span> <span>= {{ coalPriceFactor }}</span> <span><input type="range" min="10" max="100" step="0.1" v-model="factor" @change="changeCoalPriceFactor" /></span>
                        </div>
                        <div class="row-formula">
                            <span>Coal Use</span> <span>= {{ this.coalUse }}</span> <span>(Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Coal Supply</span> <span>= {{ this.coalSupply }}</span> <span>(Exajoules)</span>
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
    name: 'Coal Price',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            factor: 10,
            coalPriceFactor: 10,
        }
    },
    props: {
        coalPrice:Number,
        coalUse: Number,
        coalSupply: Number,
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Coal_Price.name);
            this.causes = toRaw(res.data.Coal_Price.causes);
            this.effects = toRaw(res.data.Coal_Price.effects);
            console.log(this.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeCoalPriceFactor() {
            this.coalPriceFactor = parseInt(this.factor*10)/10 * Math.pow(10,12);
            this.$emit('changeCoalPriceFactor',this.coalPriceFactor);
        }
    }
}
</script>

<style>

</style>
