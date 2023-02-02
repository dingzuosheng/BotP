<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div>
                Nuclear Supply: {{ this.nuclearSupply }} Exajoules
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Nuclear Supply = Nuclear Supply Elasticity * Nuclear Price - Total Nuclear Use</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Nuclear Supply Elasticity</span> <span>= {{ nuclearSupplyElasticity }}</span> <span><input type="range" min=0.0000001 max="0.000001" step="0.0000001" v-model="elasticity" @change="changeNuclearSupplyElasticity" /></span>
                        </div>
                        <div class="row-formula">
                            <span>Nuclear Price</span> <span>= {{ this.nuclearPrice/Math.pow(10,9) }} billion</span> <span>($/Exajoule)</span>
                        </div>
                        <div class="row-formula">
                            <span>Total Nuclear Use</span> <span>= {{ this.totalNuclearUse }}</span> <span>(Exajoules)</span>
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
    name:'NuclearSupply',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            elasticity:Math.pow(10,-7),
            nuclearSupplyElasticity:Math.pow(10,-7),
        }
    },
    props:{
        nuclearSupply:Number,
        nuclearPrice:Number,
        totalNuclearUse:Number
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Nuclear_Supply.name);
            this.causes = toRaw(res.data.Nuclear_Supply.causes);
            this.effects = toRaw(res.data.Nuclear_Supply.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeNuclearSupplyElasticity(){
            this.nuclearSupplyElasticity = parseInt(this.elasticity*Math.pow(10,7))/Math.pow(10,7);
            this.$emit('changeNuclearSupply',this.nuclearSupplyElasticity)
        }
    }
}
</script>
<style>

</style>