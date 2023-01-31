<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div>
                Global Temperature: {{ this.globalTemperature }}
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Global Temperature = T0 + CO2 Eff * Carbon Dioxide</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>T0</span> <span>= {{ t0 }}</span> <span><input type="range" min="56" max="60" step="1" v-model="temperature" @change="changeTemperature" /> (degrees)</span>
                        </div>
                        <div class="row-formula">
                            <span>CO2 Eff</span> <span>= {{ co2Eff }}</span> <span><input type="range" min="1" max="50" step="1" v-model="eff" @change="changeCO2Eff" /> (degrees/tons)</span>
                        </div>
                        <div class="row-formula">
                            <span>CO2</span> <span>= {{ this.co2 }}</span>(tons)
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
    name:'GlobalTemperature',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            temperature:56,
            t0:56,
            eff:Math.pow(10,-13),
            co2Eff:Math.pow(10,-13),
        }
    },
    props:{
        globalTemperature:Number,
        co2:Number
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Global_Temperature.name);
            this.causes = toRaw(res.data.Global_Temperature.causes);
            this.effects = toRaw(res.data.Global_Temperature.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeTemperature(){
            this.t0 = parseInt(this.temperature);
            this.$emit('changeTemperatureT0',this.t0);
        },
        changeCO2Eff(){
            this.co2Eff = parseInt(this.eff) * Math.pow(10,-13);
            this.$emit('changeCO2Eff',this.co2Eff);
        }
    }
}
</script>
<style>

</style>