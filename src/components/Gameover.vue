<template>
    <div id="end">
        <h1>The game is over! your term is expired.</h1>
        <div>
            <div v-if="this.starvationPoints_d > this.starvationPoints_old">
                <h2>Your attempts to solve the problem of starvation were a miserable failure,</h2>
                <h2>Your administration has led to great economic hardship around the global,</h2>
            </div>
            <div v-if="this.inundationPoints_d  > this.inundationPoints_old">
                <h2>Global warming became much worse, inundating large areas of coastal land,</h2>
            </div>
            <div v-if="this.lungDiseasePts_d - this.lungDiseasePts_old > 3000">
                <h2>Continuing air pollution took its toll in the form of lung disease,</h2>
            </div>
            <div v-if="this.radWastePoints_d > this.radWastePoints_old">
                <h2>You did little to solve the problems of radiactive waste,</h2>
            </div>
            <div v-if="this.landAbusePoints_d < 0">
                <h2>Land Abuse schrink slightly during your years in charge</h2>
            </div>
            <div v-if="this.radiationPoints_d > this.radiationPoints_old">
                <h2>You did ignore the problems of radiation, now radiation cancer deaths are on the increase, </h2>
            </div>
        </div>
        <div>
            <h2>Your final score is {{ this.totalPoints }} points.</h2>
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
            fallPoints_d:0,
            inundationPoints_d:0,
            inundationPoints_old:0,
            landAbusePoints_d:0,
            landAbusePoints_old:0,
            lungDiseasePts_d:0,
            lungDiseasePts_old:0,
            radWastePoints_d:0,
            radWastePoints_old:0,
            radiationPoints_d:0,
            radiationPoints_old:0,
            starvationPoints_d:0,
            starvationPoints_old:0,
        }
    },
    props:{
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
        year:Number
    },
    created(){
            this.totalPoints_d = JSON.parse(localStorage.getItem(this.year)).totalPoints - JSON.parse(localStorage.getItem(1990)).totalPoints;
            this.qualityPoints_d = JSON.parse(localStorage.getItem(this.year)).qualityPoints - JSON.parse(localStorage.getItem(1990)).qualityPoints;
            this.sustainabilityPts_d = JSON.parse(localStorage.getItem(this.year)).sustainabilityPts - JSON.parse(localStorage.getItem(1990)).sustainabilityPts;
            this.fallPoints_d = JSON.parse(localStorage.getItem(this.year)).fallPoints - JSON.parse(localStorage.getItem(1990)).fallPoints;
            this.inundationPoints_old = JSON.parse(localStorage.getItem(1990)).inundationPoints;
            this.inundationPoints_d = JSON.parse(localStorage.getItem(this.year)).inundationPoints - this.inundationPoints_old;
            this.landAbusePoints_old = JSON.parse(localStorage.getItem(1990)).landAbusePoints;
            this.landAbusePoints_d = JSON.parse(localStorage.getItem(this.year)).landAbusePoints - this.landAbusePoints_old;
            this.lungDiseasePts_old = JSON.parse(localStorage.getItem(1990)).lungDiseasePts;
            this.lungDiseasePts_d = JSON.parse(localStorage.getItem(this.year)).lungDiseasePts - this.lungDiseasePts_old;
            this.radWastePoints_old = JSON.parse(localStorage.getItem(1990)).radWastePoints;
            this.radWastePoints_d = JSON.parse(localStorage.getItem(this.year)).radWastePoints - this.radWastePoints_old;
            this.radiationPoints_old = JSON.parse(localStorage.getItem(1990)).radiationPoints;
            this.radiationPoints_d = JSON.parse(localStorage.getItem(this.year)).radiationPoints - this.radiationPoints_old;
            this.starvationPoints_old = JSON.parse(localStorage.getItem(1990)).starvationPoints;
            this.starvationPoints_d = JSON.parse(localStorage.getItem(this.year)).starvationPoints - this.starvationPoints_old;
        
            console.log("Hallo Game Over" + (this.starvationPoints_d > this.starvationPoints_old));
            console.log(this.inundationPoints_d  > this.inundationPoints_old)
        
    }
}
</script>
<style>
#end{
    background-color: black;
    color:white;
    height:1000px;
    display:flex;
    flex-direction: column;
    text-align: center;
}
</style>