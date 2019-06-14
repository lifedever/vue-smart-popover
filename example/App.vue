<template>
    <div id="app">
        <smart-popover title="这是标题啊这是标题">
            <a href="#" @click.prevent="clickMe">点我弹出</a>
            <div slot="content">
                <div>Smart Popover Content</div>
                <div>这是一段简单的描述文字，描述得好不好呢</div>
                <div>这是一段简单的描述文字，描述得好不好呢</div>
                <div>这是一段简单的描述文字，描述得好不好呢</div>
            </div>
            <div slot="footer">
                你好啊再见
            </div>
        </smart-popover>
       &nbsp;
       &nbsp;
       &nbsp;
       &nbsp;
        <a href="#" @click.prevent="clickOther">点击外部</a>
    </div>
</template>

<script>
    export default {
        name: 'app',
        methods: {
            clickMe() {

            },
            clickOther(){
                console.log('clickOther')
            }
        }
    }
</script>

<style>
    #app {
        padding: 200px;
        height: 3000px;
    }
</style>
