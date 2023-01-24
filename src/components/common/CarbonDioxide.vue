<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>    
            <div>
                CO2: {{ this.co2 }}
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Carbon Dioxide = Carbon Dioxide + CO2 * (Coal Use + Oil Use + Natural Gas Use)</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>CO2</span> <span>= {{ co2Quantity }}</span> <span><input type="range" min="10" max="100" step="10" v-model="quantity" @change="changeCO2Quanty" /> (tons/Exajoule)</span>
                        </div>
                        <div class="row-formula">
                            <span>Carbon Dioxide</span> <span>= {{ this.co2 }}</span> <span>(tons)</span>
                        </div>
                        <div class="row-formula">
                            <span>Coal Use</span> <span>= {{ this.coalUse }}</span> <span>(Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Oil Use</span> <span>= {{ this.oilUse }}</span> <span>(Exajoules)</span>
                        </div>
                        <div class="row-formula">
                            <span>Natural Gas Use</span> <span>= {{ this.naturalGasUse }}</span> <span>(Exajoules)</span>
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
    name:'Carbon Dioxide',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            quantity:2*Math.pow(10,7),
            co2Quantity:2*Math.pow(10,7)
        }
    },
    props:{
        coalUse:Number,
        oilUse:Number,
        naturalGasUse:Number,
        co2:Number
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Carbon_Dioxide.name);
            this.causes = toRaw(res.data.Carbon_Dioxide.causes);
            this.effects = toRaw(res.data.Carbon_Dioxide.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeCO2Quanty(){
            this.co2Quantity = parseInt(this.quantity) * Math.pow(10,6);
            this.$emit('changeCO2Quantity',this.co2Quantity);
        }
    }
}
</script>
<style>

</style>