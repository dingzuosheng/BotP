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
    </div>
    <div>
        <router-view v-slot="{ Component }" :show="show" :energyDemand1995="energyDemand1995" :energyDemand2000="energyDemand2000" :energyDemand2005="energyDemand2005" :energyDemand2010="energyDemand2010" :energyDemand2015="energyDemand2015" :energyDemand2020="energyDemand2020" :energyDemand2025="energyDemand2025" :energyDemand2030="energyDemand2030" :energyDemand2035="energyDemand2035" :energyDemand2040="energyDemand2040" :energyDemand2045="energyDemand2045" :energyDemand2050="energyDemand2050" @changeCoalTaxRate="updateCoalTaxRate($event)" :coalTaxRate="coalTaxRate" @changeCoalUserate="updateCoalUserate($event)" :coalUse="coalUse" :coalUse1995="coalUse1995" :totalCoalUse="totalCoalUse" @changeCoalPriceFactor="updateCoalPrice($event)" :coalPrice="coalPrice" @changeCoalSupply="updateCoalSupply($event)" :coalSupply="coalSupply" @changeOilTaxRate="updateOilTaxRate($event)" :oilTaxRate="oilTaxRate" @changeOilUseRate="updateOilUseRate($event)" :oilUse="oilUse" @changeOilPriceFactor="updateOilPrice($event)" :oilPrice="oilPrice" @changeOilSupply="updateOilSupply($event)" :oilSupply="oilSupply" :totalOilUse="totalOilUse" @changeNaturalGasTaxRate="updateNaturalGasTaxRate($event)" :naturalGasTaxRate="naturalGasTaxRate" @changeNaturalGasUseRate="updateNaturalGasUseRate($event)" :naturalGasUse="naturalGasUse" @changeNaturalGasPriceFactor="updateNaturalGasPrice($event)" :naturalGasPrice="naturalGasPrice" @changeNaturalGasSupply="updateNaturalGasSupply($event)" :naturalGasSupply="naturalGasSupply" :totalNaturalGasUse="totalNaturalGasUse" @changeNuclearTaxRate="updateNuclearTaxRate($event)" :nuclearTaxRate="nuclearTaxRate" @changeNuclearUseRate="updateNulearUseRate($event)" :nuclearUse="nuclearUse" @changeNuclearPriceFactor="updateNuclearPrice($event)" :nuclearPrice="nuclearPrice" @changeNuclearSupply="updateNuclearSupply($event)" :nuclearSupply="nuclearSupply" :totalNuclearUse="totalNuclearUse" @changeSolarEnergySubsidyPercent="updateSolarEnergySubsidy($event)" :solarEnergySubsidy="solarEnergySubsidy" @changeSolarUseRate="updateSolarUseRate($event)" :solarUse="solarUse" :solarEnergyTreasury="solarEnergyTreasury" @changeSoalrEnergyPotential="updateSolarEnergyPrice($event)" :solarPrice="solarPrice" @changeSolarOptimism="updateSolarTechnology($event)" :solarTechnology="solarTechnology" :solarResearchTreasury="solarResearchTreasury" @changeSolarResearchSubsidy="updateSolarResearchSubsidy($event)" :solarResearch="solarResearch" @changeBasicResearchSubsidy="updateBasicResearchSubsidy($event)" :basicResearch="basicResearch" :basicResearchTreasury="basicResearchTreasury" @changeBioResearchSubsidy="updateBioResearchSubsidy($event)" :bioResearch="bioResearch" @changeBioOptimism="updateBioTechnology($event)" :bioTechnology="bioTechnology" :bioResearchTreasury="bioResearchTreasury" @changeCoalResearchSubsidy="updateCoalResearchSubsidy($event)" :coalResearch="coalResearch" @changeCoalOptimism="updateCoalTechnology($event)" :coalTechnology="coalTechnology" :coalResearchTreasury="coalResearchTreasury" @changeOilResearchSubsidy="updateOilResearchSubsidy($event)" :oilResearch="oilResearch" @changeOilOptimism="updateOilTechnology($event)" :oilTechnology="oilTechnology" :oilResearchTreasury="oilResearchTreasury" @changeNuclearResearchSubsidy="updateNuclearResearchSubsidy($event)" :nuclearResearch="nuclearResearch" @changeNuclearOptimism="updateNuclearTechnology($event)" :nuclearTechnology="nuclearTechnology" :nuclearResearchTreasury="nuclearResearchTreasury" @changeDamSubsidy="updateDamSubsidy($event)" :damUseTreasury="damUseTreasury" :damSubsidy="damSubsidy" @changeDamUseRate="updateDamUseRate($event)" :damUse="damUse" @changeDamPotential="updateDamPrice($event)" :damPrice="damPrice" @changeCO2Quantity="updateCO2Quantity($event)" :co2="co2" @changeTemperature="updateGlobalTemperature($event)" :globalTemperature="globalTemperature" @changeCO2Eff="updateCO2Eff($event)" :co2Eff="co2Eff" @changeBasicTemperature="updateBasicTemperature($event)" :basicTemperature="basicTemperature" @changeMeltingRate="updateSeeLevel($event)" :seeLevel="seeLevel" @changeC1Quantity="updateC1Quantity($event)" @changeNO2Quantity="updateNO2Quantity($event)" :no2="no2" @changeSulfurContent="updateSO2Quantity($event)" :so2="so2" :energyDemand="energyDemand" :aveEnergyPrice="aveEnergyPrice" @changePriceElasticity="updatePriceElasticity($event)" :energyConservation="energyConservation" :netEnergy="netEnergy" @changeLifestyle="updateLifestyle($event)" :lifestyle="lifestyle" @changeLifeValue="updateQualityOfLife($event)" :qualityOfLife="qualityOfLife" @changeBirthRate="updateBirthRate($event)" :birthRate="birthRate" :population="population" :nonrenewableEnergy="nonrenewableEnergy" :sustainability="sustainability" @changeSustainabilityPts="updateSustainabilityPts($event)" :sustainabilityPts="sustainabilityPts" @changeValueOfQualityOfLife="updateQualityPoints($event)" :qualityPoints="qualityPoints">
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
            energyDemand1995: 306.03, //alle Variablen sind von Energy Demand abängig
            energyDemand2000: 309.09,
            energyDemand2005: 312.18,
            energyDemand2010: 315.30,
            energyDemand2015: 318.46,
            energyDemand2020: 321.64,
            energyDemand2025: 324.86,
            energyDemand2030: 328.11,
            energyDemand2035: 331.39,
            energyDemand2040: 334.70,
            energyDemand2045: 338.05,
            energyDemand2050: 341.43, //energyDemand
            coalUse1995: 1,
            coalUse2000: 0,
            coalUse2005: 0,
            coalUse2010: 0,
            coalUse2015: 0,
            coalUse2020: 0,
            coalUse2025: 0,
            coalUse2030: 0,
            coalUse2035: 0,
            coalUse2040: 0,
            coalUse2045: 0,
            coalUse2050: 0, //coalUse

            coalPrice1995: 0,
            coalPrice2000: 0,
            coalPrice2005: 0,
            coalPrice2010: 0,
            coalPrice2015: 0,
            coalPrice2020: 0,
            coalPrice2025: 0,
            coalPrice2030: 0,
            coalPrice2035: 0,
            coalPrice2040: 0,
            coalPrice2045: 0,
            coalPrice2050: 0, //coalPrice

            coalSupply1995: 0,
            coalSupply2000: 0,
            coalSupply2005: 0,
            coalSupply2010: 0,
            coalSupply2015: 0,
            coalSupply2020: 0,
            coalSupply2025: 0,
            coalSupply2030: 0,
            coalSupply2035: 0,
            coalSupply2040: 0,
            coalSupply2045: 0,
            coalSupply2050: 0, //coalSupply

            totalCoalUse1995: 0,
            totalCoalUse2000: 0,
            totalCoalUse2005: 0,
            totalCoalUse2010: 0,
            totalCoalUse2015: 0,
            totalCoalUse2020: 0,
            totalCoalUse2025: 0,
            totalCoalUse2030: 0,
            totalCoalUse2035: 0,
            totalCoalUse2040: 0,
            totalCoalUse2045: 0,
            totalCoalUse2050: 0, //totalCoalUse

            oilUse1995: 0,
            oilUse2000: 0,
            oilUse2005: 0,
            oilUse2010: 0,
            oilUse2015: 0,
            oilUse2020: 0,
            oilUse2025: 0,
            oilUse2030: 0,
            oilUse2035: 0,
            oilUse2040: 0,
            oilUse2045: 0,
            oilUse2050: 0, //oilUse

            oilPrice1995: 0,
            oilPrice2000: 0,
            oilPrice2005: 0,
            oilPrice2010: 0,
            oilPrice2015: 0,
            oilPrice2020: 0,
            oilPrice2025: 0,
            oilPrice2030: 0,
            oilPrice2035: 0,
            oilPrice2040: 0,
            oilPrice2045: 0,
            oilPrice2050: 0, //oilPrice

            oilSupply1995: 0,
            oilSupply2000: 0,
            oilSupply2005: 0,
            oilSupply2010: 0,
            oilSupply2015: 0,
            oilSupply2020: 0,
            oilSupply2025: 0,
            oilSupply2030: 0,
            oilSupply2035: 0,
            oilSupply2040: 0,
            oilSupply2045: 0,
            oilSupply2050: 0, //oilSupply

            totalOilUse1995: 0,
            totalOilUse2000: 0,
            totalOilUse2005: 0,
            totalOilUse2010: 0,
            totalOilUse2015: 0,
            totalOilUse2020: 0,
            totalOilUse2025: 0,
            totalOilUse2030: 0,
            totalOilUse2035: 0,
            totalOilUse2040: 0,
            totalOilUse2045: 0,
            totalOilUse2050: 0, //totalOilUse

            naturalGasUse1995: 0,
            naturalGasUse2000: 0,
            naturalGasUse2005: 0,
            naturalGasUse2010: 0,
            naturalGasUse2015: 0,
            naturalGasUse2020: 0,
            naturalGasUse2025: 0,
            naturalGasUse2030: 0,
            naturalGasUse2035: 0,
            naturalGasUse2040: 0,
            naturalGasUse2045: 0,
            naturalGasUse2050: 0, //naturalGasUse

            naturalGasPrice1995: 0,
            naturalGasPrice2000: 0,
            naturalGasPrice2005: 0,
            naturalGasPrice2010: 0,
            naturalGasPrice2015: 0,
            naturalGasPrice2020: 0,
            naturalGasPrice2025: 0,
            naturalGasPrice2030: 0,
            naturalGasPrice2035: 0,
            naturalGasPrice2040: 0,
            naturalGasPrice2045: 0,
            naturalGasPrice2050: 0, //naturalGasPrice

            naturalGasSupply1995: 0,
            naturalGasSupply2000: 0,
            naturalGasSupply2005: 0,
            naturalGasSupply2010: 0,
            naturalGasSupply2015: 0,
            naturalGasSupply2020: 0,
            naturalGasSupply2025: 0,
            naturalGasSupply2030: 0,
            naturalGasSupply2035: 0,
            naturalGasSupply2040: 0,
            naturalGasSupply2045: 0,
            naturalGasSupply2050: 0, //naturalGasSupply

            totalNaturalGasUse1995: 0,
            totalNaturalGasUse2000: 0,
            totalNaturalGasUse2005: 0,
            totalNaturalGasUse2010: 0,
            totalNaturalGasUse2015: 0,
            totalNaturalGasUse2020: 0,
            totalNaturalGasUse2025: 0,
            totalNaturalGasUse2030: 0,
            totalNaturalGasUse2035: 0,
            totalNaturalGasUse2040: 0,
            totalNaturalGasUse45: 0,
            totalNaturalGasUse2050: 0, //totalNaturalGasUse

            nuclearUse1995: 0,
            nuclearUse2000: 0,
            nuclearUse2005: 0,
            nuclearUse2010: 0,
            nuclearUse2015: 0,
            nuclearUse2020: 0,
            nuclearUse2025: 0,
            nuclearUse2030: 0,
            nuclearUse2035: 0,
            nuclearUse2040: 0,
            nuclearUse2045: 0,
            nuclearUse2050: 0, //nuclearUse

            nuclearPrice1995: 0,
            nuclearPrice2000: 0,
            nuclearPrice2005: 0,
            nuclearPrice2010: 0,
            nuclearPrice2015: 0,
            nuclearPrice2020: 0,
            nuclearPrice2025: 0,
            nuclearPrice2030: 0,
            nuclearPrice2035: 0,
            nuclearPrice2040: 0,
            nuclearPrice2045: 0,
            nuclearPrice2050: 0, //nuclearPrice

            nuclearSupply1995: 0,
            nuclearSupply2000: 0,
            nuclearSupply2005: 0,
            nuclearSupply2010: 0,
            nuclearSupply2015: 0,
            nuclearSupply2020: 0,
            nuclearSupply2025: 0,
            nuclearSupply2030: 0,
            nuclearSupply2035: 0,
            nuclearSupply2040: 0,
            nuclearSupply2045: 0,
            nuclearSupply2050: 0, //nuclearSupply

            totalNuclearUse1995: 0,
            totalNuclearUse2000: 0,
            totalNuclearUse2005: 0,
            totalNuclearUse2010: 0,
            totalNuclearUse2015: 0,
            totalNuclearUse2020: 0,
            totalNuclearUse2025: 0,
            totalNuclearUse2030: 0,
            totalNuclearUse2035: 0,
            totalNuclearUse2040: 0,
            totalNuclearUse2045: 0,
            totalNuclearUse2050: 0, //totalNuclearUse

            solarUse1995: 0,
            solarUse2000: 0,
            solarUse2005: 0,
            solarUse2010: 0,
            solarUse2015: 0,
            solarUse2020: 0,
            solarUse2025: 0,
            solarUse2030: 0,
            solarUse2035: 0,
            solarUse2040: 0,
            solarUse2045: 0,
            solarUse2050: 0, //solarUse

            solarPrice1995: 0,
            solarPrice2000: 0,
            solarPrice2005: 0,
            solarPrice2010: 0,
            solarPrice2015: 0,
            solarPrice2020: 0,
            solarPrice2025: 0,
            solarPrice2030: 0,
            solarPrice2035: 0,
            solarPrice2040: 0,
            solarPrice2045: 0,
            solarPrice2050: 0, //solarPrice

            damUse1995: 0,
            damUse2000: 0,
            damUse2005: 0,
            damUse2010: 0,
            damUse2015: 0,
            damUse2020: 0,
            damUse2025: 0,
            damUse2030: 0,
            damUse2035: 0,
            damUse2040: 0,
            damUse2045: 0,
            damUse2050: 0, //solarUse

            damPrice1995: 0,
            damPrice2000: 0,
            damPrice2005: 0,
            damPrice2010: 0,
            damPrice2015: 0,
            damPrice2020: 0,
            damPrice2025: 0,
            damPrice2030: 0,
            damPrice2035: 0,
            damPrice2040: 0,
            damPrice2045: 0,
            damPrice2050: 0, //solarPrice

            solarTechnology1995: 1,
            solarTechnology2000: 0,
            solarTechnology2005: 0,
            solarTechnology2010: 0,
            solarTechnology2015: 0,
            solarTechnology2020: 0,
            solarTechnology2025: 0,
            solarTechnology2030: 0,
            solarTechnology2035: 0,
            solarTechnology2040: 0,
            solarTechnology2045: 0,
            solarTechnology2050: 0,

            bioTechnology1995: 0,
            bioTechnology2000: 0,
            bioTechnology2005: 0,
            bioTechnology2010: 0,
            bioTechnology2015: 0,
            bioTechnology2020: 0,
            bioTechnology2025: 0,
            bioTechnology2030: 0,
            bioTechnology2035: 0,
            bioTechnology2040: 0,
            bioTechnology2045: 0,
            bioTechnology2050: 0,

            coalTechnology1995: 0,
            coalTechnology2000: 0,
            coalTechnology2005: 0,
            coalTechnology2010: 0,
            coalTechnology2015: 0,
            coalTechnology2020: 0,
            coalTechnology2025: 0,
            coalTechnology2030: 0,
            coalTechnology2035: 0,
            coalTechnology2040: 0,
            coalTechnology2045: 0,
            coalTechnology2050: 0,

            oilTechnology1995: 0,
            oilTechnology2000: 0,
            oilTechnology2005: 0,
            oilTechnology2010: 0,
            oilTechnology2015: 0,
            oilTechnology2020: 0,
            oilTechnology2025: 0,
            oilTechnology2030: 0,
            oilTechnology2035: 0,
            oilTechnology2040: 0,
            oilTechnology2045: 0,
            oilTechnology2050: 0,

            nuclearTechnology1995: 0,
            nuclearTechnology2000: 0,
            nuclearTechnology2005: 0,
            nuclearTechnology2010: 0,
            nuclearTechnology2015: 0,
            nuclearTechnology2020: 0,
            nuclearTechnology2025: 0,
            nuclearTechnology2030: 0,
            nuclearTechnology2035: 0,
            nuclearTechnology2040: 0,
            nuclearTechnology2045: 0,
            nuclearTechnology2050: 0,

            solarResearchTreasury1995: 0,
            solarResearchTreasury2000: 0,
            solarResearchTreasury2005: 0,
            solarResearchTreasury2010: 0,
            solarResearchTreasury2015: 0,
            solarResearchTreasury2020: 0,
            solarResearchTreasury2025: 0,
            solarResearchTreasury2030: 0,
            solarResearchTreasury2035: 0,
            solarResearchTreasury2040: 0,
            solarResearchTreasury2045: 0,
            solarResearchTreasury2050: 0,

            basicResearchTreasury1995: 0,
            basicResearchTreasury2000: 0,
            basicResearchTreasury2005: 0,
            basicResearchTreasury2010: 0,
            basicResearchTreasury2015: 0,
            basicResearchTreasury2020: 0,
            basicResearchTreasury2025: 0,
            basicResearchTreasury2030: 0,
            basicResearchTreasury2035: 0,
            basicResearchTreasury2040: 0,
            basicResearchTreasury2045: 0,
            basicResearchTreasury2050: 0,

            bioResearchTreasury1995: 0,
            bioResearchTreasury2000: 0,
            bioResearchTreasury2005: 0,
            bioResearchTreasury2010: 0,
            bioResearchTreasury2015: 0,
            bioResearchTreasury2020: 0,
            bioResearchTreasury2025: 0,
            bioResearchTreasury2030: 0,
            bioResearchTreasury2035: 0,
            bioResearchTreasury2040: 0,
            bioResearchTreasury2045: 0,
            bioResearchTreasury2050: 0,

            coalResearchTreasury1995: 0,
            coalResearchTreasury2000: 0,
            coalResearchTreasury2005: 0,
            coalResearchTreasury2010: 0,
            coalResearchTreasury2015: 0,
            coalResearchTreasury2020: 0,
            coalResearchTreasury2025: 0,
            coalResearchTreasury2030: 0,
            coalResearchTreasury2035: 0,
            coalResearchTreasury2040: 0,
            coalResearchTreasury2045: 0,
            coalResearchTreasury2050: 0,

            oilResearchTreasury1995: 0,
            oilResearchTreasury2000: 0,
            oilResearchTreasury2005: 0,
            oilResearchTreasury2010: 0,
            oilResearchTreasury2015: 0,
            oilResearchTreasury2020: 0,
            oilResearchTreasury2025: 0,
            oilResearchTreasury2030: 0,
            oilResearchTreasury2035: 0,
            oilResearchTreasury2040: 0,
            oilResearchTreasury2045: 0,
            oilResearchTreasury2050: 0,

            nuclearResearchTreasury1995: 0,
            nuclearResearchTreasury2000: 0,
            nuclearResearchTreasury2005: 0,
            nuclearResearchTreasury2010: 0,
            nuclearResearchTreasury2015: 0,
            nuclearResearchTreasury2020: 0,
            nuclearResearchTreasury2025: 0,
            nuclearResearchTreasury2030: 0,
            nuclearResearchTreasury2035: 0,
            nuclearResearchTreasury2040: 0,
            nuclearResearchTreasury2045: 0,
            nuclearResearchTreasury2050: 0,

            damUseTreasury1995: 0,
            damUseTreasury2000: 0,
            damUseTreasury2005: 0,
            damUseTreasury2010: 0,
            damUseTreasury2015: 0,
            damUseTreasury2020: 0,
            damUseTreasury2025: 0,
            damUseTreasury2030: 0,
            damUseTreasury2035: 0,
            damUseTreasury2040: 0,
            damUseTreasury2045: 0,
            damUseTreasury2050: 0,

            co21995: 0,
            co22000: 0,
            co22005: 0,
            co22010: 0,
            co22015: 0,
            co22020: 0,
            co22025: 0,
            co22030: 0,
            co22035: 0,
            co22040: 0,
            co22045: 0,
            co22050: 0,

            globalTemperature1995: 0,
            globalTemperature2000: 0,
            globalTemperature2005: 0,
            globalTemperature2010: 0,
            globalTemperature2015: 0,
            globalTemperature2020: 0,
            globalTemperature2025: 0,
            globalTemperature2030: 0,
            globalTemperature2035: 0,
            globalTemperature2040: 0,
            globalTemperature2045: 0,
            globalTemperature2050: 0,

            seeLevel1995: 0,
            seeLevel2000: 0,
            seeLevel2005: 0,
            seeLevel2010: 0,
            seeLevel2015: 0,
            seeLevel2020: 0,
            seeLevel2025: 0,
            seeLevel2030: 0,
            seeLevel2035: 0,
            seeLevel2040: 0,
            seeLevel2045: 0,
            seeLevel2050: 0,

            no21995: 0,
            no22000: 0,
            no22005: 0,
            no22010: 0,
            no22015: 0,
            no22020: 0,
            no22025: 0,
            no22030: 0,
            no22035: 0,
            no22040: 0,
            no22045: 0,
            no22050: 0,

            so21995: 0,
            so22000: 0,
            so22005: 0,
            so22010: 0,
            so22015: 0,
            so22020: 0,
            so22025: 0,
            so22030: 0,
            so22035: 0,
            so22040: 0,
            so22045: 0,
            so22050: 0,

            aveEnergyPrice1995: 1,
            aveEnergyPrice2000: 0,
            aveEnergyPrice2005: 0,
            aveEnergyPrice2010: 0,
            aveEnergyPrice2015: 0,
            aveEnergyPrice2020: 0,
            aveEnergyPrice2025: 0,
            aveEnergyPrice2030: 0,
            aveEnergyPrice2035: 0,
            aveEnergyPrice2040: 0,
            aveEnergyPrice2045: 0,
            aveEnergyPrice2050: 0,

            energyConservation1995: 0,
            energyConservation2000: 0,
            energyConservation2005: 0,
            energyConservation2010: 0,
            energyConservation2015: 0,
            energyConservation2020: 0,
            energyConservation2025: 0,
            energyConservation2030: 0,
            energyConservation2035: 0,
            energyConservation2040: 0,
            energyConservation2045: 0,
            energyConservation2050: 0,

            netEnergy1995: 0,
            netEnergy2000: 0,
            netEnergy2005: 0,
            netEnergy2010: 0,
            netEnergy2015: 0,
            netEnergy2020: 0,
            netEnergy2025: 0,
            netEnergy2030: 0,
            netEnergy2035: 0,
            netEnergy2040: 0,
            netEnergy2045: 0,
            netEnergy2050: 0,

            nonrenewableEnergy1995: 0,
            nonrenewableEnergy2000: 0,
            nonrenewableEnergy2005: 0,
            nonrenewableEnergy2010: 0,
            nonrenewableEnergy2015: 0,
            nonrenewableEnergy2020: 0,
            nonrenewableEnergy2025: 0,
            nonrenewableEnergy2030: 0,
            nonrenewableEnergy2035: 0,
            nonrenewableEnergy2040: 0,
            nonrenewableEnergy2045: 0,
            nonrenewableEnergy2050: 0,

            lifestyle1995: 0,
            lifestyle2000: 0,
            lifestyle2005: 0,
            lifestyle2010: 0,
            lifestyle2015: 0,
            lifestyle2020: 0,
            lifestyle2025: 0,
            lifestyle2030: 0,
            lifestyle2035: 0,
            lifestyle2040: 0,
            lifestyle2045: 0,
            lifestyle2050: 0,

            qualityOfLife1995: 0,
            qualityOfLife2000: 0,
            qualityOfLife2005: 0,
            qualityOfLife2010: 0,
            qualityOfLife2015: 0,
            qualityOfLife2020: 0,
            qualityOfLife2025: 0,
            qualityOfLife2030: 0,
            qualityOfLife2035: 0,
            qualityOfLife2040: 0,
            qualityOfLife2045: 0,
            qualityOfLife2050: 0,

            population1995: 0,
            population2000: 0,
            population2005: 0,
            population2010: 0,
            population2015: 0,
            population2020: 0,
            population2025: 0,
            population2030: 0,
            population2035: 0,
            population2040: 0,
            population2045: 0,
            population2050: 0,

            birthRate1995: 0,
            birthRate2000: 0,
            birthRate2005: 0,
            birthRate2010: 0,
            birthRate2015: 0,
            birthRate2020: 0,
            birthRate2025: 0,
            birthRate2030: 0,
            birthRate2035: 0,
            birthRate2040: 0,
            birthRate2045: 0,
            birthRate2050: 0,

            sustainability1995: 0,
            sustainability2000: 0,
            sustainability2005: 0,
            sustainability2010: 0,
            sustainability2015: 0,
            sustainability2020: 0,
            sustainability2025: 0,
            sustainability2030: 0,
            sustainability2035: 0,
            sustainability2040: 0,
            sustainability2045: 0,
            sustainability2050: 0,

            sustainabilityPts1995: 0,
            sustainabilityPts2000: 0,
            sustainabilityPts2005: 0,
            sustainabilityPts2010: 0,
            sustainabilityPts2015: 0,
            sustainabilityPts2020: 0,
            sustainabilityPts2025: 0,
            sustainabilityPts2030: 0,
            sustainabilityPts2035: 0,
            sustainabilityPts2040: 0,
            sustainabilityPts2045: 0,
            sustainabilityPts2050: 0,

            qualityPoints1995: 0,
            qualityPoints2000: 0,
            qualityPoints2005: 0,
            qualityPoints2010: 0,
            qualityPoints2015: 0,
            qualityPoints2020: 0,
            qualityPoints2025: 0,
            qualityPoints2030: 0,
            qualityPoints2035: 0,
            qualityPoints2040: 0,
            qualityPoints2045: 0,
            qualityPoints2050: 0,

            /***Coal***/
            coalTaxRate: 1.0001 * Math.pow(10, 9), //fertig
            totalCoalUse: 4080,
            coalUse: 76.3, //fertig
            coaluserate: 1,
            coalPrice: 24.9 * Math.pow(10, 9),
            coalPriceFactor: 0,
            coalSupply: 299000, //fertig
            coalSupplyElasticity: 0,
            /***Oil***/
            oilTaxRate: 1.0001 * Math.pow(10, 9),
            oilUse: 178,
            oiluserate: 0,
            oilPrice: 25.1 * Math.pow(10, 9),
            oilPriceFactor: 0,
            oilSupply: 9.880,
            oilSupplyElasticity: 0,
            totalOilUse: 9180,
            /*Natural Gas */
            naturalGasTaxRate: 1.0001 * Math.pow(10, 9),
            naturalGasUse: 65.3,
            naturalGasuserate: 0,
            naturalGasPrice: 25.0 * Math.pow(10, 9),
            naturalGasPriceFactor: 0,
            naturalGasSupply: 7430,
            naturalGasSupplyElasticity: 0,
            totalNaturalGasUse: 2070,
            /*nuclear*/
            nuclearTaxRate: 2.37 * Math.pow(10, 9),
            nuclearUse: 8.91,
            nuclearUseRate: 0,
            nuclearPrice: 24.9 * Math.pow(10, 9),
            nuclearPriceFactor: 0,
            nuclearSupply: 11900,
            nuclearSupplyElasticity: 0,
            totalNuclearUse: 108,
            /*solar */
            solarEnergySubsidy: 0.08,
            solarUse: 12.1,
            solarUseRate: 0,
            solarPrice: 24.8 * Math.pow(10, 9),
            solarEnergyPotential: 0,
            solarEnergyTreasury: 109 * Math.pow(10, 9),
            /*technology*/
            solarTechnology: 1.02,

            bioTechnology: 1.02,
            coalTechnology: 1.01,
            oilTechnology: 1.01,
            nuclearTechnology: 1.02,
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
            damUseRate: 0,
            damPrice: 25.0 * Math.pow(10, 9),
            damPotential: 0,
            /*common*/
            co2: 2 * Math.pow(10, 6),
            globalTemperature: 56,
            co2Eff: 10,
            basicTemperature: 50,
            seeLevel: 2,
            no2: 49.1 * Math.pow(10, 6),
            c1: 10000,
            c2: 100000,
            so2: 58.9 * Math.pow(10, 6),
            energyDemand: 303,
            aveEnergyPrice: 25.2 * Math.pow(10, 9), //如何调用一个没有方法的变量
            priceElasticity: 0.0001,
            energyConservation: 60.3,
            netEnergy: 419, //公式尚未套用
            nonrenewableEnergy: 328, //公式尚未套用
            //renewableEnergy:30.1, //公式尚未套用
            lifestyle: 2.12 * Math.pow(10, 9),
            qualityOfLife: 1.03,
            population: 5.26 * Math.pow(10, 9), //公式尚未套用
            birthRate: 1.97,
            sustainability: 0.170, //公式尚未套用
            sustainabilityPts: 681,
            qualityPoints: 7.70 * Math.pow(10, 3),
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
            /* hier werden alle Variablen mit jeweiligen Formeln berechnet */
            this.energyDemand1995 = this.energyDemand * Math.pow(1.01,5);
            this.energyDemand2000 = this.energyDemand1995 * Math.pow(1.01,5);
            this.energyDemand2005 = this.energyDemand2000 * Math.pow(1.01,5);
            this.energyDemand2010 = this.energyDemand2005 * Math.pow(1.01,5);
            this.energyDemand2015 = this.energyDemand2005 * Math.pow(1.01,5);
            this.energyDemand2020 = this.energyDemand2015 * Math.pow(1.01,5);
            this.energyDemand2025 = this.energyDemand2020 * Math.pow(1.01,5);
            this.energyDemand2030 = this.energyDemand2025 * Math.pow(1.01,5);
            this.energyDemand2035 = this.energyDemand2030 * Math.pow(1.01,5);
            this.energyDemand2040 = this.energyDemand2035 * Math.pow(1.01,5);
            this.energyDemand2045 = this.energyDemand2040 * Math.pow(1.01,5);
            this.energyDemand2050 = this.energyDemand2045 * Math.pow(1.01,5);

        },
        stopSimulation() {
            this.show = false;
        },
        /* coal */
        updateCoalTaxRate(coalTaxRate) {
            this.coalTaxRate = coalTaxRate * Math.pow(10, 9);
        },
        updateCoalUserate(coaluserate) {
            this.coaluserate = coaluserate;
            this.coalUse = coaluserate * this.energyDemand * this.aveEnergyPrice / (this.coalPrice + this.coalTaxRate);
        },
        updateCoalPrice(coalPriceFactor) {
            this.coalPriceFactor = coalPriceFactor;
            this.coalPrice = coalPriceFactor * this.coalUse / this.coalSupply;
            this.coalPrice1995 = coalPriceFactor * this.coalUse1995 / this.coalSupply1995;
        },
        updateCoalSupply(coalSupplyElasticity) {
            this.coalSupplyElasticity = coalSupplyElasticity;
            this.coalSupply1995 = coalSupplyElasticity * this.coalPrice1995 - this.totalCoalUse1995;
        },
        /* oil */
        updateOilTaxRate(oilTaxRate) {
            this.oilTaxRate = oilTaxRate * Math.pow(10, 9);
        },
        updateOilUseRate(oilUseRate) {
            this.oiluserate = oilUseRate;
            this.oilUse = oilUseRate * this.energyDemand * this.aveEnergyPrice / (this.oilPrice + this.oilTaxRate);
            this.oilUse1995 = oilUseRate * this.energyDemand1995 * this.aveEnergyPrice1995 / (this.oilPrice1995 + this.oilTaxRate1995);
            this.totalOilUse1995 = this.totalOilUse + this.oilUse1995;
        },
        updateOilPrice(oilPriceFactor) {
            this.oilPriceFactor = oilPriceFactor;
            this.oilPrice = oilPriceFactor * this.oilUse / this.oilSupply;
            this.oilPrice1995 = oilPriceFactor * this.oilUse1995 / this.oilSupply1995;
        },
        updateOilSupply(oilSupplyElasticity) {
            this.oilSupplyElasticity = oilSupplyElasticity;
            this.oilSupply = oilSupplyElasticity * this.oilPrice - this.totalOilUse;
            this.oilSupply1995 = oilSupplyElasticity * this.oilPrice1995 - this.totalOilUse1995;
        },
        /*natural gas */
        updateNaturalGasTaxRate(naturalGasTaxRate) {
            this.naturalGasTaxRate = naturalGasTaxRate * Math.pow(10, 9);
        },
        updateNaturalGasUseRate(naturalGasUseRate) {
            this.naturalGasuserate = naturalGasUseRate;
            this.naturalGasUse = naturalGasUseRate * this.energyDemand * this.aveEnergyPrice / (this.naturalGasPrice + this.naturalGasTaxRate);
            this.naturalGasUse1995 = naturalGasUseRate * this.energyDemand1995 * this.aveEnergyPrice1995 / (this.naturalGasPrice1995 + this.naturalGasTaxRate);
            this.totalNaturalGasUse1995 = this.totalNaturalGasUse + this.naturalGasUse1995;
        },
        updateNaturalGasPrice(naturalGasPriceFactor) {
            this.naturalGasPriceFactor = naturalGasPriceFactor;
            this.naturalGasPrice = naturalGasPriceFactor * this.naturalGasUse / this.naturalGasSupply;
            this.naturalGasPrice1995 = naturalGasPriceFactor * this.naturalGasUse1995 / this.naturalGasSupply1995;
        },
        updateNaturalGasSupply(naturalGasSupplyElasticity) {
            this.naturalGasSupply = naturalGasSupplyElasticity;
            this.naturalGasSupply = naturalGasSupplyElasticity * this.naturalGasPrice - this.totalNaturalGasUse;
            
            this.naturalGasSupply1995 = naturalGasSupplyElasticity * this.naturalGasPrice1995 - this.totalNaturalGasUse1995;
        },
        /*nuclear */
        updateNuclearTaxRate(nuclearTaxRate) {
            this.nuclearTaxRate = nuclearTaxRate * Math.pow(10, 9);
        },
        updateNulearUseRate(nuclearUseRate) {
            this.nuclearUseRate = nuclearUseRate;
            this.nuclearUse = nuclearUseRate * this.energyDemand * this.aveEnergyPrice / (this.nuclearPrice + this.nuclearTaxRate);
            this.nuclearUse1995 = nuclearUseRate * this.energyDemand1995 * this.aveEnergyPrice1995 / (this.nuclearPrice1995 + this.nuclearTaxRate);
            this.totalNuclearUse1995 = this.totalNuclearUse + this.nuclearUse1995;
        },
        updateNuclearPrice(nuclearPriceFactor) {
            this.nuclearPriceFactor = nuclearPriceFactor;
            this.nuclearPrice = nuclearPriceFactor * this.nuclearUse / this.nuclearSupply;
            this.nuclearPrice1995 = nuclearPriceFactor * this.nuclearUse1995 / this.nuclearSupply1995;
        },
        updateNuclearSupply(nuclearSupplyElasticity) {
            this.nuclearSupplyElasticity = nuclearSupplyElasticity;
            this.nuclearSupply = nuclearSupplyElasticity * this.nuclearPrice - this.totalNuclearUse;
            
            this.nuclearSupply1995 = nuclearSupplyElasticity * this.nuclearPrice1995 - this.totalNuclearUse1995;
        },
        /*dam */
        updateDamSubsidy(damSubsidy) {
            this.damSubsidy = damSubsidy;
        },
        updateDamUseRate(damUseRate) {
            this.damUseRate = damUseRate;
            this.damUse = (damUseRate * this.energyDemand * this.aveEnergyPrice + this.damUseTreasury) / this.damPrice;
            this.damUse1995 = (damUseRate * this.energyDemand1995 * this.aveEnergyPrice1995 + this.damUseTreasury1995) / this.damPrice1995;
        },
        updateDamPrice(damPotential) {
            this.damPotential = damPotential;
            this.damPrice = this.damUse / damPotential;
            this.damPrice1995 = this.damUse1995 / damPotential;
        },
        /*solar */
        updateSolarEnergySubsidy(solarEnergySubsidy) {
            this.solarEnergySubsidy = solarEnergySubsidy;
        },
        updateSolarUseRate(solarUseRate) {
            this.solarUseRate = solarUseRate;
            this.solarUse = (solarUseRate * this.energyDemand * this.aveEnergyPrice + this.solarEnergyTreasury) / this.solarEnergyPrice;
            this.solarUse1995 = (solarUseRate * this.energyDemand1995 * this.aveEnergyPrice1995 + this.solarEnergyTreasury1995) / this.solarEnergyPrice1995;
        },
        updateSolarEnergyPrice(solarEnergyPotential) {
            this.solarEnergyPotential = solarEnergyPotential;
            this.solarPrice = this.solarUse / (solarEnergyPotential * this.solarTechnology);
            this.solarPrice1995 = this.solarUse1995 / (solarEnergyPotential * this.solarTechnology1995);
        },
        /*research and technology*/
        updateSolarTechnology(solarOptimism) {
            this.solarTechnology = this.solarTechnology + solarOptimism * this.solarResearchTreasury * this.basicResearchTreasury;
        },
        updateSolarResearchSubsidy(solarResearchSubsidy) {
            this.solarResearch = solarResearchSubsidy;
        },
        updateBasicResearchSubsidy(basicResearchSubsidy) {
            this.basicResearch = basicResearchSubsidy;
        },
        updateBioResearchSubsidy(bioResearchSubsidy) {
            this.bioResearch = bioResearchSubsidy;
        },
        updateBioTechnology(bioOptimism) {
            this.bioTechnology = this.bioTechnology + bioOptimism * Math.log(this.bioResearchTreasury * this.basicResearchTreasury);
        },
        updateCoalResearchSubsidy(coalResearchSubsidy) {
            this.coalResearch = coalResearchSubsidy;
        },
        updateCoalTechnology(coalOptimism) {
            /* 计算公式似乎不对，因为coalTechnology不可能那么大 */
            this.coalTechnology = this.coalTechnology + coalOptimism * this.coalResearchTreasury * this.basicResearchTreasury;
        },
        updateOilResearchSubsidy(coalResearchSubsidy) {
            this.coalResearch = coalResearchSubsidy;
        },
        updateOilTechnology(oilOptimism) {
            this.oilTechnology = this.oilTechnology + oilOptimism * this.oilResearchTreasury * this.basicResearchTreasury;
        },
        updateNuclearResearchSubsidy(nuclearResearchSubsidy) {
            this.nuclearResearch = nuclearResearchSubsidy;
        },
        updateNuclearTechnology(nuclearOptimism) {
            this.nuclearTechnology = this.nuclearTechnology + nuclearOptimism * this.nuclearResearchTreasury * this.basicResearchTreasury;
        },
        /*common*/
        updateCO2Quantity(co2Quantity) {
            this.co2 = this.co2 + co2Quantity * (this.coalUse + this.oilUse + this.naturalGasUse);
        },
        updateGlobalTemperature(t0) {
            this.globalTemperature = t0 + this.co2Eff * this.co2;
        },
        updateCO2Eff(co2Eff) {
            this.co2Eff = co2Eff;
        },
        updateBasicTemperature(basicTemperature) {
            this.basicTemperature = basicTemperature;
        },
        updateSeeLevel(meltingRate) {
            this.seeLevel = (this.globalTemperature - this.basicTemperature) * meltingRate;
        },
        updateC1Quantity(c1) {
            this.c1 = c1;
        },
        updateNO2Quantity(c2) {
            this.c2 = c2;
            this.no2 = (this.c1 * this.coalUse / this.coalTechnology) + (this.c2 * this.oilUse / this.oilTechnology);
        },
        updateSO2Quantity(sulfurContent) {
            this.so2 = sulfurContent * this.coalUse / this.coalTechnology;
        },
        updatePriceElasticity(priceElasticity) {
            this.priceElasticity = priceElasticity;
            this.energyConservation = this.priceElasticity * Math.sqrt(this.aveEnergyPrice);
        },
        updateLifestyle(c4) {
            this.lifestyle = c4 * this.netEnergy;
        },
        updateQualityOfLife(lifeValue) {
            this.qualityOfLife = lifeValue * this.lifestyle / this.population;
        },
        updateBirthRate(maximalBirthRate) {
            this.birthRate = maximalBirthRate / (1 + this.qualityOfLife);
        },
        updateSustainabilityPts(valueOfSustainability) {
            this.sustainabilityPts = valueOfSustainability * this.sustainability;
        },
        updateQualityPoints(valueOfQualityOfLife) {
            this.qualityPoints = valueOfQualityOfLife * this.qualityOfLife;
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
