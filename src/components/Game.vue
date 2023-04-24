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
                        @changeCFCEffFactor="changeCFCEffFactor($event)" @changeMethaneEffFactor="changeMethaneEffFactor($event)"
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


                        @changeC1Factor="changeC1Factor($event)" @changeC2Factor="changeC2Factor($event)" @changeC3Factor="changeC3Factor($event)"
                        @changeC4Value="changeC4Value($event)" :northernLifestyle="northernLifestyle" :southernLifestyle="southernLifestyle"
                        @changeNorthernLifeValue="changeNorthernLifeValue($event)" :qualityOfLife="qualityOfLife" @changeSouthernValueFactor="changeSouthernValueFactor($event)"
                        
                        @changeBirthRate="changeBirthRate($event)" :birthRate="birthRate" :population="population" @changeC1FactorBirthRate="changeC1FactorBirthRate($event)"

                        @changeBaseLevelFactor="changeBaseLevelFactor($event)" :starvation="starvation"
                        @changeDeathRateFactor="changeDeathRateFactor($event)" 

                        @changeValueOfOneHumanLifeFactor="changeValueOfOneHumanLifeFactor($event)" :starvationPoints="starvationPoints"
                        
                        :renewableEnergy="renewableEnergy" :nonrenewableEnergy="nonrenewableEnergy" :sustainability="sustainability"
                        @changeSustainability="changeSustainability($event)" :sustainabilityPts="sustainabilityPts" 
                        
                        @changeValueOfQualityOfLife="changeQualityOfLife($event)" :qualityPoints="qualityPoints"

                        @changeStripMiningProductivity="changeStripMiningProductivity($event)" :stripMining="stripMining"
                        @changeLandUseFactor="changeLandUseFactor($event)" :landAbuse="landAbuse" :garbage="garbage"
                        @changeValueOfLandAbuse="changeValueOfLandAbuse($event)" :landAbusePoints="landAbusePoints"

                        @changeBeefTaxRate="changeBeefTaxRate($event)" @changeCowFactorRate="changeCowFactorRate($event)" :beefTaxIncome="beefTaxIncome"
                        @changeCostToProduceRate="changeCostToProduceRate($event)" @changeTaxEffectRate="changeTaxEffectRate($event)"
                        @changeSustainableFuelwoodUseRate="changeSustainableFuelwoodUseRate($event)" @changeDamageRate="changeDamageRate($event)"
                        :beefTaxRate="beefTaxRate" :grasslands="grasslands" :beefProduction="beefProduction" :desertification="desertification" :overgrazing="overgrazing"
                        :fuelwoodUse="fuelwoodUse" @changeCropTechOptimism="changeCropTechOptimism($event)"

                        @changeDemandPerCapitaRate="changeDemandPerCapitaRate($event)" @changeWoodSavedPerDollarRate="changeWoodSavedPerDollarRate($event)"
                        @changeWoodStoveSubsidyRate="changeWoodStoveSubsidyRate($event)" :woodStoveBudget="woodStoveBudget" :forestLand="forestLand" @changeWoodRate="changeWoodRate($event)"
                        @changeDamage="changeDamage($event)" :forestClearing="forestClearing" :logging="logging" @changeClearingRate="changeClearingRate($event)"
                        @changePriceOfForestLand="changePriceOfForestLand($event)" @changeDebtForNatureSubsidyRate="changeDebtForNatureSubsidyRate($event)" :debtForNatureBudget="debtForNatureBudget"

                        :farmLand="farmLand" @changeValueOfClearedLandRate="changeValueOfClearedLandRate($event)" 
                        :crops="crops" :cropYields="cropYields" @changeBeefGrainConsumptionRate="changeBeefGrainConsumptionRate($event)" :cropTechnology="cropTechnology"
                        :waterSupply="waterSupply" :ultravioletLight="ultravioletLight" @changeWeight1Factor="changeWeight1Factor($event)" @changeWeight2Factor="changeWeight2Factor($event)"
                        @changeWeight3Factor="changeWeight3Factor($event)" 

                        @changeWeight1_techFactor="changeWeight1_techFactor($event)" @changeWeight2_techFactor="changeWeight2_techFactor($event)" @changeWeight3_techFactor="changeWeight3_techFactor($event)"
                        :cropStrains="cropStrains" :pesticideUse="pesticideUse" :fertilizerUse="fertilizerUse"
                        
                        :pesticideTax="pesticideTax" :pesticideTaxIncome="pesticideTaxIncome" @changePesticideTaxRate="changePesticideTaxRate($event)" :pesticideDeaths="pesticideDeaths"
                        @changeEffectiveToxicity="changeEffectiveToxicity($event)" :pesticidePoints="pesticidePoints" @changeValueOfFarmLaborersLife="changeValueOfFarmLaborersLife($event)"

                        :fertilizerTaxIncome="fertilizerTaxIncome" :fertilizerTax="fertilizerTax" @changeFertilizerTaxRate="changeFertilizerTaxRate($event)"
                        @changeScaleFactorRate="changeScaleFactorRate($event)" @changeCostToProduceRate_fertilizerUse="changeCostToProduceRate_fertilizerUse($event)"
                        @changeTaxEffectRate_fertilizerUse="changeTaxEffectRate_fertilizerUse($event)" 

                        :industrialInput="industrialInput" :industrialOutput="industrialOutput" :globalGenePool="globalGenePool" :heavyMetalUse="heavyMetalUse" :cfcProduction="cfcProduction"
                        :heavyMetalTax="heavyMetalTax" :heavyMetalPrice="heavyMetalPrice" @changeHeavyMetalPriceFactor="changeHeavyMetalPriceFactor($event)" @changeUseRateFactor_heavyMetalUse="changeUseRateFactor_heavyMetalUse($event)"
                        @changeTaxEffectRate_heavyMetalUse="changeTaxEffectRate_heavyMetalUse($event)" :materialsDemand="materialsDemand" :heavyMetalTaxIncome="heavyMetalTaxIncome"
                        @changeHeavyMetalTaxRate="changeHeavyMetalTaxRate($event)" :heavyMetalSupply="heavyMetalSupply" :totalHeavyMetalUse="totalHeavyMetalUse"
                        @changeHeavyMetalSupplyElasticity="changeHeavyMetalSupplyElasticity($event)" @changeHeavyMetalDeathRate="changeHeavyMetalDeathRate($event)"
                        :heavyMetalDeaths="heavyMetalDeaths" :heavyMetalPoints="heavyMetalPoints" @changeHeavymetalValueOfOneHumanLife="changeHeavymetalValueOfOneHumanLife($event)"
                        
                        :waterPollution="waterPollution" @changeHMToxicFactor="changeHMToxicFactor($event)" @changePToxicFactor="changePToxicFactor($event)" @changeFToxicFactor="changeFToxicFactor($event)"
                        :groundwaterUse="groundwaterUse" :reservoirCapacity="reservoirCapacity" :groundwaterSupply="groundwaterSupply"
                        @changeC1GroundwateerUse="changeC1GroundwateerUse($event)" @changeContaminationFactor="changeContaminationFactor($event)"
                        @changeCapacityPerDam="changeCapacityPerDam($event)" :drinkingWater="drinkingWater" @changeDrinkingFractionFactor="changeDrinkingFractionFactor($event)"

                        :housing="housing" :foodSupply="foodSupply"
                        @changeW1SFactor="changeW1SFactor($event)" @changeW2SFactor="changeW2SFactor($event)" @changeW3SFactor="changeW3SFactor($event)"
                        @changeWoodRequirementsFactor="changeWoodRequirementsFactor($event)" @changeHousingScaleFactor="changeHousingScaleFactor($event)"

                        :loggingTaxIncome="loggingTaxIncome" :loggingTax="loggingTax" @changeLoggingTaxRate="changeLoggingTaxRate($event)" :recycledPaper="recycledPaper"
                        @changeUseRateFactorLogging="changeUseRateFactorLogging($event)" @changeCostFactorLogging="changeCostFactorLogging($event)" @changeTaxEffectRateLogging="changeTaxEffectRateLogging($event)"

                        :recyclingCenterSubsidyRate="recyclingCenterSubsidyRate" :recyclingCenterBudget="recyclingCenterBudget" @changeRecyclingEffectivenessFactor="changeRecyclingEffectivenessFactor($event)"
                        @changeRecyclingCenterSubsidyRate="changeRecyclingCenterSubsidyRate($event)" :recycledAluminum="recycledAluminum" @changeAluminumRecyclingFactor="changeAluminumRecyclingFactor($event)"
                        
                        :grossGlobalProduction="grossGlobalProduction" @changeGarbagePerGGPFactor="changeGarbagePerGGPFactor($event)" @changeValueOfIndustrialOutputFactor="changeValueOfIndustrialOutputFactor($event)"
                        :consumerGoods="consumerGoods" @changeConsumerGoodsRatioFactor="changeConsumerGoodsRatioFactor($event)" :computerGamesPoints="computerGamesPoints" 

                        :cfcTaxIncome="cfcTaxIncome" :cfcTax="cfcTax" @changeCFCTaxRate="changeCFCTaxRate($event)" @changeUseRateFactorCFCPro="changeUseRateFactorCFCPro($event)"
                        @changeCostToProduceFactorCFCPro="changeCostToProduceFactorCFCPro($event)" @changeTaxEffectRateCFCPro="changeTaxEffectRateCFCPro($event)"
                        @changeDestructionRateFactor="changeDestructionRateFactor($event)" :troposphericCFCs="troposphericCFCs" :stratosphericCFCs="stratosphericCFCs"
                        @changeEquilibriumConstantFactor="changeEquilibriumConstantFactor($event)" :ozone="ozone" @changeEquillibriumOzoneFactor="changeEquillibriumOzoneFactor($event)"
                        @changeCFCKillerRateFactor="changeCFCKillerRateFactor($event)" @changeSolarUVFactor="changeSolarUVFactor(solarUV)" @changeOzoneAbsorptionFactor="changeOzoneAbsorptionFactor($event)"

                        :phytoplankton="phytoplankton" @changeNormalPhytoplanktonFactor="changeNormalPhytoplanktonFactor($event)" @changePhytoplanktonDamageRateFactor="changePhytoplanktonDamageRateFactor($event)"
                        :skinCancerDeaths="skinCancerDeaths" @changeSkinCancerIncidenceFactor="changeSkinCancerIncidenceFactor($event)" :skinCancerPoints="skinCancerPoints" @changeValueOfOneHumanLifeSkinCancerFactor="changeValueOfOneHumanLifeSkinCancerFactor($event)"

                        @changeOvergrazingRateFactor="changeOvergrazingRateFactor($event)" :soilErosion="soilErosion" :seafood="seafood" :methane="methane" @changeDecayRateFactor=changeDecayRateFactor($event)
                        @changeBurpFactor="changeBurpFactor($event)" @changeSoilFactor="changeSoilFactor($event)" :acidRain="acidRain"

                        :medicines="medicines"
                        :biodiversityPoints="biodiversityPoints" @changeValueOfBiodiversityFactor="changeValueOfBiodiversityFactor($event)" @changeC1GlobalGenePoolFactor="changeC1GlobalGenePoolFactor($event)"
                        :forestHabitats="forestHabitats" :marineLife="marineLife" :riparianHabitats="riparianHabitats" :lakeHabitats="lakeHabitats" @changeProportionalityConstantFactor="changeProportionalityConstantFactor($event)"
                        @changeVirginLakeHabitatsFactor="changeVirginLakeHabitatsFactor($event)" @changeNaturalLakeAcidityFactor="changeNaturalLakeAcidityFactor($event)" @changeDestructionFactor="changeDestructionFactor($event)"
                        :lakeAcidity="lakeAcidity" :lakeLifePoints="lakeLifePoints" @changeLakeLifeValue="changeLakeLifeValue($event)" @changeValueOfForestLife="changeValueOfForestLife($event)" :forestLifePoints="forestLifePoints"

                        @changeLakeWaterFactor="changeLakeWaterFactor($event)" @changePurgeRateFactor="changePurgeRateFactor($event)" @changeInitialRiparianHabitatsFactor="changeInitialRiparianHabitatsFactor($event)"
                        @changeDamageRateOfDamsFactor="changeDamageRateOfDamsFactor($event)" @changePyramidFactor="changePyramidFactor($event)" @changePToxicityFactor="changePToxicityFactor($event)"
                        @changeOilToxicityFactor="changeOilToxicityFactor($event)" :oilSpills="oilSpills" :marineLifePoints="marineLifePoints" @changeValueOfMarineLifeFactor=changeValueOfMarineLifeFactor($event)
                        @changeMaxSustainableFractionFactor="changeMaxSustainableFractionFactor($event)"

                        :propertyDamagePayments="propertyDamagePayments" @changeSulfurCorrosivenessFactor="changeSulfurCorrosivenessFactor($event)" @changeNitrousCorrosivenessFactor="changeNitrousCorrosivenessFactor($event)"

                        :floodDeaths="floodDeaths" @changeFloodRate="changeFloodRate($event)" :floodDeathPoints="floodDeathPoints" @changeValueOfOneHumanLifeFloodDeathPts="changeValueOfOneHumanLifeFloodDeathPts($event)"
                        :familyPlanningBudget="familyPlanningBudget" @changeFamilyPlanningSusidyPercent="changeFamilyPlanningSusidyPercent($event)"

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
            acidRain:107*Math.pow(10,6),
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
            familyPlanningBudget:3.2*Math.pow(10,9),
            familyPlanningSubsidy:0.08,

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
            floodDeaths:8.96*Math.pow(10,3),
            floodRate:0.004,
            floodDeathPoints:50.2,
            valueOfOneHumanLifeFloodDeathPts:0.00560,
            /*common*/
            co2: 2.72 * Math.pow(10, 12),//right
            co2Quantity:20*Math.pow(10,6),//right
            c3CarbonDioxide:367,
            globalTemperature: 60.3,//right
            t0:58,//right
            co2Eff: 1.5*Math.pow(10,-12),//right
            cfcEff:Math.pow(10,-8),
            methaneEff:2.0*Math.pow(10,-11),
            basicTemperature: 60,//right
            meltingRate:0.49,//right
            seeLevel: 0.14,//right
            pointCost:2000,//right
            inundationPoints:297,//right
            no2: 49.1 * Math.pow(10, 6),//right
            propertyDamagePayments:44.0*Math.pow(10,9),
            sulfurCorrosiveness:400,
            nitrousCorrosiveness:400,
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
            energySaved:2.5*Math.pow(10,-11),
            netEnergy: 419,//right 
            nonrenewableEnergy: 328, //right
            renewableEnergy:30.1, //right
            northernLifestyle: 2.12 * Math.pow(10, 9),//right
            c1:1.00,
            c2:0.07,
            c3:2.00,
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
            c1BirthRate:5.5*Math.pow(10,-7),
            sustainability: 0.17,//right
            sustainabilityPts: 681,//right
            valueOfSustainability:4000,//right
            qualityPoints: 7702,//right
            valueOfQualityOfLife:5000,//right
            totalPoints:0,
            northernLifeValue:2.0,//right
            southernLifeValue:0.400,

            /*Beef */
            beefTaxRate:6,
            beefTaxIncome:804*Math.pow(10,6),
            cowFactor:52.5,
            costToProduce:600,
            taxEffect:4.00,
            beefProduction:134 * Math.pow(10,6),
            grasslands:1.59 * Math.pow(10,9),
            overgrazing:8.00 * Math.pow(10,6),
            overgrazingRate:0.2,
            soilErosion:40.3*Math.pow(10,6),
            methane:5.85*Math.pow(10,9),
            decayRate:0.100,
            burpFactor:2.00,
            soilFactor:10.0,

            sustainableFuelwoodUse:1.40 * Math.pow(10,9),
            damageRate:0.220,
            desertification:25.5 * Math.pow(10,6),
            fuelwoodUse:1.48 * Math.pow(10,9),
            demandPerCapita:0.346,
            woodSavedPerDollar:0.100,
            woodStoveSubsidy:0.08,
            woodStoveBudget: 3.2 * Math.pow(10,9),
            forestLand: 7.89 * Math.pow(10,9),
            wood:0.05,
            damage:0.02,
            forestClearing:14.8 * Math.pow(10,6),
            logging:22 * Math.pow(10,6),
            clearingRate:0.450,
            priceOfForestLand:1000,
            debtForNatureSubsidyRate:0.08,
            debtForNatureBudget:3.2*Math.pow(10,9),
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
            cropTechOptimism:0.01,
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
            fertilizerTaxIncome:16.0 * Math.pow(10,6),
            fertilizerTax:10,
            scaleFactor:3.9*Math.pow(10,-4),
            costToProduce_fertilizerUse:1000,
            taxEffect_fertilizerUse:4,
            /* heavy Metal */
            industrialInput:3.88 * Math.pow(10,12),
            globalGenePool:5.07* Math.pow(10,6),
            heavyMetalUse: 3.54* Math.pow(10,6),
            cfcProduction: 599 * Math.pow(10,3),
            heavyMetalTax: 8,
            heavyMetalPrice: 794,
            heavyMetalPriceFactor:29.6*Math.pow(10,3),
            materialsDemand:151 * Math.pow(10,9),
            useRate_heavyMetalUse: 0.0198,
            taxEffect_heavyMetalUse:5.00,
            heavyMetalTaxIncome:29.6 * Math.pow(10,6),
            heavyMetalSupply:131*Math.pow(10,6),
            totalHeavyMetalUse:103*Math.pow(10,6),
            heavyMetalSupplyElasticity:296*Math.pow(10,3),
            heavyMetalDeaths:95.5 * Math.pow(10,3),
            heavyMetalDeathRate:0.0270,
            heavyMetalPoints:190,
            valueOfOneHumanLife_heavyMetal:0.00200,
            grossGlobalProduction:14.3*Math.pow(10,12),
            garbagePerGGP:0.00007,
            valueOfIndustrialOutput:3.69,
            consumerGoods:953*Math.pow(10,6),
            consumerGoodsRatio:2.5 * Math.pow(10,-4),
            computerGamesPoints:2.00,

            /*water*/
            hmToxic:2000,
            pToxic:1000,
            fToxic:100,
            waterPollution:9.64*Math.pow(10,9),
            groundwaterUse:4.45*Math.pow(10,12),
            reservoirCapacity:100*Math.pow(10,9),
            groundwaterSupply:8.4*Math.pow(10,15),
            c1GroundwaterUse:84.1,
            contamination:5*Math.pow(10,6),
            capacityPerDam:5.56*Math.pow(10,9),
            drinkingWater:147*Math.pow(10,9),
            drinkingFraction:0.0326,

            /* lifestyle */
            southernLifestyle:2.92*Math.pow(10,9),
            w1_s:1.00,
            w2_s:0.006,
            w3_s:0.526,
            housing:1.03*Math.pow(10,9),
            foodSupply:1.91*Math.pow(10,9),
            seafood:84.6*Math.pow(10,6),
            woodRequirements:25.0,
            scaleFactorHousing:1.2*Math.pow(10,-4),
            medicines:5.16*Math.pow(10,6),

            /*logging */
            loggingTaxIncome:8*Math.pow(10,6),
            loggingTax:0.4,
            useRateLogging:0.00653,
            costLogging:40.0,
            taxEffectLogging:3.00,

            /*recycle */
            recycledPaper:0.264,
            recycledAluminum:5.53*Math.pow(10,6),
            recyclingEffectiveness:9.6*Math.pow(10,-11),
            recyclingCenterSubsidyRate:0.08,
            recyclingCenterBudget:3.20*Math.pow(10,9),
            aluminumRecycling:0.00173,

            /*cfc */
            cfcTax:40,
            cfcTaxIncome:24*Math.pow(10,6),
            useRateCFCPro:0.00880,
            costToProduceCFCPro:2000,
            taxEffectCFCPro:5,
            troposphericCFCs:17.5*Math.pow(10,6),
            destructionRate:0.01,
            stratosphericCFCs:175*Math.pow(10,3),
            equilibriumConstant:0.01,
            ozone:4.12 * Math.pow(10,9),
            equillibriumOzone:5*Math.pow(10,9),
            cfcKillerRate:5000,
            solarUV:50.0,
            ozoneAbsorption:2.5*Math.pow(10,-8),
            phytoplankton:15*Math.pow(10,9),
            normalPhytoplankton:17.6*Math.pow(10,9),
            phytoplanktonDamageRate:0.307,
            skinCancerDeaths:48.5 * Math.pow(10,3),
            skinCancerIncidence:100*Math.pow(10,3),
            skinCancerPoints:485,
            valueOfOneHumanLifeSkinCancer:0.01,

            /*lake*/
            biodiversityPoints:1.013*Math.pow(10,3),
            valueOfBiodiversity:2.0*Math.pow(10,-4),
            c1GlobalGenePool:6.0*Math.pow(10,-5),
            forestHabitats:2.98*Math.pow(10,6),
            marineLife:19.1*Math.pow(10,9),
            riparianHabitats:490*Math.pow(10,3),
            lakeHabitats:454*Math.pow(10,3),
            proportionalityConstant:33.5,
            virginLakeHabitats:500*Math.pow(10,3),
            naturalLakeAcidity:5.0*Math.pow(10,-5),
            destruction:20*Math.pow(10,3),
            lakeAcidity:5.0*Math.pow(10,-6),
            lakeLifePoints:151,
            lakeLifeValue:3.3*Math.pow(10,-4),
            forestLifePoints:990,
            valueOfForestLife:3.3*Math.pow(10,-4),
            lakeWater:230*Math.pow(10,12),
            purgeRate:0.950,
            initialRiparianHabitats:500*Math.pow(10,3),
            damageRateOfDams:500,
            pyramidFactor:1.30,
            pToxicity:100,
            oilToxicity:10.0,
            oilSpills:5.93*Math.pow(10,6),
            spillRate:33.3*Math.pow(10,3),
            marineLifePoints:238,
            valueOfMarineLife:1.3*Math.pow(10,-8),
            maxSustainableFraction:0.00443,


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
            location.href="https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1#R7V1td9u2kv41%2BbLnKAcACZD8mNhN2m7apk3a3u43SqJs3cqiq5ek6a9f0hZpaQYkQBIAQafdc%2FbGsiBTwMxg5pmZZ14EV3d%2Fv92l97c%2F5Mts84KR5d8vgusXjHGRxMX%2FlK98eXyFhSF7fOVmt14%2BvkafXviw%2Fic7vUhOrx7Xy2x%2F8cZDnm8O6%2FvLFxf5dpstDhevpbtd%2Fvnybat8c%2FlX79ObDL3wYZFu8Ku%2Fr5eH28dXYxY9vf5ttr65rf4yFcnjb%2B7S6s2nb7K%2FTZf557OXgm9eBFe7PD88%2Fuvu76tsU%2B5etS%2BP6940%2FLZ%2BsF22PegsWH2%2FO3z4%2FPb%2Bh7vwtzfb9W8L8imf8dPDfUo3x9M3Pj3t4Uu1Bdmy2JHTj%2FnucJvf5Nt0883Tq693%2BXG7zMq%2FQ4qfnt7zLs%2Fvixdp8eJ%2Fs8Phy%2Bl40%2BMhL166PdxtTr%2FF3%2BX09fb5cbc4Pccf4V%2FH%2BX9C9kZ8%2BiPI7vZ33119ntFKKNLdTXZoeWMYPr6x%2FDZnf%2BK0V2%2Bz%2FC477L4Ub9hlm%2FSw%2FnR5%2FulJjG7q9z3tdPGP02bLN771uc82%2FuonvPeXO%2Fv5dn3IPtynDzvyudC4y11c5dvDaYsL%2BSx%2BXm82V%2Fkm3z18VrBardhiUby%2BP%2BzyP7Oz3yzFXHDRdg6fst0h%2B7t1306%2FnYWVTNUqf%2Fr585P%2B0Eopbs90R5Dhey0VchqzqUs5w1Le8FWpX2KOd%2F5Hk2KeYDEXKSGr1el9l%2BK%2FengdiX8QEXJ1ZUj8KR1R%2FOVnEKAz%2BGDZ1Ix7BjT2zQLFk79mQ00DFCV%2B2Z8Qbfwv6XKdp4uHv83I7%2Bn%2BkJnTBeqbLkThpS6Ewei6EHuhC8WW7r78p1z%2Fklc%2F%2FnH%2Bu%2Bu%2FTx%2F%2B%2BNOX00%2BNZ6JUjcoLMacap6Xv83XxLPWRC3DkCTzKR20%2FrQKnWT%2FGAJ0T6IBfp%2Fv1onjpl2yfpbvFrTmFC7HC0XlKM9ZF4QgR37x6Y0bhwuRy9ymhYzsAIY41vtlmu5vyqa%2Bzu3S7tGoAV6vFIkmkhk4ESbA0s%2B8xA5c%2BH33bo2nd8aHkjpe%2FUXh1x4f4jn%2B7yedpufBjdnef7dLDcZf9jzEhp5Kog5C4uOe7GR0ekdYbZUDQHYwv%2FcnEpF%2FoSn%2Fsl%2FTj2%2FZDlhYvvMs%2BlWCsKcMe%2BHbRIpkPx5d57Np%2Bty32uxCDfFu8%2FuBy7QeeCbhcSRqQFJ8BefhPdgavryNSW6rza9vGmXDORz4THkzLDlUbqLRD3C%2BkT5JJeHfc3pQu5rpw%2BvfZ%2FsHbTA%2B3QxXgTGwZVoiM07DbRfyanVTFgAIAJzSUIU%2BRU%2FHHvj8%2BlveFfGSmLVNabCvjXQ5CvCHIMtHIUFjGL%2B2SSxhEfjD43r7KH3zW97v1YigkdXkUyzSLV9LMj1jE2Xz1AsfUJi6DAOCwNRI93qZHDZsu0rtyC7fz%2Ff3Dlye%2F7s0ewSpeZPLk2zzm5a3p5ghih2IvBcEYQycwsfs51r2fI7%2FuZ%2BybnuzNx%2FRvczcyl1gfnsXLUCb6MZsHwlTemQMT71LUpTsusEd02vEPx%2Fv7zRdzmy4F3TLRkOyPkrkx3AGbeDL2tkfY4%2FmxBIAedv5tuvfhhjW1%2FQLt%2FtjmHWNx0zLvUaBp3iO%2Fwq8IJ%2Fmh1I%2Fs0piCGIRvHg3e%2BYmJPNcV%2BcAvkedKkTfq2sjMvhvXhlHfZN6PHP4AmU8mauYTpcybdi7JaM4l9m7GlnsqSaVPS%2FAr06GuJK2gS08kX1JC96qQpbJ8n5G6nMGEZ9%2Be6HVTzZDAEsbRc1sJ9ux%2FWnsBV5qC7gPfgqlg6lhZoptTT%2FxqzkgwNv8o6yOHUIb8SSjpo7uTwdRv1UQXFE78Kp1KsB%2F%2FKOhGAydJjaabwAn2YkgEPXYq51NHxyhh07To9YMjSX82WLzEfxnbZ6RVaeZ05Fu3BpaGfoFh9ZOfIwPHxSZLd8WLrxaL9dJAhYfPnS48upR%2Fp50uDWeCyw2ezmTsuOkhuDWx7xzaHYdVHvJrFm%2F71MyQLjxZi5g3ZkgCUNYiP274ZEvgxw%2BfcLg6MXnXZnGo5csXeZfwODzJ%2B%2FNIPwWJb%2FI%2B9ewTpbpVBt7ZdwmZwJO8P5vUE%2FZpRgeDIxzATkzoKzh7erGVBIgvWQRObT2mpF3SzDBuRBXSESMquRJMHkALJZZf%2FlU904EQG%2F4zHSBX6XaR7awqw4CGEhPKALwgPnpGlkpaP3%2FMt8V3zD6n8815XtyiD%2BomH851KH1Cl6YI7%2F3H%2FPBQhnMq8h4e7J6FrjHe%2BIwW7n8k2%2FhEREFqqvYMV3gnY98CDGMM3t4C8toa3R7P8diUWp9bIvTmi43bzY4j6UclaKMLf4CrXicm%2FPpYD%2FNL%2BjHUU0m%2FqeqQdr4FNzKP84jjy%2FzkDb526EtHc%2FtbH1xm8Q3C%2Bu2Yjxu5R5gP86DcWEPut8tXJc918dNik%2B5LnrWLvb08iMZ9Usrb2SZwyR5Urw3krpsFgLwuBnvbwF2n%2FiAOPuhRFU2Q4MmPTuea7nR02d%2FrwyNfoRDR6ecHwsKXhJ9%2BfKIsLH%2F4cvbD%2B2y3Lr5StlPJgbr%2FWbeCzZHAgGOmQW%2BBIe2SZ1tgdJJ4PQWGn4tLu6w0sGLWv%2BvKiqmUJ6EbCz1XwWuoUXQldjq1EtMWuzb4Ril1lXj%2BK3VGpU7Hoe8ldfRM5p4kUCF19ELmnkTQuLGrOEGU6P%2B%2Ftu7sYwoxSL%2Bcve2%2BptFreFwYwlbZ28a7H8e84mJF8Y%2FHhzCqBcy8j%2FhkR09Ooq4lffhJ20s01yruRoABLRuMBaZhNCsZtSAuwACy3hZQ3Vbq130q5Iaiu2TQBgNi2rZBdnGFZUvgY51IE6zatUCHEeNZwRZBVaY10MDAz3FsYULzFqYJtNANB%2BA19pIEQZ%2BrzCwIUpflGSxYdSSpzJArF0SjXoZaRAzW49b%2BEqTNDujIw4c3RQ1%2Bd8fR4CAG%2BEm2JYN1koxtvs2mfPXMQmLo5ChEQJ2f3FfnN5g7PPxJoePDc5er0igg9gs%2FEXAkZt9TZuDSpY6zWqFNxILz2IirN0BuPEMtwsiM2NCehr05ODUuWOazX6ZTCmrpYV5Jz8yU0Sm%2B2CWzsnOr40WOqlEwtDllPREMCOZ3LrEYyz3UafvzWAy0uX8c3S4w4uuLfSpDR9tyYS2ZaEQuPDluDpFjGB%2FoHjf8INfHLZloM8JxP7kXrnLH2jWklcB4InjQDwk0x9Gi%2ByaABspUuhjOkYsc5H4580qKnVVAaHe%2BeybFkFyob10qBehoCPF3Q0INvTw3Qu1Hb0pf2%2FykQSENz3RoRl6ScqNt1NjK91G3SZiPxrLX%2Btx44o35wd%2BS%2Fpia%2F%2Bpmly7LgXZnv4uyVGTln2jmxmo8ry5M%2FQBpiUbvnalERDL3KVvcbot9sNwgXJPUSE4liZYkknZ2GJ2fAFpYRTT6oTQRDNs4E5mmjH4mNPDtTIROXOHv5TXgtpGQF7dKrbnbpsFHAhFmpOkjGXNjmliRzd9iEpqL8W8x5tsdJrrlFief0gfBhuiNzAnFB1lWJGETuE%2FO68lKF50qYl2zLrqu5%2B2qfqcslUue%2FosvU4f19do5%2BROPK0GOMH%2FSKjoDxMQzzJ80eF2dYYxkZMtiHvN%2FyhcH4UXNKX1JwtBxIQLzSmyMXUhokh3XLJM3JTfVF7HTchOyseXGr0wz45EZuWHisgKBV0ijK7ExnnNqPGNPjk7ASjPW8%2BgimF0ZXHuk93eqB%2B76XFYBcsmU3nMSxfdP9VWmKNIzTsMHCkRt0sTX7ESaCOPURpHtT6IoKvM%2FHqNot4rGqYeWIcxj9S0Ki0k%2FtTamSc%2BhYLDiFX5uwgFHsXDH0UFkHHfwXa8FTPf2PTr0QY6x18h4wO%2F70SktaW%2BT7ProcExeODfFC7%2Bn%2B0Nmx71JCWds2cW9Edf0DXJvWtn99N2bCHKOjU6YHuPA5Ym37ytJZ4Rw3KmMO9rtqQhs03ymr4x1%2FZTBtxi9tGCJWwtWfU%2F5MJ%2BvpVwCcq3XkfJ4%2BmK8t3Bwidh57kBBMzVc7yYXSUAu1ahvuaSA9VSWyiUhm0H1wLrsB6ELvqjYfDrVdP2vRmuuV4IaQfnqK6gQTrQlqDGsjVEIKny%2FG0G1mZ27AGeoCUGdQuYWJlyTzl0UTR%2FkGJup%2FvykZcMvI6Yq%2FugtKzN26Y8PN2rGpalbYm7q8P2MmbICNFJ8km0zgEOtoWbAVmGP3I%2Fx63qA2F8CI2dt6J6PLBc4Q%2Fp6nb%2BwAVZxH8GqCJRsxqMH3wkOvh9PxAYgIgMQRwdEEhgkjH8mzrKf9pyoxC8nKhGGrlb0Qa4d7KkPS0p0SdKTWFOCXM0H%2B2p2nlK%2Ftj7ByNiHfPMA21cjUA1MqQKDT%2BNFJp9EPo95yGGKsdVYdriLADg%2Fem9OghP2aOvf79YLs5tfO2rNztj5%2BNTEzubPRp8KT4kfXYv9bU7NTac297qUua6GoWIkC0n%2B6%2BOy%2FFLG%2FGPS4h9b9YFjiDyML%2FndEISpQz%2BQVblvPTYloeKTbM%2F%2BIcZpft2XboZ%2BCUcMx6P3lY4YwD%2FMcQ1ZIZ3GhcMWyd%2BwS2ocXLD3PE0PzIbFiZou6B99mwRhTDQEHVsyLI7OFDHVlg2zM0Y8owsNAkPiElTNraOJy1fXHQBnvvSl%2FlT5oNZPrltzwNRdfuDUdSdqrrmW4Cc5rqutr75x531q2eJhSLOjYiACcgz9JxpCPkpd0ehat4b%2B0GV7rp06tHoq3wTkrn3OmCeCZ8xnhHWXtsQO%2FZ3IhdQZZwtwK3WeZWaNCR0s2kYXqqVicjemjpkWukYB8kQu4B3YF%2FJyIxQQoXMiE%2FaQVhsNAw1fwiuhCyDNSF9KGzivzdK8YOT6KwYGw%2Fe7mYROqTVwr8uVOQIdfhUZqfWAeaUHxi7lvhmHzp4g7aYI8P2i29tn1AXhPqXGoU%2Ffb30U%2B%2FYOfeEH2Yp84d%2BJnQjGVwdyon1GMWVvyUAyZhsvYzoRpNdVPVSXVLzGhXwp66EYZH6TbjaFhpPVLr8r%2FueXPF8NpTFpr3lfrRaLJJHV9AQiSIKlmZoeWssZlPPxqnqqvwZ2%2F4UV9hiN0ikLLDFo2wMPth2jB6iW7avp9yic8kv7L234EG4PSKcu5jlOp6BMdxhSLcS%2B3CQMwy%2BVUpnvZgslmjR6N1sCFGn8brZ6lvG4jadNehTZU6RYF3HTZntyxCUDw6e%2BiBusU4osQW6Q5DZKOBBbGwEfs9gS2FFG3Y5YSHTvB8%2FSWpOTa9gC4EiuzU8Acd7qqu%2BZOIJKlOwP%2BuNMYV%2BI427XmvlsulBJBXirxSjQRdwcObhak9cdBCX1fRP1GeBtqGfE5EGHxttrG9Q3gFVZmtlvc%2BqL8Z7rtATZRm7XDQ1BCQyUTY%2FfN1cZEbTjY3fpWttzD9p0A%2BOVGI0b5YuPEYAMce88HfwgW3k6%2BHec5OkCnbDNb%2Fcl1HZfPMv0BBhTPbt7nk%2FvNoUM6B5cQl%2FdmAdkXqgxg8gcz96hwcTbOfQDKVeykSjccOutPt1vyzEKWkMdN8rr27JqvdOIAXUxI1fBPo7U6tTwVb7dZ7tPpzl2Ir0rr8HtfH9fb5alC3SxzObx3HahBOT98SBhH%2BrUd%2FmtCUxbE3Q7oV1pAkN7%2F2PpKNalEqYEXgZjFP%2FFsWuBDz0QeC%2FoH6zWPzQMTBDGbwxHJeIg6gj61mNCdpsA9q8b8mkEl%2F%2BdRqZPNuz9oROEQfiBMLil4emgNdVoaW9uF3xeP5b7ne1K12pTfJfX813xr5vyX%2B%2FWq%2BzxHI1dOvJy1CUrLx1JIdFqlXIiLSRaRsmcWKK9rCeMjnch8enHIto12ty3WATDR79k2%2BxzOi81wbgfJlEJN4EHRW2j40N3HMeBhhyxS%2FAn0uzVIy%2BZowSuPj2ydv7WEb4Uhg0BbHd8CSaMbeFLDPbrBbz9yeCCKgvY%2FFXaF1hyx7h5coieXatuZxl2uG08i2OQzPfXnhCIXGipVI9CcoSAKZQBLnATm3A%2FCogGSHXlGWn4UH5R5tdPft6dcNwf0vU2na8364NB%2F0kC3LrBsZD%2FVLMujOg%2F%2BRGPD5F57Yw%2F9yy2rp78YpZRsXfFS7%2Bkh%2Bx%2FzIm8LIpOl1Eqr0ALBSemqp9gst%2BDkEFMvp25EmQNOMl4kUs%2FDyCEli9ReACKBbY8AAzrv8%2Fvj5tTKtGUOsqKE8kiy5hMHbngNMosqaMPN5D5OdI9QomzAD5yVYHd4ebyLAaBYlQDoN1jEAilarL4drdAtGMMghYoZltTSLQXuAlaJBOPgOM8PlmBqZFHyIPm4xdTi8kj79XeaLgTunbIkQct%2FOAhcLL3vkUv1ZOfG57iWzyWXRmMXQJsfOYkCzIhMz4ki8lDIG%2FDWfLB2EhgknrTfbD0D6Gmjc0Xwfibr1Mm7re10Q8cPRtvJ3Bk9vMxPfk3%2Bar4f2XxgUGzI7AmZGJJlpm88GDJoyBZyrQkSQSNuSX%2FJ%2FIATsHxm%2BRkfLBNxrxQmMD04BQifBtj29SXmEDw4DKZR6iKnuDhJzh%2BCJxeygh5yJbjhsw3hLQX6xispHIUM3NQzxdCalntmFkQeaBpPGaGfyhUJbHhgkhRg0iDKnyVL7AUM0feZL2hPYsJiQKZRrzipJx5N0gjKrzJF42AgEnUmyI1hGQwlmpy8SMriJipCAYuADiVLY2YfANHpA2mRp41cEQYxPhw2K3vi5fu1tv19gadRG%2BnlktT30zORLEUc8ENNf3OoFizcHyXyXwPR08Wl6dq9CAMzpIW9CUJ4%2Fa0hdEhj1y7pDDy6yqZoWE6fYuiZrC8imq2M3e9SmYBCCIART9ewOF3dMLpH02%2BKCrSbr6IPCuKinBxzrt0uyz%2F1vy4N4l2SC4GsYwjIY2tC2c0DKpPAFVUK0NcrejCqIOcES8MjP%2BdH0f5lU1AHO3HQggn2apl8zEmTuj16ytTxwKi2DpfqyKjhhlic8dSCcZ50cYuvy%2B%2BU%2Fng1%2BldelOezQsWGlQYCcHxiqQBSfHJEHICM9DJvL6OFDCH%2FsnAmnpd%2FwpiBwbPBUfZrxbrUl1%2BSdcmM0S%2Bn4UHvm789TF%2BwV4lkVx%2BhDa4UCVenz7oJYuTp%2F%2FE5efapruJdXLePVvPezFWdkO8tBw5ee850%2FXjqqP3RBRRdML7Al0oOuGWgK4ZbDJxEmvE9iJydxMiPRM%2BSIkcwHjWO9lDT2xY9r79I7796%2Fc%2Ff1jcfP%2Fzu8V8TuNXZCYZ%2Bfgm32X78rlKJ99urEVInMrdksLdjx5%2BYzPWogR6jy7LguXnYW%2BAQN%2FGxJciAOAcjeyAc%2B3%2B9LkJapVlTywQhYW0fROfZQYLOHW2%2Bn0r8QOPbNUESYaNYZGfMDWKXFYlkLP8jYmmUNvtZIGobXKZnpM4UvHABbHhlHjrMZzJ3k%2FrctWH%2B%2BKm2hu8%2FaQsYi7mCzJYni8kd1zo9I4zP0yk1t04dnRXSUO1RDfF6ugGAoSmvbm%2FggDcC5od88auCObFFTHA3Cea5l4bTTKeipE%2FzoQaDQZufODVxlfPfbbxP6S79bZE9OUVv8PuIo1I7PIUrebAQLIldtmA0KqWTcfxoirzNX0uGrWi452L094E6blMiYC31ewo7dN49Lutz3228W83%2BTwtF77Nto8KkW%2BetTog%2BEiMbqckg5wmpg%2BSTh35G43HxcP0AeOoH7J0lecSBHXoTX0qhGgueBjvRkhcpnzlB2GPVuEyTViHkt14FXrPtzSnOtqQ0jhRatwXJ4X1B5G9MXryA%2FjqxunM4NTbuC8hBvqkRDPLZuzwcMD1prDexSsfjvf3my%2FPOuCisMZ2fDsuGZD4Lv2z9Cu%2FTefrQ2o%2B1NJoQnJ4IhQYM2kTPnV6IhiE%2B2VdfMt1urV4KqLQEnl9Z1BoyZVbdycG%2FJzCZXGu%2FFCMF7gNG8hhYYxvq3kwh%2Bs5ujFD4O0kvW9M2I1dD7YwXRNFSXxZCsgVLHYzNCjAMIudXCTsFQieu%2F19CdXsOf6VYZ6cLsDZNKh91T9dSEDAG1EXkj0hAhb5F9ANTYPR6Fdan1tWHfdVODwI4gxHh%2Fy1ZjX39HhYL5fHwuSLYVrkm50f3%2BcxZokxuvhULmszD%2BgV6gvDIA%2BMgiRdni3Xi%2FU2s3AUPiE3FCA3scshkfJMpU4OykgJc2SknaFVoHwxoZQAfFRMIW6E6HByMT3IjrMcYuDwu%2B3yWCjr%2BiE7%2Fd32%2FngwbRPqvsvm%2FspWm1D3Z1qxCdHoaK5kWK8pm2CMuFxdguFZ8gXXH%2FRm%2F0A2gVqzCbH8me3aBIySvl7ny2Lvd%2FsTVfhX5rLFoyPXoTW47nKCoS5cZ8q1MFjy5XsYZ87c2CIbisEjCwUxI1qQMBcuy4S4hlqLE9UiPRrTUOtzn2381S6%2FLySKfDjs0vXWPLpH0uShJQVdCuw6Eq6DxwCSjY9ewKg1mNNrVZAM2JR%2FU%2BKXKuAcQ6kKxSsfs8XttpDAG%2BM1MH5VXHCY3B9fGabefVPJuFoZ%2FOq%2BkUzXPinDH%2BtsszR%2BK9B5SuVT0AgR37x641YRYgg1ja8IFuGDS79flxWhS4wxQH90QwXtanhX0EQMCwphLa4%2B%2BUEMUu6UWJrXXM5VkhfdNT8cXJG4IG3hGM54cFufdyoamqVwdAhDMoNuYvezbkaZ%2B1WXocfr9%2B%2FO29j5yfukE915yYzeXzeHXfppnW%2Byx%2FqDwuKZvgIyTsMG4lDmvOGSEQjnje%2BZWqtGMoFi2wOx9bVIF%2BZw5ZkmwGOLYaqrg2cKxDFyTIsiGUU5MVusy4LF%2Fer2lczu%2FvDnumyDuUq3i2xX%2FOM6Sw%2B3z5sOgsH8czR67VElJy0H8xXU56GDiV0O6pObKozr%2F%2FRPvjXOY%2BMVklY8jm%2F%2BimSQ7lfhr1Typ75p%2FCIRlfgrvYmMsb8CE%2Fi2%2FRU%2F2HrcMn0KXQxXGGf4aZADFib00ixpgrPd2dRhyYhwAY8KDA6V2fxDvr%2B%2FzXaFNSu8gTdXzzqzz7gARyy7eQKnN4%2FX9V4Wbx5t%2FfesvJRBCoKod6SMgRvXkTKGaT7u8vsniyA2xe69nhcBgrgp%2F1UYiGceI3B%2BaSGiaHTf1CIvMNOnbhqg6n7R%2F2INFr0HsDDOwIUC%2B09sa7BOjaTjwQicxNoOpIxoujvWPlw2z68hKYd1VZftjRBDH7I3P9js6dqpSwmszRGCT03JZaODbMnQFdWsSKvetdb4YAdBXE9HDgKqhDO2lAKq1%2FTNQJ2rTKS5zqLByoT6QCxNEpmxCIwzilXSXDgbQ1dELsLL6lTPq2%2FeFB9F3u%2Fy5XFxWOeSIY%2FPqBDniVfRG88x0qkatx5bOjAUvnmYqCgLNRPro5MRNE2OPcyINej1x%2FRv4wqtHjI9okKPn6aIzNPa9aSocwsWVzKoNASVbvhiCJBj0Z%2BfABsCxzy%2BkvHzhm6TXpyKHcPT7q5Df3Gtys7V00GFZ%2FJKQ3BxPZFVdB6UDFEWSq11z3P01AoqRsrjoSv4Zc%2BsJafaIm27zzymVJsZz7e8dASxRegM6Bt80VTWaZy9EYh2SByIttZ057Gy3u1QuPtsWaztABnvJG%2BSzgAITeC4aiLCaZGac%2B5qk5VjqG7sjmnWAKatdv4gnHP0Mc2RvWyE1w2JkW53u2ezmGcUzcLsP40ZiqOAH2XZIFT26NwgpLs7nMSWD3AfWIGsBsxH7AkMRq9Ajq1BkW4QiEq4zLXsu9Jw1lBrZkLDHdPMVl7QmRBdZ%2FPyEVeFHjHyY3o47kqy2RcsfNZVKoihJpRNr3ar4MYjVYOIjSfKSDno2ef90wIUut%2BWuv9p1PDMjUAJXECrgsrmLxMSuERFSIaW8Ei1Au4Yd5EVjXGU8jor7IjNtOgqFbE8LrmKCk9A6YuYZV2FM7Si0U1VdSF%2BbVmUWDdK8Y42BWKvqEND325yOFxFk2PRlEFIsA%2BDhc%2Fn5tSqSUIpRbFfpIbJ1BkaEt2Ked82XjITe1eY1E0Rhj9zIkkYh49%2F91HqB%2Bw%2BQA205%2FlS3ZJdR3qAd%2F462xfStF6tF6kNR9Cvrl8KPHYpUZXMjbDnCPpV0eAsm6StQolvYBZyBPvz5yFHUBOu7l7ySxiYE6kMVeP2UFVjhSBdV0QuhlEmGCX6ITvcpuYZD7yiBKFBU335eEEwBuRPwISFus45yYJMSC%2BiLCZxjA7DyqZ74H0R82mQgQnSaqaDL9hDoksv9%2B%2BV0%2FLQIXjohDkw7pToYBsjzqBUzRrujqOaVQh5jWjoW3MDnF%2BG%2BN30S0SBQlBmbegab5it0lJ%2Bx4auqKsrmpbAYsHOC0Tc%2Fn48H89FLyQlU8faKNEF2xLdih5HRLQEo20%2FFU7TzS79R1oQ94yGfiKEIZANYHWKMFAiGZV9zDaf83xZvPrr3njc49XwEBYAizg%2B5kOJedBnEjWKtSiaM2nO%2BDpgCUJ%2FblqUjR5cU286QUjJ1OnzKdHlr61l0pvbE%2BNTvz%2Ba6g%2BH%2FJOl0jK%2F2tihyQ5kU3Idm2zzZeVS08vskKR195m0dE8eLWozkOvrnqPiuBjmh3oXebAAssxQS3EljeBDU976bGgBZarqOAZxzB5LwMQeS2Ef1cF%2FvL65Km9AI7lsnJtmYF4fF7W92TxeXU2c6717oRg2ahld8kxad5GIKEiFmduplvxKrmds9J6nWhIadx53oBggW5ecwSpdRulCdgbzUHAS2siy4BOhuiwZEEc3eCIWaTIur36mnWYxHePJb%2F9A334Rr27%2FEFxYQV9KRkgFEFiiskMkW5S1X8powUyF3aIFNHYwdbsumzrnic7X5bpvdvneQpmSX6n6BOYkZCCi4xvGUZ2Sbtd7tyJ3l3SetfBOzgDi2aAoZtE1gVCCZwxGUsayavCZa%2B7NZqOWtK%2BwZdQko4ny4%2BE225VTcN6tV9mDLj3rrsHij14WorHRCc0o9ZC%2FuEOpQfeC2%2F62TcYq1S7s3pg2WEOT9O%2FfQVbSFlUxqhigRNnHmCAeqs5L3JhDhmNWrHZeIzWVmTKoDY6QmurJz%2Fb%2B2%2Fy4t5CdH6XsEt0ydHyIhk19LjKtHlgt7kzXr3Ul7gzt%2Fbv85saCuK%2FSZbKUxpFpFtKAWRb3EcV76j1dlGmHbdVX80a8MVpyEm8M%2B1qorPeKdwiZfn0w2KJy%2BDFdb4hySGaUTEQ5MHD1S7b4stgUO8nI%2B%2FQ%2B2z2PS4B74OPoRNJ%2By7k2ix4zPhNy2N4H0w%2BntPc%2B8M2%2FxOVyZzbmqtiKh%2FnWFuq2xgmvOMw7jW96AhzRnh3Bq83xbr093j1vbBUeiwfYaoAjL2yV%2BqWNOmSzDVXNWYVWpXnzhm4s39JGCcich30z57D%2BLtAcNNO9IR4WYauSRnjFjCmy7fDLdF7gZGgcDSYfnAS6jVI08M1pm7zD3GHv%2FaKEqp%2F8bO%2B%2F2y6P%2B8M6LRf%2FdDzcHw%2FPIzQko1M90EAHH5zK5B7LjoC2Smnj7M66pECSlfWfagz7spm1ebCkodrK7rUbTj5eD7QxQW2H1ZHpF5PvDdffe6HLn%2BXq2sV47PusuHQX62XZ22ahHXkVL7KFvCY95mWHjxXmn9gDTEQynqbk%2BtsUe7Wzs9d%2B5YIILPTzIBcUTj5RWllzDbvvF%2Ftl%2FeTn1G%2FpIdsVHn%2FhIZDr7M7CWBavGDBRh6MHpeWheYxwMCFZ7%2FJLu6Xl2qrn3RBaFBn076xFkYEmfXr38ktIdRQoALwZiweviImT6MN8e5q8drm9n8PlRFzvYHPMKdJ7TidDM9SsqQSsfVYxkj3dJr1XOInH%2BfT9Mu0CNu6ZX8YnD4N32HvPYPAQYyHfZumn8glw9eAP2eEBHLcQOfrlJnPId%2BGBmzz5PF2oDxh6ZqBCDFqplcRCqe04UBZShtF1geuEjH7rgv64XuMsLz1dP0joPFN6csoltqIbDHye1LVJV9%2Fv1ovnDYYiLZ6NnxSuRFtiVquD%2BXC8v998MX0ykRAkTmUnEwbsmkcjn4wHjEIcu4Uf88cjgUf03Blk0fkwGR2h4%2BMxPup2MGb6Qr8ec8C9yfUDLd1701WVJBxKi8bl6negQwa%2FYDCFbNNfErCmWDkGCK4on9bBnS8mX0%2FBtV3CSnB8CY94o7%2FVEh41UQI%2BJxgBkYDKYITQ6c1RfXKLz2WAGtD7k4GAuQcAj9AJag1QDPfrlVDSDHZvjRlgK7Xrn0JduNWVFxBAcsC%2BFFtlyuLyowT8KHNeAHRdlE4AWBCq3QY6dIVgLqgJhQ4Rntd%2BhtCuLxaeUeMLnLU%2Brx2041H4heKgpiIPei8FTp2eH4sdd8IvCAf3eo0PkovJD%2FEQ2kM8fGsuEhifuSi9tZAb8kohcOmtDwphnuhxkIM9iMNWAyIdoHmBLhbhv3%2Fdf1ATg7gvFE1j%2FnUCigBVvNx4hQYux4auCFXFjBQyEIAVllzyaPIueVVUp77oIs9c8urJz6dVpY90J%2B%2FzzeZ4sEDWPk4VRABy2eNDeZF5wKjn3dRrlpVbwEgbXPetdB7daDM0tsTLKw1cHtVIx5YrDa5Q31B4a5zkmqJ2HMKCc%2B8VeI6c%2BzqpMJ5vH%2Bm09PZsaIh6DagYNPfdrjGMzBOm%2FOveNz902fh18ZeU3j3ssnBCBBRNHi%2BKtAdPRp4RskcYQq3caDsVcOP40E1tSiPeGxiou96tt38%2BkCeThzN4HltPoOEcfesrL3bC9ibRtje%2Bhe0YCn37sJOfT1bnuXNDUIZK08cHqGOdgN6%2BRpw5sVEnGGCAKsV0qqpUPfkF8%2Bw%2B231a56UiXaWFvqwPxi9wv7SJorS0B9oUjaI8PcYaDtEb49rQFMQUQf7LkNf%2FJy7OOwqT81%2Fyy49vCKSMRS6xpADh9sshv9%2Bk2z8P5gFoQdKESidNs%2BtIuGY5YiAVVNeZn6uecKt6FqeFdhiNN8JFxrVDUG3NdQWtCICHCEi%2BrA%2Bt4NI8a9AKeOiIKrAVxC4BVlgCV2JrtQe9%2BE8HwpMatSYG7jS1DiX%2FqtBwFaLgoWn1QuPDiXjoikTVOgxrDxInjcMVPOXPvRXwC6pi%2BpIQZUde%2BdP7bLcutiPbyRVYA4PSUmDpgIJEt0cv8Et%2FGRqdCpnFtMdfw7mtgSWOMjQpnqnuP1pPq6mXOCnSSXT680wk6LRVa0j1HSmuPznNX6Gf0VCav2prNJpcvVKgssQSoMz9e1wFpNKz1eNafNHLkYGq9Bwibuu8IFBqaTB4hXKiSQIpGZ2MfU6YX3Zg2CQAq3n6QJJeaJgI5FmaHqbWE0jer32RIh4uaz1uBDq1KrWmDHIhdl4hDHu1P%2F35%2Ff%2F99V0U%2F%2Fnq3fqvTz%2F%2B%2FOX77z%2FOdBTOkzSb9PklmQG5FoxHa9j23OctIOndelM%2BwPtNut0%2Bppg%2FHOf79VKSHrjc8Q6ApcRMZXTJMylgmYgoSIUZKJKG4CKtU7znSKTM7phAIqVnYJ7mtue9IadJ6Voha8bplGuPbP6c%2FFpiXl02lKHeu96oi9J9NXTbUIS5kPbqWLRgpnQIIUdM9xWmkVGphlqs2%2ByAuFhy6xq8Nb8UCEAIUX%2FMknDFR5lSH1jMxBWxDiwt7%2Fp%2BoYqlINFh5wWR4cJ1qa6Zn8HWlGDrmE8YQvyuBkmI7ggkVyhJCAwt769yHPbowd4QY%2FERfOhQhfnTpKrAkK%2BwI%2BPmM88NiKHDin51F65n8T%2BFMzqeLHZnEY8TuVdiXsIZa3jolh4CmExWtshCCCAyjL5H1%2F98989%2Fj7eb9eHX3eLHXz9%2BvwkloehIStEnad2oFhoFutoEElS3IcCVBsFW6qAvhIYHXKLZO6Y0KIEQtFJ%2FBHy0zisCVSa5uHd42wo7GseMa9ygufcvOfDPXpKHArbOeeQBykglyigPkLR5p5wNuEf8Zz2VEWVpKLWW1gpgf5tyxD1cESpXwCRd9xX1BjRvWZi0rrCjwOZxCaND6WwVFMe6ffLcs6CKwfgk7j9hDippbKl6oySp7uo%2FxhBj6byCu1Aff6CGPvpjqVpKPqpRm5mC6ua3nF2LwBcL%2B%2BMYMcDDQmt5XjSJUq1AkGvJRchmE8foVvvbKNqTK09iMFxHaJm%2BwIYAlgitsQegh1b5WJR29crwCuVoHwjBhy6iKvNTL%2Foki4bbel8UgvJQ7hv0qdeDudPElgWHdbrVX7IqejrkGGbssS7ZVidimuEye27t%2Fwj%2FOs7%2FE7I34tMfQXa3v%2Fvu6nNhRJ6vcDuz9hSWijJVmiWGEFrnBSpbH7LWBXb0zXy%2F1HB9C2l8pnAz8pKEcavWlT%2BYQ9BCbb8r8C04hwxIQf9IAWFx9iIFWAWghJohDXj3FTPVaAXU8TgzPB5bnkCaEMWq%2FAsQrDvyN45GL9H63Gcbf5Vv98e7B5aWt3m%2BfN7M%2BgxTPLpklpCfib10qpGqUmvD9wIJb2Cr1Hp7%2F1AYnPS%2FfyhMzJprzJVTdrW0GUFdoYaJA%2BWHreOqOWQt6qhDA%2B4UpqsOo02naH3uS%2FKv%2Fb68UDb5%2FDQQOV8eFzbYu70iLmKwfk5OXGSL11t%2BPOabFvo0Hzi5J9i%2F94SBewI2EyiYttGCuvmjeUnI25dYulpwGvEqv7s%2FPnIUvk3vstJovX%2Fm06UYzBL74ANbhOL70G07u%2FMlceQ0enIpLKRlEDjRt20w72uroPDp29eSnygsFYV0aOolkJymxwradUWkQGkDNvD9CosOb6eu7zfdudzqN587qulunt4Y56bVsPdNFt48V3Nd0%2BORva%2F%2BmEcl5G4wDyaZNDwsyHPly0Ky9d6uLMPVAZbMPeRPc%2BFjMvNo3jQ8GUleV%2B7JRJ55MgxSdfSu4kGtEYEryZ4p07R4SXXHNzdwQ2%2Bp84rQRW0oc1ZbrRxa7%2FgyCbVrPUPfaj1h1QAq79GPHiI4Sc%2FWfUI59NOVPatwBQ3NDpWXK4T5auk%2BA%2FmsIujtYq6hEJ65VzSC2ZkBXK%2FQ7bFW0hDSVvHWWDEz3MQtVwiL1c%2BGZHuCgyThUQ7gZuwpsMbkwxr6eGkwI%2B3%2BynLie5eaMg2O3ow%2FcC5IMInXZZ7CleWtqs68EeNpGl7ILRApDS8s%2B1cz%2B47izJsvjB5Imd2tunOACnHtq%2BBf58XeXRDo4Dc%2BlyZqE%2B%2FVU9s8qSOpHrxxiJyd0ZVe5WbxHLnxsfqKoNGj%2BsRLU96t%2BTZdJksuO%2B40C2nxXQdx8UUSeH%2Bg8jlz5%2BHcp%2F7pXJgZtuQFCdgFwFVZU1jr33VBHYW1eE2oAqz7EhdlloE9LlvyUogLp6lsbSFBnximl8Zr6a%2B05yw2f3c660UGog1TDx3wVKC9ligAUcuvSlEgztv1%2FeocCSWo2KPHEmWvM8x%2F9llClT3YiMeYGh7IIDcrFpMxHYkG7NkO%2FfHNrY6uL7YDNo2h0SjatgPm%2F5BTajt4s8cTM3SwR3%2BudY3Zj55haogrvHdGPYAF1JrUScYESgcZ9hoN0A1IAl0ZcgQG4JTNu%2FTPrHjl1WK9tDAAe0XSgEhhgNfXEVH3kRCiAtE7wABJeEl1zMcHATAuezqPd%2BtV%2BT8PKmi8cH7Js3gZyk4lZvNACHQqN7t0uc4uTiaJliRqnSHa4WRg1XNdbDDeyVikNugLz7jwtwLJ9dgqur7cjhRWUob9a1%2BaqJlszLO6pL2t8kktkRFkeO%2B%2BQhUXwcEKnRcEhuckyLk%2FMbA9VENrTQt4fJ7UekkUeS0Jg4jVOh05TBpr665ntaIwVOK9VReGStyS5sbBpcArlbAh%2F6a9QKnmcFZJ9wWqAZmw4aHzAm4YKrlNX%2F337tufNunvt8vfvo%2Foht3%2BboFFf9gI96hTotvl5MqqukGDRtgzaIVycNfz%2Frgs5B%2BzN5sFjdtQ1YokycAFSjIKGkBYuvMKrsr2UGQGuFkz8PPPi29%2F%2B%2FLHb3%2F957D73%2F2Xz%2F9sBfVnmAYMiFeZkLMUL6NkfhbqAl3rh2El0bh62nCJ9cl%2BAiGKLU0tQ8%2FMVYlGWFvQeUGsUmuYQ%2B68gBKlu4EhwWH8ycWPuzw%2FnL99l97f%2FpAvs%2FId%2Fw8%3D";
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
            this.beefTaxIncome = Math.floor(parseInt(this.beefTaxRate * this.beefProduction * 100)/100 * 100)/100;//ja
            if(this.beefTaxIncome < 0){
                this.beefTaxIncome = 0;
            }
            this.cfcTaxIncome = Math.floor(parseInt(this.cfcTax * this.cfcProduction * 100)/100 * 100)/100;//ja
            if(this.cfcTaxIncome < 0){
                this.cfcTaxIncome = 0;
            }
            this.fertilizerTaxIncome = Math.floor(parseInt(this.fertilizerTax * this.fertilizerUse * 100)/100 *100)/100;//ja
            if(this.fertilizerTaxIncome < 0){
                this.fertilizerTaxIncome = 0;
            }
            this.heavyMetalTaxIncome = Math.floor(parseInt(this.heavyMetalTax * this.heavyMetalUse * 100)/100 * 100)/100;//ja
            if(this.heavyMetalTaxIncome < 0){
                this.heavyMetalTaxIncome = 0;
            }
            this.loggingTaxIncome = Math.floor(parseInt(this.loggingTax * this.logging * 100)/100 * 100)/100;//ja
            if(this.loggingTaxIncome < 0){
                this.loggingTaxIncome = 0;
            }
            this.pesticideTaxIncome = Math.floor(parseInt(this.pesticideTax * this.pesticideUse * 100) / 100 * 100)/100;//ja
            if(this.pesticideTaxIncome < 0){
                this.pesticideTaxIncome = 0;
            }
            console.log("====================================tax Income===============================")
            console.log("beefTaxIncome = beefTaxRate * beefProduction")
            console.log("beefTaxIncome = " + this.beefTaxIncome)
            console.log("beefTaxRate = " + this.beefTaxRate)
            console.log("beefProduction = " + this.beefProduction)
            console.log("====================================================")
            console.log("cfcTaxIncome = cfcTax * cfcProduction")
            console.log("cfcTaxIncome = " + this.cfcTaxIncome)
            console.log("cfcTax = " + this.cfcTax)
            console.log("cfcProduction = " + this.cfcProduction)
            console.log("====================================================")
            console.log("fertilizerTaxIncome = fertilizerTax * fertilizerUse")
            console.log("fertilizerTaxIncome = " + this.fertilizerTaxIncome)
            console.log("fertilizerTaxIncome = " + this.fertilizerTax)
            console.log("fertilizerTaxIncome = " + this.fertilizerUse)
            console.log("====================================================")
            console.log("pesticideTaxIncome = pesticideTax * pesticideUse")
            console.log("pesticideTaxIncome = " + this.pesticideTaxIncome)
            console.log("pesticideTax = " + this.pesticideTax)
            console.log("pesticideUse = " + this.pesticideUse)
            console.log("====================================================")
            console.log("heavyMetalTaxIncome = heavyMetalTax * heavyMetalUse")
            console.log("heavyMetalTaxIncome = " + this.heavyMetalTaxIncome)
            console.log("heavyMetalTax = " + this.heavyMetalTax)
            console.log("heavyMetalTaxUse = " + this.heavyMetalUse)
            console.log("====================================================")
            console.log("loggingTaxIncome = loggingTax * logging")
            console.log("loggingTaxIncome = " + this.loggingTaxIncome)
            console.log("loggingTax = " + this.loggingTax)
            console.log("logging = " + this.logging)
            console.log("====================================tax Income===============================")
        },
        calculateTotalPoints(){
            this.totalPoints = Math.floor((this.biodiversityPoints + this.forestLifePoints + this.lakeLifePoints + this.marineLifePoints + this.qualityPoints + this.sustainabilityPts
                                         - this.inundationPoints - this.fallPoints - this.floodDeathPoints - this.heavyMetalPoints - this.landAbusePoints - this.lungDiseasePts 
                                         - this.pesticidePoints - this.radWastePoints - this.radiationPoints - this.skinCancerPoints - this.starvationPoints)*100)/100;
            console.log("this.totalPoints = Math.floor((this.biodiversityPoints + this.forestLifePoints + this.lakeLifePoints + this.marineLifePoints + this.qualityPoints + this.sustainabilityPts" +
                                        " - this.inundationPoints - this.fallPoints - this.floodDeathPoints - this.heavyMetalPoints - this.landAbusePoints - this.lungDiseasePts " +
                                        " - this.pesticidePoints - this.radWastePoints - this.radiationPoints - this.skinCancerPoints - this.starvationPoints)*100)/100")
            console.log("this.totalPoints = " + this.totalPoints)
            console.log("biodiversityPoints = " + this.biodiversityPoints)
            console.log("forestLifePoints = " + this.forestLifePoints)
            console.log("lakeLifePoints = " + this.lakeLifePoints)
            console.log("marineLifePoints = " + this.marineLifePoints)
            console.log("qualityPoints = " + this.qualityPoints)
            console.log("sustainabilityPts = " + this.sustainabilityPts)
            console.log("inundationPoints = " + this.inundationPoints)
            console.log("fallPoints = " + this.fallPoints)
            console.log("floodDeathPoints = " + this.floodDeathPoints)
            console.log("heavyMetalPoints = " + this.heavyMetalPoints)
            console.log("landAbusePoints = " + this.landAbusePoints)
            console.log("lungDiseasePts = " + this.lungDiseasePts)
            console.log("pesticidePoints = " + this.pesticidePoints)
            console.log("radWastePoints = " + this.radWastePoints)
            console.log("radiationPoints = " + this.radiationPoints)
            console.log("skinCancerPoints = " + this.skinCancerPoints)
            console.log("starvationPoints = " + this.starvationPoints)
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
            this.oilSpills = this.spillRate * this.oilUse;
            console.log("=================================Oil==================================")
            console.log("oilSpills = this.spillRate * this.oilUse")
            console.log("oilSpills =" + this.oilSpills)
            console.log("spillRate =" + this.spillRate)
            console.log("oilUse =" + this.oilUse)
            console.log("=================================Oil==================================")
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
            this.floodDeaths = this.floodRate * this.soilErosion / this.damUse;
            this.floodDeathPoints = this.valueOfOneHumanLifeFloodDeathPts * this.floodDeaths;
            console.log("======================================flood======================================")
            console.log("this.floodDeaths = this.floodRate * this.soilErosion / this.damUse;")
            console.log("floodDeaths = " + this.floodDeath)
            console.log("this.floodRate = " + this.floodRate)
            console.log("this.soilErosion = " + this.soilErosion)
            console.log("this.damUse = " + this.damUse)
            console.log("this.floodDeathPoints = this.valueOfOneHumanLifeFloodDeathPts * this.floodDeaths;")
            console.log("floodDeathPoints = " + this.floodDeathPoints)
            console.log("floodDeathPoints = " + this.valueOfOneHumanLifeFloodDeathPts)
            console.log("floodDeaths = " + this.floodDeaths)
            console.log("======================================flood======================================")
        },
        calculateLandFormulas(){
            this.stripMining = this.stripMiningProductivity * this.coalUse;  
            this.landAbuse = this.stripMining + (this.landUse * this.garbage);
            this.landAbusePoints = this.valueOfLandAbuse * this.landAbuse;
        },
        calculateSolarFormulas(){
            this.solarUse = Math.floor((this.solarUseRate * this.energyDemand * this.aveEnergyPrice + this.solarEnergyBudget) / this.solarPrice * 100)/100;//对
            //this.solarPrice = this.solarUse / (this.solarEnergyPotential * this.solarTechnology);
            this.solarPrice = Math.floor((this.solarPrice + (this.solarUse / (this.solarEnergyPotential * this.solarTechnology))) / 2 * 100)/100; // andere Formula als display
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
            this.co2 = Math.floor((this.co2 + this.co2Quantity * (this.coalUse + this.oilUse + this.naturalGasUse) + this.c3CarbonDioxide * this.forestClearing)*100)/100;//对
            this.globalTemperature = Math.floor((this.t0 + this.cfcEff * this.stratosphericCFCs + this.methaneEff * this.methane + this.co2Eff * this.co2)*100)/100;//对
            this.seeLevel = Math.floor((this.globalTemperature - this.basicTemperature) * this.meltingRate * 100) / 100;//对
            this.inundationPoints = Math.floor(this.pointCost * this.seeLevel * 100)/100;
            this.no2 = Math.floor(((this.c1 * this.coalUse / this.coalTechnology) + (this.c2 * this.oilUse / this.oilTechnology))*100)/100;//对
            this.so2 = Math.floor(this.sulfurContent * this.coalUse / this.coalTechnology * 100) / 100; //对
            this.lungDiseaseDeath = Math.floor((this.so2Toxicity * this.so2 + this.no2Toxicity * this.no2)*100)/100;//对
            this.lungDiseasePts = Math.floor(this.valueOfOneHumanLifeLungDisease * this.lungDiseaseDeath * 100)/100;//对
            console.log("=================================================================================co2/temperature=============================================")
            console.log("this.co2 = Math.floor((this.co2 + this.co2Quantity * (this.coalUse + this.oilUse + this.naturalGasUse) + this.c3CarbonDioxide * this.forestClearing)*100)/100")
            console.log("this.co2 = " + this.co2);
            console.log("c3CarbonDioxide = " + this.c3CarbonDioxide)
            console.log("forestClearing = " + this.forestClearing)
            console.log("this.globalTemperature = Math.floor((this.t0 + this.cfcEff * this.stratosphericCFCs + this.methaneEff * this.methane + this.co2Eff * this.co2)*100)/100")
            console.log("golbalTemperatur = " + this.globalTemperature)
            console.log("cfcEff = " + this.cfcEff)
            console.log("stratosphericCFCs = " + this.stratosphericCFCs)
            console.log("methaneEff = " + this.methaneEff)
            console.log("methane = " + this.methane)
            console.log("=================================================================================co2/temperature=============================================")
        },
        calculateEnergyFormulas(){
            this.energyConservation = Math.floor((this.priceElasticity * Math.sqrt(this.aveEnergyPrice) + (this.energySaved * this.recycledAluminum))  *100)/100;//对
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
            console.log("============================Energy===========================")
            console.log("this.energyConservation = Math.floor((this.priceElasticity * Math.sqrt(this.aveEnergyPrice) + (this.energySaved * this.recycledAluminum))  *100)/100")
            console.log("energyConservation = " + this.energyConservation)
            console.log("priceElasticity = " + this.priceElasticity)
            console.log("aveEnergyPrice = " + this.aveEnergyPrice)
            console.log("energySaved = " + this.energySaved)
            console.log("recycledAluminum = " + this.recycledAluminum)
            console.log("this.netEnergy =Math.floor((this.energyConservation + this.renewableEnergy + this.nonrenewableEnergy)*100)/100")
            console.log("netEnergy = " + this.netEnergy)
            console.log("energyConservation = " + this.energyConservation)
            console.log("============================Energy===========================")
        },
        calculatePopulationFormulas(){
            this.birthRate = Math.floor((this.maximalBirthRate / (1 + this.c1BirthRate*Math.sqrt(this.familyPlanningBudget)) + this.qualityOfLife) *100)/100; //对
            this.population = Math.floor((this.population * (1 + this.birthRate/100) - this.starvation)*100)/100;//对
            this.starvation = Math.floor((this.baseLevel - this.foodSupply/ this.population) * this.deathRate * this.population * 100)/100;//对
            if(this.starvation < 0){
                this.starvation = 0;
            }
            this.starvationPoints = Math.floor(this.valueOfOneHumanLife * this.starvation * 100)/100;//对
            console.log("============================population=====================================")
            console.log("this.birthRate = Math.floor((this.maximalBirthRate / (1 + this.c1BirthRate*Math.sqrt(this.familyPlanningBudget)) + this.qualityOfLife) *100)/100")
            console.log("birthRate = " + this.birthRate)
            console.log("maximalBirthRate = " + this.maximalBirthRate)
            console.log("c1BirthRate = " + this.c1BirthRate)
            console.log("familyPlanningBudget = " + this.familyPlanningBudget)
            console.log("qualityOfLife = " + this.qualityOfLife)
            console.log("this.population = Math.floor((this.population * (1 + this.birthRate/100) - this.starvation)*100)/100")
            console.log("population = " + this.population)
            console.log("population = " + this.population)
            console.log("birthRate = " + this.birthRate)
            console.log("starvation = " + this.starvation)
            console.log("============================population=====================================")
        },
        calculateSustainabilityFormulas(){
            this.sustainabilityPts = Math.floor(this.valueOfSustainability * this.sustainability*100)/100; //对
            this.sustainability = Math.floor(this.renewableEnergy * (4 - this.birthRate) / (this.renewableEnergy + this.nonrenewableEnergy)*100)/100;//对
        },
        calculateQualityOfLifeFormulas(){
            this.northernLifestyle = Math.floor(this.c1 * this.medicines + this.c2 * this.beefProduction + this.c3 * this.consumerGoods + this.c4 * this.netEnergy * 100)/100;//对
            this.qualityOfLife = Math.floor((this.northernLifeValue * this.northernLifestyle + this.southernLifeValue * this.southernLifestyle) / this.population * 100)/100;//对
            this.qualityPoints = Math.floor(this.valueOfQualityOfLife * this.qualityOfLife * 100)/100; // 对
            this.housing = this.woodRequirements * this.logging + this.scaleFactorHousing * this.industrialOutput;//ja
            this.medicines = this.bioTechnology * this.globalGenePool;//ja
            this.southernLifestyle = this.w1_s * this.housing + this.w2_s * this.drinkingWater + this.w3_s * this.foodSupply;//ja
            console.log("==================================================quality of Life ===============================================")
            console.log("this.northernLifestyle = Math.floor(this.c1 * this.medicines + this.c2 * this.beefProduction + this.c3 * this.consumerGoods + this.c4 * this.netEnergy * 100)/100")
            console.log("northern Life Style = " + this.northernLifestyle)
            console.log("c1 = " + this.c1)
            console.log("medicines = " + this.medicines)
            console.log("c2 = " + this.c2)
            console.log("beefProduction = " + this.beefProduction)
            console.log("c3 = " + this.c3)
            console.log("consumerGoods = " + this.consumerGoods)
            console.log("c4 = " + this.c4)
            console.log("netEnergy = " + this.netEnergy)
            console.log("this.southernLifestyle = this.w1_s * this.housing + this.w2_s * this.drinkingWater + this.w3_s * this.foodSupply")
            console.log("southernLifestyle = " + this.southernLifestyle)
            console.log("w1_s = " + this.w1_s)
            console.log("housing = " + this.housing)
            console.log("w2_s = " + this.w2_s)
            console.log("drinkingWater = " + this.drinkingWater)
            console.log("w3_s = " + this.w3_s)
            console.log("foodSupply = " + this.foodSupply)
            console.log("this.medicines = this.bioTechnology * this.globalGenePool")
            console.log("medicines = " + this.medicines)
            console.log("bioTechnology = " + this.bioTechnology)
            console.log("globalGenePool = " + this.globalGenePool)
            console.log("==================================================quality of Life ===============================================")
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
            this.woodStoveBudget = Math.floor(this.totalTreasury * this.woodStoveSubsidy * 100)/100;
            this.debtForNatureBudget = Math.floor(this.totalTreasury * this.debtForNatureSubsidyRate * 100)/100;
            this.recyclingCenterBudget = Math.floor(this.totalTreasury * this.recyclingCenterSubsidyRate * 100)/100;
            this.propertyDamagePayments = Math.floor((this.sulfurCorrosiveness * this.so2 + this.nitrousCorrosiveness * this.no2) * 100)/100;
            this.familyPlanningBudget = Math.floor(this.totalTreasury * this.familyPlanningSubsidy * 100)/100;
            this.totalTreasury = Math.floor((this.totalTreasury + this.coalTaxIncome + this.oilTaxIncome + this.naturalGasTaxIncome + this.nuclearTaxIncome + this.beefTaxIncome
                                + this.fertilizerTaxIncome + this.heavyMetalTaxIncome + this.pesticideTaxIncome + this.loggingTaxIncome + this.cfcTaxIncome 
                                - this.basicResearchBudget - this.bioResearchBudget - this.coalResearchBudget - this.oilResearchBudget
                                - this.solarResearchBudget - this.damUseBudget - this.woodStoveBudget - this.debtForNatureBudget - this.recyclingCenterBudget - this.propertyDamagePayments
                                - this.familyPlanningBudget
                                )*100)/100;   
            console.log("=======================================Budget===============================================")
            console.log("this.woodStoveBudget = Math.floor(this.totalTreasury * this.woodStoveSubsidy * 100)/100;")
            console.log("woodStoveBudget = " + this.woodStoveBudget);         
            console.log("totalTreasury = " + this.totalTreasury);         
            console.log("woodStoveSubsidy = " + this.woodStoveSubsidy);
            console.log("this.debtForNatureBudget = Math.floor(this.totalTreasury * this.debtForNatureSubsidyRate * 100)/100")         
            console.log("debtForNatureBudget = " + this.debtForNatureBudget);         
            console.log("totalTreasury = " + this.totalTreasury);         
            console.log("debtForNatureSubsidyRate = " + this.debtForNatureSubsidyRate);
            console.log("this.recyclingCenterBudget = Math.floor(this.totalTreasury * this.recyclingCenterSubsidyRate * 100)/100")         
            console.log("recyclingCenterBudget = " + this.recyclingCenterBudget);         
            console.log("totalTreasury = " + this.totalTreasury);         
            console.log("recyclingCenterSubsidyRate = " + this.recyclingCenterSubsidyRate);
            console.log("this.propertyDamagePayments = Math.floor((this.sulfurCorrosiveness * this.so2 + this.nitrousCorrosiveness * this.no2) * 100)/100")         
            console.log("propertyDamagePayments = " + this.propertyDamagePayments);         
            console.log("sulfurCorrosiveness = " + this.sulfurCorrosiveness);         
            console.log("so2 = " + this.so2);         
            console.log("nitrousCorrosiveness = " + this.nitrousCorrosiveness);         
            console.log("no2 = " + this.no2); 
            console.log("this.familyPlanningBudget = Math.floor(this.totalTreasury * this.familyPlanningSubsidy * 100)/100")        
            console.log("familyPlanningBudget = " + this.familyPlanningBudget);         
            console.log("totalTreasury = " + this.totalTreasury);         
            console.log("familyPlanningSubsidy = " + this.familyPlanningSubsidy);   
            console.log("this.totalTreasury = Math.floor((this.totalTreasury + this.coalTaxIncome + this.oilTaxIncome + this.naturalGasTaxIncome + this.nuclearTaxIncome + this.beefTaxIncome" + 
                                " + this.fertilizerTaxIncome + this.heavyMetalTaxIncome + this.pesticideTaxIncome + this.loggingTaxIncome + this.cfcTaxIncome " +
                                " - this.basicResearchBudget - this.bioResearchBudget - this.coalResearchBudget - this.oilResearchBudget" +
                                "- this.solarResearchBudget - this.damUseBudget - this.woodStoveBudget - this.debtForNatureBudget - this.recyclingCenterBudget - this.propertyDamagePayments" +
                                "- this.familyPlanningBudget)*100)/100;")      
            console.log("totalTreasury = " + this.totalTreasury);        
            console.log("coalTaxIncome = " + this.coalTaxIncome);        
            console.log("oilTaxIncome = " + this.oilTaxIncome);        
            console.log("naturalGasTaxIncome = " + this.naturalGasTaxIncome);        
            console.log("nuclearTaxIncome = " + this.nuclearTaxIncome);        
            console.log("beefTaxIncome = " + this.beefTaxIncome);        
            console.log("fertilizerTaxIncome = " + this.fertilizerTaxIncome);        
            console.log("heavyMetalTaxIncome = " + this.heavyMetalTaxIncome);        
            console.log("pesticideTaxIncome = " + this.pesticideTaxIncome);        
            console.log("loggingTaxIncome = " + this.loggingTaxIncome);        
            console.log("cfcTaxIncome = " + this.cfcTaxIncome);        
            console.log("basicResearchBudget = " + this.basicResearchBudget);        
            console.log("bioResearchBudget = " + this.bioResearchBudget);        
            console.log("coalResearchBudget = " + this.coalResearchBudget);        
            console.log("oilResearchBudget = " + this.oilResearchBudget);        
            console.log("solarResearchBudget = " + this.solarResearchBudget);        
            console.log("damUseBudget = " + this.damUseBudget);        
            console.log("woodStoveBudget = " + this.woodStoveBudget);        
            console.log("debtForNatureBudget = " + this.debtForNatureBudget);        
            console.log("recyclingCenterBudget = " + this.recyclingCenterBudget);        
            console.log("propertyDamagePayments = " + this.propertyDamagePayments);        
            console.log("familyPlanningBudget = " + this.familyPlanningBudget);        
            console.log("=======================================Budget===============================================")
        },
        calculateBeefFormulas(){
            this.beefProduction = this.cowFactor * this.grasslands / (this.costToProduce + this.taxEffect * this.beefTaxRate);//ja
            this.grasslands = this.grasslands - this.overgrazing;//ja
            this.fuelwoodUse = this.population * this.demandPerCapita - this.woodSavedPerDollar * this.woodStoveBudget;//ja
            this.desertification = (this.fuelwoodUse - this.sustainableFuelwoodUse) * this.damageRate + this.overgrazing;//ja
            this.overgrazing = this.starvation * this.overgrazingRate;//ja
            this.soilErosion = this.desertification + this.forestClearing;//ja
            this.forestClearing = this.starvation * this.clearingRate - this.debtForNatureBudget / this.priceOfForestLand;//ja
            this.forestLand = this.forestLand - this.logging - this.fuelwoodUse * this.wood - this.forestClearing - this.acidRain * this.damage;//ja
            this.farmLand = this.farmLand + this.forestClearing * this.valueOfClearedLand;//ja
            this.crops = this.cropYields * this.farmLand - this.beefGrainConsumption * this.beefProduction;//ja
            this.cropYields = this.weight1 * this.cropTechnology + this.weight2 * this.waterSupply - this.weight3 * this.ultravioletLight;//ja
            this.cropTechnology = this.weight1_tech * this.cropStrains + this.weight2_tech * this.pesticideUse + this.weight3_tech * this.fertilizerUse;//ja
            this.cropStrains = this.bioTechnology * this.globalGenePool * this.cropTechOptimism;//ja
            this.foodSupply = this.seafood + this.beefProduction + this.crops;//ja
            this.methane = this.methane * (1 - this.decayRate) + this.beefProduction * this.burpFactor + this.acidRain * this.soilFactor;//ja
            console.log("=====================================Beef========================================================")
            console.log("this.beefProduction = this.cowFactor * this.grasslands / (this.costToProduce + this.taxEffect * this.beefTaxRate)")
            console.log("beefProduction: " + this.beefProduction)
            console.log("cowFactor: " + this.cowFactor)
            console.log("grasslands: " + this.grasslands)
            console.log("costToProduce: " + this.costToProduce)
            console.log("taxEffect: " + this.taxEffect)
            console.log("beefTaxRate: " + this.beefTaxRate)
            console.log("this.grasslands = this.grasslands - this.overgrazing")
            console.log("grasslands: " + this.grasslands)
            console.log("grasslands: " + this.grasslands)
            console.log("overgrazing: " + this.overgrazing)
            console.log("this.fuelwoodUse = this.population * this.demandPerCapita - this.woodSavedPerDollar * this.woodStoveBudget")
            console.log("fuelwoodUse: " + this.fuelwoodUse)
            console.log("population: " + this.population)
            console.log("demandPerCapita: " + this.demandPerCapita)
            console.log("woodSavedPerDollar: " + this.woodSavedPerDollar)
            console.log("woodStoveBudget: " + this.woodStoveBudget)
            console.log("this.desertification = (this.fuelwoodUse - this.sustainableFuelwoodUse) * this.damageRate + this.overgrazing")
            console.log("desertification: " + this.desertification)
            console.log("fuelwoodUse: " + this.fuelwoodUse)
            console.log("sustainableFuelwoodUse: " + this.sustainableFuelwoodUse)
            console.log("damageRate: " + this.damageRate)
            console.log("overgrazing: " + this.overgrazing)
            console.log("this.overgrazing = this.starvation * this.overgrazingRate")
            console.log("overgrazing: " + this.overgrazing)
            console.log("starvation: " + this.starvation)
            console.log("overgrazingRate: " + this.overgrazingRate)
            console.log("this.soilErosion = this.desertification + this.forestClearing")
            console.log("soilErosion: " + this.soilErosion)
            console.log("desertification: " + this.desertification)
            console.log("forestClearing: " + this.forestClearing)
            console.log("this.forestClearing = this.starvation * this.clearingRate - this.debtForNatureBudget / this.priceOfForestLand;")
            console.log("forestClearing: " + this.forestClearing)
            console.log("starvation: " + this.starvation)
            console.log("clearingRate: " + this.clearingRate)
            console.log("debtForNatureBudget: " + this.debtForNatureBudget)
            console.log("priceOfForestLand: " + this.priceOfForestLand)
            console.log("this.forestLand = this.forestLand - this.logging - this.fuelwoodUse * this.wood - this.forestClearing - this.acidRain * this.damage")
            console.log("forestLand: " + this.forestLand)
            console.log("logging: " + this.logging)
            console.log("fuelwoodUse: " + this.fuelwoodUse)
            console.log("wood: " + this.wood)
            console.log("forestClearing: " + this.forestClearing)
            console.log("acidRain: " + this.acidRain)
            console.log("damage: " + this.damage)
            console.log("this.farmLand = this.farmLand + this.forestClearing * this.valueOfClearedLand")
            console.log("farmLand: " + this.farmLand)
            console.log("farmLand: " + this.farmLand)
            console.log("forestClearing: " + this.forestClearing)
            console.log("valueOfClearedLand: " + this.valueOfClearedLand)
            console.log("this.crops = this.cropYields * this.farmLand - this.beefGrainConsumption * this.beefProduction")
            console.log("crops: " + this.crops)
            console.log("cropYields: " + this.cropYields)
            console.log("farmLand: " + this.farmLand)
            console.log("beefGrainConsumption: " + this.beefGrainConsumption)
            console.log("beefProduction: " + this.beefProduction)
            console.log("this.cropYields = this.weight1 * this.cropTechnology + this.weight2 * this.waterSupply - this.weight3 * this.ultravioletLight;")
            console.log("cropYields: " + this.cropYields)
            console.log("weight1: " + this.weight1)
            console.log("cropTechnology: " + this.cropTechnology)
            console.log("weight2: " + this.weight2)
            console.log("waterSupply: " + this.waterSupply)
            console.log("weight3: " + this.weight3)
            console.log("ultravioletLight: " + this.ultravioletLight)
            console.log("this.cropTechnology = this.weight1_tech * this.cropStrains + this.weight2_tech * this.pesticideUse + this.weight3_tech * this.fertilizerUse")
            console.log("cropTechnology: " + this.cropTechnology)
            console.log("this.weight1_tech: " + this.weight1_tech)
            console.log("cropStrains: " + this.cropStrains)
            console.log("weight2_tech: " + this.weight2_tech)
            console.log("pesticideUse: " + this.pesticideUse)
            console.log("weight3_tech: " + this.weight3_tech)
            console.log("fertilizerUse: " + this.fertilizerUse)
            console.log("this.cropStrains = this.bioTechnology * this.globalGenePool * this.cropTechOptimism")
            console.log("cropStrains: " + this.cropStrains)
            console.log("bioTechnology: " + this.bioTechnology)
            console.log("globalGenePool: " + this.globalGenePool)
            console.log("cropTechOptimism: " + this.cropTechOptimism)
            console.log("this.foodSupply = this.seafood + this.beefProduction + this.crops")
            console.log("foodSupply: " + this.foodSupply)
            console.log("seafood: " + this.seafood)
            console.log("beefProduction: " + this.beefProduction)
            console.log("crops: " + this.crops)
            console.log("this.methane = this.methane * (1 - this.decayRate) + this.beefProduction * this.burpFactor + this.acidRain * this.soilFactor;")
            console.log("methane: " + this.methane)
            console.log("methane: " + this.methane)
            console.log("decayRate: " + this.decayRate)
            console.log("beefProduction: " + this.beefProduction)
            console.log("burpFactor: " + this.burpFactor)
            console.log("acidRain: " + this.acidRain)
            console.log("soilFactor: " + this.soilFactor)
            console.log("=====================================Beef========================================================")
        },
        calculateCFCFormulas(){
            this.cfcProduction = this.useRateCFCPro * this.materialsDemand / (this.costToProduceCFCPro + this.taxEffectCFCPro * this.cfcTax);//ja
            this.troposphericCFCs = this.troposphericCFCs * (1.0 - this.destructionRate) + this.cfcProduction;//ja
            this.stratosphericCFCs = this.equilibriumConstant * this.troposphericCFCs;//ja
            this.ozone = this.equillibriumOzone - this.cfcKillerRate * this.stratosphericCFCs;//ja
            this.ultravioletLight = this.solarUV / (this.ozoneAbsorption * this.ozone);//ja
            this.phytoplankton = this.normalPhytoplankton * (1 - this.phytoplanktonDamageRate * this.ultravioletLight);//ja
            this.skinCancerDeaths = this.skinCancerIncidence * this.ultravioletLight;//ja
            this.skinCancerPoints = this.valueOfOneHumanLifeSkinCancer * this.skinCancerDeaths;//ja
            console.log("===========================================CFC===================================================")
            console.log("this.cfcProduction = this.useRateCFCPro * this.materialsDemand / (this.costToProduceCFCPro + this.taxEffectCFCPro * this.cfcTax);")
            console.log("cfcProduction: " + this.cfcProduction);
            console.log("useRateCFCPro: " + this.useRateCFCPro);
            console.log("materialsDemand: " + this.materialsDemand);
            console.log("costToProduceCFCPro: " + this.costToProduceCFCPro);
            console.log("taxEffectCFCPro: " + this.taxEffectCFCPro);
            console.log("this.cfcTax: " + this.cfcTax);
            console.log("this.troposphericCFCs = this.troposphericCFCs * (1.0 - this.destructionRate) + this.cfcProduction;")
            console.log("troposphericCFCs: " + this.troposphericCFCs);
            console.log("troposphericCFCs: " + this.troposphericCFCs);
            console.log("destructionRate: " + this.destructionRate);
            console.log("cfcProduction: " + this.cfcProduction);
            console.log("this.stratosphericCFCs = this.equilibriumConstant * this.troposphericCFCs;")
            console.log("stratosphericCFCs: " + this.stratosphericCFCs);
            console.log("equilibriumConstant: " + this.equilibriumConstant);
            console.log("troposphericCFCs: " + this.troposphericCFCs);
            console.log("this.ozone = this.equillibriumOzone - this.cfcKillerRate * this.stratosphericCFCs")
            console.log("ozone: " + this.ozone);
            console.log("equillibriumOzone: " + this.equillibriumOzone);
            console.log("cfcKillerRate: " + this.cfcKillerRate);
            console.log("stratosphericCFCs: " + this.stratosphericCFCs);
            console.log("this.ultravioletLight = this.solarUV / (this.ozoneAbsorption * this.ozone);")
            console.log("ultravioletLight: " + this.ultravioletLight);
            console.log("solarUV: " + this.solarUV);
            console.log("ozoneAbsorption: " + this.ozoneAbsorption);
            console.log("ozone: " + this.ozone);
            console.log("this.phytoplankton = this.normalPhytoplankton * (1 - this.phytoplanktonDamageRate * this.ultravioletLight);")
            console.log("phytoplankton: " + this.phytoplankton);
            console.log("normalPhytoplankton: " + this.normalPhytoplankton);
            console.log("phytoplanktonDamageRate: " + this.phytoplanktonDamageRate);
            console.log("ultravioletLight: " + this.ultravioletLight);
            console.log("this.skinCancerDeaths = this.skinCancerIncidence * this.ultravioletLight;")
            console.log("skinCancerDeaths: " + this.skinCancerDeaths);
            console.log("skinCancerIncidence: " + this.skinCancerIncidence);
            console.log("ultravioletLight: " + this.ultravioletLight);
            console.log("this.skinCancerPoints = this.valueOfOneHumanLifeSkinCancer * this.skinCancerDeaths;")
            console.log("skinCancerPoints: " + this.skinCancerPoints);
            console.log("valueOfOneHumanLifeSkinCancer: " + this.valueOfOneHumanLifeSkinCancer);
            console.log("skinCancerDeaths: " + this.skinCancerDeaths);
            console.log("===========================================CFC===================================================")
        },
        calculateFertilizerFormulas(){
            this.fertilizerUse = (this.industrialOutput * this.scaleFactor) / (this.costToProduce_fertilizerUse + this.taxEffect_fertilizerUse * this.fertilizerTax);//ja
            console.log("======================================fertilizer==========================================")
            console.log("this.fertilizerUse = (this.industrialOutput * this.scaleFactor) / (this.costToProduce_fertilizerUse + this.taxEffect_fertilizerUse * this.fertilizerTax);")
            console.log("fertilizerUse: " + this.fertilizerUse);
            console.log("industrialOutput: " + this.industrialOutput);
            console.log("scaleFactor: " + this.scaleFactor);
            console.log("costToProduce_fertilizerUse: " + this.costToProduce_fertilizerUse);
            console.log("taxEffect_fertilizerUse: " + this.taxEffect_fertilizerUse);
            console.log("fertilizerTax: " + this.fertilizerTax);
            console.log("====================================fertilizer=============================================")
        },
        calculateHeavyMetalFormulas(){
            this.heavyMetalUse = this.useRate_heavyMetalUse * this.materialsDemand / (this.heavyMetalPrice + this.taxEffect_heavyMetalUse * this.heavyMetalTax);//ja
            this.heavyMetalPrice = (this.heavyMetalPrice + this.heavyMetalPriceFactor * this.heavyMetalUse / this.heavyMetalSupply) / 2;//ja anders als display
            this.heavyMetalSupply = this.heavyMetalSupplyElasticity * this.heavyMetalPrice - this.totalHeavyMetalUse;//ja
            this.totalHeavyMetalUse = this.totalHeavyMetalUse + this.heavyMetalUse;//ja
            this.heavyMetalDeaths = this.heavyMetalDeathRate * this.heavyMetalUse;//ja
            this.heavyMetalPoints = this.valueOfOneHumanLife_heavyMetal * this.heavyMetalDeaths;//ja
            this.industrialInput = this.netEnergy * Math.sqrt(this.globalGenePool) * (this.heavyMetalUse + this.cfcProduction);//ja
            this.industrialOutput = this.industrialInput;//ja
            this.grossGlobalProduction = this.valueOfIndustrialOutput * this.industrialOutput;//ja
            this.materialsDemand = 1.01 * this.materialsDemand;//ja
            this.garbage = (this.grossGlobalProduction * this.garbagePerGGP) - (this.recycledPaper * (this.logging / 3));//ja
            this.consumerGoods = this.consumerGoodsRatio * this.industrialOutput;//ja
            this.computerGamesPoints = 2;//ja
            console.log("==========================================heavy metal =========================================")
            console.log("heavyMetalUse = " + this.heavyMetalUse);
            console.log("heavyMetalPrice = " + this.heavyMetalPrice);
            console.log("heavyMetalSupply = " + this.heavyMetalSupply);
            console.log("totalHeavyMetalUse = " + this.totalHeavyMetalUse);
            console.log("heavyMetalDeaths = " + this.heavyMetalDeaths);
            console.log("heavyMetalPoints = " + this.heavyMetalPoints);
            console.log("industrialInput = " + this.industrialInput);
            console.log("industrialOutput = " + this.industrialOutput);
            console.log("grossGlobalProduction = " + this.grossGlobalProduction);
            console.log("materialsDemand = " + this.materialsDemand);
            console.log("garbage = " + this.garbage);
            console.log("consumerGoods = " + this.consumerGoods);
            console.log("computerGamesPoints = " + this.computerGamesPoints);
            console.log("==========================================heavy metal =========================================")
        },
        calculateLakeFormulas(){
            this.lakeLifePoints = this.lakeLifeValue * this.lakeHabitats;//JA
            this.lakeHabitats = this.virginLakeHabitats / ((this.naturalLakeAcidity + this.lakeAcidity) * this.destruction);//ja
            this.lakeAcidity = (this.lakeAcidity * this.lakeWater + this.acidRain) * this.purgeRate / this.lakeWater;//ja
            this.acidRain = this.so2 + this.no2;//ja
            this.forestHabitats = this.proportionalityConstant * Math.sqrt(this.forestLand);//ja
            this.forestLifePoints = this.valueOfForestLife * this.forestHabitats;//ja
            this.globalGenePool = this.forestHabitats + this.c1GlobalGenePool * this.marineLife + this.riparianHabitats + this.lakeHabitats;//JA
            this.marineLife = this.pyramidFactor * this.phytoplankton - this.seafood - this.pToxicity * this.pesticideUse - this.oilToxicity * this.oilSpills;//ja
            this.marineLifePoints = this.valueOfMarineLife * this.marineLife;//ja
            this.riparianHabitats = this.initialRiparianHabitats - this.damageRateOfDams * this.damUse;//ja
            this.biodiversityPoints = this.valueOfBiodiversity * this.globalGenePool;//ja
            this.seafood = this.marineLife * this.maxSustainableFraction;//ja
            console.log("==================================================lake=========================================")
            console.log("lakeLifePoints = " + this.lakeLifePoints)
            console.log("lakeHabitats = " + this.lakeHabitats)
            console.log("lakeAcidity = " + this.lakeAcidity)
            console.log("acidRain = " + this.acidRain)
            console.log("forestHabitats = " + this.forestHabitats)
            console.log("forestLLifePoints = " + this.forestLLifePoints)
            console.log("globalGenePool = " + this.globalGenePool)
            console.log("marineLife = " + this.marineLife)
            console.log("riparianHabitats = " + this.riparianHabitats)
            console.log("biodiversityPoints = " + this.biodiversityPoints)
            console.log("seafood = " + this.seafood)
            console.log("==================================================lake=========================================")
        },
        calculateLoggingFormulas(){
            this.logging = (this.materialsDemand * this.useRateLogging / (this.costLogging + this.taxEffectLogging *  this.loggingTax)) * (1 - 0.3 * this.recycledPaper);//ja
            console.log("=============================================logging==========================================")
            console.log("logging = " + this.logging);
            console.log("=============================================logging==========================================")
        },
        calculatePesticideFormulas(){
            this.pesticideUse = (this.industrialOutput * this.useRate)/ (this.costToProduce_pesticide + this.taxEffect_pesticide * this.pesticideTax);//ja
            this.pesticideDeaths = this.effectiveToxicity * this.pesticideUse;//JA
            this.pesticidePoints = this.valueOfFarmLaborersLife * this.pesticideDeaths;//ja
            console.log("========================================pesticide==========================================")
            console.log("pesticideUse = " + this.pesticideUse)
            console.log("pesticideDeaths = " + this.pesticideDeaths)
            console.log("pesticidePoints = " + this.pesticidePoints)
            console.log("========================================pesticide==========================================")
        },
        calculateRecycleFormulas(){
            this.recycledPaper = 1 - Math.exp(-this.recyclingEffectiveness * this.recyclingCenterBudget);//ja
            this.recycledAluminum = this.aluminumRecycling * this.recyclingCenterBudget;//ja
            console.log("====================================recycled==============================================")
            console.log("recycledPaper = " + this.recycledPaper);
            console.log("recycledAluminum = " + this.recycledAluminum);
            console.log("====================================recycled==============================================")
        },
        calculateWaterFormulas(){
           this.waterSupply = this.groundwaterUse + this.reservoirCapacity - this.waterPollution;//ja
           this.waterPollution = this.hmToxic * this.heavyMetalUse + this.pToxic * this.pesticideUse + this.fToxic * this.fertilizerUse;//ja
           this.groundwaterUse = this.c1GroundwaterUse * (this.groundwaterSupply - this.landAbuse * this.contamination) / Math.sqrt(this.aveEnergyPrice);//ja
           this.groundwaterSupply = this.groundwaterSupply - this.groundwaterUse;//JA
           this.drinkingWater = this.drinkingFraction * this.waterSupply;//ja
           this.reservoirCapacity = this.capacityPerDam * this.damUse;//JA
           console.log("=============================================water=======================================")
           console.log("waterSupply = " + this.waterSupply)
           console.log("waterPollution = " + this.waterPollution)
           console.log("groundwaterUse = " + this.groundwaterUse)
           console.log("groundwaterSupply = " + this.groundwaterSupply)
           console.log("drinkingWater = " + this.drinkingWater)
           console.log("reservoirCapacity = " + this.reservoirCapacity)
           console.log("=============================================water=======================================")
        },
        execute() {
            /*formula execute*/
            //for(let i = 0; i < 5; i++){
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
                /*ergänzung*/
                this.calculateBeefFormulas();
                this.calculateCFCFormulas();
                this.calculateFertilizerFormulas();
                this.calculateHeavyMetalFormulas();
                this.calculateLakeFormulas();
                this.calculateLoggingFormulas();
                this.calculatePesticideFormulas();
                this.calculateRecycleFormulas();
                this.calculateWaterFormulas();
            

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
                    northernLifestyle:Math.floor(this.northernLifestyle/Math.pow(10,6)*100)/100,

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

                    beefProduction: Math.floor(this.beefProduction/ Math.pow(10,9) * 100)/100,
                    beefTaxIncome: Math.floor(this.beefTaxIncome / Math.pow(10,6) * 100)/100,
                    crops:Math.floor(this.crops / Math.pow(10,9) * 100)/100,
                    cropStrains:Math.floor(this.cropStrains/ Math.pow(10,3) * 100)/100,
                    cropTechnology:Math.floor(this.cropTechnology/ Math.pow(10,6) * 100)/100,
                    cropYields:this.cropYields,
                    debtForNatureBudget:Math.floor(this.debtForNatureBudget/Math.pow(10,9) * 100)/100,
                    desertification:Math.floor(this.desertification/Math.pow(10,6)*100)/100,
                    farmLand:Math.floor(this.farmLand/Math.pow(10,9) * 100)/100,
                    foodSupply:Math.floor(this.foodSupply/Math.pow(10,9) * 100)/100,
                    forestClearing:Math.floor(this.forestClearing / Math.pow(10,6) * 100)/100,
                    forestLand:Math.floor(this.forestLand/Math.pow(10,9) * 100)/100,
                    fuelwoodUse:Math.floor(this.fuelwoodUse/Math.pow(10,9) * 100)/100,
                    grasslands:Math.floor(this.grasslands / Math.pow(10,9) *100)/100,
                    methane:Math.floor(this.methane/Math.pow(10,9) * 100)/100,
                    overgrazing:Math.floor(this.overgrazing/Math.pow(10,6) * 100)/100,
                    soilErosion:Math.floor(this.soilErosion/Math.pow(10,6) * 100)/100,
                    woodStoveBudget:Math.floor(this.woodStoveBudget/Math.pow(10,9) * 100)/100,

                    cfcProduction:Math.floor(this.cfcProduction/Math.pow(10,3) * 100)/100,
                    cfcTaxIncome:Math.floor(this.cfcTaxIncome/Math.pow(10,6) * 100)/100,
                    ozone:Math.floor(this.ozone/Math.pow(10,9)*100)/100,
                    phytoplankton:Math.floor(this.phytoplankton/Math.pow(10,9)*100)/100,
                    skinCancerDeaths:Math.floor(this.skinCancerDeaths/Math.pow(10,3)*100)/100,
                    skinCancerPoints:this.skinCancerPoints,
                    stratosphericCFCs:Math.floor(this.stratosphericCFCs/Math.pow(10,6)*100)/100,
                    troposphericCFCs:Math.floor(this.troposphericCFCs/Math.pow(10,6)*100)/100,
                    ultravioletLight:this.ultravioletLight,

                    propertyDamagePayments:Math.floor(this.propertyDamagePayments/Math.pow(10,9)*100)/100,

                    floodDeathPoints:this.floodDeathPoints,
                    floodDeaths:Math.floor(this.floodDeaths/Math.pow(10,3)*100)/100,

                    fertilizerTaxIncome:Math.floor(this.fertilizerTaxIncome/Math.pow(10,6)*100)/100,
                    fertilizerUse:Math.floor(this.fertilizerUse/Math.pow(10,6)*100)/100,

                    heavyMetalTaxIncome:Math.floor(this.heavyMetalTaxIncome/Math.pow(10,6)*100)/100,
                    heavyMetalUse:Math.floor(this.heavyMetalUse/Math.pow(10,6)*100)/100,
                    heavyMetalPrice:this.heavyMetalPrice,
                    heavyMetalSupply:Math.floor(this.heavyMetalSupply/Math.pow(10,6) * 100)/100,
                    heavyMetalDeaths:Math.floor(this.heavyMetalDeaths/Math.pow(10,3)*100)/100,
                    heavyMetalPoints:this.heavyMetalPoints,
                    totalHeavyMetalUse:Math.floor(this.totalHeavyMetalUse/Math.pow(10,6)*100)/100,
                    computerGamesPoints:this.computerGamesPoints,
                    consumerGoods:Math.floor(this.consumerGoods/Math.pow(10,6)*100)/100,
                    garbage:Math.floor(this.garbage/Math.pow(10,6)*100)/100,
                    grossGlobalProduction:Math.floor(this.grossGlobalProduction/Math.pow(10,12)*100)/100,
                    industrialInput:Math.floor(this.industrialInput/Math.pow(10,12)*100)/100,
                    industrialOutput:Math.floor(this.industrialOutput/Math.pow(10,12)*100)/100,
                    materialsDemand:Math.floor(this.materialsDemand/Math.pow(10,9)*100)/100,

                    acidRain:Math.floor(this.acidRain/Math.pow(10,6)*100)/100,
                    biodiversityPoints:Math.floor(this.biodiversityPoints/1000 * 100)/100,
                    forestHabitats:Math.floor(this.forestHabitats/Math.pow(10,6)*100)/100,
                    forestLifePoints:this.forestLifePoints,
                    globalGenePool:Math.floor(this.globalGenePool/Math.pow(10,6)*100)/100,
                    lakeAcidity:this.lakeAcidity,
                    lakeHabitats:Math.floor(this.lakeHabitats/1000 * 100)/100,
                    lakeLifePoints:this.lakeLifePoints,
                    marineLife:Math.floor(this.marineLife/Math.pow(10,9)*100)/100,
                    marineLifePoints:this.marineLifePoints,
                    riparianHabitats:Math.floor(this.riparianHabitats/Math.pow(10,3) * 100)/100,
                    seafood:Math.floor(this.seafood/Math.pow(10,6)*100)/100,

                    housing:Math.floor(this.housing/Math.pow(10,9)*100)/100,
                    medicines:Math.floor(this.medicines/Math.pow(10,6)*100)/100,
                    southernLifestyle:Math.floor(this.southernLifestyle/Math.pow(10,9)*100)/100,

                    logging:Math.floor(this.logging/Math.pow(10,6)*100)/100,
                    loggingTaxIncome:Math.floor(this.loggingTaxIncome/Math.pow(10,6)*100)/100,

                    oilSpills:Math.floor(this.oilSpills/Math.pow(10,6)*100)/100,

                    pesticideDeaths:Math.floor(this.pesticideDeaths/1000 * 100)/100,
                    pesticidePoints:this.pesticidePoints,
                    pesticideTaxIncome:Math.floor(this.pesticideTaxIncome/Math.pow(10,6)*100)/100,
                    pesticideUse:Math.floor(this.pesticideUse/Math.pow(10,6)*100)/100,

                    recycledAluminum:Math.floor(this.recycledAluminum/Math.pow(10,6)*100)/100,
                    recycledPaper:this.recycledPaper,
                    recyclingCenterBudget:Math.floor(this.recyclingCenterBudget/Math.pow(10,9)*100)/100,

                    familyPlanningBudget:Math.floor(this.familyPlanningBudget/Math.pow(10,9)*100)/100,

                    drinkingWater:Math.floor(this.drinkingWater/Math.pow(10,9)*100)/100,
                    groundwaterSupply:Math.floor(this.groundwaterSupply/Math.pow(10,12)*100)/100,
                    groundwaterUse:Math.floor(this.groundwaterUse/Math.pow(10,12)*100)/100,
                    reservoirCapacity:Math.floor(this.reservoirCapacity/Math.pow(10,9)*100)/100,
                    waterPollution:Math.floor(this.waterPollution/Math.pow(10,9)*100)/100,
                    waterSupply:Math.floor(this.waterSupply/Math.pow(10,12)*100)/100
                }

                //localStorage.setItem(this.year,JSON.stringify(data)); 
                //to be saved is from the year 1990
                
                localStorage.setItem(this.year,JSON.stringify(data));
                this.energyDemand = Math.floor(this.energyDemand * 1.01 * 100)/100;
                this.executed++;
                if(this.totalPoints < -12200){
                    this.gameover = true;
                    this.$router.push("/game/gameover");
                }
            //}
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
        changeC3Factor(c3){
            this.c3CarbonDioxide = c3;
        },
        changeTemperatureT0(t0) {
            this.t0 = t0;
        },
        changeCO2Eff(co2Eff) {
            this.co2Eff = co2Eff;
        },
        changeCFCEffFactor(cfcEff){
            this.cfcEff = cfcEff;
        },
        changeMethaneEffFactor(methaneEff){
            this.methaneEff = methaneEff;
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
        changeEnergySavedFactor(energySaved){
            this.energySaved = energySaved;
        },
        changeC1Factor(c1){
            this.c1 = c1;
        },
        changeC2Factor(c2){
            this.c2 = c2;
        },
        changeC3Factor(c3){
            this.c3 = c3;
        },
        changeC4Value(c4) {
            this.c4 = c4;
        },
        changeNorthernLifeValue(northernLifeValue) {
            this.northernLifeValue = northernLifeValue;
        },
        changeSouthernValueFactor(southernValue){
            this.southernValue = southernValue;
        },
        changeBirthRate(maximalBirthRate) {
            this.maximalBirthRate = maximalBirthRate;
        },
        changeC1FactorBirthRate(c1){
            this.c1BirthRate = c1;
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
        },
        changeFertilizerTaxRate(fertilizerTax){
            this.fertilizerTax = fertilizerTax;
        },
        changeScaleFactorRate(scaleFactor){
            this.scaleFactor = scaleFactor;
        },
        changeCostToProduceRate_fertilizerUse(costTopProduce_fertilizerUse){
            this.costToProduce_fertilizerUse = costTopProduce_fertilizerUse;
        },
        changeTaxEffectRate_fertilizerUse(taxEffect_fertilizerUse){
            this.taxEffect_fertilizerUse = taxEffect_fertilizerUse;
        },
        changeUseRateFactor_heavyMetalUse(useRate_heavyMetalUse){
            this.useRate_heavyMetalUse = useRate_heavyMetalUse;
        },
        changeTaxEffectRate_heavyMetalUse(taxEffect_heavyMetalUse){
            this.taxEffect_heavyMetalUse = taxEffect_heavyMetalUse;
        },
        changeHeavyMetalTaxRate(heavyMetalTax){
            this.heavyMetalTax = heavyMetalTax;
        },
        changeHeavyMetalPriceFactor(priceFactor){
            this.heavyMetalPriceFactor = priceFactor;
        },
        changeHeavyMetalSupplyElasticity(heavyMetalSupplyElasticity){
            this.heavyMetalSupplyElasticity = heavyMetalSupplyElasticity;
        },
        changeHeavyMetalDeathRate(heavyMetalDeathRate){
            this.heavyMetalDeathRate = heavyMetalDeathRate;
        },
        changeHeavymetalValueOfOneHumanLife(valueOfOneHumanLife){
            this.changeHeavymetalValueOfOneHumanLife = valueOfOneHumanLife;
        },
        changeHMToxicFactor(hmToxic){
            this.hmToxic = hmToxic;
        },
        changePToxicFactor(pToxic){
            this.pToxic = pToxic;
        },
        changeFToxicFactor(fToxic){
            this.fToxic = fToxic;
        },
        changeC1GroundwateerUse(c1){
            this.c1GroundwaterUse = c1;
        },
        changeContaminationFactor(contamination){
            this.contamination = contamination;
        },
        changeCapacityPerDam(capacityPerDam){
            this.capacityPerDam = capacityPerDam;
        },
        changeDrinkingFractionFactor(drinkingFraction){
            this.drinkingFraction = drinkingFraction;
        },
        changeW1SFactor(w1){
            this.w1_s = w1;
        },
        changeW2SFactor(w2){
            this.w2_s = w2;
        },
        changeW3SFactor(w3){
            this.w3_s = w3;
        },
        changeWoodRequirementsFactor(woodRequirements){
            this.woodRequirements = woodRequirements;
        },
        changeHousingScaleFactor(scaleFactorHousing){
            this.scaleFactorHousing = scaleFactorHousing;
        },
        changeLoggingTaxRate(loggingTax){
            this.loggingTax = loggingTax;
        },
        changeUseRateFactorLogging(useRate){
            this.useRateLogging = useRate;
        },
        changeCostFactorLogging(cost){
            this.costLogging = cost;
        },
        changeTaxEffectRateLogging(taxEffect){
            this.taxEffectLogging = taxEffect;
        },
        changeRecyclingEffectivenessFactor(recyclingEffectiveness){
            this.recyclingEffectiveness = recyclingEffectiveness;
        },
        changeRecyclingCenterSubsidyRate(rate){
            this.recyclingCenterSubsidyRate = rate;
        },
        changeAluminumRecyclingFactor(aluminumRecycling){
            this.aluminumRecycling = aluminumRecycling;
        },
        changeGarbagePerGGPFactor(garbagePerGGP){
            this.garbagePerGGP = garbagePerGGP;
        },
        changeValueOfIndustrialOutputFactor(valueOfIndustrialOutput){
            this.valueOfIndustrialOutput = valueOfIndustrialOutput;
        },
        changeConsumerGoodsRatioFactor(consumerGoodsRatio){
            this.consumerGoodsRatio = consumerGoodsRatio;
        },
        changeCFCTaxRate(cfcTax){
            this.cfcTax = cfcTax;
        },
        changeUseRateFactorCFCPro(useRate){
            this.useRateCFCPro = useRate;
        },
        changeCostToProduceFactorCFCPro(costToProduce){
            this.costToProduceCFCPro = costToProduce;
        },
        changeTaxEffectRateCFCPro(taxEffect){
            this.taxEffectCFCPro = taxEffect;
        },
        changeDestructionRateFactor(destructionRate){
            this.destructionRate = destructionRate;
        },
        changeEquilibriumConstantFactor(equilibriumConstant){
            this.equilibriumConstant = equilibriumConstant;
        },
        changeEquillibriumOzoneFactor(equillibriumOzone){
            this.equillibriumOzone = equillibriumOzone;
        },
        changeCFCKillerRateFactor(cfcKillerRate){
            this.cfcKillerRate = cfcKillerRate;
        },
        changeSolarUVFactor(solarUV){
            this.solarUV = solarUV;
        },
        changeOzoneAbsorptionFactor(ozoneAbsorption){
            this.ozoneAbsorption = ozoneAbsorption;
        },
        changeNormalPhytoplanktonFactor(normalPhytoplankton){
            this.normalPhytoplankton = normalPhytoplankton;
        },
        changePhytoplanktonDamageRateFactor(phytoplanktonDamageRate){
            this.phytoplanktonDamageRate = phytoplanktonDamageRate;
        },
        changeSkinCancerIncidenceFactor(skinCancerIncidence){
            this.skinCancerIncidence = skinCancerIncidence;
        },
        changeValueOfOneHumanLifeFactor(valueOfOneHumanLife){
            this.valueOfOneHumanLifeSkinCancer = valueOfOneHumanLife;
        },
        changeValueOfOneHumanLifeSkinCancerFactor(valueOfOneHumanLife){
            this.valueOfOneHumanLifeSkinCancer = valueOfOneHumanLife;
        },
        changeOvergrazingRateFactor(overgrazingRate){
            this.overgrazingRate = overgrazingRate;
        },
        changeDecayRateFactor(decayRate){
            this.decayRate = decayRate;
        },
        changeBurpFactor(burpFactor){
            this.burpFactor = burpFactor;
        },
        changeSoilFactor(soilFactor){
            this.soilFactor = soilFactor;
        },
        changeValueOfBiodiversityFactor(valueOfBiodiversity){
            this.valueOfBiodiversity = valueOfBiodiversity;
        },
        changeC1GlobalGenePoolFactor(c1){
            this.c1GlobalGenePool = c1;
        },
        changeProportionalityConstantFactor(proportionalityConstant){
            this.proportionalityConstant = proportionalityConstant;
        },
        changeVirginLakeHabitatsFactor(virginLakeHabitats){
            this.virginLakeHabitats = virginLakeHabitats;
        },
        changeNaturalLakeAcidityFactor(naturalLakeAcidity){
            this.naturalLakeAcidity = naturalLakeAcidity;
        },
        changeDestructionFactor(destruction){
            this.destruction = destruction;
        },
        changeLakeLifeValue(value){
            this.lakeLifeValue = value;
        },
        changeValueOfForestLife(value){
            this.valueOfForestLife = value;
        },
        changeLakeWaterFactor(lakeWater){
            this.lakeWater = lakeWater;
        },
        changePurgeRateFactor(purgeRate){
            this.purgeRate = purgeRate;
        },
        changeInitialRiparianHabitatsFactor(initialRiparianHabitats){
            this.initialRiparianHabitats = initialRiparianHabitats;
        },
        changeDamageRateOfDamsFactor(damageRateOfDams){
            this.damageRateOfDams;
        },
        changePyramidFactor(pyramidFactor){
            this.pyramidFactor = pyramidFactor;
        },
        changePToxicityFactor(pToxicity){
            this.pToxicity = pToxicity;
        },
        changeOilToxicityFactor(oilToxicity){
            this.oilToxicity = oilToxicity;
        },
        changeValueOfMarineLifeFactor(value){
            this.valueOfMarineLife = value;
        },
        changeMaxSustainableFractionFactor(maxSustainableFraction){
            this.maxSustainableFraction = maxSustainableFraction;
        },
        changeSulfurCorrosivenessFactor(sulfurCorrosiveness){
            this.sulfurCorrosiveness = sulfurCorrosiveness;
        },
        changeNitrousCorrosivenessFactor(nitrousCorrosiveness){
            this.nitrousCorrosiveness = nitrousCorrosiveness;
        },
        changeSpillRate(spillRate){
            this.spillRate = spillRate;
        },
        changeFloodRate(floodRate){
            this.floodRate= floodRate;
        },
        changeValueOfOneHumanLifeFloodDeathPts(value){
            this.valueOfOneHumanLifeFloodDeathPts = value;
        },
        changeFamilyPlanningSusidyPercent(percent){
            this.familyPlanningSubsidy = percent;
        },
        changeCropTechOptimism(optimism){
            this.cropTechOptimism = this.optimism;
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
    margin: 2px 5px;
    width: 150px;
    height:50px;
    font-size:medium;
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
