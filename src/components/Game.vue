<template>
<div>
    <div id="head">
        <h1>Balance of the Planet</h1>
    </div>
    <el-divider></el-divider>
    <div id="nav">
        <button @click="back">Back</button>
        <button @click="forward">Forward</button>
        <button @click="toPolicy">Policy</button>
        <button id="btn-sub" @click="toResults">Results</button>
        <button>About this Game</button>
        <button @click="toConnections">Connections</button>
        <button @click="newGame">New Game</button>
        <button @click="showSimulation">Show Simulation</button>
        <button @click="stopSimulation">Stop Simulation</button>
        <button @click="execute">Execute</button>
    </div>
    <div>
        <router-view v-slot="{ Component }" :show="show" :executed="executed"
                    @changeCoalTaxRate="changeCoalTaxRate($event)" @changeCoalUserate="changeCoalUserate($event)" 
                    @changeCoalPriceFactor="changeCoalPriceFactor($event)" @changeCoalSupplyElasticity="changeCoalSupplyElasticity($event)"
                    :coalUse="coalUse" :totalCoalUse="totalCoalUse" :coalPrice="coalPrice" :coalSupply="coalSupply" :coalTaxRate="coalTaxRate"
                    
                    @changeOilTaxRate="changeOilTaxRate($event)" @changeOilUseRate="changeOilUseRate($event)"  
                    @changeOilPriceFactor="changeOilPriceFactor($event)" @changeOilSupplyElasticity="changeOilSupplyElasticity($event)" 
                    :oilTaxRate="oilTaxRate" :oilSupply="oilSupply" :totalOilUse="totalOilUse" :oilPrice="oilPrice" :oilUse="oilUse"
                     
                    @changeNaturalGasTaxRate="changeNaturalGasTaxRate($event)" @changeNaturalGasUseRate="changeNaturalGasUseRate($event)"
                    @changeNaturalGasPriceFactor="changeNaturalGasPriceFactor($event)" @changeNaturalGasSupply="changeNaturalGasSupplyElasticity($event)"
                    :naturalGasTaxRate="naturalGasTaxRate"  :naturalGasUse="naturalGasUse" :naturalGasPrice="naturalGasPrice" :naturalGasSupply="naturalGasSupply" :totalNaturalGasUse="totalNaturalGasUse" 

                    @changeNuclearTaxRate="changeNuclearTaxRate($event)" @changeNuclearUseRate="changeNulearUseRate($event)"
                    @changeNuclearPriceFactor="changeNuclearPriceFactor($event)" @changeNuclearSupplyElasticity="changeNuclearSupplyElasticity($event)"
                    :nuclearTaxRate="nuclearTaxRate"  :nuclearUse="nuclearUse" :nuclearPrice="nuclearPrice"  :nuclearSupply="nuclearSupply" :totalNuclearUse="totalNuclearUse" 
                    
                    :coalTaxIncome="coalTaxIncome" :oilTaxIncome="oilTaxIncome" :naturalGasTaxIncome="naturalGasTaxIncome" :nuclearTaxIncome="nuclearTaxIncome"

                    @changeSolarEnergySubsidy="changeSolarEnergySubsidy($event)" @changeSolarUseRate="changeSolarUseRate($event)" @changeSoalrEnergyPotential="changeSolarEnergyPotential($event)"
                    :solarEnergySubsidy="solarEnergySubsidy"  :solarUse="solarUse" :solarEnergyTreasury="solarEnergyTreasury" :solarPrice="solarPrice"

                    @changeSolarOptimism="changeSolarOptimism($event)" @changeSolarResearchSubsidy="changeSolarResearchSubsidy($event)"
                    @changeBasicResearchSubsidy="changeBasicResearchSubsidy($event)" @changeBioResearchSubsidy="changeBioResearchSubsidy($event)"
                    @changeBioOptimism="changeBioOptimism($event)"  @changeCoalResearchSubsidy="changeCoalResearchSubsidy($event)" 
                    @changeCoalOptimism="changeCoalOptimism($event)"  @changeOilResearchSubsidy="changeOilResearchSubsidy($event)" 
                    @changeOilOptimism="changeOilOptimism($event)" @changeNuclearResearchSubsidy="changeNuclearResearchSubsidy($event)"
                    @changeNuclearOptimism="changeNuclearOptimism($event)"  @changeDamSubsidy="changeDamSubsidy($event)"
                    :solarTechnology="solarTechnology" :solarResearchTreasury="solarResearchTreasury" :solarResearch="solarResearch" 
                    :basicResearch="basicResearch" :basicResearchTreasury="basicResearchTreasury" :bioResearch="bioResearch"  
                    :bioTechnology="bioTechnology" :bioResearchTreasury="bioResearchTreasury" :coalResearch="coalResearch"  
                    :coalTechnology="coalTechnology" :coalResearchTreasury="coalResearchTreasury" :oilResearch="oilResearch" 
                    :oilTechnology="oilTechnology" :oilResearchTreasury="oilResearchTreasury"  :nuclearResearch="nuclearResearch"  
                    :nuclearTechnology="nuclearTechnology" :nuclearResearchTreasury="nuclearResearchTreasury" 
                   
                    @changeDamUseRate="changeDamUseRate($event)" @changeDamPotential="changeDamPotential($event)"
                    :damUseTreasury="damUseTreasury" :damSubsidy="damSubsidy" :damUse="damUse" :damPrice="damPrice" 
                    
                    @changeCO2Quantity="changeCO2Quantity($event)" @changeTemperatureT0="changeTemperatureT0($event)" 
                    @changeCO2Eff="changeCO2Eff($event)" @changeBasicTemperature="changeBasicTemperature($event)"
                    :co2Eff="co2Eff" :basicTemperature="basicTemperature" :globalTemperature="globalTemperature" :co2="co2"

                    @changeMeltingRate="changeMeltingRate($event)" 
                    :seeLevel="seeLevel" 
                    @changeC1Quantity="changeC1Quantity($event)" @changeNO2Quantity="changeNO2Quantity($event)" 
                    :no2="no2" 
                    @changeSulfurContent="changeSO2Quantity($event)" :so2="so2" 

                    :energyDemand="energyDemand" :aveEnergyPrice="aveEnergyPrice" 
                    @changePriceElasticity="changePriceElasticity($event)" 

                    :energyConservation="energyConservation" :netEnergy="netEnergy" 
                    
                    @changeC4Value="changeC4Value($event)" :lifestyle="lifestyle" 
                    @changeLifeValue="changeLifeValue($event)" :qualityOfLife="qualityOfLife" 
                    
                    @changeBirthRate="changeBirthRate($event)" :birthRate="birthRate" :population="population" 
                    
                    :nonrenewableEnergy="nonrenewableEnergy" :sustainability="sustainability"
                    @changeSustainability="changeSustainability($event)" :sustainabilityPts="sustainabilityPts" 
                    
                    @changeValueOfQualityOfLife="changeQualityOfLife($event)" :qualityPoints="qualityPoints"
                    
                    :totalTreasury="totalTreasury" :totalPoints="totalPoints">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
        <!--recieve the function from children and send variable to children durch v-on und v-bind-->
    </div>
</div>
</template>

