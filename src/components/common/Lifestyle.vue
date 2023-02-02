<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div>
                Lifestyle: {{ this.lifestyle/ Math.pow(10,9)}} Billion Happies
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Lifestyle = C4 * Net Energy</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>C4</span> <span>= {{ c4 }} thousand </span> <span><input type="range" min="100" max="10000" step="10" v-model="quantity" @change="changeC4Value"/></span>
                        </div>
                        <div class="row-formula">
                            <span>Net Energy</span> <span>= {{ this.netEnergy }}</span>(Exajoules)
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
    name:'Lifestyle',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            quantity:100,
            c4:100*Math.pow(10,3),
        }
    },
    props:{
        lifestyle:Number,
        netEnergy:Number,
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Lifestyle.name);
            this.causes = toRaw(res.data.Lifestyle.causes);
            this.effects = toRaw(res.data.Lifestyle.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeC4Value(){
            this.c4 = parseInt(this.quantity)*1000;
            this.$emit('changeC4Value',this.c4);
        }
    }
}
</script>
<style>

</style>