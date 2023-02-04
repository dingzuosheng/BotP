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
        <button>New Game</button>
        <button>Quit</button>
        <button @click="showSimulation">Run Simulation</button>
        <button @click="stopSimulation">Stop Simulation</button>
        <button @click="execute">Execute</button>
    </div>
    <div>
        <router-view v-slot="{ Component }" :show="show" 
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
                    
                    @changeValueOfQualityOfLife="changeQualityOfLife($event)" :qualityPoints="qualityPoints">
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
            coalTaxRate: 250 * Math.pow(10, 6), //fertig
            totalCoalUse: 4080,
            coalUse: 76.3, //fertig
            coaluserate: 0.257,
            coalPrice: 24.9 * Math.pow(10, 9),
            coalPriceFactor: Math.pow(10,13),
            coalSupply: 299000, //fertig
            coalSupplyElasticity: 1.2*Math.pow(10,-5),
            /***Oil***/
            oilTaxRate: 250 * Math.pow(10, 6),
            oilUse: 178,
            oiluserate: 0.6,
            oilPrice: 25.1 * Math.pow(10, 9),
            oilPriceFactor: 1000*Math.pow(10,9),
            oilSupply: 9880,
            oilSupplyElasticity: 7.6*Math.pow(10,-7),
            totalOilUse: 9180,
            /*Natural Gas */
            naturalGasTaxRate: 250 * Math.pow(10, 6),
            naturalGasUse: 65.3,
            naturalGasuserate: 0.263,
            naturalGasPrice: 25.0 * Math.pow(10, 9),
            naturalGasPriceFactor: 1000*Math.pow(10,9),
            naturalGasSupply: 7430,
            naturalGasSupplyElasticity: Math.pow(10,-6),
            totalNaturalGasUse: 2070,
            /*nuclear*/
            nuclearTaxRate: 250 * Math.pow(10, 6),
            nuclearUse: 8.91,
            nuclearUseRate: 0.215,
            nuclearPrice: 24.9 * Math.pow(10, 9),
            nuclearPriceFactor: 23000*Math.pow(10,9),
            nuclearSupply: 11900,
            nuclearSupplyElasticity: Math.pow(10,-7),
            totalNuclearUse: 108,

            /*research Income*/
            coalTaxIncome:162.93*Math.pow(10,9),
            oilTaxIncome:625.99*Math.pow(10,9),
            naturalGasTaxIncome:616.71*Math.pow(10,9),
            nuclearTaxIncome:556*Math.pow(10,9),

            /*solar */
            solarEnergySubsidy: 0.08,
            solarUse: 12.1,
            solarUseRate: 0.12,
            solarPrice: 24.8 * Math.pow(10, 9),
            solarEnergyPotential: Math.pow(10,-11),
            solarEnergyTreasury: 109 * Math.pow(10, 9),
            /*technology*/
            solarTechnology: 1.02,
            solarOptimism:0.0012,
            bioTechnology: 1.02,
            bioOptimism:0.0012,
            coalTechnology: 1.01,
            coalOptimism:0.0012,
            oilTechnology: 1.01,
            oilOptimism:0.0012,
            nuclearTechnology: 1.02,
            nuclearOptimism:0.0012,
            /*Research*/
            solarResearch: 0.08,
            basicResearch: 0.08,
            bioResearch: 0.08,
            coalResearch: 0.08,
            oilResearch: 0.08,
            nuclearResearch: 0.08,
            solarResearchTreasury: 109 * Math.pow(10, 9),
            basicResearchTreasury: 54.5 * Math.pow(10, 9),
            bioResearchTreasury: 218 * Math.pow(10, 9),
            coalResearchTreasury: 109 * Math.pow(10, 9),
            oilResearchTreasury: 109 * Math.pow(10, 9),
            nuclearResearchTreasury: 109 * Math.pow(10, 9),
            /*dam */
            damUseTreasury: 109 * Math.pow(10, 9),
            damSubsidy: 0.08,
            damUse: 18,
            damUseRate: 0.12,
            damPrice: 25.0 * Math.pow(10, 9),
            damPotential: Math.pow(10,-11),
            /*common*/
            co2: 20 * Math.pow(10, 6),
            globalTemperature: 56,
            t0:56,
            co2Eff: Math.pow(10,-12),
            basicTemperature: 50,
            meltingRate:0.5,
            seeLevel: 2,
            no2: 49.1 * Math.pow(10, 6),
            c1: 10000,
            c2: 100000,
            so2: 58.9 * Math.pow(10, 6),
            sulfurContent:100000,
            energyDemand: 303,
            aveEnergyPrice: 25.2 * Math.pow(10, 9),
            priceElasticity: 0.0001,
            energyConservation: 60.3,
            netEnergy: 419, 
            nonrenewableEnergy: 328, 
            renewableEnergy:30.1, 
            lifestyle: 2.12 * Math.pow(10, 9),
            c4:100*Math.pow(10,3),
            qualityOfLife: 1.03,
            population: 5.26 * Math.pow(10, 9), //公式尚未套用
            starvation:41.4*Math.pow(10,6),//应该进行变化
            birthRate: 0.0197,
            maximalBirthRate:0.05,
            sustainability: 0.170,
            sustainabilityPts: 681,
            valueOfSustainability:100,
            qualityPoints: 7.70 * Math.pow(10, 3),
            valueOfQualityOfLife:100,
            lifeValue:0.1,
            year:1989,
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
            console.log("coalTaxIncome = coalTaxRate * coalUse: "+this.coalTaxIncome + " = " + this.coalTaxRate + ",  " + this.coalUse);
            console.log("oilTaxIncome = oilTaxRate * oilUse: "+this.oilTaxIncome + " = " + this.oilTaxRate + ",   " + this.oilUse);
            console.log("naturalGasTaxIncome = oilTaxRate * oilUse: "+this.naturalGasTaxIncome + " = " + this.naturalGasTaxRate + ", " + this.naturalGasUse);
            console.log("nuclearTaxIncome = oilTaxRate * oilUse: "+this.nuclearTaxIncome + " = " + this.nuclearTaxRate + ", " + this.nuclearUse);
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateCoalFormulas(){
            this.coalUse = this.coaluserate * this.energyDemand * this.aveEnergyPrice / (this.coalPrice + this.coalTaxRate);
            this.coalPrice = this.coalPriceFactor * this.coalUse / this.coalSupply;
            this.coalSupply = this.coalSupplyElasticity * this.coalPrice - this.totalCoalUse;//minus
            this.totalCoalUse = this.totalCoalUse + this.coalUse;
            /*print all */
            console.log("coalUse = coalUserate * energyDemand * aveEnergyPrice / (coalPrice + coalTaxRate) = "+ this.coalUse + " = " + this.coaluserate + ", " + this.energyDemand + ", " + this.aveEnergyPrice + ", " + this.coalPrice + ",  " + this.coalTaxRate);
            console.log("coalPrice = coalPriceFactor * coalUse / coalSupply = "+this.coalPrice + " = " + this.coalPriceFactor + ", " + this.coalUse + ", " + this.coalSupply);
            console.log("coalSupply = coalSupplyElasticity * coalPrice - totalCoalUse" + " = " + this.coalSupply + " = " + this.coalSupplyElasticity + ", " + this.coalPrice + ", "+ this.totalCoalUse)
            console.log("this.totalCoalUse = this.totalCoalUse + this.coalUse = " + this.totalCoalUse + " = " + this.totalCoalUse + ", " + this.coalUse);
            console.log("this.totalCoalUse = this.totalCoalUse + this.coalUse = " + this.totalCoalUse + " = " + this.totalCoalUse + ", " + this.coalUse);
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateOilFormulas(){
            this.oilUse = this.oiluserate * this.energyDemand * this.aveEnergyPrice / (this.oilPrice + this.oilTaxRate);
            this.oilPrice = this.oilPriceFactor * this.oilUse / this.oilSupply;
            this.oilSupply = this.oilSupplyElasticity * this.oilPrice - this.totalOilUse;//minus
            this.totalOilUse = this.totalOilUse + this.oilUse;
            /*print*/
            console.log("this.oilUse = this.oiluserate * this.energyDemand * this.aveEnergyPrice / (this.oilPrice + this.oilTaxRate)"+" = " + this.oilUse + " = " + this.oiluserate + ", " + this.energyDemand + ", " + this.aveEnergyPrice + ", " + this.oilPrice + ", " + this.oilTaxRate);
            console.log("this.oilPrice = this.oilPriceFactor * this.oilUse / this.oilSupply = " + this.oilPrice + " = " + this.oilPriceFactor + ", " + this.oilUse + ", " + this.oilSupply);
            console.log("this.oilSupply = this.oilSupplyElasticity * this.oilPrice - this.totalOilUse = " + this.oilSupply + " = " + this.oilSupplyElasticity + ", " + this.oilPrice + ", " + this.totalOilUse);
            console.log("this.totalOilUse = this.totalOilUse + this.oilUse = " + this.totalOilUse + ", " + this.totalOilUse + ", " + this.oilUse);
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateNaturalGasFormulas(){
            this.naturalGasUse = this.naturalGasuserate * this.energyDemand * this.aveEnergyPrice / (this.naturalGasPrice + this.naturalGasTaxRate);
            this.naturalGasPrice = this.naturalGasPriceFactor * this.naturalGasUse / this.naturalGasSupply;//minus because of supply
            this.naturalGasSupply = this.naturalGasSupplyElasticity * this.naturalGasPrice - this.totalNaturalGasUse; //minus    
            this.totalNaturalGasUse = this.totalNaturalGasUse + this.naturalGasUse;
            /*print*/
            console.log("this.naturalGasUse = this.naturalGasuserate * this.energyDemand * this.aveEnergyPrice / (this.naturalGasPrice + this.naturalGasTaxRate):" + this.naturalGasUse + " = " + this.naturalGasuserate + ", " + this.energyDemand + ", " + this.aveEnergyPrice + ", " + this.naturalGasPrice + ", " + this.naturalGasTaxRate);
            console.log("this.naturalGasPrice = this.naturalGasPriceFactor * this.naturalGasUse / this.naturalGasSupply: "+ this.naturalGasPrice + " = " + this.naturalGasPriceFactor + ", " + this.naturalGasUse + ", " + this.naturalGasSupply)
            console.log("naturalGasSupply"+this.naturalGasSupply + " = "+"natualGasSupplyElasticity"+this.naturalGasSupplyElasticity+", "+"naturalGasPrice"+this.naturalGasPrice + "-totalNaturalGasUse "+this.totalNaturalGasUse);
            console.log("this.totalNaturalGasUse = this.totalNaturalGasUse + this.naturalGasUse: " + this.totalNaturalGasUse + " = " + this.totalNaturalGasUse + ", " + this.naturalGasUse);
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateNuclearFormulas(){
            this.nuclearUse = this.nuclearUseRate * this.energyDemand * this.aveEnergyPrice / (this.nuclearPrice + this.nuclearTaxRate);
            this.nuclearPrice = this.nuclearPriceFactor * this.nuclearUse / this.nuclearSupply;
            this.nuclearSupply = this.nuclearSupplyElasticity * this.nuclearPrice - this.totalNuclearUse;//minus
            this.totalNuclearUse = this.totalNuclearUse + this.nuclearUse;
            /*print*/
            console.log("this.nuclearUse = this.nuclearUseRate * this.energyDemand * this.aveEnergyPrice / (this.nuclearPrice + this.nuclearTaxRate) ===="+ this.nuclearUse + " = " + this.nuclearUseRate + ", " + this.energyDemand + ", " + this.aveEnergyPrice + ", " + this.nuclearPrice + ", " + this.nuclearTaxRate)
            console.log("this.nuclearPrice = this.nuclearPriceFactor * this.nuclearUse / this.nuclearSupply==="+ this.nuclearPrice + " = " + this.nuclearPriceFactor + ", " + this.nuclearUse + ", " + this.nuclearSupply)
            console.log("nuclearSupply"+this.nuclearSupply + "="+"nuclearSupplyElasticity"+this.nuclearSupplyElasticity+" * "+"nuclearPrice"+this.nuclearPrice + "- totalNuclearUse"+this.totalNuclearUse);
            console.log("this.totalNuclearUse = this.totalNuclearUse + this.nuclearUse==="+this.totalNuclearUse + " = " + this.totalNuclearUse + ", " + this.nuclearUse);
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateDamFormulas(){
            this.damUse = (this.damUseRate * this.energyDemand * this.aveEnergyPrice + this.damUseTreasury) / this.damPrice;
            this.damPrice = this.damUse / this.damPotential;
            /*print */
            console.log("this.damUse = (this.damUseRate * this.energyDemand * this.aveEnergyPrice + this.damUseTreasury) / this.damPrice ==="+ this.damUse + " = " + this.damUseRate + ", " + this.energyDemand + ", " + this.aveEnergyPrice + ", " + this.damUseTreasury + ", " + this.damPrice);
            console.log("this.damPrice = this.damUse / this.damPotential==="+this.damPrice + " = " + this.damUse + ", " + this.damPotential);
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateSolarFormulas(){
            this.solarUse = (this.solarUseRate * this.energyDemand * this.aveEnergyPrice + this.solarEnergyTreasury) / this.solarPrice;
            this.solarPrice = this.solarUse / (this.solarEnergyPotential * this.solarTechnology);
            /*print */
            console.log("this.solarUse = (this.solarUseRate * this.energyDemand * this.aveEnergyPrice + this.solarEnergyTreasury) / this.solarPrice==="+this.solarUse + " = " + this.solarUseRate + ", " + this.energyDemand + ", " + this.aveEnergyPrice + ", " + this.solarEnergyTreasury + ", " + this.solarPrice);
            console.log("this.solarPrice = this.solarUse / (this.solarEnergyPotential * this.solarTechnology)==="+this.solarPrice + " = " + this.solarUse + ", " + this.solarEnergyPotential + ", " + this.solarTechnology);
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateTechnologyFormulas(){
            this.solarTechnology = this.solarTechnology + this.solarOptimism * this.solarResearchTreasury * this.basicResearchTreasury;
            this.bioTechnology = this.bioTechnology + this.bioOptimism * Math.log(this.bioResearchTreasury * this.basicResearchTreasury);
            this.coalTechnology = this.coalTechnology + this.coalOptimism * this.coalResearchTreasury * this.basicResearchTreasury;
            this.oilTechnology = this.oilTechnology + this.oilOptimism * this.oilResearchTreasury * this.basicResearchTreasury;
            this.nuclearTechnology = this.nuclearTechnology + this.nuclearOptimism * this.nuclearResearchTreasury * this.basicResearchTreasury;
        },
        calculateAirPolutionFormulas(){
            this.co2 = this.co2 + this.co2Quantity * (this.coalUse + this.oilUse + this.naturalGasUse);
            this.globalTemperature = this.t0 + this.co2Eff * this.co2;
            this.seeLevel = (this.globalTemperature - this.basicTemperature) * this.meltingRate;
            this.no2 = (this.c1 * this.coalUse / this.coalTechnology) + (this.c2 * this.oilUse / this.oilTechnology);
            this.so2 = this.sulfurContent * this.coalUse / this.coalTechnology;
        },
        calculateEnergyFormulas(){
            this.energyConservation = this.priceElasticity * Math.sqrt(this.aveEnergyPrice);
            this.netEnergy = this.energyConservation + this.renewableEnergy + this.nonrenewableEnergy;
            this.renewableEnergy = this.solarUse + this.damUse;
            this.nonrenewableEnergy = this.coalUse + this.oilUse + this.naturalGasUse + this.nuclearUse;
            this.aveEnergyPrice = ((this.coalPrice + this.coalTaxRate) * this.coalUse 
                                + (this.oilPrice + this.oilTaxRate) * this.oilUse 
                                + (this.naturalGasPrice + this.naturalGasTaxIncome) * this.naturalGasUse
                                + (this.nuclearPrice + this.nuclearTaxRate) * this.nuclearUse 
                                + (this.solarPrice + 0) * this.solarUse 
                                + (this.damPrice + 0) * this.damUse) 
                                / (this.coalUse + this.oilUse + this.naturalGasUse + this.solarUse + this.damUse);
        },
        calculatePopulationFormulas(){
            this.birthRate = this.maximalBirthRate / (1 + this.qualityOfLife);
            this.population = this.population * (1 + this.birthRate/100) - this.starvation;
        },
        calculateSustainabilityFormulas(){
            this.sustainabilityPts = this.valueOfSustainability * this.sustainability;
            this.sustainability = this.renewableEnergy * (4 - this.birthRate) / (this.renewableEnergy + this.nonrenewableEnergy);
        },
        calculateQualityOfLifeFormulas(){
            this.lifestyle = this.c4 * this.netEnergy;
            this.qualityOfLife = this.lifeValue * this.lifestyle / this.population;
            this.qualityPoints = this.valueOfQualityOfLife * this.qualityOfLife;
        },
        execute() {
            /*formula execute*/
            this.energyDemand = this.energyDemand * 1.01;
            
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

            this.year++;

            console.log("Year "+ this.year);
            console.log("energyDemand: "+this.energyDemand);
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
            console.log("execute:energyDemand:"+this.energyDemand);
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

            // const data = {
            //     coalUse: this.coalUse,
            //     coalPrice: this.coalPrice,
            //     coalSupply: this.coalSupply,
            //     totalCoalUse: this.totalCoalUse
            // }

            // //localStorage.setItem(this.year,JSON.stringify(data));
            // localStorage.setItem("year"+this.year,JSON.stringify(data));
            // let coalUse = JSON.parse(localStorage.getItem("year"+this.year)).coalUse;
            // let coalPrice = JSON.parse(localStorage.getItem("year"+this.year)).coalPrice;
            // let coalSupply = JSON.parse(localStorage.getItem("year"+this.year)).coalSupply;
            // let totalCoalUse = JSON.parse(localStorage.getItem("year"+this.year)).totalCoalUse;
            // console.log("coalUse: "+coalUse);
            // console.log("coalPrice: "+coalPrice);
            // console.log("coalSupply: "+coalSupply);
            // console.log("totalCoalUse: "+totalCoalUse);
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
