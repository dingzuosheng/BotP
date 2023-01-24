<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div>
                SO2: {{ this.so2 / Math.pow(10,6) }} million tons
            </div> 
            <el-collapse class="collapse-part">
            <el-collapse-item title="Formula ">
                <div class="formula">
                    <div>Sulfur Dioxide = Sulfur Content * Coal Use / Coal Technology</div>
                    <br />
                    Where:<br />
                    <div class="formula">
                        <div class="row-formula">
                            <span>Sulfur Content</span> <span>= {{ sulfurContent }}</span> <span><input type="range" min="100" max="1000" step="10" v-model="content" @change="changeSulfurContent"/></span>
                        </div>
                        <div class="row-formula">
                            <span>Coal Use</span> <span>= {{ this.coalUse }}</span> <span>(Exajoule)</span>
                        </div>
                        <div class="row-formula">
                            <span>Coal Technology</span> <span>= {{ this.coalTechnology }}</span><span>(Whizbangs)</span>
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
    name:'Sulfur Dioxide',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            content:100,
            sulfurContent:100000,
        }
    },
    props:{
        so2:Number,
        coalUse:Number,
        coalTechnology:Number
    },
    created(){
        service.get('/data/data.json').then(res => {
            this.name = toRaw(res.data.Sulfur_Dioxide.name);
            this.causes = toRaw(res.data.Sulfur_Dioxide.causes);
            this.effects = toRaw(res.data.Sulfur_Dioxide.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeSulfurContent(){
            this.sulfurContent = parseInt(this.content)*1000;
            this.$emit('changeSulfurContent',this.sulfurContent);
        }
    }
}
</script>
<style>

</style>