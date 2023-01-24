<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>   
            <div class="range">
                <h3>Solar Research Subsidy{{ this.solarResearchSubsidy * 100}} %</h3>
                <input type="range" min="0" max="0.08" step="0.01" v-model="percent" @change="changeSolarResearchSusidyPercent"/><!--value is string-->
                <div>
                    <p class="text">
                        This is your subsidy for Solar Research. You can see incresase its precentage of your budget, 
                        but only if you have budget percentage points to spare. Although you can change the numbers
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
    timeout:30000,
})
export default {
    name:'SolarResearch',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            percent:0.08,
            solarResearchSubsidy:0.08,
        }
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Solar_Research.name);
            this.causes = toRaw(res.data.Solar_Research.causes);
            this.effects = toRaw(res.data.Solar_Research.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeSolarResearchSusidyPercent(){
            this.solarResearchSubsidy = parseInt(this.percent * 100)/100;
            this.$emit('changeSolarResearchSubsidy',this.solarResearchSubsidy);
        }
    }
}
</script>
<style>

</style>