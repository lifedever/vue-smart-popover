<template>
    <div class="smart-popover">
        <div class="smart-popover-ref" ref="popRef" @click.prevent.stop="handClick()">
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
                <div class="smart-popover-title" v-if="title">
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
    </div>
</template>

<script>
    import {directive as clickOutside} from 'v-click-outside-x';

    export default {
        name: "SmartPopover",
        mounted() {

        },
        data() {
            return {
                visible: false
            }
        },
        directives: {clickOutside},
        props: {
            disabled: {
                type: Boolean
            },
            showBack: {
                type: Boolean,
                default: false
            },
            noPad: {
                type: Boolean,
                default: false
            },
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
            },
            height: {
                type: [String, Number],
            },
            closeExclude: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        watch: {
            visible(value) {
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
                if (this.$refs['popRef'].contains(e.target)) {
                    return false
                }
                for (const ele of this.closeExclude) {
                    let ref = this.$parent.$refs[ele]
                    if (ref) {
                        if (ref.contains(e.target)) {
                            return false
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
                    this.$nextTick(() => {
                        let $content = this.$refs['popContent']
                        $content.style.width = this.width + 'px'
                        $content.style.left = offsetLeft + 'px'
                        $content.style.top = (offsetTop + refHeight) + 1 + 'px'
                        this.dynamicCalculateHeight()
                    })
                }
            },
            dynamicCalculateHeight() {
                if (this.height) {
                    this.$refs.content.style.height = this.height + 'px'
                } else {
                    let scrollTop
                    if (this.$refs.content) {
                        this.$refs.content.style.height = 'auto'
                    }
                    let $content = this.$refs['popContent']
                    if ($content) {
                        let offsetTop = $content.getBoundingClientRect().top
                        let popHeight = $content.clientHeight + offsetTop
                        let winHeight = document.documentElement.clientHeight || window.innerHeight
                        console.log('clientHeight', $content.clientHeight)
                        console.log('offsetTop', offsetTop)
                        console.log('popHeight', popHeight)
                        console.log('winHeight', winHeight)
                        if (popHeight > winHeight) {
                            let $cnt = this.$refs.content;
                            let originalHeight = $cnt.clientHeight;
                            let diff = popHeight - winHeight;
                            $cnt.style.height = (originalHeight - diff - 8) + 'px';
                            console.log('originalHeight', originalHeight)
                        }
                    }

                }
            },
            close() {
                this.visible = false
            },
            handBack() {
                this.$emit('back')
            }
        }
    }
</script>

<style lang="less">
    @import "./SmartPopover";
</style>