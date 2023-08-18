<template>
    <nav class="main_navigation">
        <div class="navigation_container">
            <Switcher @setCheckboxVal="changeDisplayStyle" :switcherTitle="$translations[language]['display_mode']+':'"/>
            <p @click="changeLanguage">zmiana języka</p>
        </div>
    </nav>
</template>

<script>
import Switcher from "../InputElems/Switcher.vue";
export default {
    name: "MainNav",
    components: {
        Switcher

    },
    methods: {
        changeDisplayStyle() {
            this.displayMode === 'light' ? this.displayMode = 'dark' : this.displayMode = 'light'
        },
        changeLanguage() {
            this.language === 'pl' ? this.language = 'en' : this.language = 'pl'
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
        }
    }
</style>