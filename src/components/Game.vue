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

                        @changeBeefTaxRate="changeBeefTaxRate($event)" @changeCowFactorRate="changeCowFactorRate($event)" 
                        @changeCostToProduceRate="changeCostToProduceRate($event)" @changeTaxEffectRate="changeTaxEffectRate($event)"
                        @changeSustainableFuelwoodUseRate="changeSustainableFuelwoodUseRate($event)" @changeDamageRate="changeDamageRate($event)"
                        :beefTaxRate="beefTaxRate" :grasslands="grasslands" :beefProduction="beefProduction" :desertification="desertification" :overgrazing="overgrazing"
                        :fuelwoodUse="fuelwoodUse"

                        @changeDemandPerCapitaRate="changeDemandPerCapitaRate($event)" @changeWoodSavedPerDollarRate="changeWoodSavedPerDollarRate($event)"
                        :woodStoveDollar="woodStoveDollar" @changeWoodStoveSubsidyRate="changeWoodStoveSubsidyRate($event)" :forestLand="forestLand" @changeWoodRate="changeWoodRate($event)"
                        @changeDamage="changeDamage($event)" :forestClearing="forestClearing" :logging="logging" @changeClearingRate="changeClearingRate($event)"
                        @changePriceOfForestLand="changePriceOfForestLand($event)" :debtForNatureSubsidy="debtForNatureSubsidy" @changeDebtForNatureSubsidyRate="changeDebtForNatureSubsidyRate($event)"

                        :farmLand="farmLand" @changeValueOfClearedLandRate="changeValueOfClearedLandRate($event)" 
                        :crops="crops" :cropYields="cropYields" @changeBeefGrainConsumptionRate="changeBeefGrainConsumptionRate($event)" :cropTechnology="cropTechnology"
                        :waterSupply="waterSupply" :ultravioletLight="ultravioletLight" @changeWeight1Factor="changeWeight1Factor($event)" @changeWeight2Factor="changeWeight2Factor($event)"
                        @changeWeight3Factor="changeWeight3Factor($event)" 

                        @changeWeight1_techFactor="changeWeight1_techFactor($event)" @changeWeight2_techFactor="changeWeight2_techFactor($event)" @changeWeight3_techFactor="changeWeight3_techFactor($event)"
                        :cropStrains="cropStrains" :pesticideUse="pesticideUse" :fertilizerUse="fertilizerUse" :industrialOutput="industrialOutput" 
                        
                        :pesticideTax="pesticideTax" :pesticideTaxIncome="pesticideTaxIncome" @changePesticideTaxRate="changePesticideTaxRate($event)" :pesticideDeaths="pesticideDeaths"
                        @changeEffectiveToxicity="changeEffectiveToxicity($event)" :pesticidePoints="pesticidePoints" @changeValueOfFarmLaborersLife="changeValueOfFarmLaborersLife($event)"

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

            /*Beef */
            beefTaxRate:13.2,
            cowFactor:52.5,
            costToProduce:600,
            taxEffect:4.00,
            beefProduction:134 * Math.pow(10,6),
            grasslands:1.59 * Math.pow(10,9),
            overgrazing:8.00 * Math.pow(10,6),
            sustainableFuelwoodUse:1.40 * Math.pow(10,9),
            damageRate:0.220,
            desertification:25.5 * Math.pow(10,6),
            fuelwoodUse:1.48 * Math.pow(10,9),
            demandPerCapita:0.346,
            woodSavedPerDollar:0.100,
            woodStoveDollar:3.27 * Math.pow(10,9),
            woodStoveSubsidy:0.08,
            forestLand: 7.89 * Math.pow(10,9),
            wood:0.05,
            damage:0.02,
            forestClearing:14.8 * Math.pow(10,6),
            logging:22 * Math.pow(10,6),
            clearingRate:0.450,
            priceOfForestLand:1000,
            debtForNatureSubsidy:3.20 * Math.pow(10,9),
            debtForNatureSubsidyRate:0.08,
            farmLand:1.0 * Math.pow(10,9),
            valueOfClearedLand:0.1,
            crops:1.69*Math.pow(10,9),
            beefGrainConsumption:5.0,
            cropYields:2.36,
            cropTechnology:11.5 * Math.pow(10,6),
            waterSupply:4.54 * Math.pow(10,12),
            ultravioletLight:0.485,
            weight1:1.6*Math.pow(10,-7),
            weight2:1.5*Math.pow(10,-13),
            weight3:0.344,
            weight1_tech: 25.0,
            weight2_tech: 2.00,
            weight3_tech: 3.51,
            cropStrains: 51.6 * Math.pow(10,3),
            /*pesticide*/
            pesticideUse:2.41 * Math.pow(10,6),
            pesticideTax:10.0,
            pesticideTaxIncome:25.0 * Math.pow(10,6),
            pesticideDeaths:24.1 * Math.pow(10,3),
            effectiveToxicity:0.01,
            pesticidePoints:36.2,
            valueOfFarmLaborersLife:0.00150,
            /*fertilizer*/
            fertilizerUse:1.54 * Math.pow(10,6),
            industrialOutput:3.88*Math.pow(10,12),
            useRate:6.1 * Math.pow(10,-4),
            costToProduce_pesticide:1000,
            taxEffect_pesticide:2.00,


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
            this.$router.push("/game/connections");
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
        },
        calculateOilFormulas(){
            this.oilUse = Math.floor(this.oiluserate * this.energyDemand * this.aveEnergyPrice / (this.oilPrice + this.oilTaxRate)*100)/100;//对
            this.oilPrice = Math.floor((this.oilPrice + (this.oilPriceFactor * this.oilUse / this.oilSupply)) / 2 * 100)/100 //对;
            if(this.oilPrice < 0){
                this.oilPrice = 0;
            }
            this.oilSupply = Math.floor((this.oilSupplyElasticity * this.oilPrice - this.totalOilUse)*100)/100;// 对
            this.totalOilUse = Math.floor((this.totalOilUse + this.oilUse)*100)/100;//对
        },
        calculateNaturalGasFormulas(){
            this.naturalGasUse = Math.floor(this.naturalGasuserate * this.energyDemand * this.aveEnergyPrice / (this.naturalGasPrice + this.naturalGasTaxRate)*100)/100; //对
            this.naturalGasPrice = Math.floor((this.naturalGasPrice + (this.naturalGasPriceFactor * this.naturalGasUse / this.naturalGasSupply)) / 2*100)/100;//对 minus because of supply
            if(this.naturalGasPrice < 0){
                this.naturalGasPrice = 0;
            }
            this.naturalGasSupply = Math.floor((this.naturalGasSupplyElasticity * this.naturalGasPrice - this.totalNaturalGasUse)*100)/100; //对 minus    
            this.totalNaturalGasUse = Math.floor((this.totalNaturalGasUse + this.naturalGasUse)*100)/100;//对
        },

        calculateNuclearFormulas(){
            this.nuclearUse = Math.floor(this.nuclearUseRate * this.energyDemand * this.aveEnergyPrice / (this.nuclearPrice + this.nuclearTaxRate)*100)/100; //对
            this.nuclearPrice = Math.floor((this.nuclearPrice + (this.nuclearPriceFactor * this.nuclearUse / this.nuclearSupply)) / 2 *100)/100//对;
            if(this.nuclearPrice < 0){
                this.nuclearPrice = 0;
            }
            this.nuclearSupply = Math.floor((this.nuclearSupplyElasticity * this.nuclearPrice - this.totalNuclearUse)*100)/100;// 对 minus
            this.totalNuclearUse = Math.floor((this.totalNuclearUse + this.nuclearUse)*100)/100;//对
            
        },
        calculateDamFormulas(){
            this.damUse = Math.floor((this.damUseRate * this.energyDemand * this.aveEnergyPrice + this.damUseBudget) / this.damPrice * 100)/100;//对
            //this.damPrice = this.damUse / this.damPotential;
            this.damPrice = Math.floor((this.damPrice + (this.damUse / this.damPotential)) / 2 * 100)/100 //对
            if(this.damPrice < 0){
                this.damPrice = 0;
            }
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
        },
        calculatePopulationFormulas(){
            this.birthRate = Math.floor(this.maximalBirthRate / (1 + this.qualityOfLife)*100)/100; //对
            this.population = Math.floor((this.population * (1 + this.birthRate/100) - this.starvation)*100)/100;//对
            this.starvation = Math.floor(this.baseLevel * this.deathRate * this.population * 100)/100;//对
            if(this.starvation < 0){
                this.starvation = 0;
            }
            this.starvationPoints = Math.floor(this.valueOfOneHumanLife * this.starvation * 100)/100;//对
        },
        calculateSustainabilityFormulas(){
            this.sustainabilityPts = Math.floor(this.valueOfSustainability * this.sustainability*100)/100; //对
            this.sustainability = Math.floor(this.renewableEnergy * (4 - this.birthRate) / (this.renewableEnergy + this.nonrenewableEnergy)*100)/100;//对
        },
        calculateQualityOfLifeFormulas(){
            this.lifestyle = Math.floor(this.c4 * this.netEnergy * 100)/100;//对
            this.qualityOfLife = Math.floor(this.lifeValue * this.lifestyle / this.population * 100)/100;//对
            this.qualityPoints = Math.floor(this.valueOfQualityOfLife * this.qualityOfLife * 100)/100; // 对
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
        calculateBeef(){
            this.beefProduction = this.cowFactor * this.grasslands / (this.costToProduce + this.taxEffect * this.beefTax);
            this.grasslands = this.grasslands - this.overgrazing;
            this.fuelwoodUse = this.population * this.demandPerCapita - this.woodSavedPerDollar * this.woodStoveDollar;
        },
        calculateSubsidy(){
            
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
            for(let i = 0; i < 5; i++){
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
        },
        /* Beef */
        changeBeefTaxRate(beefTaxRate){
            this.beefTaxRate = beefTaxRate;
        },
        changeCowFactorRate(cowFactorRate){
            this.cowFactor = cowFactorRate;
        },
        changeCostToProduceRate(costToProduceRate){
            this.costToProduce = costToProduceRate;
        },
        changeTaxEffectRate(taxEffectRate){
            this.taxEffect = taxEffectRate;
        },
        changeSustainableFuelwoodUseRate(sustainableFuelwoodUseRate){
            this.sustainableFuelwoodUse = sustainableFuelwoodUseRate;
        },
        changeDamageRate(damageRate){
            this.damageRate = damageRate;
        },
        changeDemandPerCapitaRate(demandPerCapita){
            this.demandPerCapita = demandPerCapita;
        },
        changeWoodSavedPerDollarRate(woodSavedPerDollar){
            this.woodSavedPerDollar = woodSavedPerDollar;
        },
        changeWoodStoveSubsidyRate(woodStoveSubsidy){
            this.woodStoveSubsidy = woodStoveSubsidy;
        },
        changeWoodRate(wood){
            this.wood = wood;
        },
        changeDamage(damage){
            this.damage = damage;
        },
        changeClearingRate(clearingRate){
            this.clearingRate = clearingRate;
        },
        changePriceOfForestLand(priceOfForestLand){
            this.priceOfForestLand = priceOfForestLand;
        },
        changeDebtForNatureSubsidyRate(debtForNatureSubsidyRate){
            this.debtForNatureSubsidyRate = debtForNatureSubsidyRate;
        },
        changeValueOfClearedLandRate(valueOfClearedLand){
            this.valueOfClearedLand = valueOfClearedLand;
        },
        changeBeefGrainConsumptionRate(beefGrainConsumption){
            this.beefGrainConsumption = beefGrainConsumption;
        },
        changeWeight1Factor(weight1){
            this.weight1 = weight1;
        },
        changeWeight2Factor(weight2){
            this.weight2 = weight2;
        },
        changeWeight3Factor(weight3){
            this.weight3 = weight3;
        },
        changeWeight1_techFactor(weight1_tech){
            this.weight1_tech = weight1_tech;
        },
        changeWeight2_techFactor(weight2_tech){
            this.weight2_tech = weight2_tech;
        },
        changeWeight3_techFactor(weight3_tech){
            this.weight3_tech = weight3_tech;
        },
        changePesticideTaxRate(pesticideTax){
            this.pesticideTax = pesticideTax;
        },
        changeEffectiveToxicity(effectiveToxicity){
            this.effectiveToxicity = effectiveToxicity;
        },
        changeValueOfFarmLaborersLife(valueOfFarmLaborersLife){
            this.valueOfFarmLaborersLife = valueOfFarmLaborersLife;
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
