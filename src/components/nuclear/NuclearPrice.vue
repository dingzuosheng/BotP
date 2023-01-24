<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div>
            Nuclear Price: {{ this.nuclearPrice }}
        </div>
        <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Nuclear Price = Nuclear Price Factor * Nuclear Use / Nuclear Supply</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Nuclear Price Factor</span> <span>= {{ nuclearPriceFactor }}</span> <span><input type="range" min="100" max="1000000" step="100" v-model="factor" @change="changeNuclearPriceFactor" /></span>
                        </div>
                        <div class="row-formula">
                            <span>Nuclear Use</span> <span>= {{ this.nuclearUse }}</span> <span>(Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Nuclear Supply</span> <span>= {{ this.nuclearSupply }}</span> <span>(Exajoules)</span>
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
    name: 'NuclearPrice',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            factor:23000,
            nuclearPriceFactor:23000
        }
    },
    props:{
        nuclearPrice:Number,
        nuclearUse:Number,
        nuclearSupply:Number
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Nuclear_Price.name);
            this.causes = toRaw(res.data.Nuclear_Price.causes);
            this.effects = toRaw(res.data.Nuclear_Price.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeNuclearPriceFactor(){
            this.nuclearPriceFactor = parseInt(this.factor) * Math.pow(10,9);
            this.$emit('changeNuclearPriceFactor',this.nuclearPriceFactor);
        }
    }
}
</script>

<style>

</style>
