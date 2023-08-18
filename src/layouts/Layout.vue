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
        background-color: v-bind('displayColorGetter("neutral0")');
        min-height: 100vh;
        overflow: hidden;
        transition: background-color .3s ease-in-out;

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

            :deep(span),
            :deep(a),
            :deep(h1),
            :deep(h2),
            :deep(h3),
            :deep(h4),
            :deep(h5),
            :deep(p),{
                color: v-bind('displayColorGetter("neutral900")');
                transition: color .3s ease-in-out;
            }

            :deep(a) {
                &:hover {
                    @media screen and (min-width: 1280px) {
                        color: v-bind('displayColorGetter("zinc500")');
                    }
                }
            }
        }
    }
</style>