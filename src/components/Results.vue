<template>
    <div class="results">
        <div>
            <h1>Results for 1990</h1>
        </div>
        <table class="t3">
            <thead>
                <tr>
                    <td>Positive Points</td>
                    <td>Total Points: {{ this.qualityPoints + this.sustainabilityPts }}</td>
                    <td>Negative Points</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Quality Points:  {{ this.qualityPoints }}</td>
                    <td><el-button type="info" height="50px" width="200px">Feedback</el-button></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Sustainability Points:  {{  this.sustainabilityPts }}</td>
                    <td></td>
                    <td></td>
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
        sustainabilityPts:Number
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