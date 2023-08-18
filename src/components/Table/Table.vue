<template>
    <div class="table">
        <template v-if="allEmployees.length>0">
            <TableHeading
                :headingData="Object.keys(allEmployees[0])"
                :currentLanguage="currentLanguageCp"
            />
            <TableRow
                :currentLanguage="currentLanguageCp"
                :tableRowData="row"
                v-for="row in allEmployees.slice(paginationRange.from, paginationRange.to)"
                :key="row.id"

                @edit="handleEditButtonClicked"
                @remove="handleRemoveButtonClicked"
            />
            <Pagination :totalAmount="allEmployees.length" @rangeChanged="handlePaginationRangeChange"/>
        </template>
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
    data() {
        return {
            allEmployees: [],
            paginationRange: {
                from: 0,
                to: 10,
            },
        }
    },
    methods: {
        handleEditButtonClicked(selectedRow) {
            console.log('remove')
            console.log(selectedRow)
        },
        handlePaginationRangeChange(range) {
            this.paginationRange = {...range}
        },
        handleRemoveButtonClicked(selectedRow) {
            console.log('edit')
            console.log(selectedRow)
        }
        //     fetch('http://localhost:3000/employees/1', {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             "id": "0",
        //             "first_name": "Marya",
        //             "last_name": "Jatczak",
        //             "email": "mjatczak0@yolasite.com",
        //             "gender": "Genderfluid",
        //             "earnings": 21121.64,
        //             "experience": 2,
        //         }),
        //     })
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log('Zaktualizowano pracownika:', data);
        //         })
        //         .catch(error => {
        //             console.error('Wystąpił błąd:', error);
        //         });
        // }
    },
    computed: {
        currentLanguageCp() {
            return this.language
        }
    },
    created() {
        fetch('http://localhost:3000/employees')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.allEmployees = data;
            })
            .catch(error => {
                console.error('Wystąpił błąd:', error);
            });
    },
}
</script>

<style lang="scss" scoped>
    .table {
        width: 100%;
    }
</style>