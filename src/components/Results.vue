<template>
    <div class="results">
        <div>
            <h1>Results for {{ this.year }}</h1>
        </div>
        <table class="t3">
            <thead>
                <tr>
                    <td>Positive Points</td>
                    <td>Total Points: {{ Math.floor(this.totalPoints * 100) / 100 }}</td>
                    <td>Negative Points</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><router-link :to="{path:'quality-of-life-points'}">Quality of Life Points:  {{ Math.floor(this.qualityPoints * 100)/100 }}</router-link></td>
                    <td><el-button type="info" height="50px" width="200px">Feedback</el-button></td>
                    <td><router-link :to="{path:'/game/fall-points'}">Fall Points: {{ Math.floor(this.fallPoints * 100)/100 }}</router-link></td>
                </tr>
                <tr>
                    <td><router-link :to="{path:'sustainability-pts'}">Sustainability Points:  {{  Math.floor(this.sustainabilityPts * 100)/100 }}</router-link></td>
                    <td></td>
                    <td><router-link :to="{path:'/game/inundation-points'}">Inundation Points: {{ Math.floor(this.inundationPoints * 100) / 100 }}</router-link></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td><router-link :to="{path:'/game/land-abuse-points'}">Land Abuse Points: {{ Math.floor(this.landAbusePoints * 100) / 100 }}</router-link></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td><router-link :to="{path:'/game/lung-disease-pts'}">Lung Desease Points: {{ Math.floor(this.lungDiseasePts * 100) / 100 }}</router-link></td>
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
                    <td><router-link :to="{ path:'/game/starvation-points' }">Starvation Points: {{Math.floor(this.starvationPoints * 100)/100 }}</router-link></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name:'Results',
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
        year:Number,
    }
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
</style>