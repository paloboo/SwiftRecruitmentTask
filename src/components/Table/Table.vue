<template>
    <div class="table">
        <TableHeading
            :headingData="Object.keys(employees[0])"
            :currentLanguage="currentLanguageCp"
            :translations="translations"
        />
        <TableRow
            :key="row.id"
            :currentLanguage="currentLanguageCp"
            :tableRowData="row"
            :translations="translations"
            v-for="row in employees.slice(paginationRange.from, paginationRange.to)"
        />
        <Pagination :totalAmount="employees.length" @rangeChanged="handlePaginationRangeChange"/>
    </div>
</template>

<script>
import Pagination from "../InputElems/Pagination.vue";
import TableHeading from "./TableHeading.vue";
import TableRow from "./TableRow.vue";

export default {
    name: "Table",
    components: {
        Pagination,
        TableHeading,
        TableRow,
    },
    props: {
        employees: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            paginationRange: {
                from: 0,
                to: 10,
            },
            translations: {
                en: {
                    earnings: 'earnings',
                    email: 'email',
                    experience: 'experience',
                    first_name: 'name',
                    gender: 'gender',
                    id: 'id',
                    last_name: 'surname',
                },
                pl: {
                    earnings: 'zarobki',
                    email: 'e-mail',
                    experience: 'doświadczenie',
                    first_name: 'imię',
                    gender: 'płeć',
                    id: 'id',
                    last_name: 'nazwisko',
                }
            }
        }
    },
    methods: {
        handlePaginationRangeChange(range) {
            this.paginationRange = {...range}
        }
    },
    computed: {
        currentLanguageCp() {
            return this.language
        }
    }
}
</script>

<style lang="scss" scoped>
    .table {
        overflow-x: scroll;
        width: 100%;
    }
</style>