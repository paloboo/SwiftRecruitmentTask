<template>
    <div class="table">
        <div class="table_title">
            <div class="title_btn_wrapper">
                <h1>{{ $translations[currentLanguageCp]['employee_list'] }}</h1>
                <Btn type="add">
                    {{ $translations[currentLanguageCp]['add_employee'] }}
                </Btn>
            </div>
            <div class="table_title_sort_by" v-if="allEmployees.length>0">
                <Dropdown
                    :dropdownDesc="$translations[language]['sort']"
                    :options="Object.keys(allEmployees[0])"
                    :currentOption="sortedBy"
                    @optionChanged="(option) => sort(option)"
                    isTranslated/>
                <div class="sort_by_btn" :class="{'rotated': sortingAsc}">
                    <Btn @click="sort(sortedBy)" type="edit">
                        <ArrowIcon/>
                    </Btn>
                </div>
            </div>
        </div>
        <template v-if="allEmployees.length>0">
            <TableHeading
                :currentLanguage="currentLanguageCp"
                :headingData="Object.keys(allEmployees[0])"
                :sortedBy="sortedBy"
                :sortingAsc="sortingAsc"
                @sort="sort"
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
import ArrowIcon from "../Icons/ArrowIcon.vue";
import Btn from "../InputElems/Btn.vue";
import Dropdown from "../InputElems/Dropdown.vue";
import Pagination from "../InputElems/Pagination.vue";
import TableHeading from "./TableHeading.vue";
import TableRow from "./TableRow.vue";

export default {
    name: "Table",
    components: {
        ArrowIcon,
        Dropdown,
        Btn,
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
            sortedBy: 'id',
            sortingAsc: true,
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
        },
        sort(column) {
            if (column === this.sortedBy) {
                this.sortingAsc = !this.sortingAsc;
            } else {
                this.sortingAsc = true;
            }
            this.sortedBy = column;
            if (this.sortingAsc) {
                this.allEmployees = this.allEmployees.sort((a, b) => a[this.sortedBy] > b[this.sortedBy] ? 1 : -1);
            } else {
                this.allEmployees = this.allEmployees.sort((a, b) => a[this.sortedBy] > b[this.sortedBy] ? -1 : 1);
            }
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
    padding-top: 24px;
    width: 100%;

    .table_title {
        .title_btn_wrapper {
            h1 {
                font-size: 32px;
                line-height: 48px;
                text-transform: capitalize;
            }

            @media screen and (min-width: 768px) {
                align-items: center;
                display: flex;
                justify-content: space-between;
            }
        }

        .table_title_sort_by {
            align-items: end;
            display: flex;
            gap: 8px;
            justify-content: space-between;
            margin-top: 8px;
            max-width: 360px;

            .dropdown {
                width: calc(100% - 56px);
            }

            .sort_by_btn {
                .button {
                    width: 40px;
                    height: 40px;

                    :deep(span) {
                        display: flex;
                        transition: transform .3s ease-in-out;
                        transform: rotate(90deg);
                    }
                }


                &.rotated {
                    .button {
                        :deep(span) {
                            transform: rotate(270deg);
                        }
                    }
                }


            }


            @media screen and (min-width: 1280px) {
                display: none;
            }
        }
    }

    :deep(.table_row_dimensions) {
        @media screen and (min-width: 1280px) {
            &:first-of-type {
                width: 48px;
            }
            &:nth-of-type(2) {
                width: 98px;
            }
            &:nth-of-type(3) {
                width: 98px;
            }
            &:nth-of-type(4) {
                width: 298px;
            }
            &:nth-of-type(5) {
                width: 198px;
            }
            &:nth-of-type(6) {
                width: 148px;
            }
            &:nth-of-type(7) {
                width: 98px;
            }
            &:nth-of-type(8) {
                width: 178px;
            }
        }
        @media screen and (min-width: 1920px) {
            &:first-of-type {
                width: 88px;
            }
            &:nth-of-type(2) {
                width: 138px;
            }
            &:nth-of-type(3) {
                width: 138px;
            }
            &:nth-of-type(4) {
                width: 348px;
            }
            &:nth-of-type(5) {
                width: 238px;
            }
            &:nth-of-type(6) {
                width: 158px;
            }
            &:nth-of-type(7) {
                width: 120px;
            }
            &:nth-of-type(8) {
                width: 204px;
            }
        }
    }
}
</style>