<template>
    <nav class="main_navigation">
        <div class="navigation_container">
            <Switcher @setCheckboxVal="changeDisplayStyle" :switcherTitle="$translations[language]['display_mode']+':'"/>
            <Dropdown :options="languageOptions" :currentOption="language.toUpperCase()" direction="down" @optionChanged="(option) => changeLanguage(option)"/>
        </div>
    </nav>
</template>

<script>
import Dropdown from "../InputElems/Dropdown.vue";
import Switcher from "../InputElems/Switcher.vue";
export default {
    name: "MainNav",
    components: {
        Dropdown,
        Switcher

    },
    data() {
        return {
            languageOptions: [
                {
                    icon: 'PlFlagIcon',
                    name: 'PL'
                },
                {
                    icon: 'EnFlagIcon',
                    name: 'EN'
                }
            ]
        }
    },
    methods: {
        changeDisplayStyle() {
            this.displayMode === 'light' ? this.displayMode = 'dark' : this.displayMode = 'light'
        },
        changeLanguage(option) {
            this.language = option.toLowerCase();
        }
    }
}
</script>

<style lang="scss" scoped>
    .main_navigation {
        align-items: center;
        background-color: v-bind('displayColorGetter("gray200")');
        display: flex;
        height: 72px;
        transition: background-color .3s ease-in-out;
        width: 100vw;

        .navigation_container {
            align-items: center;
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            max-width: calc(100% - 32px);
            width: 100%;

            @media screen and (min-width: 768px) {
                max-width: 672px;
            }

            @media screen and (min-width: 1280px) {
                max-width: 1180px;
            }

            @media screen and (min-width: 1920px) {
                max-width: 1450px;
            }

            .switch_wrapper {
                min-width: 118px;
            }

            :deep(.dropdown) {
                height: max-content;
                width: 95px;

                @media screen and (min-width: 1280px) {
                    .dropdown_list_wrapper {
                        max-width: 95px;
                    }
                }
            }
        }
    }
</style>