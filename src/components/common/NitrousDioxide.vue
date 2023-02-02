<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>   
            <div>
                NO2: {{ this.no2 / Math.pow(10,6)}} million tons
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Nitrous Dioxide = (C1 * Coal Use / Coal Technology) + (C2 * Oil Use / Oil Technology)</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>C1</span> <span>= {{ c1 }} thousand</span> <span><input type="range" min="10" max="1000" step="10" v-model="quantity1" @change="changeC1Quanty" /> (tons/Exajoule)</span>
                        </div>
                        <div class="row-formula">
                            <span>C2</span> <span>= {{ c2 }} thousand</span> <span><input type="range" min="100" max="500" step="1" v-model="quantity2" @change="changeC2Quanty" /> (tons/Exajoule)</span>
                        </div>
                        <div class="row-formula">
                            <span>Coal Use</span> <span>= {{ this.coalUse }}</span> <span>(Exajoule)</span>
                        </div>
                        <div class="row-formula">
                            <span>Coal Technology</span> <span>= {{ this.coalTechnology }}</span><span>(Whizbangs)</span>
                        </div>
                        <div class="row-formula">
                            <span>Oil Use</span> <span>= {{ this.oilUse }}</span> <span>(Exajoule)</span>
                        </div>
                        <div class="row-formula">
                            <span>Oil Technology</span> <span>= {{ this.oilTechnology }}</span><span>(Whizbangs)</span>
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
    timeout:3000000000,
})
export default {
    name:'Nitrous Dioxide',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            quantity1:10,
            c1:10*1000,
            quantity2:100,
            c2:100*1000,
        }
    },
    props:{
        no2:Number,
        coalUse:Number,
        coalTechnology:Number,
        oilUse:Number,
        oilTechnology:Number,
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Nitrous_Dioxide.name);
            this.causes = toRaw(res.data.Nitrous_Dioxide.causes);
            this.effects = toRaw(res.data.Nitrous_Dioxide.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeC1Quanty(){
            this.c1 = parseInt(this.quantity1)*1000;
            this.$emit('changeC1Quantity',this.c1);
        },
        changeC2Quanty(){
            this.c2 = parseInt(this.quantity2)*1000;
            this.$emit('changeNO2Quantity',this.c2);
        }
    }
}
</script>
<style>

</style>