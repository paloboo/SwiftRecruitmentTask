<template>
    <div class="table_heading">
        <div class="heading_single table_row_dimensions" v-for="singleTitle in headingData">
            <p>{{$translations[currentLanguage][singleTitle]}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "TableHeading",
    props: {
        headingData: {
            type: Array,
            default() {
                return []
            }
        },
        currentLanguage: {
            type: String,
            default: ''
        },
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
            padding-left: 8px;
            p {
                font-weight: 700;
                text-transform: capitalize;
            }
        }
    }
</style>