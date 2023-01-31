<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div>
                Oil Supply: {{ this.oilSupply }} Exajoules
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Oil Supply = Oil Supply Elasticity * Oil Price - Total Oil Use</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Oil Supply Elasticity</span> <span>= {{ oilSupplyElasticity }}</span> <span><input type="range" min="0.00000001" max="0.000001" step="0.00000001" v-model="elasticity" @change="changeOilSupplyElasticity" /></span>
                        </div>
                        <div class="row-formula">
                            <span>Oil Price</span> <span>= {{ this.oilPrice }}</span> <span>($/Exajoule)</span>
                        </div>
                        <div class="row-formula">
                            <span>Total Oil Use</span> <span>= {{ this.totalOilUse }}</span> <span>(Exajoules)</span>
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
    name:'OilSupply',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            elasticity:7.6*Math.pow(10,-7),
            oilSupplyElasticity:7.6*Math.pow(10,-7),
        }
    },
    props:{
        oilPrice:Number,
        totalOilUse:Number,
        oilSupply:Number
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Oil_Supply.name);
            this.causes = toRaw(res.data.Oil_Supply.causes);
            this.effects = toRaw(res.data.Oil_Supply.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeOilSupplyElasticity(){
            this.oilSupplyElasticity = parseInt(this.elasticity*Math.pow(10,8))/Math.pow(10,8);
            this.$emit('changeOilSupplyElasticity',this.oilSupplyElasticity)
        }
    }
}
</script>
<style>

</style>