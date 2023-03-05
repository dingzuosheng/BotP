<template>
    <div>
        <div id="head">
            <h1>Balance of the Planet</h1>
        </div>
        <!--<el-divider></el-divider>-->
        <div id="nav">
            <el-button type="primary" @click="back">Back</el-button>
            <el-button type="primary" @click="forward">Forward</el-button>
            <el-button type="primary" @click="toPolicy">Policy</el-button>
            <el-button type="primary" id="btn-sub" @click="toResults">Results</el-button>
            <el-button type="info">About this Game</el-button>
            <el-button type="info" @click="toConnections">Connections</el-button>
            <el-button type="success" @click="newGame"><router-link :to="{path:'/'}">New Game</router-link></el-button>
            <el-button type="warning" @click="showSimulation">Show Simulation</el-button>
            <el-button type="warning" @click="stopSimulation">Stop Simulation</el-button>
            <el-button type="danger" @click="execute" :disabled="this.gameover">Execute</el-button>
        </div><br/>
        <div>
            <router-view v-slot="{ Component }" :show="show" :executed="executed" :year="year" :gameover="gameover"
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
                        :solarEnergySubsidy="solarEnergySubsidy"  :solarUse="solarUse" :solarEnergyBudget="solarEnergyBudget" :solarPrice="solarPrice"

                        @changeSolarOptimism="changeSolarOptimism($event)" @changeSolarResearchSubsidy="changeSolarResearchSubsidy($event)"
                        @changeBasicResearchSubsidy="changeBasicResearchSubsidy($event)" @changeBioResearchSubsidy="changeBioResearchSubsidy($event)"
                        @changeBioOptimism="changeBioOptimism($event)"  @changeCoalResearchSubsidy="changeCoalResearchSubsidy($event)" 
                        @changeCoalOptimism="changeCoalOptimism($event)"  @changeOilResearchSubsidy="changeOilResearchSubsidy($event)" 
                        @changeOilOptimism="changeOilOptimism($event)" @changeNuclearResearchSubsidy="changeNuclearResearchSubsidy($event)"
                        @changeNuclearOptimism="changeNuclearOptimism($event)"  @changeDamSubsidy="changeDamSubsidy($event)"
                        :solarTechnology="solarTechnology" :solarResearchBudget="solarResearchBudget" :solarResearch="solarResearch" 
                        :basicResearch="basicResearch" :basicResearchBudget="basicResearchBudget" :bioResearch="bioResearch"  
                        :bioTechnology="bioTechnology" :bioResearchBudget="bioResearchBudget" :coalResearch="coalResearch"  
                        :coalTechnology="coalTechnology" :coalResearchBudget="coalResearchBudget" :oilResearch="oilResearch" 
                        :oilTechnology="oilTechnology" :oilResearchBudget="oilResearchBudget"  :nuclearResearch="nuclearResearch"  
                        :nuclearTechnology="nuclearTechnology" :nuclearResearchBudget="nuclearResearchBudget" 

                        @changeAccidentProbabilityFactor="changeAccidentProbabilityFactor($event)" :nuclearAccidents="nuclearAccidents"
                        @changeExposureRateFactor="changeExposureRateFactor($event)" :radiation="radiation"

                        @changeRadiationDangerFactor="changeRadiationDangerFactor($event)" :radiationDanger="radiationDanger"
                        @changeAccidentDangerFactor="changeAccidentDangerFactor($event)" :accidentDanger="accidentDanger"
                        :radiationCancer="radiationCancer"

                        @changeValueOfOneHumanLife_RadiationPts="changeValueOfOneHumanLife_RadiationPts($event)" :radiationPoints="radiationPoints"
                        @changeWasteProductionFactor="changeWasteProductionFactor($event)" :radioactiveWaste="radioactiveWaste"

                        @changeDangerValueFactor="changeDangerValueFactor($event)" :radWastePoints="radWastePoints"

                        @changeFallRateFactor="changeFallRateFactor($event)" :fallsFromRoofs="fallsFromRoofs"
                        @changeValueOfOneHumanLife_FallPts="changeValueOfOneHumanLife_FallPts($event)" :fallPoints="fallPoints"

                    
                        @changeDamUseRate="changeDamUseRate($event)" @changeDamPotential="changeDamPotential($event)"
                        :damUseBudget="damUseBudget" :damSubsidy="damSubsidy" :damUse="damUse" :damPrice="damPrice" 
                        
                        @changeCO2Quantity="changeCO2Quantity($event)" @changeTemperatureT0="changeTemperatureT0($event)" 
                        @changeCO2Eff="changeCO2Eff($event)" @changeBasicTemperature="changeBasicTemperature($event)"
                        :co2Eff="co2Eff" :basicTemperature="basicTemperature" :globalTemperature="globalTemperature" :co2="co2"

                        @changeMeltingRate="changeMeltingRate($event)" 
                        :seeLevel="seeLevel" 
                        @changePointCostFactor="changePointCostFactor($event)" :inundationPoints="inundationPoints"
                        @changeC1Quantity="changeC1Quantity($event)" @changeNO2Quantity="changeNO2Quantity($event)" 
                        :no2="no2" 
                        @changeSulfurContent="changeSO2Quantity($event)" :so2="so2" 

                        @changeSO2ToxicityFactor="changeSO2ToxicityFactor($event)" @changeNO2ToxicityFactor="changeNO2ToxicityFactor($event)"
                        :lungDiseaseDeath="lungDiseaseDeath"
                        @changeValueOfOneHumanLifeLungDiseasePts="changeValueOfOneHumanLifeLungDiseasePts($event)"
                        :lungDiseasePts="lungDiseasePts"

                        :energyDemand="energyDemand" :aveEnergyPrice="aveEnergyPrice" 
                        @changePriceElasticity="changePriceElasticity($event)" 

                        :energyConservation="energyConservation" :netEnergy="netEnergy" 
                        
                        @changeC4Value="changeC4Value($event)" :lifestyle="lifestyle" 
                        @changeLifeValue="changeLifeValue($event)" :qualityOfLife="qualityOfLife" 
                        
                        @changeBirthRate="changeBirthRate($event)" :birthRate="birthRate" :population="population" 

                        @changeBaseLevelFactor="changeBaseLevelFactor($event)" :starvation="starvation"
                        @changeDeathRateFactor="changeDeathRateFactor($event)" 

                        @changeValueOfOneHumanLifeFactor="changeValueOfOneHumanLifeFactor($event)" :starvationPoints="starvationPoints"
                        
                        :renewableEnergy="renewableEnergy" :nonrenewableEnergy="nonrenewableEnergy" :sustainability="sustainability"
                        @changeSustainability="changeSustainability($event)" :sustainabilityPts="sustainabilityPts" 
                        
                        @changeValueOfQualityOfLife="changeQualityOfLife($event)" :qualityPoints="qualityPoints"

                        @changeStripMiningProductivity="changeStripMiningProductivity($event)" :stripMining="stripMining"
                        @changeLandUseFactor="changeLandUseFactor($event)" :landAbuse="landAbuse" :garbage="garbage"
                        @changeValueOfLandAbuse="changeValueOfLandAbuse($event)" :landAbusePoints="landAbusePoints"
                        
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
            solarEnergyBudget: 3.18 * Math.pow(10, 9),//right
            fallRate:200,//right
            fallsFromRoofs:1210,//right
            valueOfOneHumanLife_FallPts:0.0029,//right
            fallPoints:24,//right
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
            solarResearchBudget: 3.18 * Math.pow(10, 9),//right
            basicResearchBudget: 3.18 * Math.pow(10, 9),//right
            bioResearchBudget: 3.18 * Math.pow(10, 9),//right
            coalResearchBudget: 3.18 * Math.pow(10, 9),//right
            oilResearchBudget: 3.18 * Math.pow(10, 9),//right
            nuclearResearchBudget: 3.18 * Math.pow(10, 9),//right
            totalTreasury: 39.83* Math.pow(10,9), //right
            accidentProbability:0.0055,//right
            nuclearAccidents:0.0874,//right
            exposureRate:30000,//right
            radiation:787000,//right
            radiationDanger:0.0029,//right
            accidentDanger:5000,//right
            radiationCancer:874,//right
            valueOfOneHumanLife_RadiationPts:0.038,//right
            radiationPoints:8,//right
            wasteProduction:1000,//right
            radioactiveWaste:88700,//right
            dangerValue:9.78*Math.pow(10,-4),//right
            radWastePoints:88,//right

            /*land */
            stripMiningProductivity:300,
            stripMining:22.9 * Math.pow(10,3),
            landAbuse:1.02*Math.pow(10,6),
            landUse:1.0*Math.pow(10,-3),
            garbage:999*Math.pow(10,6),
            valueOfLandAbuse:1.27*Math.pow(10,-3),
            landAbusePoints:1.53*Math.pow(10,3),

            /*dam */
            damUseBudget: 3.18 * Math.pow(10, 9),//right
            damSubsidy: 0.08,//right
            damUse: 18,//right
            damUseRate: 0.12,//right
            damPrice: 25.0 * Math.pow(10, 9),//right
            damPotential: Math.pow(10,-9),//right
            /*common*/
            co2: 2.72 * Math.pow(10, 12),//right
            co2Quantity:20*Math.pow(10,6),//right
            globalTemperature: 60.3,//right
            t0:58,//right
            co2Eff: 1.5*Math.pow(10,-12),//right
            basicTemperature: 60,//right
            meltingRate:0.49,//right
            seeLevel: 0.14,//right
            pointCost:2000,//right
            inundationPoints:297,//right
            no2: 49.1 * Math.pow(10, 6),//right
            c1: 280000,//right
            c2: 150000,//right
            so2: 58.9 * Math.pow(10, 6),//right
            sulfurContent:600000,//right
            so2Toxicity:0.0035,//right
            no2Toxicity:0.0035,//right
            lungDiseaseDeath:392000,//right
            valueOfOneHumanLifeLungDisease:9.84*Math.pow(10,-3),//right
            lungDiseasePts:3926,//right

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
            starvation:41.4*Math.pow(10,6),//right
            baseLevel:0.43,//right
            deathRate:0.05,//right
            valueOfOneHumanLife:1.0*Math.pow(10,-4),//right
            starvationPoints:4136,//right

            birthRate: 1.97,//right
            maximalBirthRate:5,//right
            sustainability: 0.17,//right
            sustainabilityPts: 681,//right
            valueOfSustainability:4000,//right
            qualityPoints: 7702,//right
            valueOfQualityOfLife:5000,//right
            totalPoints:8383,
            lifeValue:2.0,//right
            year:1990,//right
            executed:0,
            gameover:false,
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
            this.$router.push("/");
        },
        showSimulation() {
            this.show = true;
            this.executed++;
        },
        stopSimulation() {
            this.show = false;
        },
        calculateTaxIncome(){
            this.coalTaxIncome = Math.floor(parseInt(this.coalTaxRate * this.coalUse * 100) / 100 *100)/100  ;
            if(this.coalTaxIncome < 0){
                this.coalTaxIncome = 0;
            }
            this.oilTaxIncome = Math.floor(parseInt(this.oilTaxRate * this.oilUse * 100 ) / 100  * 100)/100;
            if(this.oilTaxIncomde < 0){
                this.oilTaxIncome = 0;
            }
            this.naturalGasTaxIncome = Math.floor(parseInt(this.naturalGasTaxRate * this.naturalGasUse * 100)/100 * 100)/100;
            if(this.naturalGasTaxIncome < 0){
                this.naturalGasTaxIncome = 0;
            }
            this.nuclearTaxIncome = Math.floor(parseInt(this.nuclearTaxRate * this.nuclearUse * 100)/100 *100)/100;
            if(this.nuclearTaxIncome < 0){
                this.nuclearTaxIncome = 0;
            }
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
            this.totalPoints = Math.floor((this.qualityPoints + this.sustainabilityPts - this.inundationPoints - this.fallPoints - this.lungDiseasePts - this.radWastePoints - this.radiationPoints - this.starvationPoints)*100)/100;
        },
        calculateCoalFormulas(){
            this.coalUse = Math.floor(this.coaluserate * this.energyDemand * this.aveEnergyPrice / (this.coalPrice + this.coalTaxRate)*100)/100;//对
            this.coalPrice = Math.floor((this.coalPrice + (this.coalPriceFactor * this.coalUse / this.coalSupply)) / 2 * 100)/100; //对
            if(this.coalPrice < 0){
                this.coalPrice = 0;
            }
            this.coalSupply = Math.floor((this.coalSupplyElasticity * this.coalPrice - this.totalCoalUse)*100)/100;//对
            this.totalCoalUse = Math.floor((this.totalCoalUse + this.coalUse)*100)/100;//对
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
            this.oilUse = Math.floor(this.oiluserate * this.energyDemand * this.aveEnergyPrice / (this.oilPrice + this.oilTaxRate)*100)/100;//对
            this.oilPrice = Math.floor((this.oilPrice + (this.oilPriceFactor * this.oilUse / this.oilSupply)) / 2 * 100)/100 //对;
            if(this.oilPrice < 0){
                this.oilPrice = 0;
            }
            this.oilSupply = Math.floor((this.oilSupplyElasticity * this.oilPrice - this.totalOilUse)*100)/100;// 对
            this.totalOilUse = Math.floor((this.totalOilUse + this.oilUse)*100)/100;//对
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
            this.naturalGasUse = Math.floor(this.naturalGasuserate * this.energyDemand * this.aveEnergyPrice / (this.naturalGasPrice + this.naturalGasTaxRate)*100)/100; //对
            this.naturalGasPrice = Math.floor((this.naturalGasPrice + (this.naturalGasPriceFactor * this.naturalGasUse / this.naturalGasSupply)) / 2*100)/100;//对 minus because of supply
            if(this.naturalGasPrice < 0){
                this.naturalGasPrice = 0;
            }
            this.naturalGasSupply = Math.floor((this.naturalGasSupplyElasticity * this.naturalGasPrice - this.totalNaturalGasUse)*100)/100; //对 minus    
            this.totalNaturalGasUse = Math.floor((this.totalNaturalGasUse + this.naturalGasUse)*100)/100;//对
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
            this.nuclearUse = Math.floor(this.nuclearUseRate * this.energyDemand * this.aveEnergyPrice / (this.nuclearPrice + this.nuclearTaxRate)*100)/100; //对
            this.nuclearPrice = Math.floor((this.nuclearPrice + (this.nuclearPriceFactor * this.nuclearUse / this.nuclearSupply)) / 2 *100)/100//对;
            if(this.nuclearPrice < 0){
                this.nuclearPrice = 0;
            }
            this.nuclearSupply = Math.floor((this.nuclearSupplyElasticity * this.nuclearPrice - this.totalNuclearUse)*100)/100;// 对 minus
            this.totalNuclearUse = Math.floor((this.totalNuclearUse + this.nuclearUse)*100)/100;//对
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
            this.damUse = Math.floor((this.damUseRate * this.energyDemand * this.aveEnergyPrice + this.damUseBudget) / this.damPrice * 100)/100;//对
            //this.damPrice = this.damUse / this.damPotential;
            this.damPrice = Math.floor((this.damPrice + (this.damUse / this.damPotential)) / 2 * 100)/100 //对
            if(this.damPrice < 0){
                this.damPrice = 0;
            }
            /*print */
            console.log("this.damUse = (this.damUseRate * this.energyDemand * this.aveEnergyPrice + this.damUseBudget) / this.damPrice ==="+ this.damUse + " = " + this.damUseRate + ", " + this.energyDemand + ", " + this.aveEnergyPrice + ", " + this.damUseBudget + ", " + this.damPrice);
            console.log("this.damPrice = this.damUse / this.damPotential==="+this.damPrice + " = " + this.damUse + ", " + this.damPotential);
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateLandFormulas(){
            this.stripMining = this.stripMiningProductivity * this.coalUse;  
            this.landAbuse = this.stripMining + (this.landUse * this.garbage);
            console.log("landAbuse: "+this.landAbuse);
            this.landAbusePoints = this.valueOfLandAbuse * this.landAbuse;
            console.log("landAbusePoints: "+this.landAbusePoints);
        },
        calculateSolarFormulas(){
            this.solarUse = Math.floor((this.solarUseRate * this.energyDemand * this.aveEnergyPrice + this.solarEnergyBudget) / this.solarPrice * 100)/100;//对
            //this.solarPrice = this.solarUse / (this.solarEnergyPotential * this.solarTechnology);
            this.solarPrice = Math.floor((this.solarPrice + (this.solarUse / (this.solarEnergyPotential * this.solarTechnology))) / 2 * 100)/100; //
            if(this.solarPrice < 0){
                this.solarPrice = 0;
            }
            this.fallsFromRoofs = Math.floor(this.fallRate * this.solarUse * 100)/100;//对
            this.fallPoints = Math.floor(this.valueOfOneHumanLife_FallPts * this.fallsFromRoofs * 100)/100;//对
            /*print */
            console.log("this.solarUse = (this.solarUseRate * this.energyDemand * this.aveEnergyPrice + this.solarEnergyBudget) / this.solarPrice===");
            console.log("solarUse: "+this.solarUse);
            console.log("solarUseRate: " + this.solarUseRate);
            console.log("energyDemand: " + this.energyDemand);
            console.log("aveEnergyPrice: " + this.aveEnergyPrice);
            console.log("solarEnergyBudget: " + this.solarEnergyBudget);
            console.log("solarPrice: " + this.solarPrice);
            console.log("==============================================================================")
            console.log("this.solarPrice = this.solarUse / (this.solarEnergyPotential * this.solarTechnology)===");
            console.log("solarPrice: " + this.solarPrice)
            console.log("solarUse: " + this.solarUse)
            console.log("solarEnergyPotential: " + this.solarEnergyPotential)
            console.log("solarTechnology: " + this.solarTechnology)
            console.log("==============================================================================================================")
            console.log("this.fallsFromRoofs = this.fallRate * this.solarUse");
            console.log("this.fallsFromRoofs: " + this.fallsFromRoofs);
            console.log("this.fallRate: " + this.fallRate);
            console.log("this.solarUse: " + this.solarUse);
            console.log("==============================================================================================================")
            console.log("this.fallPoints = this.valueOfOneHumanLife_FallPts * this.fallsFromRoofs");
            console.log("this.fallPoints: " + this.fallPoints);
            console.log("this.valueOfOneHumanLife_FallPts: " + this.valueOfOneHumanLife_FallPts);
            console.log("this.fallsFromRoofs: " + this.fallsFromRoofs);
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
            console.log("==============================================================================================================")
        },
        calculateTechnologyFormulas(){ //对
            this.solarTechnology = Math.floor((this.solarTechnology + this.solarOptimism * Math.log((this.solarResearchBudget + Math.pow(10,9)) * (this.basicResearchBudget + Math.pow(10,9)))/2.3)*100)/100;
            this.bioTechnology = Math.floor((this.bioTechnology + this.bioOptimism * Math.log((this.bioResearchBudget + Math.pow(10,9)) * (this.basicResearchBudget + Math.pow(10,9)))/2.3)*100)/100;
            this.coalTechnology = Math.floor((this.coalTechnology + this.coalOptimism * Math.log((this.coalResearchBudget + Math.pow(10,9)) * (this.basicResearchBudget + Math.pow(10,9)))/2.3)*100)/100;
            this.oilTechnology = Math.floor((this.oilTechnology + this.oilOptimism * Math.log((this.oilResearchBudget + Math.pow(10,9)) * (this.basicResearchBudget + Math.pow(10,9)))/2.3)*100)/100;
            this.nuclearTechnology = Math.floor((this.nuclearTechnology + this.nuclearOptimism * Math.log((this.nuclearResearchBudget + Math.pow(10,9))  * (this.basicResearchBudget + Math.pow(10,9)))/2.3)*100)/100;

            this.nuclearAccidents = Math.floor(this.accidentProbability * this.nuclearUse / this.nuclearTechnology * 10000)/10000; //对
            this.radiation = Math.floor(this.exposureRate * this.nuclearUse / this.nuclearTechnology * 100)/100;//对
            this.radiationCancer = Math.floor((this.radiationDanger * this.radiation + this.accidentDanger * this.nuclearAccidents)*100)/100;//对
            this.radiationPoints = Math.floor(this.valueOfOneHumanLife_RadiationPts * this.radiationCancer * 100) / 100;//对
            this.radioactiveWaste = Math.floor((this.radioactiveWaste + this.nuclearUse * this.wasteProduction / this.nuclearTechnology)*100)/100;//对
            this.radWastePoints = Math.floor(this.dangerValue * this.radioactiveWaste * 100)/100;//对
            console.log("==================================================================================================================")
            console.log("==================================================================================================================")
            console.log("==================================================================================================================")
            console.log("this.solarTechnology = this.solarTechnology + this.solarOptimism * this.solarResearchBudget * this.basicResearchBudget");
            console.log("solarTechnology====="+this.solarTechnology)
            console.log("solarOptimism====="+this.solarOptimism)
            console.log("solarResearchBudget====="+this.solarResearchBudget)
            console.log("basicResearchBudget====="+this.basicResearchBudget)
            console.log("=======================================================================================")
            console.log("this.bioTechnology = this.bioTechnology + this.bioOptimism * Math.log(this.bioResearchBudget * this.basicResearchBudget)")
            console.log("bioTechnology===="+this.bioTechnology)
            console.log("bioOptimism===="+this.bioOptimism)
            console.log("bioResearchBudget===="+this.bioResearchBudget)
            console.log("basicResearchBudget===="+this.basicResearchBudget)
            console.log("=======================================================================================")
            console.log("this.coalTechnology = this.coalTechnology + this.coalOptimism * this.coalResearchBudget * this.basicResearchBudget")
            console.log("coalTechnology===="+this.coalTechnology);
            console.log("coalOptimism===="+this.coalOptimism);
            console.log("coalResearchBudget===="+this.coalResearchBudget);
            console.log("basicResearchBudget===="+this.basicResearchBudget);
            console.log("=======================================================================================")
            console.log("this.oilTechnology = this.oilTechnology + this.oilOptimism * this.oilResearchBudget * this.basicResearchBudget")
            console.log("oilTechnology===="+this.oilTechnology)
            console.log("oilOptimism===="+this.oilOptimism)
            console.log("oilResearchBudget===="+this.oilResearchBudget)
            console.log("basicResearchBudget===="+this.basicResearchBudget)
            console.log("=======================================================================================")
            console.log("this.nuclearTechnology = this.nuclearTechnology + this.nuclearOptimism * this.nuclearResearchBudget * this.basicResearchBudget")
            console.log("nuclearTechnology"+this.nuclearTechnology)
            console.log("nuclearOptimisim"+this.nuclearOptimism)
            console.log("nuclearResearchBudget"+this.nuclearResearchBudget)
            console.log("basicResearchBudget"+this.basicResearchBudget)   
            console.log("=======================================================================================")
            console.log("this.nuclearAccidents = this.accidentProbability * this.nuclearUse / this.nuclearTechnology")         
            console.log("this.nuclearAccidents: " + this.nuclearAccidents);         
            console.log("this.accidentProbability: " + this.accidentProbability);         
            console.log("this.nuclearUse: " + this.nuclearUse);         
            console.log("this.nuclearTechnology: " + this.nuclearTechnology);
            console.log("======================================================================================")
            console.log("this.radiation = this.exposureRate * this.nuclearUse / this.nuclearTechnology");         
            console.log("this.radiation: " + this.radiation);         
            console.log("this.exposureRate: " + this.exposureRate);         
            console.log("this.nuclearUse: " + this.nuclearUse);         
            console.log("this.nuclearTechnology: " + this.nuclearTechnology);     
            console.log("=====================================================================================")
            console.log("this.radiationCancer = this.radiationDanger * this.radiation + this.accidentDanger * this.nuclearAccidents")    
            console.log("this.radiationCancer: " + this.radiationCancer)    
            console.log("this.radiationDanger: " + this.radiationDanger)    
            console.log("this.radiation: " + this.radiation)    
            console.log("this.accidentDanger: " + this.accidentDanger)    
            console.log("this.nuclearAccidents: " + this.nuclearAccidents)    
            console.log("===============================================================================")
            console.log("this.radiationPoints = this.valueOfOneHumanLife_RadiationPts * this.radiationCancer")
            console.log("this.radiationPoints: " + this.radiationPoints);
            console.log("this.valueOfOneHumanLife_RadiationPts: " + this.valueOfOneHumanLife_RadiationPts);
            console.log("this.radiationCancer: " + this.radiationCancer);
            console.log("==============================================================================")
            console.log("this.radioactiveWaste = this.radioactiveWaste + this.nuclearUse * this.wasteProduction / this.nuclearTechnology")
            console.log("this.radioactiveWaste: " + this.radioactiveWaste);
            console.log("this.radioactiveWaste: " + this.radioactiveWaste);
            console.log("this.nuclearUse: " + this.nuclearUse);
            console.log("this.wasteProduction: " + this.wasteProduction);
            console.log("this.nuclearTechnology: " + this.nuclearTechnology);
            console.log("=============================================================================")
            console.log("this.radWastePoints = this.dangerValue * this.radioactiveWaste")
            console.log("this.radWastePoints: " + this.radWastePoints);
            console.log("this.dangerValue: " + this.dangerValue);
            console.log("this.radioactiveWaste: " + this.radioactiveWaste);
        },
        calculateAirPolutionFormulas(){
            this.co2 = Math.floor((this.co2 + this.co2Quantity * (this.coalUse + this.oilUse + this.naturalGasUse))*100)/100;//对
            this.globalTemperature = Math.floor((this.t0 + this.co2Eff * this.co2)*100)/100;//对
            this.seeLevel = Math.floor((this.globalTemperature - this.basicTemperature) * this.meltingRate * 100) / 100;//对
            this.inundationPoints = Math.floor(this.pointCost * this.seeLevel * 100)/100;
            this.no2 = Math.floor(((this.c1 * this.coalUse / this.coalTechnology) + (this.c2 * this.oilUse / this.oilTechnology))*100)/100;//对
            this.so2 = Math.floor(this.sulfurContent * this.coalUse / this.coalTechnology * 100) / 100; //对
            this.lungDiseaseDeath = Math.floor((this.so2Toxicity * this.so2 + this.no2Toxicity * this.no2)*100)/100;//对
            this.lungDiseasePts = Math.floor(this.valueOfOneHumanLifeLungDisease * this.lungDiseaseDeath * 100)/100;//对
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
            console.log("=======================================================================================")
            console.log("this.lungDiseaseDeath = this.so2Toxicity * this.so2 + this.no2Toxicity * this.no2")
            console.log("this.lungDiseaseDeath: " + this.lungDiseaseDeath);
            console.log("this.so2Toxicity: " + this.so2Toxicity);
            console.log("this.so2: " + this.so2);
            console.log("this.no2Toxicity: " + this.no2Toxicity);
            console.log("this.no2: " + this.no2);
            console.log("======================================================================================")
            console.log("this.lungDiseasePts = this.valueOfOneHumanLifeLungDisease * this.lungDiseaseDeath")
            console.log("this.lungDiseasePts: " + this.lungDiseasePts)
            console.log("this.valueOfOneHumanLifeLungDisease: " + this.valueOfOneHumanLifeLungDisease)
            console.log("this.lungDiseaseDeath: " + this.lungDiseaseDeath)


        },
        calculateEnergyFormulas(){
            this.energyConservation = Math.floor(this.priceElasticity * Math.sqrt(this.aveEnergyPrice)*100)/100;//对
            this.netEnergy =Math.floor((this.energyConservation + this.renewableEnergy + this.nonrenewableEnergy)*100)/100;//对
            this.renewableEnergy = Math.floor((this.solarUse + this.damUse)*100)/100; //对
            this.nonrenewableEnergy = Math.floor((this.coalUse + this.oilUse + this.naturalGasUse + this.nuclearUse)*100)/100;//对
            this.aveEnergyPrice = Math.floor((((this.coalPrice + this.coalTaxRate) * this.coalUse 
                                + (this.oilPrice + this.oilTaxRate) * this.oilUse 
                                + (this.naturalGasPrice + this.naturalGasTaxIncome) * this.naturalGasUse
                                + (this.nuclearPrice + this.nuclearTaxRate) * this.nuclearUse 
                                + (this.solarPrice + 0) * this.solarUse 
                                + (this.damPrice + 0) * this.damUse) 
                                / (this.coalUse + this.oilUse + this.naturalGasUse + this.solarUse + this.damUse))*100)/100;//对
            if(this.aveEnergyPrice < 0){
                this.aveEnergyPrice = 0;
            }
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
            this.birthRate = Math.floor(this.maximalBirthRate / (1 + this.qualityOfLife)*100)/100; //对
            this.population = Math.floor((this.population * (1 + this.birthRate/100) - this.starvation)*100)/100;//对
            this.starvation = Math.floor(this.baseLevel * this.deathRate * this.population * 100)/100;//对
            if(this.starvation < 0){
                this.starvation = 0;
            }
            this.starvationPoints = Math.floor(this.valueOfOneHumanLife * this.starvation * 100)/100;//对
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
            console.log("======================================================================================")
            console.log("this.starvation = this.baseLevel * this.deathRate * this.population")
            console.log("this.starvation: " + this.starvation);
            console.log("this.baseLevel: " + this.baseLevel);
            console.log("this.deathRate: " + this.deathRate);
            console.log("this.population: " + this.population);
            console.log("==================================================================")
            console.log("this.starvationPoints = this.valueOfOneHumanLife * this.starvation")
            console.log("this.starvationPoints: " + this.starvationPoints)
            console.log("this.valueOfOneHumanLife: " + this.valueOfOneHumanLife)
            console.log("this.starvation: " + this.starvation)
        },
        calculateSustainabilityFormulas(){
            this.sustainabilityPts = Math.floor(this.valueOfSustainability * this.sustainability*100)/100; //对
            this.sustainability = Math.floor(this.renewableEnergy * (4 - this.birthRate) / (this.renewableEnergy + this.nonrenewableEnergy)*100)/100;//对
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
            this.lifestyle = Math.floor(this.c4 * this.netEnergy * 100)/100;//对
            this.qualityOfLife = Math.floor(this.lifeValue * this.lifestyle / this.population * 100)/100;//对
            this.qualityPoints = Math.floor(this.valueOfQualityOfLife * this.qualityOfLife * 100)/100; // 对
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
        calculateResearchBudget(){//对
            this.basicResearchBudget = Math.floor((this.basicResearch * this.totalTreasury)*100)/100;
            this.bioResearchBudget = Math.floor(this.bioResearch * this.totalTreasury*100)/100;
            this.coalResearchBudget = Math.floor(this.coalResearch * this.totalTreasury * 100)/100;
            this.damUseBudget = Math.floor(this.damSubsidy * this.totalTreasury * 100)/100;
            this.nuclearResearchBudget = Math.floor(this.nuclearResearch * this.totalTreasury * 100)/100;
            this.oilResearchBudget = Math.floor(this.oilResearch * this.totalTreasury * 100)/100;
            this.solarEnergyBudget = Math.floor(this.solarEnergySubsidy * this.totalTreasury * 100)/100;
            this.solarResearchBudget = Math.floor(this.solarResearch * this.totalTreasury * 100)/100;
            this.totalTreasury = Math.floor((this.totalTreasury + this.coalTaxIncome + this.oilTaxIncome + this.naturalGasTaxIncome + this.nuclearTaxIncome
                                - this.basicResearchBudget - this.bioResearchBudget - this.coalResearchBudget - this.oilResearchBudget
                                - this.solarResearchBudget - this.damUseBudget)*100)/100;
        },
        execute() {
            const data1990 = {
                coalUse: 76.3,
                coalPrice: Math.floor(24900000000/Math.pow(10,9)*100)/100,
                coalSupply: Math.floor(299000/Math.pow(10,3)*100)/100,
                totalCoalUse: 4080,

                oilUse:178,
                oilPrice:Math.floor(25100000000/Math.pow(10,9)*100)/100,
                oilSupply:Math.floor(9880/Math.pow(10,3)*100)/100,
                totalOilUse:9180,

                naturalGasUse:65.3,
                naturalGasPrice:Math.floor(25000000000/Math.pow(10,9)*100)/100,
                naturalGasSupply:Math.floor(7130/Math.pow(10,3)*100)/100,
                totalNaturalGasUse:2060,

                nuclearUse:8.91,
                nuclearPrice:Math.floor(24900000000/Math.pow(10,9)*100)/100,
                nuclearSupply:Math.floor(11900/Math.pow(10,3)*100)/100,
                totalNuclearUse:108,

                coalTaxIncome:19.07,
                oilTaxIncome:44.5,
                naturalGasTaxIncome:16.32,
                nuclearTaxIncome:2.22,

                solarUse:12.1,
                solarPrice:Math.floor(24800000000/Math.pow(10,9)*100)/100,
                fallsFromRoofs:1210,
                fallPoints:24,

                damUse:18,
                damPrice:Math.floor(25000000000/Math.pow(10,9)*100)/100,

                stripMing:22.9,
                landAbuse:1.02,
                landAbusePoints:1.53*Math.pow(10,3),

                co2:Math.floor(2720000000000/Math.pow(10,9)*100)/100,
                globalTemperature:60.3,
                seeLevel:0.14,
                inundationPoints:297,
                no2:Math.floor(49100000/Math.pow(10,6)*100)/100,
                so2:Math.floor(58900000/Math.pow(10,6)*100)/100,
                lungDiseaseDeath:Math.floor(392000/Math.pow(10,3)*100)/100,
                lungDiseasePts:3926,

                coalTechnology:1.01,
                oilTechnology:1.01,
                nuclearTechnology:1.02,
                solarTechnology:1.02,
                bioTechnology:1.02,

                nuclearAccidents:0.0874,
                radiation:787000,
                radiationCancer:874,
                radiationPoints:8,
                radioactiveWaste:88700,
                radWastePoints:88,

                aveEnergyPrice:Math.floor(25200000000/Math.pow(10,9)*100)/100,
                energyDemand:303,
                netEnergy:419,
                renewableEnergy:30.1,
                nonrenewableEnergy:328,
                energyConservation:60.3,

                qualityOfLife:1.03,
                qualityPoints:7702,
                lifestyle:Math.floor(2120000000/Math.pow(10,6)*100)/100,
                birthRate:0.0197,
                population:Math.floor(5260000000/Math.pow(10,9)*100)/100,
                starvation:Math.floor(41400000/Math.pow(10,6)*100)/100,
                starvationPoints:4136,

                sustainability:0.17,
                sustainabilityPts:681,

                basicResearchBudget:Math.floor(3180000000/Math.pow(10,9)*100)/100,
                bioResearchBudget:Math.floor(3180000000/Math.pow(10,9)*100)/100,
                coalResearchBudget:Math.floor(3180000000/Math.pow(10,9)*100)/100,
                oilResearchBudget:Math.floor(3180000000/Math.pow(10,9)*100)/100,
                solarResearchBudget:Math.floor(3180000000/Math.pow(10,9)*100)/100,
                solarEnergyBudget:Math.floor(3180000000/Math.pow(10,9)*100)/100,
                nuclearResearchBudget:Math.floor(3180000000/Math.pow(10,9)*100)/100,
                damUseBudget:Math.floor(3180000000/Math.pow(10,9)*100)/100,
                totalTreasury:Math.floor(39830000000/Math.pow(10,9)*100)/100,
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
            this.calculateLandFormulas();
            this.calculateSolarFormulas();
            this.calculateTechnologyFormulas();
            this.calculateAirPolutionFormulas();
            this.calculateEnergyFormulas();
            this.calculatePopulationFormulas();
            this.calculateSustainabilityFormulas();
            this.calculateQualityOfLifeFormulas();          
            this.calculateTaxIncome();
            this.calculateTotalPoints();
            this.calculateResearchBudget();

            const data = {
                coalUse: this.coalUse,
                coalPrice: Math.floor(this.coalPrice/Math.pow(10,9)*100)/100,
                coalSupply: Math.floor(this.coalSupply/Math.pow(10,3)*100)/100,
                totalCoalUse: this.totalCoalUse,

                oilUse:this.oilUse,
                oilPrice:Math.floor(this.oilPrice/Math.pow(10,9)*100)/100,
                oilSupply:Math.floor(this.oilSupply/Math.pow(10,3)*100)/100,
                totalOilUse:this.totalOilUse,

                naturalGasUse:this.naturalGasUse,
                naturalGasPrice:Math.floor(this.naturalGasPrice/Math.pow(10,9)*100)/100,
                naturalGasSupply:Math.floor(this.naturalGasSupply/Math.pow(10,3)*100)/100,
                totalNaturalGasUse:this.totalNaturalGasUse,

                nuclearUse:this.nuclearUse,
                nuclearPrice:Math.floor(this.nuclearPrice/Math.pow(10,9)*100)/100,
                nuclearSupply:Math.floor(this.nuclearSupply/Math.pow(10,3)*100)/100,
                totalNuclearUse:this.totalNuclearUse,

                coalTaxIncome:Math.floor(this.coalTaxIncome/Math.pow(10,9)*100)/100,
                oilTaxIncome:Math.floor(this.oilTaxIncome/Math.pow(10,9)*100)/100,
                naturalGasTaxIncome:Math.floor(this.naturalGasTaxIncome/Math.pow(10,9)*100)/100,
                nuclearTaxIncome:Math.floor(this.nuclearTaxIncome/Math.pow(10,9)*100)/100,

                solarUse:this.solarUse,
                solarPrice:Math.floor(this.solarPrice/Math.pow(10,9)*100)/100,
                fallsFromRoofs:this.fallsFromRoofs,
                fallPoints:this.fallPoints,

                damUse:this.damUse,
                damPrice:Math.floor(this.damPrice/Math.pow(10,9)*100)/100,

                stripMining:Math.floor(this.stripMining/Math.pow(10,3)*100)/100,
                landAbuse:Math.floor(this.landAbuse/Math.pow(10,6)*100)/100,
                landAbusePoints:Math.floor(this.landAbusePoints*100)/100,

                co2:Math.floor(this.co2/Math.pow(10,9)*100)/100,
                globalTemperature:this.globalTemperature,
                seeLevel:this.seeLevel,
                inundationPoints:this.inundationPoints,
                no2:Math.floor(this.no2/Math.pow(10,6)*100)/100,
                so2:Math.floor(this.so2/Math.pow(10,6)*100)/100,
                lungDiseaseDeath:Math.floor(this.lungDiseaseDeath/Math.pow(10,3)*100)/100,
                lungDiseasePts:this.lungDiseasePts,

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

                nuclearAccidents:this.nuclearAccidents,
                radiation:this.radiation,
                radiationCancer:this.radiationCancer,
                radiationPoints:this.radiationPoints,
                radioactiveWaste:this.radioactiveWaste,
                radWastePoints:this.radWastePoints,

                aveEnergyPrice:Math.floor(this.aveEnergyPrice/Math.pow(10,9)*100)/100,
                energyDemand:this.energyDemand,
                netEnergy:this.netEnergy,
                renewableEnergy:this.renewableEnergy,
                nonrenewableEnergy:this.nonrenewableEnergy,
                energyConservation:this.energyConservation,

                qualityOfLife:this.qualityOfLife,
                qualityPoints:this.qualityPoints,
                lifestyle:Math.floor(this.lifestyle/Math.pow(10,6)*100)/100,

                population:Math.floor(this.population/Math.pow(10,9)*100)/100,
                starvation:Math.floor(this.starvation/Math.pow(10,6)*100)/100,
                starvationPoints:this.starvationPoints,
                birthRate:this.birthRate,

                sustainability:this.sustainability,
                sustainabilityPts:this.sustainabilityPts,

                basicResearchBudget:Math.floor(this.basicResearchBudget/Math.pow(10,9)*100)/100,
                bioResearchBudget:Math.floor(this.bioResearchBudget/Math.pow(10,9)*100)/100,
                coalResearchBudget:Math.floor(this.coalResearchBudget/Math.pow(10,9)*100)/100,
                oilResearchBudget:Math.floor(this.oilResearchBudget/Math.pow(10,9)*100)/100,
                solarResearchBudget:Math.floor(this.solarResearchBudget/Math.pow(10,9)*100)/100,
                solarEnergyBudget:Math.floor(this.solarEnergyBudget/Math.pow(10,9)*100)/100,
                nuclearResearchBudget:Math.floor(this.nuclearResearchBudget/Math.pow(10,9)*100)/100,
                damUseBudget:Math.floor(this.damUseBudget/Math.pow(10,9)*100)/100,
                totalTreasury:Math.floor(this.totalTreasury/Math.pow(10,9)*100)/100,
                totalPoints:this.totalPoints,
            }

            //localStorage.setItem(this.year,JSON.stringify(data)); 
            //to be saved is from the year 1991
            
            localStorage.setItem(this.year,JSON.stringify(data));
            this.energyDemand = Math.floor(this.energyDemand * 1.01 * 100)/100;
            this.executed++;
            if(this.totalPoints < -12200){
                this.gameover = true;
                this.$router.push("/game/gameover");
            }
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
        changeFallRateFactor(fallRate){
            this.fallRate = fallRate;
        },
        changeValueOfOneHumanLife_FallPts(valueOfOneHumanLife_FallPts){
            this.valueOfOneHumanLife_FallPts = valueOfOneHumanLife_FallPts;
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
        changePointCostFactor(pointCost){
            this.pointCost = pointCost;
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
        },
        changeBaseLevelFactor(baseLevel){
            this.baseLevel = baseLevel;
        },
        changeDeathRateFactor(deathRate){
            this.deathRate = deathRate;
        },
        changeValueOfOneHumanLifeFactor(valueOfOneHumanLife){
            this.valueOfOneHumanLife = valueOfOneHumanLife;
        },
        changeSO2ToxicityFactor(so2Toxicity){
            this.so2Toxicity = so2Toxicity;
        },
        changeNO2ToxicityFactor(no2Toxicity){
            this.no2Toxicity = no2Toxicity;
        },
        changeValueOfOneHumanLifeLungDiseasePts(valueOfOneHumanLife_lungDiseasePts){
            this.valueOfOneHumanLifeLungDisease = valueOfOneHumanLife_lungDiseasePts;
        },
        changeAccidentProbabilityFactor(accidentProbability){
            this.accidentProbability = accidentProbability;
        },
        changeExposureRateFactor(exposureRate){
            this.exposureRate = exposureRate;
        },
        changeRadiationDangerFactor(radiationDanger){
            this.radiation = radiationDanger;
        },
        changeAccidentDangerFactor(accidentDanger){
            this.accidentDanger = accidentDanger;
        },
        changeValueOfOneHumanLife_RadiationPts(valueOfOneHumanLife_RadiationPts){
            this.valueOfOneHumanLife_RadiationPts = valueOfOneHumanLife_RadiationPts;
        },
        changeWasteProductionFactor(wasteProduction){
            this.wasteProduction = wasteProduction;
        },
        changeDangerValueFactor(dangerValue){
            this.dangerValue = dangerValue;
        },
        /*land */
        changeStripMiningProductivity(stripMiningProductivity){
            this.stripMiningProductivity = stripMiningProductivity;
        },
        changeLandUseFactor(landUse){
            this.landUse = landUse;
        },
        changeValueOfLandAbuse(valueOfLandAbuse){
            this.valueOfLandAbuse = valueOfLandAbuse;
        }

    }
}
</script>

<style>
#head,
#nav {
    background-color: #DCDFE6;
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
    margin: 2px 10px;
    width: 200px;
    height:50px;
    font-size:x-large;
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
