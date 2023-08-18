<template>
    <nav class="main_navigation">
    </nav>
</template>

<script>
export default {
    name: "MainNav",
    components: {

    },
}
</script>

<style lang="scss" scoped>
    .main_navigation {
        background-color: v-bind('displayColorGetter("gray200")');
        height: 40px;
        width: 100vw;
    }
</style>