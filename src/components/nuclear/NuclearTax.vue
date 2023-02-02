<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div class="range">
                <h3>Nuclear Tax {{ this.nuclearTaxRate }} billion $/Exajoule</h3>
                <input type="range" min="0.0625" max="9.44" step="0.0005" v-model="rate" @change="changeNuclearTaxRate"/><!--value is string-->
                <div>
                    <p class="text">
                        This is the tax that you levy on Oil Use. Increasing it will discourage production. This 
                        will have both environmental and economic consequences. Although you can change the numbers
                        now and see immediate effects in the bar chart, the effects on the world will not take place 
                        untill you execute policies.
                    </p>
                </div>
            </div>      
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
    name:'NuclearTax',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            rate:2.37,
            nuclearTaxRate:2.37
        }
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Nuclear_Tax.name);
            this.causes = toRaw(res.data.Nuclear_Tax.causes);
            this.effects = toRaw(res.data.Nuclear_Tax.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeNuclearTaxRate(){
            this.nuclearTaxRate = parseInt(this.rate*10000)/10000;
            this.$emit('changeNuclearTaxRate',this.nuclearTaxRate);
        }
    }
}
</script>
<style>

</style>