<template>
    <div class="popup_wrapper">
        <div class="popup_tint" @click="$emit('close')">

        </div>
        <div class="popup_close_bar">
            <div class="close_bar_icon" @click="$emit('close')">
                <CloseIcon />
            </div>
        </div>
        <div class="popup_content">
            <slot></slot>
            <div class="popup_buttons">
                <Btn :type="cancelButtonType" @click="$emit('close')">
                    {{ cancelButtonDesc }}
                </Btn>
                <Btn :type="confirmButtonType" @click="$emit('confirm')" :disabled="isConfirmButtonDisabled">
                   {{confirmButtonDesc}}
                </Btn>
            </div>
        </div>
    </div>
</template>

<script>
import Btn from "../InputElems/Btn.vue";
import CloseIcon from "../Icons/CloseIcon.vue";
export default {
    name: "PopupWrapper",
    components: {Btn, CloseIcon},
    props: {
        cancelButtonDesc: {
            type: String,
            default: 'cancel'
        },
        cancelButtonType: {
            type: String,
            default: 'edit'
        },
        confirmButtonDesc: {
            type: String,
            default: 'save'
        },
        confirmButtonType: {
            type: String,
            default: 'add'
        },
        isConfirmButtonDisabled: {
            type: Boolean,
            default: false
        }
    },
    created() {
        document.querySelector('body').classList.add('block_scroll');
    },
    beforeUnmount() {
        document.querySelector('body').classList.remove('block_scroll');
    }
}
</script>

<style lang="scss" scoped>
    .popup_wrapper {
        align-items: center;
        bottom: 0;
        display: flex;
        flex-direction: column;
        height: 100vh;
        justify-content: center;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        width: 100vw;

        .popup_tint {
            background-color: v-bind('displayColorGetter("backgroundOpacity")');
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }

        .popup_close_bar {
            align-items: center;
            background-color: v-bind('displayColorGetter("gray600")');
            border-radius: 8px 8px 0 0;
            display: flex;
            height: 24px;
            max-width: 550px;
            justify-content: end;
            padding: 0 8px;
            position: relative;
            width: calc(100% - 32px);
            z-index: 3;

            @media screen and (min-width: 1280px) {
                height: 32px;
            }

            .close_bar_icon {
                cursor: pointer;
                height: 16px;
                width: 16px;

                @media screen and (min-width: 1280px) {
                    width: 24px;
                    height: 24px;
                }

                svg {
                    height: 100%;
                    width: 100%;
                }
            }
        }
        .popup_content {
            background-color: v-bind('displayColorGetter("neutral0")');
            border-radius: 0 0 8px 8px;
            height: max-content;
            margin: 0 auto;
            max-height: 80vh;
            max-width: 550px;
            overflow-y: auto;
            padding: 16px;
            position: relative;
            width: calc(100% - 32px);
            z-index: 3;

            @media screen and (min-width: 1280px) {
                max-height: 60vh;
                padding: 32px;
            }

            .popup_buttons {
                display: flex;
                gap: 12px;
                justify-content: center;
                margin-top: 24px;

                .button {
                    width: 50%;
                    max-width: 200px;
                }
            }
        }
    }
</style>