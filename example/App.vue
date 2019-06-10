<template>
    <div id="app">
        <smart-popover title="这是标题啊这是标题">
            <a href="#" @click.prevent="clickMe">点我弹出</a>
            <div slot="content">Smart Popover Content</div>
        </smart-popover>
    </div>
</template>

<script>
    export default {
        name: 'app',
        methods: {
            clickMe() {

            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
