import {createWebHistory,createRouter} from 'vue-router'


import Home from './components/Home.vue'
import Game from './components/Game.vue'
import Policy from './components/Policy.vue'
import Results from './components/Results.vue'
import CoalTax from './components/coal/CoalTax.vue'
import CoalUse from './components/coal/CoalUse.vue'
import CoalPrice from './components/coal/CoalPrice.vue'
import EnergyDemand from './components/common/EnergyDemand'
import CarbonDioxide from './components/common/CarbonDioxide'
import NitrousDioxide from './components/common/NitrousDioxide'
import SulfurDioxide from './components/common/SulfurDioxide'
import NonrenewableEnergy from './components/common/NonrenewableEnergy'
import CoalSupply from './components/coal/CoalSupply'
import AveEnergyPrice from './components/common/AveEnergyPrice'
import TotalCoalUse from './components/coal/TotalCoalUse'
import OilUse from './components/oil/OilUse'
import OilTax from './components/oil/OilTax'
import OilPrice from './components/oil/OilPrice'
import OilSupply from './components/oil/OilSupply'
import TotalOilUse from './components/oil/TotalOilUse'
import GlobalTemperature from './components/common/GlobalTemperature'
import SeaLevel from './components/common/SeaLevel'
import NaturalGasUse from './components/naturalGas/NaturalGasUse'
import NaturalGasTax from './components/naturalGas/NaturalGasTax'
import NaturalGasPrice from './components/naturalGas/NaturalGasPrice'
import TotalNaturalGasUse from './components/naturalGas/TotalNaturalGasUse'
import NaturalGasSupply from './components/naturalGas/NaturalGasSupply'
import DamUse from './components/dam/DamUse'
import DamPrice from './components/dam/DamPrice'
import DamUseBudget from './components/dam/DamUseBudget'
import NuclearUse from './components/nuclear/NuclearUse'
import NuclearTax from './components/nuclear/NuclearTax'
import NuclearPrice from './components/nuclear/NuclearPrice'
import NuclearSupply from './components/nuclear/NuclearSupply'
import TotalNuclearUse from './components/nuclear/TotalNuclearUse'
import SolarEnergyUse from './components/solar/SolarEnergyUse'
import SolarEnergy from './components/solar/SolarEnergy'
import SolarEnergyPrice from './components/solar/SolarEnergyPrice'
import SolarEnergyTechnology from './components/research/SolarEnergyTechnology'
import SolarResearch from './components/research/SolarResearch' 
import BasicResearch from './components/research/BasicResearch'
import Biotechnology from './components/research/Biotechnology'
import Bioresearch from './components/research/Bioresearch'
import NuclearTechnology from './components/research/NuclearTechnology'
import NuclearResearch from './components/research/NuclearResearch'
import OilTechnology from './components/research/OilTechnology'
import OilResearch from './components/research/OilResearch'
import CoalTechnology from './components/research/CoalTechnology'
import CoalResearch from './components/research/CoalResearch'
import EnergyConservation from './components/common/EnergyConservation'
import NetEnergy from './components/common/NetEnergy'
import RenewableEnergy from './components/common/RenewableEnergy'
import Sustainability from './components/common/Sustainability'
import SustainabilityPts from './components/common/SustainabilityPts'
import BirthRate from './components/common/BirthRate'
import Population from './components/common/Population'
import QualityOfLife from './components/common/QualityOfLife'
import NorthernLifestyle from './components/common/NorthernLifestyle'
import QualityOfLifePoints from './components/common/QualityOfLifePoints'
import Connections from './components/Connections'
import InundationPoints from './components/common/InundationPoints.vue'
import LungDiseaseDeath from './components/common/LungDiseaseDeath'
import LungDiseasePts from './components/common/LungDiseasePts'
import Starvation from './components/common/Starvation'
import StarvationPoints from './components/common/StarvationPoints'
import NuclearAccidents from './components/research/NuclearAccidents'
import Radiation from './components/research/Radiation'
import RadiationCancer from './components/research/RadiationCancer'
import RadiationPoints from './components/research/RadiationPoints'
import RadioactiveWaste from './components/research/RadioactiveWaste'
import RadWastePoints from './components/research/RadWastePoints'
import FallPoints from './components/solar/FallPoints'
import FallsFromRoofs from './components/solar/FallsFromRoofs'
import StripMining from './components/land/StripMining'
import LandAbuse from './components/land/LandAbuse'
import LandAbusePoints from './components/land/LandAbusePoints'
import Gameover from './components/Gameover'
import BeefTax from './components/Beef/BeefTax.vue'
import BeefProduction from "./components/Beef/BeefProduction.vue"
import Grasslands from './components/Beef/Grasslands.vue'
import Desertification from './components/Beef/Desertification.vue'
import FuelwoodUse from './components/Beef/FuelwoodUse.vue'
import WoodStoveSubsidy from './components/Beef/WoodStoveSubsidy.vue'
import ForestLand from './components/Beef/ForestLand.vue'
import ForestClearing from './components/Beef/ForestClearing.vue'
import DebtForNatureSubsidy from './components/Beef/DebtForNatureSubsidy.vue'
import FarmLand from './components/Beef/Farmland.vue'
import Crops from './components/Beef/Crops.vue'
import CropYields from './components/Beef/CropYields.vue'
import CropTechnology from './components/Beef/CropTechnology.vue'
import PesticideUse from './components/Pesticide/PesticideUse.vue'
import PesticideTax from './components/Pesticide/PesticideTax.vue'
import PesticideDeaths from './components/Pesticide/PesticideDeaths.vue'
import PesticidePoints from './components/Pesticide/PesticidePoints.vue'
import FertilizerTax from './components/Fertilizer/FertilizerTax.vue'
import FertilizerUse from './components/Fertilizer/FertilizerUse.vue'
import IndustrialOutput from './components/HeavyMetal/IndustrialOutput.vue'
import IndustrialInput from './components/HeavyMetal/IndustrialInput.vue'
import HeavyMetalUse from './components/HeavyMetal/HeavyMetalUse.vue'
import HeavyMetalTax from './components/HeavyMetal/HeavyMetalTax.vue'
import HeavyMetalPrice from './components/HeavyMetal/HeavyMetalPrice.vue'
import HeavyMetalSupply from './components/HeavyMetal/HeavyMetalSupply.vue'
import TotalHeavyMetalUse from './components/HeavyMetal/TotalHeavyMetalUse.vue'
import HeavyMetalDeaths from './components/HeavyMetal/HeavyMetalDeaths.vue'
import HeavyMetalPoints from './components/HeavyMetal/HeavyMetalPoints.vue'
import MaterialsDemand from './components/HeavyMetal/MaterialsDemand.vue'
import WaterPollution from './components/Water/WaterPollution.vue'
import WaterSupply from './components/Water/WaterSupply.vue'
import GroundwaterUse from './components/Water/GroundwaterUse.vue'
import GroundwaterSupply from './components/Water/GroundwaterSupply.vue'
import ReservoirCapacity from './components/Water/ReservoirCapacity.vue'
import DrinkingWater from './components/Water/DrinkingWater.vue'
import SouthernLifestyle from './components/lifestyle/SouthernLifestyle.vue'
import Housing from './components/lifestyle/Housing.vue'
import LoggingTax from './components/Logging/LoggingTax.vue'
import Logging from './components/Logging/Logging.vue'
import RecycledPaper from './components/Recycle/RecycledPaper.vue'
import RecyclingCenterSubsidy from './components/Recycle/RecyclingCenterSubsidy.vue'
import RecycledAluminum from './components/Recycle/RecycledAluminum.vue'
import Garbage from './components/HeavyMetal/Garbage.vue'
import GrossGlobalProduction from './components/HeavyMetal/GrossGlobalProduction.vue'
import ConsumerGoods from './components/HeavyMetal/ConsumerGoods.vue'
import ComputerGamesPoints from './components/HeavyMetal/ComputerGamesPoints.vue'
import CFCTax from './components/CFC/CFCTax.vue'
import CFCProduction from './components/CFC/CFCProduction.vue'
import TroposphericCFCs from './components/CFC/TroposphericCFCs.vue'
import StratosphericCFCs from './components/CFC/StratosphericCFCs.vue'
import Ozone from './components/CFC/Ozone.vue'
import UltravioletLight from './components/CFC/UltravioletLight.vue'
import Phytoplankton from './components/CFC/Phytoplankton.vue'
import SkinCancerDeaths from './components/CFC/SkinCancerDeaths.vue'
import SkinCancerPoints from './components/CFC/SkinCancerPoints.vue'
import Overgrazing from './components/Beef/Overgrazing.vue'
import SoilErosion from './components/Beef/SoilErosion.vue'
import FoodSupply from './components/Beef/FoodSupply.vue'
import Methane from './components/Beef/Methane.vue'
import Medicines from './components/lifestyle/Medicines.vue'
import BiodiversityPts from './components/Lake/BiodiversityPts.vue'
import GlobalGenePool from './components/Lake/GlobalGenePool.vue'
import ForestHabitats from './components/Lake/ForestHabitats.vue'
import LakeHabitats from './components/Lake/LakeHabitats.vue'
import LakeLifePoints from './components/Lake/LakeLifePoints.vue'
import ForestLifePoints from './components/Lake/ForestLifePoints.vue'

