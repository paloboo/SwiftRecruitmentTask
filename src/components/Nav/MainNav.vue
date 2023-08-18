<template>
    <nav class="main_navigation">
        <p @click="changeDisplayStyle"> zmiana koloru</p>
        <p @click="changeLanguage">zmiana języka</p>
    </nav>
</template>

<script>
export default {
    name: "MainNav",
    components: {

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
        background-color: v-bind('displayColorGetter("gray200")');
        display: flex;
        justify-content: space-between;
        height: 40px;
        transition: background-color .3s ease-in-out;
        width: 100vw;
    }
</style>