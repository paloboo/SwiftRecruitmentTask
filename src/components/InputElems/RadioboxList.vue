<template>
    <div class="radiobox_list">
        <div class="list_title">
            <span>{{capitalizeFirstLetter(title)}}</span>
        </div>
        <div class="list_wrapper">
            <div
                class="list_option"
                @click="handleRadioboxClick(option)"
                :key="option"
                v-for="option in options">
                <div class="option_circle">
                    <div class="circle_fill" :class="{'active': option === currentValue}"></div>
                </div>
                <p>{{$translations[language][option] ? capitalizeFirstLetter($translations[language][option]) : capitalizeFirstLetter(option)}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RadioboxList",
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default() {
                return []
            }
        },
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            currentValue: this.modelValue.toLowerCase()
        }
    },
    watch: {
        modelValue(newValue) {
            this.currentValue = newValue;
        }
    },
    methods: {
        handleRadioboxClick(option) {
            this.currentValue = option;
            this.$emit('update:modelValue', this.currentValue);
        }
    }
}
</script>

<style lang="scss" scoped>
    .radiobox_list{
        border: 1px solid v-bind('displayColorGetter("gray600")');
        border-radius: 4px;
        max-width: 328px;
        padding: 9px 8px;
        position: relative;
        width: calc(100% - 32px);

        .list_title {
            background-color: v-bind('displayColorGetter("neutral0")');
            left: 0;
            padding: 0 4px;
            pointer-events: none;
            position: absolute;
            top: 0;
            transform: translateY(-50%) scale(0.75);

            span {
                color: v-bind('displayColorGetter("neutral900")');
                opacity: 1;
            }
        }

        .list_wrapper {
            display: flex;
            gap: 24px;

            .list_option {
                align-items: center;
                cursor: pointer;
                display: flex;
                gap: 4px;

                .option_circle {
                    align-items: center;
                    border: 1px solid v-bind('displayColorGetter("blue500")');
                    border-radius: 50%;
                    display: flex;
                    height: 20px;
                    justify-content: center;
                    width: 20px;

                    .circle_fill {
                        background-color: transparent;
                        border-radius: 50%;
                        height: 12px;
                        transition: background-color .3s ease-in-out;
                        width: 12px;

                        &.active {
                            background-color: v-bind('displayColorGetter("green500")');
                        }
                    }
                }
                p {
                    color: v-bind('displayColorGetter("neutral900")');
                    font-size: 14px;
                    line-height: 18px;
                }
            }
        }
    }
</style>