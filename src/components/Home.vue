<template>
    <div id="home">
        <img src="../assets/BackgroundImages/About-Balance-of-the-Planet.jpg">
        <div id="container">
            <h1 id="header">Balance of the Planet</h1>
            <form id="form">
                    <router-link :to="{path:'/game/policy'}"><button>Let's Play</button></router-link>
            </form>
            <div id="footer">
                <h2><strong>by Chris Crawford and Louis Dargin</strong></h2>
                <h4>copyright &copy; Chris Crawford 2013</h4>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'Home',
    data(){
        return {
        }
    },
    /*methods:{
        
    }*/
}
</script>
<style>
body{
    margin:0;
}
#home{
    display: flex;
}
img{
    width:auto;
    height:1060px;
}
#container{
    display: grid;
    grid-template-rows: 30px 500px 30px 30px;
    grid-template-columns: auto;
    padding:10px;
    margin: 50px;
    width: 60%;
    height:100%;
}
h1{
    text-align: center;
}
form{
    margin:150px 300px;
    text-align: left;
    width:60%;
    font-size:30px;  
}
button{
    width:200px;
    height:50px;
    /* margin-left:30px; */
    font-size:20px;
}
#footer{
    margin-top: 200px;
    text-align: center;
}
</style>