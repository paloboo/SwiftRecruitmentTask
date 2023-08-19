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
        //opacity: 0;
        padding: 8px 48px;
        pointer-events: none;
        position: fixed;
        top: -100%;
        transform: translateX(-50%);
        transition: top .3s ease-in-out;
        width: max-content;

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
            //opacity: 1;
            top: 24px;
        }
    }
</style>