<template>
    <div id="app">
        <smart-popover title="常规Popover" :close-exclude="['.a']">
            <a href="#" @click.prevent="clickMe">点我弹出一个常规的Popover</a>
            <div slot="content">
                <div>Smart Popover Content，参考代码如下：</div>
                <pre>{{source1}}</pre>
            </div>
            <div slot="footer">
                footer
            </div>
        </smart-popover>

        <smart-popover title="指定弹出框宽度" :width="600">
            <a href="#" @click.prevent="clickMe">指定具体弹出框的宽度</a>
            <div slot="content">
                <div>指定宽度为600，参考代码如下：</div>
                <pre>{{`增加属性 ':width="600"' 即可`}}</pre>
            </div>
            <div slot="footer">
                footer
            </div>
        </smart-popover>


        <smart-popover title="禁用弹出框动画效果" :animation="false">
            <a href="#" @click.prevent="clickMe">指定具体弹出框的宽度</a>
            <div slot="content">
                <div>禁用动画，参考代码如下：</div>
                <pre>{{`增加属性 ':animation="false"' 即可`}}</pre>
            </div>
            <div slot="footer">
                footer
            </div>
        </smart-popover>

        <smart-popover title="禁用弹出框动画效果" :close-exclude="['a']">
            <a href="#" @click.prevent="clickMe">阻止被点击元素导致弹出框关闭</a>
            <div slot="content">
                <div>假如点击任何a标签，都不会将popover关闭，参考代码如下：</div>
                <pre>{{`增加属性 ':close-exclude="['a']"' 即可`}}</pre>
            </div>
            <div slot="footer">
                footer
            </div>
        </smart-popover>

        <smart-popover block>
            <div>
                <a href="#" id="">
                    这个是新的一行
                </a>
            </div>
            <div slot="content">
                新的一行吗
            </div>
        </smart-popover>

        <hr>
        <h3>所有属性如下：</h3>
        <pre>{{`props: {
        // 禁用
        disabled: {
            type: Boolean
        },
        // 显示返回按钮
        showBack: {
            type: Boolean,
            default: false
        },
        // 取消内容内边距
        noPad: {
            type: Boolean,
            default: false
        },
        // 有动画
        animation: {
            type: Boolean,
            default: true
        },
        // 标题
        title: {
            type: String
        },
        // 宽度
        width: {
            type: [String, Number],
            default: 280
        },
        // 高度
        height: {
            type: [String, Number],
        },
        // 内容区自动高度，
        autoHeight: {
            type: Boolean,
            default: true
        },
        // 排除点击关闭对元素
        closeExclude: {
            type: Array,
            default: () => {
                return []
        }
    }`}}</pre>
    </div>
</template>

<script>
    import MLink from "./components/MLink";
    export default {
        name: 'app',
        components: {MLink},
        data() {
            return {
                source1: `<smart-popover title="这是标题啊这是标题">
    <a href="#" @click.prevent="clickMe">点我弹出一个常规的Popover</a>
    <div slot="content">
        ...这是具体的内容
    </div>
    <div slot="footer">
        ...这是footer的内容
    </div>
</smart-popover>`
            }
        },
        methods: {
            clickMe() {

            },
            clickOther(){
                console.log('clickOther')
            }
        }
    }
</script>

<style lang="less">
    #app {
        padding: 100px;
        height: 3000px;
        a {
            margin-right: 60px;
        }
    }
</style>
