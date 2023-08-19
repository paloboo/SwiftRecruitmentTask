<template>
    <div class="table_heading">
        <div class="heading_single table_row_dimensions" v-for="singleTitle in headingData" @click="$emit('sort', singleTitle)">
            <p>{{$translations[language][singleTitle]}}</p>
            <div class="heading_single_arrow" :class="{'desc': !sortingAsc, 'show': sortedBy === singleTitle}">
                <ArrowIcon />
            </div>
        </div>
    </div>
</template>

<script>
import ArrowIcon from "../Icons/ArrowIcon.vue";
export default {
    name: "TableHeading",
    components: {ArrowIcon},
    props: {
        headingData: {
            type: Array,
            default() {
                return []
            }
        },
        sortingAsc: {
            type: Boolean,
            default: true,
        },
        sortedBy: {
            type: String,
            default: 'id'
        }
    },
    data() {
        return {
        }
    },
}
</script>

<style lang="scss" scoped>
    .table_heading {
        display: none;
        margin-top: 32px;

        @media screen and (min-width: 1280px) {
            display: flex;
        }

        .heading_single {
            align-items: center;
            cursor: pointer;
            display: flex;
            padding-left: 8px;

            p {
                color: v-bind('displayColorGetter("neutral900")');
                font-weight: 700;
                text-transform: capitalize;
            }

            .heading_single_arrow {
                height: 16px;
                opacity: 0;
                transform: rotate(270deg);
                transition: transform .3s ease-in-out, opacity .3s ease-in-out;
                width: 16px;

                svg {
                    height: 100%;
                    width: 100%;
                }

                &.desc {
                    transform: rotate(90deg);
                }

                &.show {
                    opacity: 1;
                }
            }
        }
    }
</style>