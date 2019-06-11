<template>
    <div class="smart-popover">
        <div class="smart-popover-ref" ref="popRef" @click.prevent.stop="handClick()">
            <slot></slot>
        </div>
        <transition name="xxx"
                    :enter-active-class="animation? 'popover-slideup': ''"
                    :leave-active-class="animation? 'popover-slidedown': ''">
            <div v-if="visible" class="smart-popover-wrapper" ref="popContent">
                <div class="title" v-if="title">
                    {{title}}
                    <div class="close" @click="close">
                        <i class="iconfont icon-baseline-close-px"></i>
                    </div>
                </div>
                <div class="content">
                    <slot name="content"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "SmartPopover",
        mounted() {

        },
        data() {
            return {
                visible: false
            }
        },
        props: {
            animation: {
                type: Boolean,
                default: true
            },
            title: {
                type: String
            },
            width: {
                type: [String, Number],
                default: 280
            }
        },
        watch: {
            visible(value) {
                if (value) {
                    this.$nextTick(() => {
                        window.addEventListener('click', this.bindClickOutside)
                    })
                    this.$emit('show')
                } else {
                    this.$emit('hide')
                    window.removeEventListener('click', this.bindClickOutside)
                }
            }
        },
        methods: {
            handClick() {
                let $ref = this.$refs['popRef']
                let refHeight = $ref.clientHeight
                let offsetLeft = $ref.offsetLeft
                let offsetTop = $ref.offsetTop

                this.visible = !this.visible
                if (this.visible) {
                    this.$nextTick(() => {
                        let $content = this.$refs['popContent']
                        $content.style.width = this.width + 'px'
                        $content.style.left = offsetLeft + 'px'
                        $content.style.top = (offsetTop + refHeight) + 1 + 'px'
                    })
                }
            },
            close() {
                this.visible = false
            },
            bindClickOutside(e) {
                if (this.$refs['popContent'] && this.$refs['popContent'].contains(e.target))
                    return;
                this.visible = false
            }
        }
    }
</script>

<style lang="less">
    @import "./SmartPopover";

</style>