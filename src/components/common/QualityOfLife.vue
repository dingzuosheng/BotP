<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>   
            <div>
                Quality of Life: {{ this.qualityOfLife }} Happies/CAP
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Quality of Life = Life Value * Lifestyle / Population</div>
                    <br/>
                    Where:<br/>
                    <div class="formula">
                        <div class="row-formula">
                            <span>Life Value</span> <span>= {{ lifeValue }}</span> <span><input type="range" min="0.1" max="10" step="0.1" v-model="value" @change="changeLifeValue" /></span>
                        </div>
                        <div class="row-formula">
                            <span>Lifestyle</span> <span>= {{ this.lifestyle/Math.pow(10,9) }} billion </span>(happies)
                        </div>
                        <div class="row-formula">
                            <span>Population</span> <span>= {{ this.population/Math.pow(10,9) }} billion </span>(people)
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
    name:'QualityOfLife',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            value:0.1,
            lifeValue:0.1,
        }
    },
    props:{
        qualityOfLife:Number,
        lifestyle:Number,
        population:Number,
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Quality_of_Life.name);
            this.causes = toRaw(res.data.Quality_of_Life.causes);
            this.effects = toRaw(res.data.Quality_of_Life.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeLifeValue(){
            this.lifeValue = parseInt(this.value*10)/10;
            this.$emit('changeLifeValue',this.lifeValue);
        }
    }
}
</script>
<style>

</style>