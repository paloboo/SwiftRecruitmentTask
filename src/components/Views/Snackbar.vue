<template>
    <div class="snackbar" :class="[snackbarType, isSnackbarVisible ? 'show' : '']">
        <span>{{capitalizeFirstLetter(snackbarMessage)}}</span>
    </div>
</template>

<script>
export default {
    name: "Snackbar",
    props: {

    },
}
</script>

<style scoped lang="scss">
    .snackbar {
        border-radius: 8px;
        height: max-content;
        left: 50%;
        max-width: calc(100% - 32px);
        padding: 8px 48px;
        pointer-events: none;
        position: fixed;
        top: -100%;
        transform: translateX(-50%);
        transition: top .3s ease-in-out;
        width: max-content;
        z-index: 10;

        @media screen and (min-width: 768px) {
            max-width: 550px;
        }

        &.success {
            background-color: v-bind('displayColorGetter("green500")');
        }

        &.error {
            background-color: v-bind('displayColorGetter("red500")');
        }

        span {
            color: v-bind('displayColorGetter("neutral0")');
            font-weight: 700;
            transition: color .3s ease-in-out;
        }

        &.show {
            top: 24px;
        }
    }
</style>