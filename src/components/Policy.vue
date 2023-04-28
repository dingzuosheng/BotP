<template>
<div class="policy">
    <div>
        <h1>Policy of Summary {{ this.year }}</h1>
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
                        <td><router-link :to="{path:'/game/beef-tax'}">Beef Tax</router-link></td>
                        <td><router-link :to="{path:'/game/beef-tax'}">{{ Math.floor(this.beefTaxRate*100)/100}}</router-link></td>
                        <td><router-link :to="{path:'/game/beef-tax'}">${{Math.floor(this.beefTaxIncome/Math.pow(10,9)*100)/100}}</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/cfc-tax'}">CFC Tax</router-link></td>
                        <td><router-link :to="{path:'/game/cfc-tax'}">{{ Math.floor(this.cfcTax*100)/100}}</router-link></td>
                        <td><router-link :to="{path:'/game/cfc-tax'}">${{Math.floor(this.cfcTaxIncome/Math.pow(10,9)*100)/100}}</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/coal-tax'}">Coal Tax</router-link></td>
                        <td><router-link :to="{path:'/game/coal-tax'}">{{ Math.floor(this.coalTaxRate/Math.pow(10,6)*100)/100}} million</router-link></td>
                        <td><router-link :to="{path:'/game/coal-tax'}">${{Math.floor(this.coalTaxIncome/Math.pow(10,9)*100)/100}}</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/fertilizer-tax'}">Fertilizer Tax</router-link></td>
                        <td><router-link :to="{path:'/game/fertilizer-tax'}">{{ Math.floor(this.fertilizerTax*100)/100}}</router-link></td>
                        <td><router-link :to="{path:'/game/fertilizer-tax'}">${{Math.floor(this.fertilizerTaxIncome/Math.pow(10,9)*100)/100}}</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/heavy-metal-tax'}">Heavy Metal Tax</router-link></td>
                        <td><router-link :to="{path:'/game/heavy-metal-tax'}">{{ Math.floor(this.heavyMetalTax*100)/100}}</router-link></td>
                        <td><router-link :to="{path:'/game/heavy-metal-tax'}">${{Math.floor(this.heavyMetalTaxIncome/Math.pow(10,9)*100)/100}}</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/logging-tax'}">Logging Tax</router-link></td>
                        <td><router-link :to="{path:'/game/logging-tax'}">{{ Math.floor(this.loggingTax*100)/100}}</router-link></td>
                        <td><router-link :to="{path:'/game/logging-tax'}">${{Math.floor(this.loggingTaxIncome/Math.pow(10,9)*1000)/1000}}</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/natural-gas-tax'}">Natural Gas Tax</router-link></td>
                        <td><router-link :to="{path:'/game/natural-gas-tax'}">{{ Math.floor(this.naturalGasTaxRate/Math.pow(10,6)*100)/100}} million</router-link></td>
                        <td><router-link :to="{path:'/game/natural-gas-tax'}">${{ Math.floor(this.naturalGasTaxIncome /Math.pow(10,9)*100)/100 }}</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/nuclear-tax'}">Nuclear Tax</router-link></td>
                        <td><router-link :to="{path:'/game/nuclear-tax'}">{{ Math.floor(this.nuclearTaxRate /Math.pow(10,6)*100)/100}} million</router-link></td>
                        <td><router-link :to="{path:'/game/nuclear-tax'}">${{ Math.floor(this.nuclearTaxIncome/Math.pow(10,9)*100)/100}}</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/oil-tax'}">Oil Tax</router-link></td>
                        <td><router-link :to="{path:'/game/oil-tax'}">{{ Math.floor(this.oilTaxRate /Math.pow(10,6)*100)/100}} million</router-link></td>
                        <td><router-link :to="{path:'/game/oil-tax'}">${{ Math.floor(this.oilTaxIncome/Math.pow(10,9)*100)/100 }}</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/pesticide-tax'}">Pesticide Tax</router-link></td>
                        <td><router-link :to="{path:'/game/pesticide-tax'}">{{ Math.floor(this.pesticideTax*100)/100}}</router-link></td>
                        <td><router-link :to="{path:'/game/pesticide-tax'}">${{Math.floor(this.pesticideTaxIncome/Math.pow(10,9)*100)/100}}</router-link></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>$ {{ Math.floor(this.totalTaxIncome/Math.pow(10,9) * 100)/100 }}</td>
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
                        <td><router-link :to="{path:'/game/property-damage-payments'}">Property Damage $</router-link></td>
                        <td></td>
                        <td><router-link :to="{path:'/game/property-damage-payments'}">${{ Math.floor(this.propertyDamagePayments/Math.pow(10,9) * 100)/100 }}</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/basic-research'}">Basic Research $</router-link></td>
                        <td><router-link :to="{path:'/game/basic-research'}">{{ Math.floor(this.basicResearch * 100 * 100)/100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/basic-research'}">${{ Math.floor(this.basicResearchBudget/Math.pow(10,9) * 100)/100 }}</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/bioresearch'}">Bio Research $</router-link></td>
                        <td><router-link :to="{path:'/game/bioresearch'}">{{ Math.floor(this.bioResearch * 100 * 100)/100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/bioresearch'}">${{ Math.floor(this.bioResearchBudget/Math.pow(10,9)*100)/100 }}</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/coal-research'}">Coal Research $</router-link></td>
                        <td><router-link :to="{path:'/game/coal-research'}">{{ Math.floor(this.coalResearch * 100 * 100)/100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/coal-research'}">${{Math.floor(this.coalResearchBudget/Math.pow(10,9)*100)/100 }}</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/dam-use-budget'}">Dam Use $</router-link></td>
                        <td><router-link :to="{path:'/game/dam-use-budget'}">{{ Math.floor(this.damSubsidy * 100 * 100)/100}}%</router-link></td>
                        <td><router-link :to="{path:'/game/dam-use-budget'}">${{ Math.floor(this.damUseBudget/Math.pow(10,9)*100)/100 }}</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/debt-for-nature-subsidy'}">Debt for Nature $</router-link></td>
                        <td><router-link :to="{path:'/game/debt-for-nature-subsidy'}">{{ Math.floor(this.debtForNatureSubsidyRate * 100 * 100)/100}}%</router-link></td>
                        <td><router-link :to="{path:'/game/debt-for-nature-subsidy'}">${{ Math.floor(this.debtForNatureBudget/Math.pow(10,9)*100)/100 }}</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/family-planning-subsidy'}">Family Planning $</router-link></td>
                        <td><router-link :to="{path:'/game/family-planning-subsidy'}">{{ Math.floor(this.familyPlanningSubsidy * 100 * 100)/100}}%</router-link></td>
                        <td><router-link :to="{path:'/game/family-planning-subsidy'}">${{ Math.floor(this.familyPlanningBudget/Math.pow(10,9)*100)/100 }}</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/nuclear-research'}">Nuclear Research $</router-link></td>
                        <td><router-link :to="{path:'/game/nuclear-research'}">{{ Math.floor(this.nuclearResearch * 100 * 100)/100}}%</router-link></td>
                        <td><router-link :to="{path:'/game/nuclear-research'}">${{ Math.floor(this.nuclearResearchBudget/Math.pow(10,9)* 100)/100}}</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/oil-research'}">Oil Research $</router-link></td>
                        <td><router-link :to="{path:'/game/oil-research'}">{{ Math.floor(this.oilResearch * 100 * 100)/100}}%</router-link></td>
                        <td><router-link :to="{path:'/game/oil-research'}">${{ Math.floor(this.oilResearchBudget/Math.pow(10,9)*100)/100}}</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/recycling-center-subsidy'}">Recycling Center $</router-link></td>
                        <td><router-link :to="{path:'/game/recycling-center-subsidy'}">{{ Math.floor(this.recyclingCenterSubsidyRate * 100 * 100)/100}}%</router-link></td>
                        <td><router-link :to="{path:'/game/recycling-center-subsidy'}">${{ Math.floor(this.recyclingCenterBudget/Math.pow(10,9)* 100)/100}}</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/solar-energy'}">Solar Energy $</router-link></td>
                        <td><router-link :to="{path:'/game/solar-energy'}">{{ Math.floor(this.solarResearch * 100 * 100)/100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/solar-energy'}">${{ Math.floor(this.solarResearchBudget/Math.pow(10,9)*100)/100}}</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link :to="{path:'/game/solar-research'}">Solar Research $</router-link></td>
                        <td><router-link :to="{path:'/game/solar-research'}">{{ Math.floor(this.solarResearch * 100 * 100)/100 }}%</router-link></td>
                        <td><router-link :to="{path:'/game/solar-research'}">${{Math.floor(this.solarResearchBudget/Math.pow(10,9)*100)/100 }}</router-link></td>
                    </tr>
                    <tr>                        
                        <td><router-link :to="{path:'/game/wood-stove-subsidy'}">Wood Stove $</router-link></td>
                        <td><router-link :to="{path:'/game/wood-stove-subsidy'}">{{ Math.floor(this.woodStoveSubsidy * 100 * 100)/100}}%</router-link></td>
                        <td><router-link :to="{path:'/game/wood-stove-subsidy'}">${{ Math.floor(this.woodStoveBudget/Math.pow(10,9)* 100)/100}}</router-link></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{{ Math.floor(this.totalBudgetRate * 100 * 100)/100 }} %</td>
                        <td>$ {{ Math.floor(this.totalBudget/Math.pow(10,9) * 100)/100}}</td>
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

        beefTaxRate:Number,
        beefTaxIncome:Number,

        cfcTax:Number,
        cfcTaxIncome:Number,

        fertilizerTax:Number,
        fertilizerTaxIncome:Number,

        heavyMetalTax:Number,
        heavyMetalTaxIncome:Number,

        loggingTax:Number,
        loggingTaxIncome:Number,

        pesticideTax:Number,
        pesticideTaxIncome:Number,

        propertyDamagePayments:Number,
        debtForNatureBudget:Number,
        debtForNatureSubsidyRate:Number,
        familyPlanningBudget:Number,
        familyPlanningSubsidy:Number,
        recyclingCenterBudget:Number,
        recyclingCenterSubsidyRate:Number,
        woodStoveBudget:Number,
        woodStoveSubsidy:Number,

        totalTaxIncome:Number,
        totalBudget:Number,
        totalBudgetRate:Number,

        totalTreasury:Number,
        show:Boolean,
        executed:Number,
        gameover:Boolean,
        year: Number
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
