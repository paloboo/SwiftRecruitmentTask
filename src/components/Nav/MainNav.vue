<template>
    <nav class="main_navigation">
        <p @click="changeDisplayStyle"> zmiana koloru</p>
    </nav>
</template>

<script>
export default {
    name: "MainNav",
    components: {

    },
    methods: {
        changeDisplayStyle() {
            if (this.displayMode === 'light') {
                this.displayMode = 'dark'
            } else {
                this.displayMode = 'light'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .main_navigation {
        background-color: v-bind('displayColorGetter("gray200")');
        height: 40px;
        transition: background-color .3s ease-in-out;
        width: 100vw;
    }
</style>