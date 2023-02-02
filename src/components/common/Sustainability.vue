<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div> 
            <div>
                Sustainability: {{ this.sustainability }} Permenence
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Sustainability = Renewable Energy * (4 - Birth Rate) / (Renewable Energy + Nonrenewable Energy)</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Renewable Energy</span> <span>= {{ this.solarUse + this.damUse }} (Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Birth Rate</span> <span>= {{ this.birthRate * 100 }} %</span>
                        </div>
                        <div class="row-formula">
                            <span>Nonrenewable Energy</span> <span>= {{ this.nonrenewableEnergy }} (Exajoules)</span>
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
import {toRaw} from '@vue/reactivity'
import axios from 'axios'
const service = axios.create({
    baseURL:'',
    timeout:30000,
})
export default {
    name:'Sustainability',
    data(){
        return{
            name:"",
            causes:[],
            effects:[]
        }
    },
    props:{
        sustainability:Number,
        solarUse:Number,
        damUse:Number,
        nonrenewableEnergy:Number,
        birthRate:Number,
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Sustainability.name);
            this.causes = toRaw(res.data.Sustainability.causes);
            this.effects = toRaw(res.data.Sustainability.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        }
    }
}
</script>
<style>

</style>