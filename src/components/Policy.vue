<template>
<div class="policy">
    <div>
        <h1>Policy of Summary of 1995</h1>
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
        <h1><strong>Treasury: {{ 1.6}} billion</strong></h1>
    </div>
</div>
</template>

<script>
export default {
    name: 'Policy',
    data() {
        return {

        }
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
    },
    methods: {

    },
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
    background-color:orange;
}

thead tr th {
    padding: 20px;
    text-align: left;
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
