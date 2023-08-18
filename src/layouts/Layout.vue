<template>
    <div class="layout">
        <MainNav />
        <div class="layout_container">
            <slot/>
        </div>
    </div>
</template>

<script>
import MainNav from "../components/Nav/MainNav.vue";
export default {
    name: "Layout",
    components: {
        MainNav
    }
}
</script>

<style scoped lang="scss">
    .layout {
        overflow: hidden;

        .layout_container {
            margin: 0 auto;
            max-width: calc(100% - 32px);

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