<template>
    <div class="results">
        <div>
            <h1>Results for {{ this.year }}</h1>
        </div>
        <table class="t3">
            <thead>
                <tr>
                    <th>Positive Points</th>
                    <th>Total Points: {{ Math.ceil(this.totalPoints * 100) / 100 }}</th>
                    <th>Negative Points</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><router-link :to="{path:'/game/biodiversity-pts'}">Biodiversity Points:  {{ Math.floor(this.biodiversityPoints * 100)/100 }}</router-link></td>
                    <td style="text-align:center"><el-button type="info" height="50px" width="200px" @click="this.showFeedback=!this.showFeedback">Feedback</el-button></td>
                    <td><router-link :to="{path:'/game/fall-points'}">Fall Points: {{ Math.floor(this.fallPoints * 100)/100 }}</router-link></td>
                </tr>
                <tr>
                    <td><router-link :to="{path:'/game/forest-life-points'}">Forest Life Points:  {{ Math.floor(this.forestLifePoints * 100)/100 }}</router-link></td>
                    <td></td>
                    <td><router-link :to="{path:'/game/flood-death-points'}">Flood Death Points: {{ Math.floor(this.floodDeathPoints * 100)/100 }}</router-link></td>
                </tr>
                <tr>
                    <td><router-link :to="{path:'/game/lake-life-points'}">Lake Life Points:  {{ Math.floor(this.lakeLifePoints * 100)/100 }}</router-link></td>
                    <td></td>
                    <td><router-link :to="{path:'/game/heavy-metal-points'}">Heavy Metal Points: {{ Math.floor(this.heavyMetalPoints * 100)/100 }}</router-link></td>
                </tr>
                <tr>
                    <td><router-link :to="{path:'/game/marine-life-points'}">Marine Life Points:  {{ Math.floor(this.marineLifePoints * 100)/100 }}</router-link></td>
                    <td></td>
                    <td><router-link :to="{path:'/game/inundation-points'}">Inundation Points: {{ Math.floor(this.inundationPoints * 100)/100 }}</router-link></td>
                </tr>
                <tr>
                    <td><router-link :to="{path:'quality-of-life-points'}">Quality of Life Points:  {{ Math.floor(this.qualityPoints * 100)/100 }}</router-link></td>
                    <td></td>
                    <td><router-link :to="{path:'/game/land-abuse-points'}">Land Abuse Points: {{ Math.floor(this.landAbusePoints * 100)/100 }}</router-link></td>
                </tr>
                <tr>
                    <td><router-link :to="{path:'sustainability-pts'}">Sustainability Points:  {{  Math.floor(this.sustainabilityPts * 100)/100 }}</router-link></td>
                    <td></td>
                    <td><router-link :to="{path:'/game/lung-disease-pts'}">Lung Desease Points: {{ Math.floor(this.lungDiseasePts * 100) / 100 }}</router-link></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td><router-link :to="{path:'/game/pesticide-points'}">Pesticide Points: {{ Math.floor(this.pesticidePoints * 100) / 100 }}</router-link></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td><router-link :to="{path:'/game/rad-waste-points'}">Radioactive Waste Points: {{ Math.floor(this.radWastePoints * 100) / 100 }}</router-link></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td><router-link :to="{ path:'/game/radiation-points'}">Radiation Points: {{ Math.floor(this.radiationPoints * 100) / 100 }}</router-link></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td><router-link :to="{ path:'/game/skin-cancer-points'}">Skin Cancer Points: {{ Math.floor(this.skinCancerPoints * 100) / 100 }}</router-link></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td><router-link :to="{ path:'/game/starvation-points' }">Starvation Points: {{Math.floor(this.starvationPoints * 100)/100 }}</router-link></td>
                </tr>
            </tbody>
        </table>
        <div class="t4" v-if="this.showFeedback">
            <h3>Overall, compare with it in 5 years ago your score went <span v-if="this.totalPoints_d < 0">down</span><span v-if="this.totalPoints_d > 0">up</span> by {{ Math.abs(Math.floor(this.totalPoints_d*100)/100) }} points</h3>
            <div class="feedback">
                <div class="problems">
                    <h4>Problems</h4>
                </div>
                <div class="successes">
                    <h4>Successes</h4>
                </div>
            </div>
        </div>
        <div class="t5" v-if="this.showFeedback">
            <div class="feedback">
                <div class="problem">
                    <div>
                        <div v-if="this.biodiversityPoints_d < 0">
                            Biodiversity Points worsened by {{ Math.abs(Math.floor(this.biodiversityPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.forestLifePoints_d < 0">
                            Forest Life Points worsened by {{ Math.abs(Math.floor(this.forestLifePoints_d*100)/100) }}
                        </div>
                        <div v-if="this.lakeLifePoints_d < 0">
                            Lake Life Points worsened by {{ Math.abs(Math.floor(this.lakeLifePoints_d*100)/100) }}
                        </div>
                        <div v-if="this.marineLifePoints_d < 0">
                            Marine Life Points worsened by {{ Math.abs(Math.floor(this.marineLifePoints_d*100)/100) }}
                        </div>
                        <div v-if="this.qualityPoints_d < 0">
                            Quality of Life Points worsened by {{ Math.abs(Math.floor(this.qualityPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.sustainabilityPts_d < 0">
                            Sustainability Points worsened by {{ Math.abs(Math.floor(this.qualityPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.fallPoints_d > 0">
                            Fall Points worsened by {{ Math.abs(Math.floor(this.fallPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.floodDeathPoints_d > 0">
                            Flood Death Points worsened by {{ Math.abs(Math.floor(this.floodDeathPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.heavyMetalPoints_d > 0">
                            Heavy Metal Points worsened by {{ Math.abs(Math.floor(this.heavyMetalPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.inundationPoints_d > 0">
                            Inundation Points worsened by {{ Math.abs(Math.floor(this.inundationPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.landAbusePoints_d > 0">
                            Land Abuse Points worsened by {{ Math.abs(Math.floor(this.landAbusePoints_d*100)/100) }}
                        </div>
                        <div v-if="this.lungDiseasePts_d > 0">
                            Lung Disease Points worsened by {{ Math.abs(Math.floor(this.lungDiseasePts_d*100)/100) }}
                        </div>
                        <div v-if="this.pesticidePoints_d > 0">
                            Pesticide Points worsened by {{ Math.abs(Math.floor(this.pesticidePoints_d*100)/100) }}
                        </div>
                        <div v-if="this.radWastePoints_d > 0">
                            Radioactive Waste Points worsened by {{ Math.abs(Math.floor(this.radWastePoints_d*100)/100) }}
                        </div>
                        <div v-if="this.radiationPoints_d > 0">
                            Radiation Points worsened by {{ Math.abs(Math.floor(this.radiationPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.skinCancerPoints_d > 0">
                            Skin Cancer Points worsened by {{ Math.abs(Math.floor(this.skinCancerPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.starvationPoints_d > 0">
                            Starvation Points worsened by {{ Math.abs(Math.floor(this.starvationPoints_d*100)/100) }}
                        </div>
                    </div>    
                </div>
                <div class="successe">
                    <div>
                        <div v-if="this.biodiversityPoints_d > 0">
                            Biodiversity Points worsened by {{ Math.abs(Math.floor(this.biodiversityPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.forestLifePoints_d > 0">
                            Forest Life Points worsened by {{ Math.abs(Math.floor(this.forestLifePoints_d*100)/100) }}
                        </div>
                        <div v-if="this.lakeLifePoints_d > 0">
                            Lake Life Points worsened by {{ Math.abs(Math.floor(this.lakeLifePoints_d*100)/100) }}
                        </div>
                        <div v-if="this.marineLifePoints_d > 0">
                            Marine Life Points worsened by {{ Math.abs(Math.floor(this.marineLifePoints_d*100)/100) }}
                        </div>
                        <div v-if="this.qualityPoints_d > 0">
                            Quality of Life Points worsened by {{ Math.abs(Math.floor(this.qualityPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.sustainabilityPts_d > 0">
                            Sustainability Points worsened by {{ Math.abs(Math.floor(this.qualityPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.fallPoints_d < 0">
                            Fall Points worsened by {{ Math.abs(Math.floor(this.fallPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.floodDeathPoints_d < 0">
                            Flood Death Points worsened by {{ Math.abs(Math.floor(this.floodDeathPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.heavyMetalPoints_d < 0">
                            Heavy Metal Points worsened by {{ Math.abs(Math.floor(this.heavyMetalPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.inundationPoints_d < 0">
                            Inundation Points worsened by {{ Math.abs(Math.floor(this.inundationPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.landAbusePoints_d < 0">
                            Land Abuse Points worsened by {{ Math.abs(Math.floor(this.landAbusePoints_d*100)/100) }}
                        </div>
                        <div v-if="this.lungDiseasePts_d < 0">
                            Lung Disease Points worsened by {{ Math.abs(Math.floor(this.lungDiseasePts_d*100)/100) }}
                        </div>
                        <div v-if="this.pesticidePoints_d < 0">
                            Pesticide Points worsened by {{ Math.abs(Math.floor(this.pesticidePoints_d*100)/100) }}
                        </div>
                        <div v-if="this.radWastePoints_d < 0">
                            Radioactive Waste Points worsened by {{ Math.abs(Math.floor(this.radWastePoints_d*100)/100) }}
                        </div>
                        <div v-if="this.radiationPoints_d < 0">
                            Radiation Points worsened by {{ Math.abs(Math.floor(this.radiationPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.skinCancerPoints_d < 0">
                            Skin Cancer Points worsened by {{ Math.abs(Math.floor(this.skinCancerPoints_d*100)/100) }}
                        </div>
                        <div v-if="this.starvationPoints_d < 0">
                            Starvation Points worsened by {{ Math.abs(Math.floor(this.starvationPoints_d*100)/100) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Results',
    data(){
        return{
            showFeedback:false,
            totalPoints_d:0,
            qualityPoints_d:0,
            sustainabilityPts_d:0,
            biodiversityPoints_d:0,
            forestLifePoints_d:0,
            lakeLifePoints_d:0,
            marineLifePoints_d:0,

            fallPoints_d:0,
            floodDeathPoints_d:0,
            heavyMetalPoints_d:0,
            inundationPoints_d:0,
            landAbusePoints_d:0,
            lungDiseasePts_d:0,
            pesticidePoints_d:0,
            radWastePoints_d:0,
            radiationPoints_d:0,
            skinCancerPoints_d:0,
            starvationPoints_d:0,

        }
    },
    props:{
        biodiversityPoints:Number,
        forestLifePoints:Number,
        lakeLifePoints:Number,
        marineLifePoints:Number,
        floodDeathPoints:Number,
        heavyMetalPoints:Number,
        pesticidePoints:Number,
        skinCancerPoints:Number,
        qualityPoints:Number,
        sustainabilityPts:Number,
        totalPoints:Number,
        fallPoints:Number,
        inundationPoints:Number,
        landAbusePoints:Number,
        lungDiseasePts:Number,
        radWastePoints:Number,
        radiationPoints:Number,
        starvationPoints:Number,
        executed:Number,
        year:Number,
        gameover:Boolean
    },
    watch:{
        executed(newValue,oldValue){
            this.totalPoints_d = JSON.parse(localStorage.getItem(this.year)).totalPoints - JSON.parse(localStorage.getItem(this.year-5)).totalPoints;
            this.qualityPoints_d = JSON.parse(localStorage.getItem(this.year)).qualityPoints - JSON.parse(localStorage.getItem(this.year-5)).qualityPoints;
            this.sustainabilityPts_d = JSON.parse(localStorage.getItem(this.year)).sustainabilityPts - JSON.parse(localStorage.getItem(this.year-5)).sustainabilityPts;
            this.biodiversityPoints_d = JSON.parse(localStorage.getItem(this.year)).biodiversityPoints - JSON.parse(localStorage.getItem(this.year-5)).biodiversityPoints;
            this.forestLifePoints_d = JSON.parse(localStorage.getItem(this.year)).forestLifePoints - JSON.parse(localStorage.getItem(this.year - 5)).forestLifePoints;
            this.lakeLifePoints_d = JSON.parse(localStorage.getItem(this.year)).lakeLifePoints - JSON.parse(localStorage.getItem(this.year - 5)).lakeLifePoints;
            this.marineLifePoints_d = JSON.parse(localStorage.getItem(this.year)).marineLifePoints - JSON.parse(localStorage.getItem(this.year - 5)).marineLifePoints;
            this.fallPoints_d = JSON.parse(localStorage.getItem(this.year)).fallPoints - JSON.parse(localStorage.getItem(this.year-5)).fallPoints;
            this.floodDeathPoints_d = JSON.parse(localStorage.getItem(this.year)).floodDeathPoints - JSON.parse(localStorage.getItem(this.year -5)).floodDeathPoints;
            this.heavyMetalPoints_d = JSON.parse(localStorage.getItem(this.year)).heavyMetalPoints - JSON.parse(localStorage.getItem(this.year - 5)).heavyMetalPoints;
            this.inundationPoints_d = JSON.parse(localStorage.getItem(this.year)).inundationPoints - JSON.parse(localStorage.getItem(this.year-5)).inundationPoints;
            this.landAbusePoints_d = JSON.parse(localStorage.getItem(this.year)).landAbusePoints - JSON.parse(localStorage.getItem(this.year-5)).landAbusePoints;
            this.lungDiseasePts_d = JSON.parse(localStorage.getItem(this.year)).lungDiseasePts - JSON.parse(localStorage.getItem(this.year-5)).lungDiseasePts;
            this.pesticidePoints_d = JSON.parse(localStorage.getItem(this.year)).pesticidePoints - JSON.parse(localStorage.getItem(this.year -5)).pesticidePoints;
            this.radWastePoints_d = JSON.parse(localStorage.getItem(this.year)).radWastePoints - JSON.parse(localStorage.getItem(this.year-5)).radWastePoints;
            this.radiationPoints_d = JSON.parse(localStorage.getItem(this.year)).radiationPoints - JSON.parse(localStorage.getItem(this.year-5)).radiationPoints;
            this.skinCancerPoints_d = JSON.parse(localStorage.getItem(this.year)).skinCancerPoints - JSON.parse(localStorage.getItem(this.year -5)).skinCancerPoints;
            this.starvationPoints_d = JSON.parse(localStorage.getItem(this.year)).starvationPoints - JSON.parse(localStorage.getItem(this.year-5)).starvationPoints;
        }
    },
    

}
</script>
<style>
.results{
    display:flex;
    flex-direction: column;
    justify-content: center;
}
.t3{
    background-color: orange;
    font-size: 30px;
    margin:50px 100px;
    height: 300px;
}
.t3 tr{
    padding:20px;
}
.t3 th{
    text-align: center;
}
.t4{
    background-color: lightgrey;
    margin:15px 100px 0px 100px;
    font-size: 30px;
    text-align: center;
}
.feedback{
    display:flex;
    flex-direction: row;
}

.problems{
    width:50%;
    background-color: rgb(234, 5, 5);
}
.successes{
    width:50%;
    background-color: rgb(3, 179, 3);
}
.t5{
    background-color:cornflowerblue;
    margin:0px 100px;
    font-size: 30px;
    text-align: center;
}
.problem{
    width:50%;
    background-color:beige;
}
.successe{
    width:50%;
    background-color:beige;
}
#end{
    background-color: black;
    color:white;
    height:1000px;
    display:flex;
    flex-direction: column;
    text-align: center;
}
</style>