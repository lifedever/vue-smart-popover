<template>
    <span class="smart-popover">
        <div :class="['smart-popover-ref', block? 'block': null]" ref="popRef" @click.prevent.stop="handClick()">
            <slot></slot>
        </div>
        <transition name="xxx"
                    :enter-active-class="animation? 'popover-slideup': ''"
                    :leave-active-class="animation? 'popover-slidedown': ''">
            <div v-if="visible"
                 v-click-outside:mousedown.capture="handleClose"
                 v-click-outside:touchstart.capture="handleClose"
                 v-click-outside.capture="handleClose"
                 class="smart-popover-wrapper"
                 ref="popContent">
                <div class="smart-popover-title" ref="title" v-if="title">
                    <div class="smart-popover-icon icon-left"
                         v-if="showBack"
                         @click="handBack">
                        <i class="iconfont icon-return"></i>
                    </div>
                    {{title}}
                    <div class="smart-popover-icon icon-right" @click="close">
                        <i class="iconfont icon-close"></i>
                    </div>
                </div>
                <div :class="['smart-popover-content', noPad? 'smart-popover-content-nopad': '']" ref="content">
                    <slot name="content"></slot>
                </div>
                <div class="smart-popover-footer" ref="footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </transition>
    </span>
</template>

<script>
    import {directive as clickOutside} from 'v-click-outside-x';

    export default {
        name: "SmartPopover",
        mounted() {

        },
        data() {
            return {
                visible: false,
                contentWidth: null
            }
        },
        directives: {clickOutside},
        props: {
            block: Boolean,
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
            }
        },
        watch: {
            visible(value) {
                this.$emit('handleVisible', value)
                if (value) {
                    this.$emit('show')
                } else {
                    this.$emit('hide')
                }
            }
        },
        updated() {
            console.log('popover update')
            this.$nextTick(() => {
                // this.dynamicCalculateHeight()
            })
        },
        methods: {
            handleClose(e) {
                if (this.$refs['popRef'] && this.$refs['popRef'].contains(e.target)) {
                    return false
                }
                for (const ele of this.closeExclude) {
                    let ref = document.querySelectorAll(ele)
                    let popContainer = document.querySelectorAll('.smart-popover-wrapper')
                    if (ref) {
                        for (const r of ref) {
                            if (r.contains(e.target)) {
                                return false
                            }
                        }
                    }
                    if (popContainer) {
                        for (const r of popContainer) {
                            if (r.contains(e.target)) {
                                return false
                            }
                        }
                    }
                }
                this.visible = false
            },
            handClick() {
                if (this.disabled) {
                    return false
                }
                let $ref = this.$refs['popRef'];
                let refHeight = $ref.clientHeight
                let offsetLeft = $ref.offsetLeft
                let offsetTop = $ref.offsetTop
                this.visible = !this.visible
                if (this.visible) {
                    let refWidth = $ref.clientWidth
                    console.log('refWidth', refWidth)
                    this.contentWidth = this.width || refWidth
                    this.$nextTick(() => {
                        let $content = this.$refs['popContent']
                        $content.style.width = this.contentWidth + 'px'
                        $content.style.left = offsetLeft + 'px'
                        $content.style.top = (offsetTop + refHeight) + 1 + 'px'
                        if (this.autoHeight) {
                            this.$nextTick(() => {
                                this.dynamicCalculateHeight();
                            })
                        }
                    })
                }
            },
            dynamicCalculateHeight() {
                if (this.height) {
                    this.$refs.content.style.height = this.height + 'px'
                } else {
                    if (this.$refs.content) {
                        this.$refs.content.style.height = 'auto'
                    }
                    let $contentWrapper = this.$refs['popContent']
                    if ($contentWrapper) {
                        let $cnt = this.$refs.content;
                        setTimeout(() => {
                            // 内容据顶部的高度
                            let clientRect = $contentWrapper.getBoundingClientRect()
                            console.log('clientRect', clientRect)

                            let popHeight = clientRect.bottom
                            let winHeight = window.innerHeight

                            console.log('popHeight', popHeight)
                            console.log('winHeight', winHeight)

                            if (popHeight > winHeight) {
                                let diff = popHeight - winHeight;
                                let originalHeight = $cnt.clientHeight
                                let height = originalHeight - diff - 28
                                $cnt.style.height = height + 'px';
                            }
                        }, 100)
                    }

                }
            },
            close() {
                this.visible = false
            },
            handBack() {
                this.$emit('back')
            },
            setAutoHeight() {
                this.$nextTick(() => {
                    this.dynamicCalculateHeight()
                })
            }
        }
    }
</script>

<style lang="less">
    @import "./SmartPopover";
</style>