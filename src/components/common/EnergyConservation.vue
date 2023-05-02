<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <div v-if="!this.show">
                <div>
                    Energy Conservation: {{ this.energyConservation }} Exajoules
                </div> 
                <el-collapse class="collapse-part">
                    <el-collapse-item title="Formula ">
                        <div class="formula">
                            <div>Energy Conservation = Price Elasticity * Sqrt(Ave Energy Price) + Energy Saved * Recycled Aluminum</div>
                            <br />
                            Where:<br />
                            <div class="formula">
                                <div class="row-formula">
                                    <span>Price Elasticity</span> <span>= {{ priceEleasticity }}</span> <span><input type="range" min="0.0001" max="0.01" step="0.0001" v-model="elasticity" @change="changePriceElasticity" /></span>
                                </div>
                                <div class="row-formula">
                                    <span>Energy Saved</span> <span>= {{ Math.floor(energySaved * Math.pow(10,11))/Math.pow(10,11) }}</span> <span><input type="range" min="0.00000000001" max="0.0000000001" step="0.00000000001" v-model="energySavedFactor" @change="changeEnergySavedFactor" /> (Exajoules/ton)</span>
                                </div>
                                <div class="row-formula">
                                    <span>Ave Energy Price</span> <span>= {{ Math.floor(this.aveEnergyPrice/Math.pow(10,9)*100)/100 }} billion </span>($/Exajoule)
                                </div>
                                <div class="row-formula">
                                    <span>Recycled Aluminum</span> <span>= {{ Math.floor(this.recycledAluminum/Math.pow(10,6)*100)/100 }} million </span>(tons)
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
    name:'EnergyConservation',
    data(){
        return{
            name:"",
            causes:[],
            effects:[],
            elasticity:0.00038,
            priceEleasticity:0.00038,
            energySaved:2.5*Math.pow(10,-11),
            energySavedFactor:2.5*Math.pow(10,-11),
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
        energyConservation:Number,
        aveEnergyPrice:Number,
        recycledAluminum:Number,
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
            this.name = toRaw(res.data.Energy_Conservation.name);
            this.causes = toRaw(res.data.Energy_Conservation.causes);
            this.effects = toRaw(res.data.Energy_Conservation.effects);
        }) 
    },
    methods:{
        toPage(item){
            this.$router.push({
                path:item.path
            });
        },
        changePriceElasticity(){
            this.priceEleasticity = parseInt(this.elasticity*10000)/10000;
            this.$emit('changePriceElasticity',this.priceEleasticity);
        },
        changeEnergySavedFactor(){
            this.energySaved = parseInt(this.energySavedFactor * Math.pow(10,11))/Math.pow(10,11);
            this.$emit('changeEnergySavedFactor',this.energySaved);
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
                data.push(Math.ceil(JSON.parse(localStorage.getItem(labels[i])).energyConservation*10)/10)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Energy Conservation(Unit: Exajoules)',
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