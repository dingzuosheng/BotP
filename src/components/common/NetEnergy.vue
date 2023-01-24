<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>      
            <div>
                Net Energy: {{ this.netEnergy }} Exajoules
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Net Energy = Energy Conservation + Renewable Energy + Nonrenewable Energy</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Energy Conservation</span> <span>= {{ this.energyConservation }}</span>(Exajoules)
                        </div>
                        <div class="row-formula">
                            <span>Renewable Energy</span> <span>= {{ this.renewableEnergy }}</span>(Exajoules)
                        </div>
                        <div class="row-formula">
                            <span>Nonrenewable Energy</span> <span>= {{ this.nonrenewableEnergy }}</span>(Exajoules)
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
    name:'NetEnergy',
    data(){
        return{
            name:"",
            causes:[],
            effects:[]
        }
    },
    props:{
        energyConservation:Number,
        renewableEnergy:Number,
        nonrenewableEnergy:Number,
        netEnergy:Number
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Net_Energy.name);
            this.causes = toRaw(res.data.Net_Energy.causes);
            this.effects = toRaw(res.data.Net_Energy.effects);
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