<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>  
            <div v-if="!this.show">
                <div>
                    SO2: {{Math.floor(this.so2 / Math.pow(10,6)*100)/100 }} million tons
                </div> 
                <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Sulfur Dioxide = Sulfur Content * Coal Use / Coal Technology</div>
                        <br />
                        Where:<br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>Sulfur Content</span> <span>= {{ Math.ceil(sulfurContent/1000 * 100)/100 }} thousand</span> <span><input type="range" min="100" max="1000" step="10" v-model="content" @change="changeSulfurContent"/></span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Use</span> <span>= {{ Math.ceil(this.coalUse*100)/100 }}</span> <span>(Exajoule)</span>
                            </div>
                            <div class="row-formula">
                                <span>Coal Technology</span> <span>= {{ Math.ceil(this.coalTechnology*100)/100 }}</span><span>(Whizbangs)</span>
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
    name:'Sulfur Dioxide',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            content:779,
            sulfurContent:779000,
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
        so2:Number,
        coalUse:Number,
        coalTechnology:Number,
        show:Boolean,
        executed:Number
    },
    watch:{
        executed(newValue,oldValue){
            this.draw();
            this.chartKey++;
        }
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).so2/Math.pow(10,6)*10)/10)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'SO2(Unit: million tons)',
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