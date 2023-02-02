<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div>
            Oil Price: {{ this.oilPrice }} $/Exajoules
        </div>
        <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Oil Price = Oil Price Factor * Oil Use / Oil Supply</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Oil Price Factor</span> <span>= {{ oilPriceFactor }} billion</span> <span><input type="range" min="100" max="10000" step="100" v-model="factor" @change="changeOilPriceFactor" /></span>
                        </div>
                        <div class="row-formula">
                            <span>Oil Use</span> <span>= {{ this.oilUse }}</span> <span>(Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Oil Supply</span> <span>= {{ this.oilSupply/1000 }} thousand</span> <span>(Exajoules)</span>
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
    name: 'OilPrice',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            factor:1000,
            oilPriceFactor:1000,
        }
    },
    props:{
        oilPrice:Number,
        oilUse:Number,
        oilSupply:Number,
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Oil_Price.name);
            this.causes = toRaw(res.data.Oil_Price.causes);
            this.effects = toRaw(res.data.Oil_Price.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeOilPriceFactor(){
            this.oilPriceFactor = parseInt(this.factor) * Math.pow(10,9);
            this.$emit('changeOilPriceFactor',this.oilPriceFactor);
        }
    }
}
</script>

<style>

</style>
