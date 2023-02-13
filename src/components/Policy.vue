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
                        <td><router-link :to="{path:'/game/coal-tax'}">{{ this.coalTaxRate/Math.pow(10,9)}} billion</router-link></td>
                        <td><router-link :to="{path:'/game/coal-tax'}">${{this.coalTaxIncome/Math.pow(10,9)}} billion</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/natural-gas-tax'}">Natural Gas Tax</router-link></td>
                        <td><router-link :to="{path:'/game/natural-gas-tax'}">{{ this.naturalGasTaxRate/Math.pow(10,9)}} billion</router-link></td>
                        <td><router-link :to="{path:'/game/natural-gas-tax'}">${{ this.naturalGasTaxIncome /Math.pow(10,9) }} billion</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/nuclear-tax'}">Nuclear Tax</router-link></td>
                        <td><router-link :to="{path:'/game/nuclear-tax'}">{{ this.nuclearTaxRate /Math.pow(10,9)}} billion</router-link></td>
                        <td><router-link :to="{path:'/game/nuclear-tax'}">${{ this.nuclearTaxIncome/Math.pow(10,9)}} billion</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/oil-tax'}">Oil Tax</router-link></td>
                        <td><router-link :to="{path:'/game/oil-tax'}">{{ this.oilTaxRate /Math.pow(10,9)}} billion</router-link></td>
                        <td><router-link :to="{path:'/game/oil-tax'}">${{ this.oilTaxIncome/Math.pow(10,9) }} billion</router-link></td>
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
                        <td><router-link :to="{path:'/game/basic-research'}">{{ this.basicResearch * 100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/basic-research'}">${{ this.basicResearchTreasury/Math.pow(10,9) }}Billion</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/bioresearch'}">Bio Research</router-link></td>
                        <td><router-link :to="{path:'/game/bioresearch'}">{{ this.bioResearch * 100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/bioresearch'}">${{ this.bioResearchTreasury/Math.pow(10,9) }}Billion</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/coal-research'}">Coal Research</router-link></td>
                        <td><router-link :to="{path:'/game/coal-research'}">{{ this.coalResearch * 100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/coal-research'}">${{this.coalResearchTreasury/Math.pow(10,9) }}Billion</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/oil-research'}">Oil Research</router-link></td>
                        <td><router-link :to="{path:'/game/oil-research'}">{{ this.oilResearch * 100}}%</router-link></td>
                        <td><router-link :to="{path:'/game/oil-research'}">${{ this.oilResearchTreasury/Math.pow(10,9)}}Billion</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/solar-energy'}">Solar Energy</router-link></td>
                        <td><router-link :to="{path:'/game/solar-energy'}">{{ this.solarResearch * 100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/solar-energy'}">${{ this.solarResearchTreasury/Math.pow(10,9) }} Billion</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/solar-research'}">Solar Research</router-link></td>
                        <td><router-link :to="{path:'/game/solar-research'}">{{ this.solarResearch * 100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/solar-research'}">${{this.solarResearchTreasury/Math.pow(10,9) }}Billion</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/dam-use-treasury'}">Dam Use $</router-link></td>
                        <td><router-link :to="{path:'/game/dam-use-treasury'}">{{ this.damSubsidy * 100}}%</router-link></td>
                        <td><router-link :to="{path:'/game/dam-use-treasury'}">${{ this.damUseTreasury/Math.pow(10,9) }}Billion</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div>
        <h1><strong>Treasury: {{ this.totalTreasury / Math.pow(10,9)}} billion</strong></h1>
        <div v-if="this.show">
            <BarChart :chartData="chartData"></BarChart>
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
        basicResearchTreasury:Number,

        bioResearch:Number,
        bioResearchTreasury:Number,

        coalResearch:Number,
        coalResearchTreasury:Number,

        damSubsidy:Number,
        damUseTreasury:Number,

        nuclearResearch:Number,
        nuclearResearchTreasury:Number,

        oilResearch:Number,
        oilResearchTreasury:Number,

        solarResearch:Number,
        solarResearchTreasury:Number,

        totalTreasury:Number,
        show:Boolean,
        executed:Number
    },
    watch:{
        executed(newValue,oldValue){
            this.draw();
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
                label:'Total Treasury',
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
