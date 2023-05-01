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
    import ChartDataLabels from 'chartjs-plugin-datalabels';
    
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,ChartDataLabels)
    
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
                            },   
                        },
                        datalabels:{
                            align:'start',
                            anchor:"end",
                            color:'black',
                            font:{
                                size:20
                            }
                        },
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
                return this.chartData 
           }
        }
    }
    </script>
    