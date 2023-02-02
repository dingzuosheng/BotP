<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>   
            <div>
                See Level: {{ this.seeLevel }}
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>See Level = (Global Temperature - Base Temperature) * Melting Rate</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Base Temperature</span> <span>= {{ basicTemperature }}</span> <span><input type="range" min="55" max="65" step="1" v-model="temperature" @change="changeBasicTemperature" /> (degrees)</span>
                        </div>
                        <div class="row-formula">
                            <span>Melting Rate</span> <span>= {{ meltingRate }}</span> <span><input type="range" min="0.1" max="2" step="0.1" v-model="rate" @change="changeMeltingRate" /> (meters/degrees)</span>
                        </div>
                        <div class="row-formula">
                            <span>Global Temperature</span> <span>= {{ this.globalTemperature }}</span>(degrees)
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
    name:'SeaLevel',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            temperature:55,
            basicTemperature:55,
            rate:0.5,
            meltingRate:0.5,
        }
    },
    props:{
        seeLevel:Number,
        globalTemperature:Number,
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Sea_Level.name);
            this.causes = toRaw(res.data.Sea_Level.causes);
            this.effects = toRaw(res.data.Sea_Level.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeBasicTemperature(){
            this.basicTemperature = parseInt(this.temperature);
            this.$emit('changeBasicTemperature',this.basicTemperature);
        },
        changeMeltingRate(){
            this.meltingRate = parseInt(this.rate*10)/10;
            this.$emit('changeMeltingRate',this.meltingRate);
        }
    }
}
</script>
<style>

</style>