<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div v-if="!this.show">
                <div>
                    Lifestyle: {{ Math.floor(this.lifestyle/ Math.pow(10,6)*100)/100}} Million Happies
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
            <div v-if="this.show">
                <BarChart :chartData="chartData" :key="chartKey"></BarChart>
            </div>       
        </div>
        <div class="side-nav">
            <div>
                <h2>Causes</h2>
                <div v-if="this.causes">
                    <div v-for="cause in this.causes" :key="cause.name">
                        <el-button type="primary" @click="toPage(cause)">{{ cause.name }}</el-button>
                    </div>
                </div>
            </div>
            <div>
                <h2>Effects</h2>
                <div v-if="this.effects">
                    <div v-for="effect in this.effects" :key="effect.name">
                        <el-button type="primary" @click="toPage(effect)">{{ effect.name }}</el-button>
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
import BarChart from '../chart/BarChart.vue'
export default {
    name:'Lifestyle',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            quantity:100,
            c4:100*Math.pow(10,3),
            chartData:{
                labels:[],
                datasets:[] 
            },
            chartKey:0
        }
    },
    components:{
        BarChart
    },
    props:{
        lifestyle:Number,
        netEnergy:Number,
        show:Boolean,
        executed:Number
    },
    watch:{
        executed(newValue,oldValue){
            console.log(newValue,oldValue)
            this.draw();
            this.chartKey++;
        }
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
        },
        draw(){
            const labels = [];
            for(let i = localStorage.length - 1; i > -1; i--){
                labels.push(localStorage.key(i));
            }
            labels.sort();
            this.chartData.labels =  labels;
            const data = [];
            
            for(let i = 0; i < labels.length; i++){
                data.push(JSON.parse(localStorage.getItem(labels[i])).lifestyle)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Life Style(Unit: million happies)',
                backgroundColor:'#000000',
                data: data
            }
            this.chartData.datasets = [dataset];
            console.log(JSON.stringify(this.chartData))
        }
    }
}
</script>
<style>

</style>