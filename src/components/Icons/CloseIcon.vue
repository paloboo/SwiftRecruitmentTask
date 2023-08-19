<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5"/>
        <path stroke="#1C274C" stroke-linecap="round" stroke-width="1.5" d="m14.5 9.5-5 5m0-5 5 5"/>
    </svg>
</template>

<script>
export default {
    name: "CloseIcon"
}
</script>

<style lang="scss" scoped>
svg {
    path,
    circle{
        stroke: v-bind("displayColorGetter('neutral900')");
        transition: stroke .3s ease-in-out;
    }

    &:hover {
        @media screen and (min-width: 1280px) {
            path,
            circle {
                stroke: v-bind('displayColorGetter("slate100")');
            }
        }
    }
}</style>