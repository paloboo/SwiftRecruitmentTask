<template>
    <div class="table_heading">
        <div class="heading_single row_dimensions" v-for="singleTitle in headingData">
            <p>{{translations[languageCp][singleTitle]}}</p>
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
        translation: {
            type: Object,
            default() {
                return {

                }
            }
        }
    },
    data() {
        return {
        }
    },
    computed: {
        languageCp() {
            return this.language
        }
    }
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