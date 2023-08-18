<template>
    <button class="button" :class="[type]">
        <span>
            <slot>

            </slot>
        </span>
    </button>
</template>

<script>
export default {
    name: "Btn",
    props: {
        type: String,
        default: 'edit'
    }
}
</script>

<style lang="scss" scoped>
    .button {
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: pointer;
        height: max-content;
        outline: 1px solid transparent;
        padding: 4px 12px;
        transition: background-color .3s ease-in-out;


        &:hover {
            @media screen and (min-width: 1280px) {
                background-color: v-bind('displayColorGetter("blue500")');
            }
        }

        span {
            font-size: 14px;
            font-weight: 500;
            line-height: 18px;
            text-transform: capitalize;
        }

        &.add {
            background-color: v-bind('displayColorGetter("green400")');

            span {
                color: v-bind('displayColorGetter("gray800")');
            }
        }

        &.edit {
            background-color: v-bind('displayColorGetter("blue200")');
            border: 1px solid v-bind('displayColorGetter("blue800")');

            span {
                color: v-bind('displayColorGetter("neutral900")');
            }

            &:hover {
                @media screen and (min-width: 1280px) {
                    background-color: v-bind('displayColorGetter("blue500")');
                }
            }
        }

        &.remove {
            background-color: v-bind('displayColorGetter("red500")');
            border: 1px solid v-bind('displayColorGetter("red700")');

            &:hover {
                @media screen and (min-width: 1280px) {
                    background-color: v-bind('displayColorGetter("red700")');
                }
            }

            span {
                color: v-bind('displayColorGetter("neutral0")');
            }
        }
    }
</style>