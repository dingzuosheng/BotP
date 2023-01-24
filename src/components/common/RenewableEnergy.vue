<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div>
            Renewable Energy: {{ this.solarUse + this.damUse }}
        </div>
        <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Renewable Energy = Solar Energy Use + Dam Use</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Solar Energy Use</span> <span>= {{ this.solarUse }}</span> <span>(Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Dam Use</span> <span>= {{ this.damUse }}</span> <span>(Exajoules)</span>
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
    name: 'RenewableEnergy',
    data() {
        return {
            name: "",
            causes: [],
            effects: []
        }
    },
    props:{
        solarUse:Number,
        damUse:Number
    },  
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Renewable_Energy.name);
            this.causes = toRaw(res.data.Renewable_Energy.causes);
            this.effects = toRaw(res.data.Renewable_Energy.effects);
        })
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
