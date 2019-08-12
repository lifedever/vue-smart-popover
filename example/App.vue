<template>
    <div id="app">
        <smart-popover title="这是标题啊这是标题" :close-exclude="['.a']">
            <a href="#" @click.prevent="clickMe">点我弹出</a>
            <div slot="content">
                <div>Smart Popover Content</div>
                <div>这是一段简单的描述文字，描述得好不好呢</div>
                <div>这是一段简单的描述文字，描述得好不好呢</div>
                <div>这是一段简单的描述文字，描述得好不好呢</div>
                <div>这是一段简单的描述文字，描述得好不好呢</div>
                <div>这是一段简单的描述文字，描述得好不好呢</div>
                <div>这是一段简单的描述文字，描述得好不好呢</div>
                <div>这是一段简单的描述文字，描述得好不好呢</div>
                <div>这是一段简单的描述文字，描述得好不好呢</div>
            </div>
            <div slot="footer">
                你好啊再见
            </div>
        </smart-popover>

        <m-link id="noCloseAnchorLink"
                class="a" style="margin-left: 300px;">
        点这里不关闭
        </m-link>
        <a href="#"
           class="a"
           @click.prevent style="margin-left: 300px;"
           ref="noCloseAnchor">点这里不关闭</a>

    </div>
</template>

<script>
    import MLink from "./components/MLink";
    export default {
        name: 'app',
        components: {MLink},
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
