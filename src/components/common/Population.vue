<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div>
                Population: {{ this.population/Math.pow(10,9) }} billion People
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Population = Population * (1 + Birth Rate/100) - Starvation</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Population</span> <span>= {{ this.population/Math.pow(10,9) }} billion (people)</span>
                        </div>
                        <div class="row-formula">
                            <span>Birth Rate</span> <span>= {{ this.birthRate }} %</span>
                        </div>
                        <div class="row-formula">
                            <span>Starvation</span> <span>= {{ this.starvation/Math.pow(10,6) }} Million (deaths)</span>
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
    name:'Population',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            starvation:41.4*Math.pow(10,6),
        }
    },
    props:{
        population:Number,
        birthRate:Number,
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Population.name);
            this.causes = toRaw(res.data.Population.causes);
            this.effects = toRaw(res.data.Population.effects);
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