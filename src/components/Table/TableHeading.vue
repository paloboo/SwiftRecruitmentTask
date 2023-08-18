<template>
    <div class="table_heading">
        <div class="heading_single row_dimensions" v-for="singleTitle in headingData">
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

        @media screen and (min-width: 768px) {
            display: flex;
        }
    }
</style>