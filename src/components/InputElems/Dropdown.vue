<template>
    <div class="dropdown" :class="{'small': isSmall, 'open': isOpen}" >
        <div class="dropdown_chosen_option" @click="isOpen=!isOpen">
            <div class="chosen_option_desc">
                <span>{{dropdownDesc}}</span>
            </div>
            <div class="chosen_option_value">
                <span>{{chosenOption}}</span>
                <div class="option_arrow_head">
                    <ArrowHeadIcon />
                </div>
            </div>
        </div>
        <div class="dropdown_list_wrapper">
            <div class="list_tint" @click="isOpen = false">

            </div>
            <div class="list_content">
                <div class="content_mobile_top_bar" @click="isOpen=false">
                    <div class="top_bar_close_wrapper">
                        <CloseIcon />
                    </div>
                </div>
                <div class="content_wrapper">
                    <div class="content_single" :class="{'current': option === chosenOption}" v-for="option in options" :key="option" @click="handleOptionClicked(option)">
                        <p>{{option}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ArrowHeadIcon from "../Icons/ArrowHeadIcon.vue";
import CloseIcon from "../Icons/CloseIcon.vue";
export default {
    name: "Dropdown",
    components: {ArrowHeadIcon, CloseIcon},
    props: {
        currentOption: {
            type: [String, Number],
            default: ''
        },
        dropdownDesc: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default() {
                return [

                ]
            }
        },
        isSmall: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            chosenOption: this.currentOption,
            isOpen: false,
        }
    },
    methods: {
        handleOptionClicked(option) {
            this.chosenOption = option;
            this.$emit('optionChanged', option)
            this.isOpen = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .dropdown {
        .dropdown_chosen_option {
            cursor: pointer;
            .chosen_option_desc {
                span {
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 18px;
                    text-transform: capitalize;
                }
            }
            .chosen_option_value {
                align-items: center;
                border: 1px solid v-bind("displayColorGetter('neutral900')");
                border-radius: 4px;
                display: flex;
                height: 40px;
                justify-content: space-between;
                padding: 8px;
                width: 328px;

                span {
                    font-size: 16px;
                    line-height: 24px;
                }
            }

            .option_arrow_head {
                height: 24px;
                transform: rotate(270deg);
                transition: transform .3s ease-in-out;
                width: 24px;

                svg {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }

        .dropdown_list_wrapper {
            align-items: center;
            bottom: 0;
            display: flex;
            height: 100vh;
            justify-content: center;
            left: 0;
            opacity: 0;
            pointer-events: none;
            position: fixed;
            right: 0;
            top: 0;
            transition: opacity .3s ease-in-out;
            width: 100vw;

            .list_content {
                background-color: v-bind('displayColorGetter("neutral0")');
                border-radius: 8px;
                height: max-content;
                overflow: hidden;
                position: relative;
                width: calc(100% - 32px);
                z-index: 2;

                .content_mobile_top_bar {
                    align-items: center;
                    background-color: v-bind('displayColorGetter("gray600")');
                    display: flex;
                    justify-content: end;
                    height: 24px;
                    padding: 0 8px;
                    width: 100%;

                    .top_bar_close_wrapper {
                        width: 16px;
                        height: 16px;

                        svg {
                            max-width: 100%;
                            max-height: 100%;
                        }
                    }
                }

                .content_wrapper {
                    padding: 8px;

                    .content_single {
                        padding: 8px 12px;

                        &.current {
                            border-bottom: 1px solid transparent;
                            background-color: v-bind('displayColorGetter("gray200")');
                            border-radius: 8px;
                        }

                        &:last-of-type {
                            border-bottom: 1px solid transparent;
                        }
                    }
                }
            }

            .list_tint {
                background-color: v-bind('displayColorGetter("backgroundOpacity")');
                height: 100%;
                position: fixed;
                width: 100%;
                z-index: 1;
            }
        }

        &.open {
            .dropdown_chosen_option {
                .chosen_option_value {
                    .option_arrow_head {
                        transform: rotate(90deg);
                    }
                }
            }

            .dropdown_list_wrapper {
                opacity: 1;
                pointer-events: auto;
            }
        }

        &.small {
            .dropdown_chosen_option {
                .chosen_option_value {
                    height: 24px;
                    padding: 4px;
                    width: 50px;

                    span {
                        font-size: 14px;
                        line-height: 18px;
                    }

                    .option_arrow_head {
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }
    }
</style>