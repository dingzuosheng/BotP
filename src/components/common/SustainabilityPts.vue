<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>   
            <div>
                Sustainability Pts: {{ this.sustainabilityPts }} Points
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Sustainability Pts = Value of Sustainability * Sustainability</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Value of Sustainability</span> <span>= {{ valueOfSustainability }}</span> <span><input type="range" min="100" max="10000" step="10" v-model="value" @change="changeValueOfSustainability" /></span>
                        </div>
                        <div class="row-formula">
                            <span>Sustainability</span> <span>= {{ this.sustainability }} </span><span>(Permanences)</span>
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
    name:'SustainabilityPts',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            value:100,
            valueOfSustainability:100,
        }
    },
    props:{
        sustainability:Number,
        sustainabilityPts:Number
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Sustainability_Pts.name);
            this.causes = toRaw(res.data.Sustainability_Pts.causes);
            this.effects = toRaw(res.data.Sustainability_Pts.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeValueOfSustainability(){
            this.valueOfSustainability = parseInt(this.value);
            this.$emit('changeSustainabilityPts',this.valueOfSustainability);
        }
    }
}
</script>
<style>

</style>