const routes = [
    {
        name:'Home',
        path:'/',
        component:Home
    },
    {
        name:'Game',
        path:'/game',
        component:Game,
        children:[
            {
                name:'Connections',
                path:'/game/connections',
                component:Connections
            },
            {
                name:'Policy',
                path:'/game/policy',
                component:Policy
            },
            {
                name:'Results',
                path:'/game/results',
                component:Results
            },
            {
                name:'CoalTax',
                path:'/game/coal-tax',
                component:CoalTax
            },
            {
                name:'CoalUse',
                path:'/game/coal-use',
                component:CoalUse
            },
            {
                name:'CoalPrice',
                path:'/game/coal-price',
                component:CoalPrice
            },
            {
                name:'Energy Demand',
                path:'/game/energy-demand',
                component:EnergyDemand
            },
            {
                name:'Carbon Dioxide',
                path:'/game/co2',
                component:CarbonDioxide
            },
            {
                name:'Nitrous Dioxide',
                path:'/game/no2',
                component:NitrousDioxide
            },
            {
                name:'Sulfur Dioxide',
                path:'/game/so2',
                component:SulfurDioxide
            },
            {
                name:'Non-Renewable Energy',
                path:'/game/nonrenewable-energy',
                component:NonrenewableEnergy
            },
            {
                name:'Coal Supply',
                path:'/game/coal-supply',
                component:CoalSupply
            },
            {
                name:'Ave Energy Price',
                path:'/game/ave-energy-price',
                component:AveEnergyPrice
            },
            {
                name:'TotalCoalUse',
                path:'/game/total-coal-use',
                component:TotalCoalUse
            },
            {
                name:'OilUse',
                path:'/game/oil-use',
                component:OilUse
            },
            {
                name:'OilTax',
                path:'/game/oil-tax',
                component:OilTax
            },
            {
                name:'OilPrice',
                path:'/game/oil-price',
                component:OilPrice
            },
            {
                name:'OilSupply',
                path:'/game/oil-supply',
                component:OilSupply
            },
            {
                name:'TotalOilUse',
                path:'/game/total-oil-use',
                component:TotalOilUse
            },
            {
                name:'GlobalTemperature',
                path:'/game/global-temperature',
                component:GlobalTemperature
            },
            {
                name:'SeaLevel',
                path:'/game/sea-level',
                component:SeaLevel
            },
            {
                name:'InundationPoints',
                path:'/game/inundation-points',
                component:InundationPoints
            },
            {
                name:'NaturalGasUse',
                path:'/game/natural-gas-use',
                component:NaturalGasUse
            },
            {
                name:'NaturalGasTax',
                path:'/game/natural-gas-tax',
                component:NaturalGasTax
            },
            {
                name:'NaturalGasPrice',
                path:'/game/natural-gas-price',
                component:NaturalGasPrice
            },
            {
                name:'TotalNaturalGasUse',
                path:'/game/total-nat-gas-use',
                component:TotalNaturalGasUse
            },
            {
                name:'NaturalGasSupply',
                path:'/game/natural-gas-supply',
                component:NaturalGasSupply
            },
            {
                name:'DamUseBudget',
                path:'/game/dam-use-budget',
                component:DamUseBudget
            },
            {
                name:'DamUse',
                path:'/game/dam-use',
                component:DamUse
            },
            {
                name:'DamPrice',
                path:'/game/dam-price',
                component:DamPrice
            },
            {
                name:'NuclearUse',
                path:'/game/nuclear-use',
                component:NuclearUse
            },
            {
                name:'NuclearTax',
                path:'/game/nuclear-tax',
                component:NuclearTax
            },
            {
                name:'NuclearPrice',
                path:'/game/nuclear-price',
                component:NuclearPrice
            },
            {
                name:'NuclearSupply',
                path:'/game/nuclear-supply',
                component:NuclearSupply
            },
            {
                name:'TotalNuclearUse',
                path:'/game/total-nuclear-use',
                component:TotalNuclearUse
            },
            {
                name:'SolarEnergyUse',
                path:'/game/solar-energy-use',
                component:SolarEnergyUse
            },
            {
                name:'SolarEnergy',
                path:'/game/solar-energy',
                component:SolarEnergy
            },
            {
                name:'SolarEnergyPrice',
                path:'/game/solar-energy-price',
                component:SolarEnergyPrice
            },
            {
                name:'SolarResearch',
                path:'/game/solar-research',
                component:SolarResearch
            },
            {
                name:'SolarTechnology',
                path:'/game/solar-technology',
                component:SolarEnergyTechnology
            },
            {
                name:'BasicResearch',
                path:'/game/basic-research',
                component:BasicResearch
            },
            {
                name:'Biotechnology',
                path:'/game/biotechnology',
                component:Biotechnology
            },
            {
                name:'Bioresearch',
                path:'/game/bioresearch',
                component:Bioresearch
            },
            {
                name:'NuclearTechnology',
                path:'/game/nuclear-technology',
                component:NuclearTechnology
            },
            {
                name:'NuclearResearch',
                path:'/game/nuclear-research',
                component:NuclearResearch
            },
            {
                name:'OilTechnology',
                path:'/game/oil-technology',
                component:OilTechnology
            },
            {
                name:'OilResearch',
                path:'/game/oil-research',
                component:OilResearch
            },
            {
                name:'CoalTechnology',
                path:'/game/coal-technology',
                component:CoalTechnology
            },
            {
                name:'CoalResearch',
                path:'/game/coal-research',
                component:CoalResearch
            },
            {
                name:'EnergyCosnervation',
                path:'/game/energy-conservation',
                component:EnergyConservation
            },
            {
                name:'NetEnergy',
                path:'/game/net-energy',
                component:NetEnergy
            },
            {
                name:'RenewableEnergy',
                path:'/game/renewable-energy',
                component:RenewableEnergy
            },
            {
                name:'Sustainability',
                path:'/game/sustainability',
                component:Sustainability
            },
            {
                name:'SustainabilityPts',
                path:'/game/sustainability-pts',
                component:SustainabilityPts
            },
            {
                name:'BirthRate',
                path:'/game/birth-rate',
                component:BirthRate
            },
            {
                name:'Population',
                path:'/game/population',
                component:Population
            },
            {
                name:'QualityOfLife',
                path:'/game/quality-of-life',
                component:QualityOfLife
            },
            {
                name:'NorthernLifestyle',
                path:'/game/northern-lifestyle',
                component:NorthernLifestyle
            },
            {
                name:'QualityOfLifePoints',
                path:'/game/quality-of-life-points',
                component:QualityOfLifePoints
            },
            {
                name:'Lung Disease Death',
                path:'/game/lung-disease-death',
                component:LungDiseaseDeath
            },
            {
                name:'Lung Disease Pts',
                path:'/game/lung-disease-pts',
                component:LungDiseasePts
            },
            {
                name:'Nuclear Accidents',
                path:'/game/nuclear-accidents',
                component:NuclearAccidents
            },
            {
                name:'Radiation Cancer',
                path:'/game/radiation-cancer',
                component:RadiationCancer
            },
            {
                name:'Radiation Points',
                path:'/game/radiation-points',
                component:RadiationPoints
            },
            {
                name:'Radiation',
                path:'/game/radiation',
                component:Radiation
            },
            {
                name:'Radioactive Waste',
                path:'/game/radioactive-waste',
                component:RadioactiveWaste
            },
            {
                name:'Rad Waste Points',
                path:'/game/rad-waste-points',
                component:RadWastePoints
            },
            {
                name:'Falls From Roofs',
                path:'/game/falls-from-roofs',
                component:FallsFromRoofs
            },
            {
                name:'Fall Points',
                path:'/game/fall-points',
                component:FallPoints
            },
            {
                name:'Starvation',
                path:'/game/starvation',
                component:Starvation
            },
            {
                name:'Starvation Points',
                path:'/game/starvation-points',
                component:StarvationPoints
            },
            {
                name:'StripMining',
                path:'/game/strip-mining',
                component:StripMining
            },
            {
                name:'LandAbuse',
                path:'/game/land-abuse',
                component:LandAbuse
            },
            {
                name:'LandAbusePoints',
                path:'/game/land-abuse-points',
                component:LandAbusePoints
            },
            {
                name:'Gameover',
                path:'/game/gameover',
                component:Gameover
            },
            {
                name:'BeefTax',
                path:'/game/beef-tax',
                component:BeefTax
            },
            {
                name:'BeefProduction',
                path:'/game/beef-production',
                component:BeefProduction
            },
            {
                name:'Grasslands',
                path:'/game/grasslands',
                component:Grasslands
            },
            {
                name:'Desertification',
                path:'/game/desertification',
                component:Desertification
            },
            {
                name:'FuelwoodUse',
                path:'/game/fuelwood-use',
                component:FuelwoodUse
            },
            {
                name:'WoodStoveSubsidy',
                path:'/game/wood-stove-subsidy',
                component:WoodStoveSubsidy
            },
            {
                name:'ForestLand',
                path:'/game/forest-land',
                component:ForestLand
            },
            {
                name:'ForestClearing',
                path:'/game/forest-clearing',
                component:ForestClearing
            },
            {
                name:'DebtForNatureSubsidy',
                path:'/game/debt-for-nature-subsidy',
                component:DebtForNatureSubsidy
            },
            {
                name:'FarmLand',
                path:'/game/farm-land',
                component:FarmLand
            },
            {
                name:'Crops',
                path:'/game/crops',
                component:Crops
            },
            {
                name:'CropYields',
                path:'/game/crop-yields',
                component:CropYields
            },
            {
                name:'CropTechnology',
                path:'/game/crop-technology',
                component:CropTechnology
            },
            {
                name:'PesticideUse',
                path:'/game/pesticide-use',
                component:PesticideUse
            },
            {
                name:'PesticideTax',
                path:'/game/pesticide-tax',
                component:PesticideTax
            },
            {
                name:'PesticideDeaths',
                path:'/game/pesticide-deaths',
                component:PesticideDeaths
            },
            {
                name:'PesticidePoints',
                path:'/game/pesticide-points',
                component:PesticidePoints
            },
            {
                name:'FertilizerTax',
                path:'/game/fertilizer-tax',
                component:FertilizerTax
            },
            {
                name:'FertilizerUse',
                path:'/game/fertilizer-use',
                component:FertilizerUse
            },
            {
                name:'IndustrialOutput',
                path:'/game/industrial-output',
                component:IndustrialOutput
            },
            {
                name:'IndustrialInput',
                path:'/game/industrial-input',
                component:IndustrialInput
            },
            {
                name:'HeavyMetalUse',
                path:'/game/heavy-metal-use',
                component:HeavyMetalUse
            },
            {
                name:'HeavyMetalTax',
                path:'/game/heavy-metal-tax',
                component:HeavyMetalTax
            },
            {
                name:'HeavyMetalPrice',
                path:'/game/heavy-metal-price',
                component:HeavyMetalPrice
            },
            {
                name:'HeavyMetalSupply',
                path:'/game/heavy-metal-supply',
                component:HeavyMetalSupply
            },
            {
                name:'TotalHeavyMetalUse',
                path:'/game/total-heavy-metal-use',
                component:TotalHeavyMetalUse
            },
            {
                name:'HeavyMetalDeaths',
                path:'/game/heavy-metal-deaths',
                component:HeavyMetalDeaths
            },
            {
                name:'HeavyMetalPoints',
                path:'/game/heavy-metal-points',
                component:HeavyMetalPoints
            },
            {
                name:'MaterialsDemand',
                path:'/game/materials-demand',
                component:MaterialsDemand
            },
            {
                name:'WaterPollution',
                path:'/game/water-pollution',
                component:WaterPollution
            },
            {
                name:'WaterSupply',
                path:'/game/water-supply',
                component:WaterSupply
            },
            {
                name:'GroundwaterUse',
                path:'/game/groundwater-use',
                component:GroundwaterUse
            },
            {
                name:'GroundwaterSupply',
                path:'/game/groundwater-supply',
                component:GroundwaterSupply
            },
            {
                name:'ReservoirCapacity',
                path:'/game/reservoir-capacity',
                component:ReservoirCapacity
            },
            {
                name:'Drinking Water',
                path:'/game/drinking-water',
                component:DrinkingWater
            },
            {
                name:'SouthernLifestyle',
                path:'/game/southern-lifestyle',
                component:SouthernLifestyle
            },
            {
                name:'Housing',
                path:'/game/housing',
                component:Housing
            },
            {
                name:'LoggingTax',
                path:'/game/logging-tax',
                component:LoggingTax
            },
            {
                name:'Logging',
                path:'/game/logging',
                component:Logging
            },
            {
                name:'RecycledPaper',
                path:'/game/recycled-paper',
                component:RecycledPaper
            },
            {
                name:'RecyclingCenterSubsidy',
                path:'/game/recycling-center-subsidy',
                component:RecyclingCenterSubsidy
            },
            {
                name:'RecycledAluminum',
                path:'/game/recycled-aluminum',
                component:RecycledAluminum
            },
            {
                name:'Garbage',
                path:'/game/garbage',
                component:Garbage
            },
            {
                name:'GrossGlobalProduction',
                path:'/game/gross-global-production',
                component:GrossGlobalProduction
            },
            {
                name:'ConsumerGoods',
                path:'/game/consumer-goods',
                component:ConsumerGoods
            },
            {
                name:'ComputerGamesPoints',
                path:'/game/computer-games-pts',
                component:ComputerGamesPoints
            },
            {
                name:'CFCTax',
                path:'/game/cfc-tax',
                component:CFCTax
            },
            {
                name:'CFCProduction',
                path:'/game/cfc-production',
                component:CFCProduction
            },
            {
                name:'TroposphericCFCs',
                path:'/game/tropospheric-cfcs',
                component:TroposphericCFCs
            },
            {
                name:'StratosphericCFCs',
                path:'/game/stratospheric-cfcs',
                component:StratosphericCFCs
            },
            {
                name:'Ozone',
                path:'/game/ozone',
                component:Ozone
            },
            {
                name:'UltravioletLight',
                path:'/game/ultraviolet-light',
                component:UltravioletLight
            },
            {
                name:'Phytoplankton',
                path:'/game/phytoplankton',
                component:Phytoplankton
            },
            {
                name:'SkinCancerDeaths',
                path:'/game/skin-cancer-deaths',
                component:SkinCancerDeaths
            },
            {
                name:'SkinCancerPoints',
                path:'/game/skin-cancer-points',
                component:SkinCancerPoints
            },
            {
                name:'Overgrazing',
                path:'/game/overgrazing',
                component:Overgrazing
            },
            {
                name:'SoilErosion',
                path:'/game/soil-erosion',
                component:SoilErosion
            },
            {
                name:'FoodSupply',
                path:'/game/food-supply',
                component:FoodSupply
            },
            {
                name:'Methane',
                path:'/game/methane',
                component:Methane
            },
            {
                name:'Medicines',
                path:'/game/medicines',
                component:Medicines
            },
            {
                name:'BiodiversityPts',
                path:'/game/biodiversity-pts',
                component:BiodiversityPts
            },
            {
                name:'GlobalGenePool',
                path:'/game/global-gene-pool',
                component:GlobalGenePool
            },
            {
                name:'ForestHabitats',
                path:'/game/forest-habitats',
                component:ForestHabitats
            },
            {
                name:'LakeHabitats',
                path:'/game/lake-habitats',
                component:LakeHabitats
            },
            {
                name:'LakeLifePoints',
                path:'/game/lake-life-points',
                component:LakeLifePoints
            },
            {
                name:'ForestLifePoints',
                path:'/game/forest-life-points',
                component:ForestLifePoints
            },
        ]
    },
    
];

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router;