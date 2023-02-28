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
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 40
                            }
                        },   
                    }
                },
                scales: {
                        x: {
                            ticks: {
                            font: {
                                size: 20
                            }
                            },
                            title: {
                                display: true,
                                text: 'year',
                                font: {
                                    size: 25
                                }
                            }
                        },
                        y: {
                            ticks: {
                            font: {
                                size: 20
                            }
                            },
                            /*title: {
                                display: true,
                                text: 'titelY',
                                font: {
                                    size: 20
                                }
                            }*/
                        }
                    }
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
            return this.chartData;
       }
    }
}
</script>
