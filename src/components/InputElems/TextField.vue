<template>
    <div class="text_field" :class="{'active': isInputFocused || inputValue!==''}">
        <div class="text_field_content">
            <div class="content_label">
                <span>{{ capitalizeFirstLetter(label) }}</span></div>
            <input
                :class="{'error': error!==''}"
                @blur="isInputFocused = false"
                @focus="isInputFocused = true"
                class="content_input"
                v-model="inputValue"
                @input="handleInput"
                :type="type" />
        </div>
        <p class="text_field_error">
            {{capitalizeFirstLetter(error)}}
        </p>
    </div>
</template>

<script>
export default {
    name: "TextField",
    props: {
        error: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        modelValue: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            inputValue: this.modelValue,
            isInputFocused: false,
        };
    },
    watch: {
        modelValue(newValue) {
            this.inputValue = newValue;
        }
    },
    methods: {
        handleInput(event) {
            this.inputValue = event.target.value;
            this.$emit('update:modelValue', this.inputValue);
        }
    }
};
</script>
<style lang="scss" scoped>
    .text_field {
        height: max-content;
        width: 100%;

        .text_field_content {
            position: relative;

            .content_label {
                background-color: v-bind('displayColorGetter("neutral0")');
                left: 8px;
                padding: 0 4px;
                pointer-events: none;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                transition: left .3s ease-in-out, opacity .3s ease-in-out, transform .3s ease-in-out, top .3s ease-in-out;

                span {
                    color: v-bind('displayColorGetter("neutral900")');
                    opacity: 0.3;
                }
            }

            .content_input {
                background-color: v-bind('displayColorGetter("neutral0")');
                border: 1px solid v-bind('displayColorGetter("gray500")');
                border-radius: 4px;
                color: v-bind('displayColorGetter("neutral900")');
                font-size: 14px;
                height: 40px;
                max-width: 328px;
                padding: 0 8px;
                width: calc(100% - 32px);

                &.error {
                    border: 1px solid v-bind('displayColorGetter("red500")');
                }

                &:focus {
                    outline: 1px solid v-bind('displayColorGetter("gray600")');
                }
            }
        }

        .text_field_error {
            font-size: 12px;
            font-weight: 500;
            color: v-bind('displayColorGetter("red500")') !important;
            height: 24px;
            line-height: 18px;
        }

        &.active {
            .text_field_content {
                .content_label {
                    left: 0;
                    transform: translateY(-50%) scale(0.75);
                    top: 0;

                    span {
                        color: v-bind('displayColorGetter("neutral900")');
                        opacity: 1;
                    }
                }
            }
        }
    }
</style>