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
        

        },
        stopSimulation() {
            this.show = false;
        },
        execute(){
            
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
        },
        updateCoalSupply(coalSupplyElasticity) {
            this.coalSupplyElasticity = coalSupplyElasticity;
        },
        /* oil */
        updateOilTaxRate(oilTaxRate) {
            this.oilTaxRate = oilTaxRate * Math.pow(10, 9);
        },
        updateOilUseRate(oilUseRate) {
            this.oiluserate = oilUseRate;
            this.oilUse = oilUseRate * this.energyDemand * this.aveEnergyPrice / (this.oilPrice + this.oilTaxRate);
        },
        updateOilPrice(oilPriceFactor) {
            this.oilPriceFactor = oilPriceFactor;
            this.oilPrice = oilPriceFactor * this.oilUse / this.oilSupply;
        },
        updateOilSupply(oilSupplyElasticity) {
            this.oilSupplyElasticity = oilSupplyElasticity;
            this.oilSupply = oilSupplyElasticity * this.oilPrice - this.totalOilUse;
        },
        /*natural gas */
        updateNaturalGasTaxRate(naturalGasTaxRate) {
            this.naturalGasTaxRate = naturalGasTaxRate * Math.pow(10, 9);
        },
        updateNaturalGasUseRate(naturalGasUseRate) {
            this.naturalGasuserate = naturalGasUseRate;
            this.naturalGasUse = naturalGasUseRate * this.energyDemand * this.aveEnergyPrice / (this.naturalGasPrice + this.naturalGasTaxRate);
        },
        updateNaturalGasPrice(naturalGasPriceFactor) {
            this.naturalGasPriceFactor = naturalGasPriceFactor;
            this.naturalGasPrice = naturalGasPriceFactor * this.naturalGasUse / this.naturalGasSupply;
        },
        updateNaturalGasSupply(naturalGasSupplyElasticity) {
            this.naturalGasSupply = naturalGasSupplyElasticity;
            this.naturalGasSupply = naturalGasSupplyElasticity * this.naturalGasPrice - this.totalNaturalGasUse;
        },
        /*nuclear */
        updateNuclearTaxRate(nuclearTaxRate) {
            this.nuclearTaxRate = nuclearTaxRate * Math.pow(10, 9);
        },
        updateNulearUseRate(nuclearUseRate) {
            this.nuclearUseRate = nuclearUseRate;
            this.nuclearUse = nuclearUseRate * this.energyDemand * this.aveEnergyPrice / (this.nuclearPrice + this.nuclearTaxRate);
        },
        updateNuclearPrice(nuclearPriceFactor) {
            this.nuclearPriceFactor = nuclearPriceFactor;
            this.nuclearPrice = nuclearPriceFactor * this.nuclearUse / this.nuclearSupply;
        },
        updateNuclearSupply(nuclearSupplyElasticity) {
            this.nuclearSupplyElasticity = nuclearSupplyElasticity;
            this.nuclearSupply = nuclearSupplyElasticity * this.nuclearPrice - this.totalNuclearUse;
        },
        /*dam */
        updateDamSubsidy(damSubsidy) {
            this.damSubsidy = damSubsidy;
        },
        updateDamUseRate(damUseRate) {
            this.damUseRate = damUseRate;
            this.damUse = (damUseRate * this.energyDemand * this.aveEnergyPrice + this.damUseTreasury) / this.damPrice;
        },
        updateDamPrice(damPotential) {
            this.damPotential = damPotential;
            this.damPrice = this.damUse / damPotential;
        },
        /*solar */
        updateSolarEnergySubsidy(solarEnergySubsidy) {
            this.solarEnergySubsidy = solarEnergySubsidy;
        },
        updateSolarUseRate(solarUseRate) {
            this.solarUseRate = solarUseRate;
            this.solarUse = (solarUseRate * this.energyDemand * this.aveEnergyPrice + this.solarEnergyTreasury) / this.solarEnergyPrice;
        },
        updateSolarEnergyPrice(solarEnergyPotential) {
            this.solarEnergyPotential = solarEnergyPotential;
            this.solarPrice = this.solarUse / (solarEnergyPotential * this.solarTechnology);
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
