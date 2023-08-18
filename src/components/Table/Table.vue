<template>
    <div class="table">
        <TableHeading
            :headingData="Object.keys(employees[0])"
            :translations="translations"
        />
        <TableRow
            :key="row.id"
            :tableRowData="row"
            :translations="translations"
            v-for="row in employees"
        />
    </div>
</template>

<script>
import TableHeading from "./TableHeading.vue";
import TableRow from "./TableRow.vue";

export default {
    name: "Table",
    components: {TableRow, TableHeading},
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
            translations: {
                en: {
                    id: 'id',
                    first_name: 'name',
                    last_name: 'surname',
                    email: 'email',
                    gender: 'gender',
                    earnings: 'earnings',
                    experience: 'experience',
                },
                pl: {
                    id: 'id',
                    first_name: 'imię',
                    last_name: 'nazwisko',
                    email: 'e-mail',
                    gender: 'płeć',
                    earnings: 'zarobki',
                    experience: 'doświadczenie',
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .table {
        overflow-x: scroll;
        width: 100%;
    }
</style>