<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div> 
            <div>
                Coal Supply: {{ this.coalSupply }} Exajoules
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Coal Supply = Coal Supply Elasticity * Coal Price - Total Coal Use</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Coal Supply Elasticity</span> <span>= {{ coalSupplyElasticity }}</span> <span><input type="range" min=0.000001 max="0.0001" step="0.000001" v-model="elasticity" @change="changeCoalSupplyElasticity" /></span>
                        </div>
                        <div class="row-formula">
                            <span>Coal Price</span> <span>= {{ this.coalPrice }}</span> <span>($/Exajoule)</span>
                        </div>
                        <div class="row-formula">
                            <span>Total Coal Use</span> <span>= {{ this.totalCoalUse }}</span> <span>(Exajoule)</span>
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
    name:'Coal Supply',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            elasticity:1.2*Math.pow(10,-5),
            coalSupplyElasticity:1.2*Math.pow(10,-5),
        }
    },
    props:{
        coalSupply:Number,
        coalPrice:Number,
        totalCoalUse:Number,
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Coal_Supply.name);
            this.causes = toRaw(res.data.Coal_Supply.causes);
            this.effects = toRaw(res.data.Coal_Supply.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeCoalSupplyElasticity(){
            this.coalSupplyElasticity = parseInt(this.elasticity*Math.pow(10,6))/Math.pow(10,6);
            this.$emit('changeCoalSupplyElasticity',this.coalSupplyElasticity)
        }
    }
}
</script>
<style>

</style>