<template>
<div class="policy">
    <div>
        <h1>Policy of Summary</h1>
    </div>
    <div class="tables">
        <div>
            <table class="t1" >
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Tax Rate</th>
                        <th>Income (Billion)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><router-link :to="{path:'/game/coal-tax'}">Coal Tax</router-link></td>
                        <td><router-link :to="{path:'/game/coal-tax'}">{{ Math.floor(this.coalTaxRate/Math.pow(10,9)*100)/100}} billion</router-link></td>
                        <td><router-link :to="{path:'/game/coal-tax'}">${{Math.floor(this.coalTaxIncome/Math.pow(10,9)*100)/100}} billion</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/natural-gas-tax'}">Natural Gas Tax</router-link></td>
                        <td><router-link :to="{path:'/game/natural-gas-tax'}">{{ Math.floor(this.naturalGasTaxRate/Math.pow(10,9)*100)/100}} billion</router-link></td>
                        <td><router-link :to="{path:'/game/natural-gas-tax'}">${{ Math.floor(this.naturalGasTaxIncome /Math.pow(10,9)*100)/100 }} billion</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/nuclear-tax'}">Nuclear Tax</router-link></td>
                        <td><router-link :to="{path:'/game/nuclear-tax'}">{{ Math.floor(this.nuclearTaxRate /Math.pow(10,9)*100)/100}} billion</router-link></td>
                        <td><router-link :to="{path:'/game/nuclear-tax'}">${{ Math.floor(this.nuclearTaxIncome/Math.pow(10,9)*100)/100}} billion</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/oil-tax'}">Oil Tax</router-link></td>
                        <td><router-link :to="{path:'/game/oil-tax'}">{{ Math.floor(this.oilTaxRate /Math.pow(10,9)*100)/100}} billion</router-link></td>
                        <td><router-link :to="{path:'/game/oil-tax'}">${{ Math.floor(this.oilTaxIncome/Math.pow(10,9)*100)/100 }} billion</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <table class="t2">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Rate</th>
                        <th>Expense (Billion)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>                        
                        <td><router-link :to="{path:'/game/basic-research'}">Basic Research</router-link></td>
                        <td><router-link :to="{path:'/game/basic-research'}">{{ Math.floor(this.basicResearch * 100 * 100)/100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/basic-research'}">${{ Math.floor(this.basicResearchBudget/Math.pow(10,9) * 100)/100 }}Billion</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/bioresearch'}">Bio Research</router-link></td>
                        <td><router-link :to="{path:'/game/bioresearch'}">{{ Math.floor(this.bioResearch * 100 * 100)/100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/bioresearch'}">${{ Math.floor(this.bioResearchBudget/Math.pow(10,9)*100)/100 }}Billion</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/coal-research'}">Coal Research</router-link></td>
                        <td><router-link :to="{path:'/game/coal-research'}">{{ Math.floor(this.coalResearch * 100 * 100)/100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/coal-research'}">${{Math.floor(this.coalResearchBudget/Math.pow(10,9)*100)/100 }}Billion</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/oil-research'}">Oil Research</router-link></td>
                        <td><router-link :to="{path:'/game/oil-research'}">{{ Math.floor(this.oilResearch * 100 * 100)/100}}%</router-link></td>
                        <td><router-link :to="{path:'/game/oil-research'}">${{ Math.floor(this.oilResearchBudget/Math.pow(10,9)*100)/100}}Billion</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/nuclear-research'}">Nuclear Research</router-link></td>
                        <td><router-link :to="{path:'/game/nuclear-research'}">{{ Math.floor(this.nuclearResearch * 100 * 100)/100}}%</router-link></td>
                        <td><router-link :to="{path:'/game/nuclear-research'}">${{ Math.floor(this.nuclearResearchBudget/Math.pow(10,9)* 100)/100}}Billion</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/solar-energy'}">Solar Energy</router-link></td>
                        <td><router-link :to="{path:'/game/solar-energy'}">{{ Math.floor(this.solarResearch * 100 * 100)/100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/solar-energy'}">${{ Math.floor(this.solarResearchBudget/Math.pow(10,9)*100)/100}} Billion</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/solar-research'}">Solar Research</router-link></td>
                        <td><router-link :to="{path:'/game/solar-research'}">{{ Math.floor(this.solarResearch * 100 * 100)/100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/solar-research'}">${{Math.floor(this.solarResearchBudget/Math.pow(10,9)*100)/100 }}Billion</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/dam-use-budget'}">Dam Use $</router-link></td>
                        <td><router-link :to="{path:'/game/dam-use-budget'}">{{ Math.floor(this.damSubsidy * 100 * 100)/100}}%</router-link></td>
                        <td><router-link :to="{path:'/game/dam-use-budget'}">${{ Math.floor(this.damUseBudget/Math.pow(10,9)*100)/100 }}Billion</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div>
        <h1><strong>Treasury: {{ Math.floor(this.totalTreasury / Math.pow(10,9)*100)/100}} billion</strong></h1>
        <div v-if="this.show">
            <BarChart :chartData="chartData" :key="chartKey"></BarChart>
        </div>
    </div>
</div>
</template>

<script>
import BarChart from './chart/BarChart.vue'
export default {
    name: 'Policy',
    data(){
        return{
            chartData:{
                labels:[],
                datasets:[] 
            },
            chartKey:0,
        }
    },
    components:{
        BarChart
    },
    props:{
        coalTaxRate: Number,
        oilTaxRate:Number,
        naturalGasTaxRate:Number,
        nuclearTaxRate:Number,

        coalTaxIncome:Number,
        oilTaxIncome:Number,
        naturalGasTaxIncome:Number,
        nuclearTaxIncome:Number,

        basicResearch:Number,
        basicResearchBudget:Number,

        bioResearch:Number,
        bioResearchBudget:Number,

        coalResearch:Number,
        coalResearchBudget:Number,

        damSubsidy:Number,
        damUseBudget:Number,

        nuclearResearch:Number,
        nuclearResearchBudget:Number,

        oilResearch:Number,
        oilResearchBudget:Number,

        solarResearch:Number,
        solarResearchBudget:Number,

        totalTreasury:Number,
        show:Boolean,
        executed:Number
    },
    watch:{
        executed(newValue,oldValue){
            this.draw();
            this.chartKey++;
        }
    },
    methods:{
        draw(){
            const labels = [];
            for(let i = localStorage.length - 1; i > -1; i--){
                labels.push(localStorage.key(i));
            }
            labels.sort();
            this.chartData.labels =  labels;
            const data = [];
            
            for(let i = 0; i < labels.length; i++){
                data.push(JSON.parse(localStorage.getItem(labels[i])).totalTreasury)
                console.log(labels[i],localStorage.key(i))
            }
            const dataset = {
                label:'Total Treasury(Unit: billion dollars)',
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
.policy {
    display: flex;
    flex-direction: column;
}

.tables {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 30px;
    font-style: italic;
}

.t1,
.t2 {
    margin: 100px;
    /*background-color:orange;*/
}
tr:nth-child(odd){
    background-color: oldlace;
}

tr:nth-child(even){
    background-color:#f0f9eb;
}

thead tr th {
    padding: 20px;
    text-align: left;
    background-color: aliceblue;
}

td {
    padding: 10px 10px;
    text-align: left;
}

a{
    text-decoration:none;
    color:black;
}
</style>
