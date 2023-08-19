<template>
    <div class="dropdown" :class="{'small': isSmall, 'open': isOpen}">
        <div class="dropdown_chosen_option" @click="isOpen=!isOpen">
            <div class="chosen_option_desc">
                <span>{{ dropdownDesc }}</span>
            </div>
            <div class="chosen_option_value">
                <div class="option_value_icon_wrapper" v-if="typeof options[0] === 'object'">
                    <component :is="options.find(item=> item.name.toLowerCase() === chosenOption.toLowerCase()).icon" />
                </div>
                <span>{{ isTranslated ? $translations[language][chosenOption] : chosenOption }}</span>
                <div class="option_arrow_head">
                    <ArrowHeadIcon/>
                </div>
            </div>
        </div>
        <div class="dropdown_list_wrapper" :class="{ 'direction_down': direction==='down'}">
            <div class="list_tint" @click="isOpen = false">

            </div>
            <div class="list_content">
                <div class="content_mobile_top_bar" @click="isOpen=false">
                    <div class="top_bar_close_wrapper">
                        <CloseIcon/>
                    </div>
                </div>
                <div class="content_wrapper">
                    <div class="content_single"
                         :class="{'current': typeof option === 'object' ? option.name.toLowerCase() === chosenOption.toLowerCase() : option === chosenOption}"
                         @click="handleOptionClicked(typeof option === 'object' ? option.name : option)"
                         :key="option"
                         v-for="option in options">
                        <div class="single_with_icon" v-if="typeof option === 'object'">
                            <div class="icon_wrapper">
                                <component :is="option.icon" />
                            </div>
                            <span>{{ isTranslated ? $translations[language][option.name] : option.name }}</span>
                        </div>
                        <span v-else>{{ isTranslated ? $translations[language][option] : option }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ArrowHeadIcon from "../Icons/ArrowHeadIcon.vue";
import CloseIcon from "../Icons/CloseIcon.vue";
import EnFlagIcon from "../Icons/EnFlagIcon.vue";
import PlFlagIcon from "../Icons/PlFlagIcon.vue";

export default {
    name: "Dropdown",
    components: {ArrowHeadIcon, CloseIcon, EnFlagIcon, PlFlagIcon},
    props: {
        currentOption: {
            type: [String, Number],
            default: ''
        },
        direction: {
            type: String,
            default: 'up'
        },
        dropdownDesc: {
            type: String,
            default: ''
        },
        isTranslated: {
            type: Boolean,
            default: false
        },
        isSmall: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default() {
                return []
            }
        },
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
    @media screen and (min-width: 1280px) {
        position: relative;
    }

    .dropdown_chosen_option {
        cursor: pointer;

        .chosen_option_desc {
            span {
                color: v-bind('displayColorGetter("neutral900")');
                font-size: 14px;
                font-weight: 500;
                line-height: 18px;
                text-transform: capitalize;
            }
        }

        .chosen_option_value {
            align-items: center;
            border: 1px solid v-bind("displayColorGetter('gray600')");
            border-radius: 4px;
            display: flex;
            height: 40px;
            justify-content: space-between;
            max-width: 328px;
            padding: 8px;
            transition: border .3s ease-in-out;
            width: 100%;

            span {
                color: v-bind('displayColorGetter("neutral900")');
                font-size: 16px;
                line-height: 24px;
                text-transform: capitalize;
                transition: color .3s ease-in-out;
            }

            .option_value_icon_wrapper {
                height: 24px;
                margin-right: 4px;
                width: 24px;

                svg {
                    height: 100%;
                    width: 100%;
                }
            }
        }

        .option_arrow_head {
            height: 24px;
            transform: rotate(270deg);
            transition: transform .3s ease-in-out;
            width: 24px;

            svg {
                max-height: 100%;
                max-width: 100%;
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
        width: 100vw;

        @media screen and (min-width: 1280px) {
            bottom: 24px;
            height: max-content;
            left: 0;
            max-height: 0;
            opacity: 1;
            overflow: hidden;
            position: absolute;
            right: unset;
            top: unset;
            transition: max-height .3s ease-in-out;
            width: 328px;
        }

        .list_content {
            background-color: v-bind('displayColorGetter("neutral0")');
            border-radius: 8px;
            height: max-content;
            overflow: hidden;
            position: relative;
            transition: background-color .3s ease-in-out;
            width: calc(100% - 32px);
            z-index: 2;

            @media screen and (min-width: 768px) {
                max-width: 560px;
            }

            @media screen and (min-width: 1280px) {
                border: 1px solid v-bind('displayColorGetter("blue500")');
                transition: background-color .3s ease-in-out, border .3s ease-in-out;
                width: 100%;
            }

            .content_mobile_top_bar {
                align-items: center;
                background-color: v-bind('displayColorGetter("gray600")');
                display: flex;
                justify-content: end;
                height: 24px;
                padding: 0 8px;
                width: 100%;

                @media screen and (min-width: 1280px) {
                    display: none;
                }

                .top_bar_close_wrapper {
                    height: 16px;
                    width: 16px;

                    svg {
                        max-height: 100%;
                        max-width: 100%;
                    }
                }
            }

            .content_wrapper {
                padding: 8px;

                .content_single {
                    border-radius: 8px;
                    padding: 8px 12px;
                    transition: background-color .3s ease-in-out;

                    span {
                        color: v-bind('displayColorGetter("neutral900")');
                        text-transform: capitalize;
                    }

                    .single_with_icon {
                        align-items: center;
                        display: flex;
                        gap: 12px;

                        span {
                            color: v-bind('displayColorGetter("neutral900")');
                            transition: color .3s ease-in-out;
                        }

                        .icon_wrapper {
                            height: 24px;
                            width: 24px;

                            svg {
                                height: 100%;
                                width: 100%;
                            }
                        }
                    }

                    &:hover {
                        @media screen and (min-width: 1280px) {
                            background-color: v-bind('displayColorGetter("gray100")');
                            cursor: pointer;
                        }
                    }

                    &.current {
                        background-color: v-bind('displayColorGetter("gray200")');
                        border-bottom: 1px solid transparent;
                        border-radius: 8px;
                        pointer-events: none;
                    }

                    &:last-of-type {
                        border-bottom: 1px solid transparent;
                    }
                }
            }
        }

        .list_tint {
            background-color: v-bind('displayColorGetter("backgroundOpacity")');
            bottom: 0;
            height: 100%;
            left: 0;
            position: fixed;
            right: 0;
            top: 0;
            width: 100%;
            z-index: 1;

            @media screen and (min-width: 1280px) {
                background-color: transparent;
            }
        }

        &.direction_down {
            @media screen and (min-width: 1280px) {
                bottom: unset;
                top: 40px;
            }
        }
    }

    &.open {
        z-index: 99;
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

            @media screen and (min-width: 1280px) {
                max-height: 400px;
            }
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
                    height: 20px;
                    width: 20px;
                }
            }
        }
    }
}
</style>