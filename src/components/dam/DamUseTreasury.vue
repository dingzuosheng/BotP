<template>
    <div class="main">
        <div class="content">
            <div>
                <h1>{{ this.name }}</h1>
            </div>
            <el-collapse class="collapse-part">
                <el-collapse-item title="Formula ">
                    <div class="formula">
                        <div>Dam Subsidy</div>
                        <br />
                        <div class="formula">
                            <div class="row-formula">
                                <span>= {{ damSubsidy }}</span> <span><input type="range" min="0" max="0.08" step="0.01" v-model="subsidy" @change="changeDamSubsidy" /></span>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="side-nav">
            <div>
                <h2>Causes</h2>
                <div v-if="this.causes">
                    <div v-for="cause in this.causes" :key="cause.name">
                        <button @click="toPage(cause)">{{ cause.name }}</button>
                    </div>
                </div>
            </div>
            <div>
                <h2>Effects</h2>
                <div v-if="this.effects">
                    <div v-for="effect in this.effects" :key="effect.name">
                        <button @click="toPage(effect)">{{ effect.name }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import {
        toRaw
    } from '@vue/reactivity'
    import axios from 'axios'
    const service = axios.create({
        baseURL: '',
        timeout: 30000,
    })
    export default {
        name: 'DamUseTreasury',
        data() {
            return {
                name: "",
                causes: [],
                effects: [],
                subsidy:0.08,
                damSubsidy:0.08
            }
        },
        created() {
            service.get('/data/data.json').then(res => {
                this.name = toRaw(res.data.Dam_Price.name);
                this.causes = toRaw(res.data.Dam_Price.causes);
                this.effects = toRaw(res.data.Dam_Price.effects);
            })
        },
        methods: {
            toPage(item) {
                this.$router.push({
                    path: item.path
                });
            },
            changeDamSubsidy(){
                this.damSubsidy = parseInt(this.subsidy*100)/100;
                this.$emit('changeDamSubsidy',this.damSubsidy);
            }
        }
    }
    </script>
    
    <style>
    
    </style>
    