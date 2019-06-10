<template>
    <div id="app">
        <smart-popover>
            <a href="#" @click.prevent="clickMe">点我弹出</a>
            <div slot="content">Smart Popover Content</div>
        </smart-popover>

        <smart-popover>
            <a href="#">我说呢</a>
            <div slot="content">
                fuck，我也不知道啊
            </div>
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
