<template>
    <div class="smart-popover">
        <div class="smart-popover-ref" ref="popRef" @click.prevent.stop="handClick()">
            <slot></slot>
        </div>
        <transition name="xxx"
                    :enter-active-class="animation? 'popover-slideup': ''"
                    :leave-active-class="animation? 'popover-slidedown': ''">
            <div v-if="visible" class="smart-popover-content" ref="popContent">
                <slot name="content"></slot>
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
            }
        },
        methods: {
            handClick() {
                let $ref = this.$refs['popRef']
                let refHeight = $ref.clientHeight
                let offsetLeft = $ref.offsetLeft
                let offsetTop = $ref.offsetTop

                console.log(refHeight)

                this.visible = !this.visible
                if (this.visible) {
                    this.$nextTick(() => {
                        let $content = this.$refs['popContent']
                        $content.style.left = offsetLeft + 'px'
                        $content.style.top = (offsetTop + refHeight) + 1 + 'px'
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .smart-popover {
        display: block;

        .smart-popover-ref {
            display: inline-block;
        }

        .smart-popover-content {
            border: none;
            position: fixed;
            border-radius: 3px;
            color: #373e46;
            overflow-y: visible;
            z-index: 1200;
            opacity: 1;
            pointer-events: auto;
            padding: 18px;
            background: #fff;
            box-shadow: 0 8px 16px -4px rgba(9, 45, 66, .25), 0 0 0 1px rgba(9, 45, 66, .08);
        }

        .popover-slideup {
            animation-name: slide-to-top;
            animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
            animation-duration: 0.3s;

        }

        .popover-slidedown {
            animation-name: slide-to-down;
            animation-timing-function: ease-out;
            animation-duration: 100ms;
        }

        @keyframes slide-to-top {
            0% {
                transform: translateY(20px);
                overflow: hidden;
                pointer-events: none;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
                pointer-events: auto;
            }
        }

        @keyframes slide-to-down {
            0% {
                transform: translateY(0px);
                overflow: hidden;
                pointer-events: none;
                opacity: 1;
            }
            100% {
                transform: translateY(20px);
                opacity: 0;
            }
        }
    }

</style>