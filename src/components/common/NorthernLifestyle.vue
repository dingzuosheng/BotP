<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div v-if="!this.show">
                <div>
                    Northern Lifestyle: {{ Math.floor(this.northernLifestyle/ Math.pow(10,9)*100)/100}} billion Happies
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Lifestyle = C4 * Net Energy</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>C1</span> <span>= {{ c1 }} </span> <span><input type="range" min="1" max="100" step="0.01" v-model="c1Factor" @change="changeC1Factor"/></span>
                            </div>
                            <div class="row-formula">
                                <span>C2</span> <span>= {{ c2 }} </span> <span><input type="range" min="0.01" max="1" step="0.001" v-model="c2Factor" @change="changeC2Factor"/></span>
                            </div>
                            <div class="row-formula">
                                <span>C3</span> <span>= {{ c3 }} </span> <span><input type="range" min="0.1" max="10" step="0.01" v-model="c3Factor" @change="changeC3Factor"/></span>
                            </div>
                            <div class="row-formula">
                                <span>C4</span> <span>= {{ Math.floor(c4/Math.pow(10,6)*100)/100 }} million </span> <span><input type="range" min="100" max="10000" step="10" v-model="quantity" @change="changeC4Value"/></span>
                            </div>
                            <div class="row-formula">
                                <span>Medicines</span> <span>= {{ Math.floor(this.medicines / Math.pow(10,6) * 100) / 100 }} million </span><span>(pills)</span>
                            </div>
                            <div class="row-formula">
                                <span>Beef Production</span> <span>= {{ Math.floor(this.beefProduction / Math.pow(10,6) * 100) / 100 }} million </span><span>(tons)</span>
                            </div>
                            <div class="row-formula">
                                <span>Consumer Goods</span> <span>= {{ Math.floor(this.consumerGoods / Math.pow(10,6) * 100)/100 }} million </span><span>(goodies)</span>
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
    name:'NorthernLifestyle',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            c1:1,
            c1Factor:1,
            c2:0.07,
            c2Factor:0.07,
            c3:2,
            c3Factor:2,
            quantity:469,
            c4:469*Math.pow(10,3),
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
        northernLifestyle:Number,
        netEnergy:Number,
        medicines:Number,
        beefProduction:Number,
        consumerGoods:Number,
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
            this.name = toRaw(res.data.Northern_Lifestyle.name);
            this.causes = toRaw(res.data.Northern_Lifestyle.causes);
            this.effects = toRaw(res.data.Northern_Lifestyle.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changeC1Factor(){
            this.c1 = parseInt(this.c1Factor*100)/100;
            this.$emit('changeC1Factor',this.c1);
        },
        changeC2Factor(){
            this.c2 = parseInt(this.c2Factor*1000)/1000;
            this.$emit('changeC2Factor',this.c2);
        },
        changeC3Factor(){
            this.c3 = parseInt(this.c3Factor*100)/100;
            this.$emit('changeC3Factor',this.c3);
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
                backgroundColor:'orange',
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