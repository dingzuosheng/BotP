<template>
    <Bar id="my-chart" :options="chartOptions" :data="changeChartData" />
    </template>
    <script>
    import {
        Bar
    } from 'vue-chartjs'
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale
    } from 'chart.js'
    
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
    
    export default {
        name: 'BarChart',
        components: {
            Bar
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
                            }
                        }
                    },
                    scales:{
                        yAxes:[{
                            ticks:{
                                fontSize:40
                            }
                        }],
                        xAxes:[
                        {
                            ticks:{
                                fontSize:40
                            }
                        }
                        ]
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
                return this.chartData 
           }
        }
    }
    </script>
    