<template>
    <div id="end">
        <h1>The game is over! your term is expired.</h1>
        <div>
            <div>
                <div v-if="this.biodiversityPoints_d < 0">
                    <h2>You failed to stem the destruction of biodiversity</h2>
                </div>
                <div v-else>
                    <h2>Your attempt has improved the biodiversity a lot</h2>
                </div>
            </div>
            <div>
                <div v-if="this.forestLifePoints_d < 0">
                    <h2>Destruction of precious forests is not under your administration</h2>
                </div>
                <div v-else>
                    <h2>Destruction of precious forests continued under your administration</h2>
                </div>
            </div>
            <div>
                <div v-if="this.lakeLifePoints_d < 0">
                    <h2>Destruction of precious lake is not under your administration</h2>
                </div>
                <div v-else>
                    <h2>Destruction of precious lake continued under your administration</h2>
                </div>
            </div>
            <div>
                <div v-if="this.marineLifePoints_d < 0">
                    <h2>Your attempt to improve the life of marine has been failured, they have worse life than before</h2>
                </div>
                <div v-else>
                    <h2>Your effort to improve the quality of the life for the human was worthy, they live better than before.</h2>
                </div>
            </div>
            <div>
                <div v-if="this.qualityPoints_d < 0">
                    <h2>Your attempt to improve the quality of the life for the people has been failured, they have a worse life than before.</h2>
                </div>
                <div v-else>
                    <h2>Your effort to improve the quality of the life for the human was worthy, the live better than before.</h2>
                </div>
            </div>
            <div>
                <div v-if="this.sustainabilityPts_d < 0">
                    <h2>You did ignore the development of sustainability, the birth rate is on the derease and the consumption of fossile ressource is rapidly on the increase.</h2>
                </div>
                <div v-else>
                    <h2>Your attempt to sustainability was a big success.</h2>
                </div>
            </div>

            <div>
                <div v-if="this.fallPoints_d < 0">
                    <h2>Due to your effort, fall accidents because of solar machine has been reduced </h2>
                </div>
                <div v-else>
                    <h2>You did ignore to solve the problems of Fall Accidents</h2>
                </div>
            </div>
            <div>
                <div v-if="this.floodDeathPoints_d < 0">
                    <h2>As far as floods went away, things get better</h2>
                </div>
                <div v-else>
                    <h2>As far as floods go, things got worse</h2>
                </div>
            </div>
            <div>
                <div v-if="this.heavyMetalPoints_d < 0">
                    <h2>You did a lot to avoid heavy metal diseases, it's successful</h2>
                </div>
                <div v-else>
                    <h2>You did so little to improve heavy metal problems</h2>
                </div>
            </div>
            <div>
                <div v-if="this.starvationPoints_d > 0">
                    <h2>Your attempts to solve the problem of starvation were a miserable failure,</h2>
                    <h2>Your administration has led to great economic hardship around the global,</h2>
                </div>
                <div v-else>
                    <h2>Your attempts to solve the problem of starvation ware a huge success,</h2>
                    <h2>Your administration have made a great progress to the improvement of economy.</h2>
                </div>
            </div>
            <div>
                <div v-if="this.inundationPoints_d  > 0">
                    <h2>Global warming became much worse, inundating large areas of coastal land,</h2>
                </div>
                <div v-else>
                    <h2>The situation of global warming is getting much better, the inundation of large areas is fewer and fewer.</h2>
                </div>
            </div>
            <div>
                <div v-if="this.lungDiseasePts_d > 0">
                    <h2>Continuing air pollution took its toll in the form of lung disease,</h2>
                </div>
                <div v-else>
                    <h2>The quality of air has been improved significantly, the number of lung disease patients is decreasing significantly</h2>
                </div>
            </div>
            <div>
                <div v-if="this.pesticidePoints_d < 0">
                    <h2>less and less people dead on pesticide use.</h2>
                </div>
                <div v-else>
                    <h2>Your attempt to decrease pesticide deaths have been failed.</h2>
                </div>
            </div>
            <div>
                <div v-if="this.radWastePoints_d > 0">
                    <h2>You did little to solve the problems of radiactive waste,</h2>
                </div>
                <div v-else>
                    <h2>You did make a lot effort to solve the problems of radicative waste.</h2>
                </div>
            </div>
            <div>
                <div v-if="this.landAbusePoints_d < 0">
                    <h2>Land Abuse schrink slightly during your years in charge</h2>
                </div>
                <div v-else>
                    <h2>You did little to solve the problems of land abuse.</h2>
                </div>
            </div>
            <div>
                <div v-if="this.radiationPoints_d > 0">
                    <h2>You did ignore the problems of radiation, now radiation cancer deaths are on the increase, </h2>
                </div>
                <div v-else>
                    <h2>You did pay a lot attention to radiation, now radiation cancer deaths are on the decrease.</h2>
                </div>
            </div>
            <div>
                <div v-if="this.skinCancerPoints_d > 0">
                    <h2>Now skin cancer deaths are on the increase</h2>
                </div>
                <div v-else>
                    <h2>Now skin cancer deaths are on the decrease</h2>
                </div>
            </div>
        </div>
        <div>
            <h2>Your final score is {{ Math.ceil(this.totalPoints) }} points.</h2>
        </div>
    </div>
</template>
<script>
export default {
    name:'Gameover',
    data(){
        return{
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
    created(){
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
}
</script>
<style>
#end{
    background-color: black;
    color:white;
    height:100%;
    padding-bottom:100px;
    display:flex;
    flex-direction: column;
    text-align: center;
}
</style>