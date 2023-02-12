<template>
<Line id="my-chart-id" :options="chartOptions" :data="changeChartData" />
</template>
<script>
import {
    Line
} from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)

export default {
    name: 'LineChartEnergyDemand',
    components: {
        Line
    },
    data(){
        return{
            chartOptions: {
            responsive: true
            }
        }
    },
    props: {
        chartData: {
            type: Object,
            required: true
        },
    },
    computed:{
       changeChartData(newValue,oldValue){
            return this.chartData 
       } 
    }
}
</script>
