<template>
    <svg width="800" height="800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15 7-5 5 5 5" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
</template>

<script>
export default {
    name: "ArrowHeadIcon"
}
</script>

<style lang="scss" scoped>
    svg {
        path {
            stroke: v-bind("displayColorGetter('neutral900')");
            transition: stroke .3s ease-in-out;
        }
    }
</style>