<script>
export default {
    name: "Game",
    data() {
        return {
            /* Simulation */
            show: false,
            /***Coal***/
            coalTaxRate: 250 * Math.pow(10, 6), //right
            totalCoalUse: 4080,//right
            coalUse: 76.3, //right
            coaluserate: 0.257,//right
            coalPrice: 24.9 * Math.pow(10, 9),//right
            coalPriceFactor: Math.pow(10,13),//right
            coalSupply: 299000, //right
            coalSupplyElasticity: 1.2*Math.pow(10,-5),//right
            /***Oil***/
            oilTaxRate: 250 * Math.pow(10, 6),//right
            oilUse: 178,//right
            oiluserate: 0.6,//right
            oilPrice: 25.1 * Math.pow(10, 9),//right
            oilPriceFactor: 1000*Math.pow(10,9),//right
            oilSupply: 9880,//right
            oilSupplyElasticity: 7.6*Math.pow(10,-7),//right
            totalOilUse: 9180,//right
            /*Natural Gas */
            naturalGasTaxRate: 250 * Math.pow(10, 6),//right
            naturalGasUse: 65.3,//right
            naturalGasuserate: 0.263,//right
            naturalGasPrice: 25.0 * Math.pow(10, 9),//right
            naturalGasPriceFactor: 1000*Math.pow(10,9),//right
            naturalGasSupply: 7130,//right
            naturalGasSupplyElasticity: Math.pow(10,-6),//right
            totalNaturalGasUse: 2060,//right
            /*nuclear*/
            nuclearTaxRate: 250 * Math.pow(10, 6),//right
            nuclearUse: 8.91,//right
            nuclearUseRate: 0.215,//right
            nuclearPrice: 24.9 * Math.pow(10, 9),//right
            nuclearPriceFactor: 23000*Math.pow(10,9),//right
            nuclearSupply: 11900,//right
            nuclearSupplyElasticity: Math.pow(10,-7),//right
            totalNuclearUse: 108,//right

            /*research Income*/
            coalTaxIncome:19.07*Math.pow(10,9),//right
            oilTaxIncome:44.5*Math.pow(10,9),//right
            naturalGasTaxIncome:16.32*Math.pow(10,9),//right
            nuclearTaxIncome:2.22*Math.pow(10,9),//right

            /*solar */
            solarEnergySubsidy: 0.08,//right
            solarUse: 12.1,//right
            solarUseRate: 0.12,//right
            solarPrice: 24.8 * Math.pow(10, 9),//right
            solarEnergyPotential: Math.pow(10,-9),//right
            solarEnergyTreasury: 3.18 * Math.pow(10, 9),//right
            /*technology*/
            solarTechnology: 1.02,//right
            solarOptimism:0.0012,//right
            bioTechnology: 1.02,//right
            bioOptimism:0.0012,//right
            coalTechnology: 1.01,//right
            coalOptimism:0.0012,//right
            oilTechnology: 1.01,//right
            oilOptimism:0.0012,//right
            nuclearTechnology: 1.02,//right
            nuclearOptimism:0.0012,//right
            /*Research*/
            solarResearch: 0.08,//right
            basicResearch: 0.08,//right
            bioResearch: 0.08,//right
            coalResearch: 0.08,//right
            oilResearch: 0.08,//right
            nuclearResearch: 0.08,//right
            solarResearchTreasury: 3.18 * Math.pow(10, 9),//right
            basicResearchTreasury: 3.18 * Math.pow(10, 9),//right
            bioResearchTreasury: 3.18 * Math.pow(10, 9),//right
            coalResearchTreasury: 3.18 * Math.pow(10, 9),//right
            oilResearchTreasury: 3.18 * Math.pow(10, 9),//right
            nuclearResearchTreasury: 3.18 * Math.pow(10, 9),//right
            totalTreasury: 39.83* Math.pow(10,9), //right
            /*dam */
            damUseTreasury: 3.18 * Math.pow(10, 9),//right
            damSubsidy: 0.08,//right
            damUse: 18,//right
            damUseRate: 0.12,//right
            damPrice: 25.0 * Math.pow(10, 9),//right
            damPotential: Math.pow(10,-9),//right
            /*common*/
            co2: 2.72 * Math.pow(10, 12),//right
            co2Quantity:20*Math.pow(10,6),//right
            globalTemperature: 60.3,//right
            t0:56,//right
            co2Eff: Math.pow(10,-12),//right
            basicTemperature: 60,//right
            meltingRate:0.5,//right
            seeLevel: 0.14,//right
            no2: 49.1 * Math.pow(10, 6),//right
            c1: 280000,//right
            c2: 150000,//right
            so2: 58.9 * Math.pow(10, 6),//right
            sulfurContent:600000,//right
            energyDemand: 303,//right
            aveEnergyPrice: 25.2 * Math.pow(10, 9),//right
            priceElasticity: 0.0001,//right
            energyConservation: 60.3,//right
            netEnergy: 419,//right 
            nonrenewableEnergy: 328, //right
            renewableEnergy:30.1, //right
            lifestyle: 2.12 * Math.pow(10, 9),//right
            c4:8*Math.pow(10,6),//right
            qualityOfLife: 1.03,//right
            population: 5.26 * Math.pow(10, 9),//right
            starvation:41.4*Math.pow(10,6),//应该进行变化
            birthRate: 0.0197,//right
            maximalBirthRate:5,//right
            sustainability: 0.17,//right
            sustainabilityPts: 681,//right
            valueOfSustainability:4000,//right
            qualityPoints: 7702,//right
            valueOfQualityOfLife:7500,//right
            totalPoints:8383,
            lifeValue:2.0,//right
            year:1990,//right
            executed:0,
        }
    },
    methods: {
        back() {
            window.history.back();
        },
        forward() {
            window.history.forward();
        },
        toPolicy() {
            this.name = "Policy";
            this.$router.push("/game/policy");
        },
        toResults() {
            this.$router.push("/game/results");
        },
        toConnections() {
            this.$router.push("/connections");
        },
        newGame(){
            localStorage.clear();
            this.$router.go(0);
            this.$router.push("/game/policy");
        },
        showSimulation() {
            this.show = true;
        },
        stopSimulation() {
            this.show = false;
        },
        calculateTaxIncome(){
            this.coalTaxIncome = parseInt(this.coalTaxRate * this.coalUse * 100) / 100;
            this.oilTaxIncome = parseInt(this.oilTaxRate * this.oilUse * 100 ) / 100;
            this.naturalGasTaxIncome = parseInt(this.naturalGasTaxRate * this.naturalGasUse * 100) / 100;
            this.nuclearTaxIncome = parseInt(this.nuclearTaxRate * this.nuclearUse * 100) / 100;
            /*print all parameters*/
            console.log("coalTaxIncome = coalTaxRate * coalUse: ");
            console.log("coalTaxIncome: "+this.coalTaxIncome);
            console.log("coalTaxRate: " + this.coalTaxRate);
            console.log("coalUse: "+ this.coalUse);
            console.log("===============================================")
            console.log("oilTaxIncome = oilTaxRate * oilUse: ");
            console.log("oilTaxIncome: "+this.oilTaxIncome);
            console.log("oilTaxRate: "+this.oilTaxRate);
            console.log("oilUse: " + this.oilUse);
            console.log("===============================================")
            console.log("naturalGasTaxIncome = naturalGasTaxRate * naturalGasUse: ");
            console.log("naturalGasTaxIncome: " + this.naturalGasTaxIncome);
            console.log("naturalGasTaxRate: " + this.naturalGasTaxRate);
            console.log("naturalGasUse:" + this.naturalGasUse);
            console.log("===============================================")
            console.log("nuclearTaxIncome = oilTaxRate * oilUse: ");
            console.log("nuclearTaxIncome: "+this.nuclearTaxIncome);
            console.log("nuclearTaxRate: " + this.nuclearTaxRate)
            console.log("nuclearUse: "   + this.nuclearUse)
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateTotalPoints(){
            this.totalPoints = this.qualityPoints + this.sustainabilityPts;
        },
        calculateCoalFormulas(){
            this.coalUse = this.coaluserate * this.energyDemand * this.aveEnergyPrice / (this.coalPrice + this.coalTaxRate);//对
            this.coalPrice = (this.coalPrice + (this.coalPriceFactor * this.coalUse / this.coalSupply)) / 2; //对
            this.coalSupply = this.coalSupplyElasticity * this.coalPrice - this.totalCoalUse;//对
            this.totalCoalUse = this.totalCoalUse + this.coalUse;//对
            /*print all */
            console.log("coalUse = coalUserate * energyDemand * aveEnergyPrice / (coalPrice + coalTaxRate)");
            console.log("coalUse: "+this.coalUse);
            console.log("coalUserate: "+this.coaluserate);
            console.log("energyDemand: "+this.energyDemand);
            console.log("aveEnergyPrice: "+this.aveEnergyPrice);
            console.log("coalPrice: "+this.coalPrice);
            console.log("coalTaxRate: "+this.coalTaxRate);
            console.log("====================================================================================")
            console.log("coalPrice = coalPriceFactor * coalUse / coalSupply");
            console.log("coalPrice: "+ this.coalPrice)
            console.log("coalPriceFactor: "+ this.coalPriceFactor)
            console.log("coalUse: "+ this.coalUse)
            console.log("coalSupply: "+ this.coalSupply)
            console.log("====================================================================================")
            console.log("coalSupply = coalSupplyElasticity * coalPrice - totalCoalUse")
            console.log("coalSupply: "+ this.coalSupply)
            console.log("coalSupplyElasticity: "+ this.coalSupplyElasticity)
            console.log("coalPrice: "+ this.coalPrice)
            console.log("totalCoalUse: "+ this.totalCoalUse)
            console.log("====================================================================================")
            console.log("this.totalCoalUse = this.totalCoalUse + this.coalUse");
            console.log("totalCoalUse: " + this.totalCoalUse)
            console.log("totalCoalUse: " + this.totalCoalUse)
            console.log("coalUse: " + this.coalUse)
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateOilFormulas(){
            this.oilUse = this.oiluserate * this.energyDemand * this.aveEnergyPrice / (this.oilPrice + this.oilTaxRate);//对
            this.oilPrice = (this.oilPrice + (this.oilPriceFactor * this.oilUse / this.oilSupply)) / 2 //对;
            this.oilSupply = this.oilSupplyElasticity * this.oilPrice - this.totalOilUse;// 对
            this.totalOilUse = this.totalOilUse + this.oilUse;//对
            /*print*/
            console.log("this.oilUse = this.oiluserate * this.energyDemand * this.aveEnergyPrice / (this.oilPrice + this.oilTaxRate)");
            console.log("oilUse: "+ this.oilUse)
            console.log("oilUserate: "+ this.oiluserate)
            console.log("energyDemand: "+ this.energyDemand)
            console.log("aveEnergyPrice: "+ this.aveEnergyPrice)
            console.log("oilPrice: "+ this.oilPrice)
            console.log("oilTaxRate: "+ this.oilTaxRate)
            console.log("==========================================================================================================")
            console.log("this.oilPrice = this.oilPriceFactor * this.oilUse / this.oilSupply");
            console.log("oilPrice: " + this.oilPrice)
            console.log("oilPriceFactor: " + this.oilPriceFactor)
            console.log("oilUse: " + this.oilUse)
            console.log("oilSupply: " + this.oilSupply)
            console.log("===========================================================================================================")
            console.log("this.oilSupply = this.oilSupplyElasticity * this.oilPrice - this.totalOilUse");
            console.log("oilSupply: " + this.oilSupply)
            console.log("oilSupplyElasticity: " + this.oilSupplyElasticity)
            console.log("oilPrice: " + this.oilPrice)
            console.log("totalOilUse: " + this.totalOilUse)
            console.log("============================================================================================================")
            console.log("this.totalOilUse = this.totalOilUse + this.oilUse");
            console.log("totalOilUse: " + this.totalOilUse)
            console.log("totalOilUse: " + this.totalOilUse)
            console.log("oilUse: " + this.oilUse)
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateNaturalGasFormulas(){
            this.naturalGasUse = this.naturalGasuserate * this.energyDemand * this.aveEnergyPrice / (this.naturalGasPrice + this.naturalGasTaxRate); //对
            this.naturalGasPrice = (this.naturalGasPrice + (this.naturalGasPriceFactor * this.naturalGasUse / this.naturalGasSupply)) / 2;//对 minus because of supply
            this.naturalGasSupply = this.naturalGasSupplyElasticity * this.naturalGasPrice - this.totalNaturalGasUse; //对 minus    
            this.totalNaturalGasUse = this.totalNaturalGasUse + this.naturalGasUse;//对
            /*print*/
            console.log("this.naturalGasUse = this.naturalGasuserate * this.energyDemand * this.aveEnergyPrice / (this.naturalGasPrice + this.naturalGasTaxRate):");
            console.log("naturalGasUse: " + this.naturalGasUse)
            console.log("naturalGasuserate: " + this.naturalGasuserate);
            console.log("energyDemand: " + this.energyDemand);
            console.log("aveEnergyPrice: " + this.aveEnergyPrice);
            console.log("naturalGasPrice: " + this.naturalGasPrice);
            console.log("naturalGasTaxRate: " + this.naturalGasTaxRate);
            console.log("==================================================")
            console.log("this.naturalGasPrice = this.naturalGasPriceFactor * this.naturalGasUse / this.naturalGasSupply: ")
            console.log("naturalGasPrice: " + this.naturalGasPrice);
            console.log("naturalGasPriceFactor: " + this.naturalGasPriceFactor);
            console.log("naturalGasUse: " + this.naturalGasUse);
            console.log("naturalGasSupply: " + this.naturalGasSupply);
            console.log("==================================================")
            console.log("naturalGasSupply = natualGasSupplyElasticity * naturalGasPrice - totalNaturalGasUse");
            console.log("naturalGasSupply: " + this.naturalGasSupply);
            console.log("natualGasSupplyElasticity: " + this.naturalGasSupplyElasticity);
            console.log("naturalGasPrice: " + this.naturalGasPrice);
            console.log("totalNaturalGasUse: " + this.totalNaturalGasUse);
            console.log("==================================================")
            console.log("this.totalNaturalGasUse = this.totalNaturalGasUse + this.naturalGasUse: ");
            console.log("totalNaturalGasUse: " + this.totalNaturalGasUse);
            console.log("totalNaturalGasUse: " + this.totalNaturalGasUse);
            console.log("naturalGasUse: " + this.naturalGasUse);
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },

        calculateNuclearFormulas(){
            this.nuclearUse = this.nuclearUseRate * this.energyDemand * this.aveEnergyPrice / (this.nuclearPrice + this.nuclearTaxRate); //对
            this.nuclearPrice = (this.nuclearPrice + (this.nuclearPriceFactor * this.nuclearUse / this.nuclearSupply)) / 2 //对;
            this.nuclearSupply = this.nuclearSupplyElasticity * this.nuclearPrice - this.totalNuclearUse;// 对 minus
            this.totalNuclearUse = this.totalNuclearUse + this.nuclearUse;//对
            /*print*/
            console.log("this.nuclearUse = this.nuclearUseRate * this.energyDemand * this.aveEnergyPrice / (this.nuclearPrice + this.nuclearTaxRate) ====")
            console.log("nuclearUse"+this.nuclearUse)
            console.log("nuclearUserate"+this.nuclearUseRate)
            console.log("energyDemand"+this.energyDemand)
            console.log("aveEnergyPrice"+this.aveEnergyPrice)
            console.log("nuclearPrice"+this.nuclearPrice)
            console.log("nuclearTaxRate"+this.nuclearTaxRate)
            console.log("==================================================")
            console.log("this.nuclearPrice = this.nuclearPriceFactor * this.nuclearUse / this.nuclearSupply===")
            console.log("nuclearPrice: "+ this.nuclearPrice)
            console.log("nuclearPriceFactor: " + this.nuclearPriceFactor)
            console.log("nuclearUse: " + this.nuclearUse)
            console.log("nuclearSupply: " + this.nuclearSupply)
            console.log("====================================================")
            console.log("nuclearSupply = nuclearSupplyElasticity * nuclearPrice - totalNuclearUse");
            console.log("nuclearSupply: " + this.nuclearSupply)
            console.log("nuclearSupplyElasticity: " + this.nuclearSupplyElasticity)
            console.log("nuclearPrice: " + this.nuclearPrice)
            console.log("totalNuclearUse: " + this.totalNuclearUse)
            console.log("========================================================================")
            console.log("this.totalNuclearUse = this.totalNuclearUse + this.nuclearUse===");
            console.log("totalNuclearUse: " + this.totalNuclearUse)
            console.log("totalNuclearUse: " + this.totalNuclearUse)
            console.log("NuclearUse: " + this.nuclearUse)
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateDamFormulas(){
            this.damUse = (this.damUseRate * this.energyDemand * this.aveEnergyPrice + this.damUseTreasury) / this.damPrice;//对
            //this.damPrice = this.damUse / this.damPotential;
            this.damPrice = (this.damPrice + (this.damUse / this.damPotential)) / 2 //对
            /*print */
            console.log("this.damUse = (this.damUseRate * this.energyDemand * this.aveEnergyPrice + this.damUseTreasury) / this.damPrice ==="+ this.damUse + " = " + this.damUseRate + ", " + this.energyDemand + ", " + this.aveEnergyPrice + ", " + this.damUseTreasury + ", " + this.damPrice);
            console.log("this.damPrice = this.damUse / this.damPotential==="+this.damPrice + " = " + this.damUse + ", " + this.damPotential);
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateSolarFormulas(){
            this.solarUse = (this.solarUseRate * this.energyDemand * this.aveEnergyPrice + this.solarEnergyTreasury) / this.solarPrice;//对
            //this.solarPrice = this.solarUse / (this.solarEnergyPotential * this.solarTechnology);
            this.solarPrice = (this.solarPrice + (this.solarUse / (this.solarEnergyPotential * this.solarTechnology))) / 2; //对 max1 不懂
            /*print */
            console.log("this.solarUse = (this.solarUseRate * this.energyDemand * this.aveEnergyPrice + this.solarEnergyTreasury) / this.solarPrice===");
            console.log("solarUse: "+this.solarUse);
            console.log("solarUseRate: " + this.solarUseRate);
            console.log("energyDemand: " + this.energyDemand);
            console.log("aveEnergyPrice: " + this.aveEnergyPrice);
            console.log("solarEnergyTreasury: " + this.solarEnergyTreasury);
            console.log("solarPrice: " + this.solarPrice);
            console.log("==============================================================================")
            console.log("this.solarPrice = this.solarUse / (this.solarEnergyPotential * this.solarTechnology)===");
            console.log("solarPrice: " + this.solarPrice)
            console.log("solarUse: " + this.solarUse)
            console.log("solarEnergyPotential: " + this.solarEnergyPotential)
            console.log("solarTechnology: " + this.solarTechnology)
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateTechnologyFormulas(){ //对
            this.solarTechnology = this.solarTechnology + this.solarOptimism * Math.log((this.solarResearchTreasury+1)/Math.pow(10,9) * (this.basicResearchTreasury+1)/Math.pow(10,9));
            this.bioTechnology = this.bioTechnology + this.bioOptimism * Math.log((1+this.bioResearchTreasury)/Math.pow(10,9) * (this.basicResearchTreasury+1)/Math.pow(10,9))/2.3;
            this.coalTechnology = this.coalTechnology + this.coalOptimism * Math.log((this.coalResearchTreasury+1)/Math.pow(10,9) * (this.basicResearchTreasury+1)/Math.pow(10,9))/2.3;
            this.oilTechnology = this.oilTechnology + this.oilOptimism * Math.log((this.oilResearchTreasury+1)/Math.pow(10,9) * (this.basicResearchTreasury+1)/Math.pow(10,9));
            this.nuclearTechnology = this.nuclearTechnology + this.nuclearOptimism * Math.log((this.nuclearResearchTreasury + 1)/Math.pow(10,9) * (this.basicResearchTreasury+1)/Math.pow(10,9));
            console.log("==================================================================================================================")
            console.log("==================================================================================================================")
            console.log("==================================================================================================================")
            console.log("this.solarTechnology = this.solarTechnology + this.solarOptimism * this.solarResearchTreasury * this.basicResearchTreasury");
            console.log("solarTechnology====="+this.solarTechnology)
            console.log("solarOptimism====="+this.solarOptimism)
            console.log("solarResearchTreasury====="+this.solarResearchTreasury)
            console.log("basicResearchTreasury====="+this.basicResearchTreasury)
            console.log("=======================================================================================")
            console.log("this.bioTechnology = this.bioTechnology + this.bioOptimism * Math.log(this.bioResearchTreasury * this.basicResearchTreasury)")
            console.log("bioTechnology===="+this.bioTechnology)
            console.log("bioOptimism===="+this.bioOptimism)
            console.log("bioResearchTreasury===="+this.bioResearchTreasury)
            console.log("basicResearchTreasury===="+this.basicResearchTreasury)
            console.log("=======================================================================================")
            console.log("this.coalTechnology = this.coalTechnology + this.coalOptimism * this.coalResearchTreasury * this.basicResearchTreasury")
            console.log("coalTechnology===="+this.coalTechnology);
            console.log("coalOptimism===="+this.coalOptimism);
            console.log("coalResearchTreasury===="+this.coalResearchTreasury);
            console.log("basicResearchTreasury===="+this.basicResearchTreasury);
            console.log("=======================================================================================")
            console.log("this.oilTechnology = this.oilTechnology + this.oilOptimism * this.oilResearchTreasury * this.basicResearchTreasury")
            console.log("oilTechnology===="+this.oilTechnology)
            console.log("oilOptimism===="+this.oilOptimism)
            console.log("oilResearchTreasury===="+this.oilResearchTreasury)
            console.log("basicResearchTreasury===="+this.basicResearchTreasury)
            console.log("=======================================================================================")
            console.log("this.nuclearTechnology = this.nuclearTechnology + this.nuclearOptimism * this.nuclearResearchTreasury * this.basicResearchTreasury")
            console.log("nuclearTechnology"+this.nuclearTechnology)
            console.log("nuclearOptimisim"+this.nuclearOptimism)
            console.log("nuclearResearchTreasury"+this.nuclearResearchTreasury)
            console.log("basicResearchTreasury"+this.basicResearchTreasury)            
        },
        calculateAirPolutionFormulas(){
            this.co2 = this.co2 + this.co2Quantity * (this.coalUse + this.oilUse + this.naturalGasUse);//对
            this.globalTemperature = this.t0 + this.co2Eff * this.co2;//对
            this.seeLevel = (this.globalTemperature - this.basicTemperature) * this.meltingRate;//对
            this.no2 = (this.c1 * this.coalUse / this.coalTechnology) + (this.c2 * this.oilUse / this.oilTechnology);//对
            this.so2 = this.sulfurContent * this.coalUse / this.coalTechnology; //对
            console.log("=======================================================================================")
            console.log("=======================================================================================")
            console.log("=======================================================================================")
            console.log("this.co2 = this.co2 + this.co2Quantity * (this.coalUse + this.oilUse + this.naturalGasUse)")
            console.log("co2===="+this.co2)
            console.log("co2Quantity===="+this.co2Quantity)
            console.log("coalUse==="+this.coalUse)
            console.log("oilUse==="+this.oilUse)
            console.log("naturalGasUse==="+this.naturalGasUse)
            console.log("=======================================================================================")
            console.log("this.globalTemperature = this.t0 + this.co2Eff * this.co2")
            console.log("globalTemperature===="+this.globalTemperature)
            console.log("t0===="+this.t0)
            console.log("co2Eff===="+this.co2Eff)
            console.log("=======================================================================================")
            console.log("this.seeLevel = (this.globalTemperature - this.basicTemperature) * this.meltingRate")
            console.log("seeLevel===="+this.seeLevel);
            console.log("basicTemperature===="+this.basicTemperature)
            console.log("meltingRate===="+this.meltingRate)
            console.log("=======================================================================================")
            console.log("this.no2 = (this.c1 * this.coalUse / this.coalTechnology) + (this.c2 * this.oilUse / this.oilTechnology)")
            console.log("no2==="+this.no2)
            console.log("c1==="+this.c1)
            console.log("coalUse==="+this.coalUse)
            console.log("coalTechnology==="+this.coalTechnology)
            console.log("c2==="+this.c2)
            console.log("oilUse==="+this.oilUse)
            console.log("oilTechnology==="+this.oilTechnology)
            console.log("=======================================================================================")
            console.log("this.so2 = this.sulfurContent * this.coalUse / this.coalTechnology")
            console.log("sulfurContent==="+this.sulfurContent)
            console.log("coalUse==="+this.coalUse)
            console.log("coalTechnology==="+this.coalTechnology)

        },
        calculateEnergyFormulas(){
            this.energyConservation = this.priceElasticity * Math.sqrt(this.aveEnergyPrice);//对
            this.netEnergy = this.energyConservation + this.renewableEnergy + this.nonrenewableEnergy;//对
            this.renewableEnergy = this.solarUse + this.damUse; //对
            this.nonrenewableEnergy = this.coalUse + this.oilUse + this.naturalGasUse + this.nuclearUse;//对
            this.aveEnergyPrice = ((this.coalPrice + this.coalTaxRate) * this.coalUse 
                                + (this.oilPrice + this.oilTaxRate) * this.oilUse 
                                + (this.naturalGasPrice + this.naturalGasTaxIncome) * this.naturalGasUse
                                + (this.nuclearPrice + this.nuclearTaxRate) * this.nuclearUse 
                                + (this.solarPrice + 0) * this.solarUse 
                                + (this.damPrice + 0) * this.damUse) 
                                / (this.coalUse + this.oilUse + this.naturalGasUse + this.solarUse + this.damUse);//对
            console.log("===========================================================================================")
            console.log("===========================================================================================")
            console.log("===========================================================================================")
            console.log("this.energyConservation = this.priceElasticity * Math.sqrt(this.aveEnergyPrice)")
            console.log("energyConservation==="+this.energyConservation)
            console.log("priceElasticity==="+this.priceElasticity)
            console.log("aveEnergyPrice==="+this.aveEnergyPrice)
            console.log("=======================================================================================")
            console.log("this.netEnergy = this.energyConservation + this.renewableEnergy + this.nonrenewableEnergy")
            console.log("netEnergy===="+this.netEnergy)
            console.log("energyConservation===="+this.energyConservation)
            console.log("renewableEnergy===="+this.renewableEnergy)
            console.log("nonrenewableEnergy===="+this.nonrenewableEnergy)
            console.log("=======================================================================================")
            console.log("this.renewableEnergy = this.solarUse + this.damUse")
            console.log("this.solarUse ===="+this.solarUse)
            console.log("this.damUse ===="+this.damUse)
            console.log("=======================================================================================")
            console.log("nonrenewableEnergy = this.coalUse + this.oilUse + this.naturalGasUse + this.nuclearUse")
            console.log("coalUse===="+this.coalUse)
            console.log("oilUse===="+this.oilUse)
            console.log("naturalGasUse===="+this.naturalGasUse)
            console.log("nuclearUse===="+this.nuclearUse)
            console.log("aveEnergyPrice===="+this.aveEnergyPrice)
        },
        calculatePopulationFormulas(){
            this.birthRate = this.maximalBirthRate / (1 + this.qualityOfLife); //对
            this.population = this.population * (1 + this.birthRate/100) - this.starvation;//对
            console.log("===================================================================")
            console.log("===================================================================")
            console.log("===================================================================")
            console.log("this.birthRate = this.maximalBirthRate / (1 + this.qualityOfLife)")
            console.log("birthRate===="+this.birthRate)
            console.log("maximalBirthRate===="+this.maximalBirthRate)
            console.log("quality of life===="+this.qualityOfLife)
            console.log("=======================================================================================")
            console.log("this.population = this.population * (1 + this.birthRate/100) - this.starvation")
            console.log("population===="+this.population)
            console.log("birthRate===="+this.birthRate)
            console.log("starvation===="+this.starvation)
        },
        calculateSustainabilityFormulas(){
            this.sustainabilityPts = this.valueOfSustainability * this.sustainability; //对
            this.sustainability = this.renewableEnergy * (4 - this.birthRate) / (this.renewableEnergy + this.nonrenewableEnergy);//对
            console.log("===================================================================")
            console.log("===================================================================")
            console.log("===================================================================")
            console.log("this.sustainabilityPts = this.valueOfSustainability * this.sustainability")
            console.log("sustainabilityPts===="+this.sustainabilityPts)
            console.log("valueOfSustainability===="+this.valueOfSustainability)
            console.log("sustainability===="+this.sustainability)
            console.log("=======================================================================================")
            console.log("this.sustainability = this.renewableEnergy * (4 - this.birthRate) / (this.renewableEnergy + this.nonrenewableEnergy)")
            console.log("sustainability===="+this.sustainability);
            console.log("renewablEnergy===="+this.renewableEnergy);
            console.log("birthRate===="+this.birthRate);
            console.log("renewableEnergy===="+this.renewableEnergy);
            console.log("nonrenewableEnergy===="+this.nonrenewableEnergy);
        },
        calculateQualityOfLifeFormulas(){
            this.lifestyle = this.c4 * this.netEnergy;//对
            this.qualityOfLife = this.lifeValue * this.lifestyle / this.population;//对
            this.qualityPoints = this.valueOfQualityOfLife * this.qualityOfLife; // 对
            console.log("=============================================================")
            console.log("=============================================================")
            console.log("=============================================================")
            console.log("life style = this.c4 * this.netEnergy")
            console.log("lifestyle===="+this.lifestyle)
            console.log("c4===="+this.c4)
            console.log("netEnergy===="+this.netEnergy)
            console.log("=======================================================================================")
            console.log("this.qualityOfLife = this.lifeValue * this.lifestyle / this.population")
            console.log("qualityOfLife===="+this.qualityOfLife)
            console.log("lifeValue===="+this.lifeValue)
            console.log("lifeStyle===="+this.lifestyle)
            console.log("population===="+this.population)
            console.log("=======================================================================================")
            console.log("this.qualityPoints = this.valueOfQualityOfLife * this.qualityOfLife")
            console.log("qualityPoints===="+this.qualityPoints)
            console.log("valueOfQualityOfLife===="+this.valueOfQualityOfLife)
            console.log("qualityOfLife===="+this.qualityOfLife)
        },
        calculateResearchTreasury(){//对
            this.basicResearchTreasury = this.basicResearch * this.totalTreasury;
            this.bioResearchTreasury = this.bioResearch * this.totalTreasury;
            this.coalResearchTreasury = this.coalResearch * this.totalTreasury;
            this.damUseTreasury = this.damSubsidy * this.totalTreasury;
            this.nuclearResearchTreasury = this.nuclearResearch * this.totalTreasury;
            this.oilResearchTreasury = this.oilResearch * this.totalTreasury;
            this.solarEnergyTreasury = this.solarEnergySubsidy * this.totalTreasury;
            this.solarResearchTreasury = this.solarResearch * this.totalTreasury;
            this.totalTreasury = this.totalTreasury + this.coalTaxIncome + this.oilTaxIncome + this.naturalGasTaxIncome + this.nuclearTaxIncome
                                - this.basicResearchTreasury - this.bioResearchTreasury - this.coalResearchTreasury - this.oilResearchTreasury
                                - this.solarResearchTreasury - this.damUseTreasury
        },
        execute() {
            this.updated = !this.updated;
            const data1990 = {
                coalUse: 76.3,
                coalPrice: 24900000000,
                coalSupply: 299000,
                totalCoalUse: 4080,

                oilUse:178,
                oilPrice:25100000000,
                oilSupply:9880,
                totalOilUse:9180,

                naturalGasUse:65.3,
                naturalGasPrice:25000000000,
                naturalGasSupply:7130,
                totalNaturalGasUse:2060,

                nuclearUse:8.91,
                nuclearPrice:24900000000,
                nuclearSupply:11900,
                totalNuclearUse:108,

                coalTaxIncome:19.07*Math.pow(10,9),
                oilTaxIncome:44.5*Math.pow(10,9),
                naturalGasTaxIncome:16.32*Math.pow(10,9),
                nuclearTaxIncome:2.22*Math.pow(10,9),

                solarUse:12.1,
                solarPrice:24800000000,

                damUse:18,
                damPrice:25000000000,

                co2:2720000000000,
                globalTemperature:60.3,
                seeLevel:0.14,
                no2:49100000,
                so2:58900000,

                coalTechnology:1.01,
                oilTechnology:1.01,
                nuclearTechnology:1.02,
                solarTechnology:1.02,
                bioTechnology:1.02,

                aveEnergyPrice:25200000000,
                energyDemand:303,
                netEnergy:419,
                renewableEnergy:30.1,
                nonrenewableEnergy:328,
                energyConservation:60.3,

                qualityOfLife:1.03,
                qualityPoints:7702,
                lifestyle:2120000000,
                birthRate:0.0197,
                population:5260000000,

                sustainability:0.17,
                sustainabilityPts:681,

                basicResearchTreasury:3180000000,
                bioResearchTreasury:3180000000,
                coalResearchTreasury:3180000000,
                oilResearchTreasury:3180000000,
                solarResearchTreasury:3180000000,
                solarEnergyTreasury:3180000000,
                nuclearResearchTreasury:3180000000,
                damUseTreasury:3180000000,
                totalTreasury:39830000000,
                totalPoints:8383,
            }
            if(this.year==1990){
                localStorage.setItem("1990",JSON.stringify(data1990));
            }
            /*formula execute*/
            this.year++;
            console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
            console.log("<<============================================="+this.year+"======================================>");
            console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
            
            this.calculateCoalFormulas();
            this.calculateOilFormulas();
            this.calculateNaturalGasFormulas();
            this.calculateNuclearFormulas();
            this.calculateDamFormulas();
            this.calculateSolarFormulas();
            this.calculateTechnologyFormulas();
            this.calculateAirPolutionFormulas();
            this.calculateEnergyFormulas();
            this.calculatePopulationFormulas();
            this.calculateSustainabilityFormulas();
            this.calculateQualityOfLifeFormulas();          
            this.calculateTaxIncome();
            this.calculateTotalPoints();
            this.calculateResearchTreasury();

           
            console.log("energyDemand: "+this.energyDemand);
            console.log("=========================================")
            console.log("execute:coalUse:"+this.coalUse);
            console.log("execute:coalPrice:"+this.coalPrice);
            console.log("execute:coalSupply:"+this.coalSupply);
            console.log("execute:totalCoalUse:"+this.totalCoalUse);
            console.log("==========================================")
            console.log("execute:oilUse:"+this.oilUse);
            console.log("execute:oilPrice:"+this.oilPrice);
            console.log("execute:oilSupply:"+this.oilSupply);
            console.log("execute:totalOilUse:"+this.totalOilUse);
            console.log("==========================================")
            console.log("execute:naturalGasUse:"+this.naturalGasUse);
            console.log("execute:naturalGasPrice:"+this.naturalGasPrice);
            console.log("execute:naturalGasSupply:"+this.naturalGasSupply);
            console.log("execute:totalNaturalGasUse:"+this.totalNaturalGasUse);
            console.log("==========================================")
            console.log("execute:solarUse:"+this.solarUse);
            console.log("execute:solarPrice:"+this.solarPrice);
            console.log("==========================================")
            console.log("execute:damUse:"+this.damUse);
            console.log("execute:damPrice:"+this.damPrice);
            console.log("==========================================")
            console.log("CO2:"+this.co2);
            console.log("Global Tempeprature:"+this.globalTemperature);
            console.log("See Level:"+this.seeLevel);
            console.log("SO2:"+this.so2);
            console.log("NO2:"+this.no2);
            console.log("==========================================")
            console.log("Coal-Research:"+this.coalResearch)
            console.log("Coal-Technology:"+this.coalTechnology)
            console.log("Oil-Research:"+this.oilResearch)
            console.log("Oil-Technology:"+this.oilTechnology)
            console.log("Nuclear-Research:"+this.nuclearResearch)
            console.log("Nuclear-Technology:"+this.nuclearTechnology)
            console.log("Solar-Research:"+this.solarResearch)
            console.log("Solar-Technology:"+this.solarTechnology)
            console.log("Bio-Research:"+this.bioResearch)
            console.log("Bio-Technology:"+this.bioTechnology)
            console.log("Basic-Research:"+this.basicResearch)
            console.log("==========================================")
            console.log("execute:aveEnergyPrice:"+this.aveEnergyPrice);
            console.log("==========================================")
            console.log("execute:qualityPoints:"+this.qualityPoints);
            console.log("quality of life:"+this.qualityOfLife);
            console.log("==========================================")
            console.log("execute:sustainabilityPoints:"+this.sustainabilityPts);
            console.log("sustainability: " + this.sustainability);
            console.log("==========================================")
            console.log("net energy: " + this.netEnergy);
            console.log("nonrenewable Energy: " + this.nonrenewableEnergy);
            console.log("renewable Energy: " + this.renewableEnergy);
            console.log("===========================================")
            console.log("basicResearchTreasury:"+this.basicResearchTreasury);
            console.log("bioResearchTreasury:"+this.bioResearchTreasury);
            console.log("coalResearchTreasury:"+this.coalResearchTreasury);
            console.log("damUseTreasury:"+this.damUseTreasury);
            console.log("nuclearResearchTreasury:"+this.nuclearResearchTreasury);
            console.log("oilResearchTreasury:"+this.oilResearchTreasury);
            console.log("solarResearchTreasury:"+this.solarResearchTreasury);
            console.log("solarEnergyTreasury:"+this.solarEnergyTreasury);

            const data = {
                coalUse: this.coalUse,
                coalPrice: this.coalPrice,
                coalSupply: this.coalSupply,
                totalCoalUse: this.totalCoalUse,

                oilUse:this.oilUse,
                oilPrice:this.oilPrice,
                oilSupply:this.oilSupply,
                totalOilUse:this.totalOilUse,

                naturalGasUse:this.naturalGasUse,
                naturalGasPrice:this.naturalGasPrice,
                naturalGasSupply:this.naturalGasSupply,
                totalNaturalGasUse:this.totalNaturalGasUse,

                nuclearUse:this.nuclearUse,
                nuclearPrice:this.nuclearPrice,
                nuclearSupply:this.nuclearSupply,
                totalNuclearUse:this.totalNuclearUse,

                coalTaxIncome:this.coalTaxIncome,
                oilTaxIncome:this.oilTaxIncome,
                naturalGasTaxIncome:this.naturalGasTaxIncome,
                nuclearTaxIncome:this.nuclearTaxIncome,

                solarUse:this.solarUse,
                solarPrice:this.solarPrice,

                damUse:this.damUse,
                damPrice:this.damPrice,

                co2:this.co2,
                globalTemperature:this.globalTemperature,
                seeLevel:this.seeLevel,
                no2:this.no2,
                so2:this.so2,

                coalResearch:this.coalResearch,
                coalTechnology:this.coalTechnology,
                oilResearch:this.oilResearch,
                oilTechnology:this.oilTechnology,
                nuclearResearch:this.nuclearResearch,
                nuclearTechnology:this.nuclearTechnology,
                solarResearch:this.solarResearch,
                solarTechnology:this.solarTechnology,
                bioResearch:this.bioResearch,
                bioTechnology:this.bioTechnology,
                basicResearch:this.basicResearch,

                aveEnergyPrice:this.aveEnergyPrice,
                energyDemand:this.energyDemand,
                netEnergy:this.netEnergy,
                renewableEnergy:this.renewableEnergy,
                nonrenewableEnergy:this.nonrenewableEnergy,
                energyConservation:this.energyConservation,

                qualityOfLife:this.qualityOfLife,
                qualityPoints:this.qualityPoints,
                lifestyle:this.lifestyle,

                population:this.population,
                birthRate:this.birthRate,

                sustainability:this.sustainability,
                sustainabilityPts:this.sustainabilityPts,

                basicResearchTreasury:this.basicResearchTreasury,
                bioResearchTreasury:this.bioResearchTreasury,
                coalResearchTreasury:this.coalResearchTreasury,
                oilResearchTreasury:this.oilResearchTreasury,
                solarResearchTreasury:this.solarResearchTreasury,
                solarEnergyTreasury:this.solarEnergyTreasury,
                nuclearResearchTreasury:this.nuclearResearchTreasury,
                damUseTreasury:this.damUseTreasury,
                totalTreasury:this.totalTreasury,
                totalPoints:this.totalPoints,
            }

            //localStorage.setItem(this.year,JSON.stringify(data)); 
            //to be saved is from the year 1991
            
            localStorage.setItem(this.year,JSON.stringify(data));
            this.energyDemand = this.energyDemand * 1.01;
/*
            let coalUse = JSON.parse(localStorage.getItem("year"+this.year)).coalUse;
            let coalPrice = JSON.parse(localStorage.getItem("year"+this.year)).coalPrice;
            let coalSupply = JSON.parse(localStorage.getItem("year"+this.year)).coalSupply;
            let totalCoalUse = JSON.parse(localStorage.getItem("year"+this.year)).totalCoalUse;

            let oilUse = JSON.parse(localStorage.getItem("year"+this.year)).oilUse;
            let oilPrice = JSON.parse(localStorage.getItem("year"+this.year)).oilPrice;
            let oilSupply = JSON.parse(localStorage.getItem("year"+this.year)).oilSupply;
            let totalOilUse = JSON.parse(localStorage.getItem("year"+this.year)).totalOilUse;

            let naturalGasUse = JSON.parse(localStorage.getItem("year"+this.year)).naturalGasUse;
            let naturalGasPrice = JSON.parse(localStorage.getItem("year"+this.year)).naturalGasPrice;
            let naturalGasSupply = JSON.parse(localStorage.getItem("year"+this.year)).naturalGasSupply;
            let totalNaturalGasUse = JSON.parse(localStorage.getItem("year"+this.year)).totalNaturalGasUse;

            let nuclearUse = JSON.parse(localStorage.getItem("year"+this.year)).nuclearUse;
            let nuclearPrice = JSON.parse(localStorage.getItem("year"+this.year)).nuclearPrice;
            let nuclearSupply = JSON.parse(localStorage.getItem("year"+this.year)).nuclearSupply;
            let totalNuclearUse = JSON.parse(localStorage.getItem("year"+this.year)).totalNuclearUse;
            
            let solarUse = JSON.parse(localStorage.getItem("year"+this.year)).solarUse;
            let solarPrice = JSON.parse(localStorage.getItem("year"+this.year)).solarPrice;

            let damUse = JSON.parse(localStorage.getItem("year"+this.year)).damUse;
            let damPrice = JSON.parse(localStorage.getItem("year"+this.year)).damPrice;

            let co2 = JSON.parse(localStorage.getItem("year"+this.year)).co2;
            let so2 = JSON.parse(localStorage.getItem("year"+this.year)).so2;
            let no2 = JSON.parse(localStorage.getItem("year"+this.year)).no2;
            let globalTemperature = JSON.parse(localStorage.getItem("year"+this.year)).globalTemperature;
            let seeLevel = JSON.parse(localStorage.getItem("year"+this.year)).seeLevel;

            let coalResearch = JSON.parse(localStorage.getItem("year"+this.year)).coalResearch;
            let coalTechnology = JSON.parse(localStorage.getItem("year"+this.year)).coalTechnology;
            let oilResearch = JSON.parse(localStorage.getItem("year"+this.year)).oilResearch;
            let oilTechnology = JSON.parse(localStorage.getItem("year"+this.year)).oilTechnology;
            let nuclearResearch = JSON.parse(localStorage.getItem("year"+this.year)).nuclearResearch;
            let nuclearTechnology = JSON.parse(localStorage.getItem("year"+this.year)).nuclearTechnology;
            let solarResearch = JSON.parse(localStorage.getItem("year"+this.year)).solarResearch;
            let solarTechnology = JSON.parse(localStorage.getItem("year"+this.year)).solarTechnology;
            let bioResearch = JSON.parse(localStorage.getItem("year"+this.year)).bioResearch;
            let bioTechnology = JSON.parse(localStorage.getItem("year"+this.year)).bioTechnology;
            let basicResearch = JSON.parse(localStorage.getItem("year"+this.year)).basicResearch;

            let aveEnergyPrice = JSON.parse(localStorage.getItem("year"+this.year)).aveEnergyPrice;
            let qualityOfLife = JSON.parse(localStorage.getItem("year"+this.year)).qualityOfLife;
            let qualityPoints = JSON.parse(localStorage.getItem("year"+this.year)).qualityPoints;
            let sustainability = JSON.parse(localStorage.getItem("year"+this.year)).sustainability;
            let sustainabilityPts = JSON.parse(localStorage.getItem("year"+this.year)).sustainabilityPts;

            let netEnergy = JSON.parse(localStorage.getItem("year"+this.year)).netEnergy;
            let renewableEnergy = JSON.parse(localStorage.getItem("year"+this.year)).renewableEnergy;
            let nonrenewableEnergy = JSON.parse(localStorage.getItem("year"+this.year)).nonrenewableEnergy;

            let basicResearchTreasury = JSON.parse(localStorage.getItem("year"+this.year)).basicResearchTreasury;
            let bioResearchTreasury = JSON.parse(localStorage.getItem("year"+this.year)).bioResearchTreasury;
            let coalResearchTreasury = JSON.parse(localStorage.getItem("year"+this.year)).coalResearchTreasury;
            let oilResearchTreasury = JSON.parse(localStorage.getItem("year"+this.year)).oilResearchTreasury;
            let nuclearResearchTreasury = JSON.parse(localStorage.getItem("year"+this.year)).nuclearResearchTreasury;
            let solarResearchTreasury = JSON.parse(localStorage.getItem("year"+this.year)).solarResearchTreasury;
            let solarEnergyTreasury = JSON.parse(localStorage.getItem("year"+this.year)).solarEnergyTreasury;
            let damUseTreasury = JSON.parse(localStorage.getItem("year"+this.year)).damUseTreasury;


            console.log("coalUse: "+coalUse);
            console.log("coalPrice: "+coalPrice);
            console.log("coalSupply: "+coalSupply);
            console.log("totalCoalUse: "+totalCoalUse);
            console.log("oilUse: "+oilUse);
            console.log("oilPrice: "+oilPrice);
            console.log("oilSupply: "+oilSupply);
            console.log("totalOilUse: "+totalOilUse);
            console.log("naturalGasUse: "+naturalGasUse);
            console.log("naturalGasPrice: "+naturalGasPrice);
            console.log("naturalGasSupply: "+naturalGasSupply);
            console.log("totalNaturalGasUse: "+totalNaturalGasUse);
            console.log("nuclearUse: "+nuclearUse);
            console.log("nuclearPrice: "+nuclearPrice);
            console.log("nuclearSupply: "+nuclearSupply);
            console.log("totalNuclearUse: "+totalNuclearUse);
            console.log("solarUse: "+solarUse);
            console.log("solarPrice: "+solarPrice);
            console.log("damUse: "+damUse);
            console.log("damPrice: "+damPrice);
            console.log("co2: "+co2);
            console.log("so2: "+so2);
            console.log("no2: "+no2);
            console.log("globalTemperature: "+globalTemperature);
            console.log("seeLevel: "+seeLevel);
            console.log("Coal-Research: "+coalResearch)
            console.log("Coal-Technology: "+coalTechnology)
            console.log("Oil-Research: "+oilResearch)
            console.log("Oil-Technology: "+oilTechnology)
            console.log("Nuclear-Research: "+nuclearResearch)
            console.log("Nuclear-Technology: "+nuclearTechnology)
            console.log("Solar-Research: "+solarResearch)
            console.log("Solar-Technology: "+solarTechnology)
            console.log("Bio-Research: "+bioResearch)
            console.log("Bio-Technology: "+bioTechnology)
            console.log("Basic-Research: "+basicResearch)
            console.log("aveEnergyPrice: "+aveEnergyPrice);
            console.log("qualityPoints: "+qualityPoints);
            console.log("quality of life: "+qualityOfLife);
            console.log("sustainabilityPoints: "+sustainabilityPts);
            console.log("sustainability: " + sustainability);
            console.log("net energy: " + netEnergy);
            console.log("nonrenewable Energy: " + nonrenewableEnergy);
            console.log("renewable Energy: " + renewableEnergy);
            console.log("basicResearchTreasury:"+basicResearchTreasury);
            console.log("bioResearchTreasury:"+bioResearchTreasury);
            console.log("coalResearchTreasury:"+coalResearchTreasury);
            console.log("damUseTreasury:"+damUseTreasury);
            console.log("nuclearResearchTreasury:"+nuclearResearchTreasury);
            console.log("oilResearchTreasury:"+oilResearchTreasury);
            console.log("solarResearchTreasury:"+solarResearchTreasury);
            console.log("solarEnergyTreasury:"+solarEnergyTreasury);
*/
            this.executed++;
            

        },
        /* coal */
        changeCoalTaxRate(coalTaxRate) {
            this.coalTaxRate = coalTaxRate * Math.pow(10, 9);
        },
        changeCoalUserate(coaluserate) {
            this.coaluserate = coaluserate;
        },
        changeCoalPriceFactor(coalPriceFactor) {
            this.coalPriceFactor = coalPriceFactor * Math.pow(10,12);
        },
        changeCoalSupplyElasticity(coalSupplyElasticity) {
            this.coalSupplyElasticity = coalSupplyElasticity;
        },
        /* oil */
        changeOilTaxRate(oilTaxRate) {
            this.oilTaxRate = oilTaxRate * Math.pow(10, 9);
        },
        changeOilUseRate(oilUseRate) {
            this.oiluserate = oilUseRate;
        },
        changeOilPriceFactor(oilPriceFactor) {
            this.oilPriceFactor = oilPriceFactor * Math.pow(10,9);
        },
        changeOilSupplyElasticity(oilSupplyElasticity) {
            this.oilSupplyElasticity = oilSupplyElasticity;
        },
        /*natural gas */
        changeNaturalGasTaxRate(naturalGasTaxRate) {
            this.naturalGasTaxRate = naturalGasTaxRate * Math.pow(10, 9);
        },
        changeNaturalGasUseRate(naturalGasUseRate) {
            this.naturalGasuserate = naturalGasUseRate;
        },
        changeNaturalGasPriceFactor(naturalGasPriceFactor) {
            this.naturalGasPriceFactor = naturalGasPriceFactor  * Math.pow(10,9);
        },
        changeNaturalGasSupplyElasticity(naturalGasSupplyElasticity) {
            this.naturalGasSupplyElasticity = naturalGasSupplyElasticity;
        },
        /*nuclear */
        changeNuclearTaxRate(nuclearTaxRate) {
            this.nuclearTaxRate = nuclearTaxRate * Math.pow(10, 9);
        },
        changeNulearUseRate(nuclearUseRate) {
            this.nuclearUseRate = nuclearUseRate;
        },
        changeNuclearPriceFactor(nuclearPriceFactor) {
            this.nuclearPriceFactor = nuclearPriceFactor  * Math.pow(10,9);
        },
        updateNuclearSupplyElasticity(nuclearSupplyElasticity) {
            this.nuclearSupplyElasticity = nuclearSupplyElasticity;
        },
        /*dam */
        changeDamSubsidy(damSubsidy) {
            this.damSubsidy = damSubsidy;
        },
        changeDamUseRate(damUseRate) {
            this.damUseRate = damUseRate;
        },
        changeDamPotential(damPotential) {
            this.damPotential = damPotential;
        },
        /*solar */
        changeSolarEnergySubsidy(solarEnergySubsidy) {
            this.solarEnergySubsidy = solarEnergySubsidy;
        },
        changeSolarUseRate(solarUseRate) {
            this.solarUseRate = solarUseRate;
        },
        changeSolarEnergyPotential(solarEnergyPotential) {
            this.solarEnergyPotential = solarEnergyPotential;
        },
        /*research and technology*/
        changeSolarOptimism(solarOptimism) {
            this.solarOptimism = solarOptimism;
        },
        changeSolarResearchSubsidy(solarResearchSubsidy) {
            this.solarResearch = solarResearchSubsidy;
        },
        changeBasicResearchSubsidy(basicResearchSubsidy) {
            this.basicResearch = basicResearchSubsidy;
        },
        changeBioResearchSubsidy(bioResearchSubsidy) {
            this.bioResearch = bioResearchSubsidy;
        },
        changeBioOptimism(bioOptimism) {
            this.bioOptimism = bioOptimism;
        },
        changeCoalResearchSubsidy(coalResearchSubsidy) {
            this.coalResearch = coalResearchSubsidy;
        },
        changeCoalOptimism(coalOptimism) {
            this.coalOptimism = coalOptimism;
        },
        changeOilResearchSubsidy(coalResearchSubsidy) {
            this.coalResearch = coalResearchSubsidy;
        },
        changeOilOptimism(oilOptimism) {
            this.oilOptimism = oilOptimism;
        },
        changeNuclearResearchSubsidy(nuclearResearchSubsidy) {
            this.nuclearResearch = nuclearResearchSubsidy;
        },
        changeNuclearOptimism(nuclearOptimism) {
            this.nuclearOptimism = nuclearOptimism;
        },
        /*common*/
        changeCO2Quantity(co2Quantity) {
            this.co2Quantity = co2Quantity;
        },
        changeTemperatureT0(t0) {
            this.t0 = t0;
        },
        changeCO2Eff(co2Eff) {
            this.co2Eff = co2Eff;
        },
        changeBasicTemperature(basicTemperature) {
            this.basicTemperature = basicTemperature;
        },
        changeMeltingRate(meltingRate) {
            this.meltingRate = meltingRate;
        },
        changeC1Quantity(c1) {
            this.c1 = c1;
        },
        changeNO2Quantity(c2) {
            this.c2 = c2;
        },
        changeSO2Quantity(sulfurContent) {
            this.sulfurContent = sulfurContent;
        },
        changePriceElasticity(priceElasticity) {
            this.priceElasticity = priceElasticity;
        },
        changeC4Value(c4) {
            this.c4 = c4;
        },
        changeLifeValue(lifeValue) {
            this.lifeValue = lifeValue;
        },
        changeBirthRate(maximalBirthRate) {
            this.maximalBirthRate = maximalBirthRate;
        },
        changeSustainability(valueOfSustainability) {
            this.valueOfSustainability = valueOfSustainability;
        },
        changeQualityOfLife(valueOfQualityOfLife) {
            this.valueOfQualityOfLife = valueOfQualityOfLife;
        }
    }
}
</script>

<style>
#head,
#nav {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 85px;
    height: 10%;
}

#nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

#nav button {
    margin: 2px;
    width: auto;
}

#nav #btn-sub {
    margin-right: 100px;
}

.side-nav button {
    width: 300px;
    margin: 5px;
}

.picture {
    margin-top: 150px;
    margin-left: 25%;
}

.value {
    font-size: 20px;
    margin-left: 500px;
}
</style>
