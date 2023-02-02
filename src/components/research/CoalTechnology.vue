<template>
<div class="main">
    <div class="content">
        <div>
            <h1>{{ this.name }}</h1>
        </div>
        <div>
            Coal Technology: {{ this.coalTechnology }} Whizbangs
        </div>
        <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Coal Technology = Coal Technology + CoalTechnological Optimism * log(Coal Research $ * Basic Research $)</div>
                    <br />
                    Where:<br />
                    <div>
                        <div class="row-formula">
                            <span>Coal Optimism</span> <span>= {{ coalOptimism }}</span> <span><input type="range" min="0.0001" max="0.01" step="0.0001" v-model="optimism" @change="changeCoalOptimism" /></span>
                        </div>
                        <div class="row-formula">
                            <span>Coal Technology</span> <span>= {{ this.coalTechnology }}</span> <span>(Whizbangs)</span>
                        </div>
                        <div class="row-formula">
                            <span>Coal Research $</span> <span>= {{ this.coalResearchTreasury/Math.pow(10,9) }} billion</span> <span>($)</span>
                        </div>
                        <div class="row-formula">
                            <span>Basic Research $</span> <span>= {{ this.basicResearchTreasury/Math.pow(10,9) }} billion</span> <span>($)</span>
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
    name: 'CoalTechnology',
    data() {
        return {
            name: "",
            causes: [],
            effects: [],
            optimism:0.0012,
            coalOptimism:0.0012,
        }
    },
    props:{
        coalTechnology:Number,
        coalResearchTreasury:Number,
        basicResearchTreasury:Number,
    },
    created() {
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Coal_Technology.name);
            this.causes = toRaw(res.data.Coal_Technology.causes);
            this.effects = toRaw(res.data.Coal_Technology.effects);
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({
                path: item.path
            });
        },
        changeCoalOptimism(){
            this.coalOptimism = parseInt(this.optimism*10000)/10000;
            this.$emit('changeCoalOptimism',this.coalOptimism);
        }
    }
}
</script>

<style>

</style>
