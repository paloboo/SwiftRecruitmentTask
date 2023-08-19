<template>
    <div class="table">
        <div class="table_title">
            <div class="title_btn_wrapper">
                <h1>{{ $translations[language]['employee_list'] }}</h1>
                <Btn type="add" @click="popups.add = true">
                    {{ $translations[language]['add_employee'] }}
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
                :rowOrder="rowOrder"
                :sortedBy="sortedBy"
                :sortingAsc="sortingAsc"
                @sort="sort"
            />
            <TableRow
                v-for="row in allEmployees.slice(paginationRange.from, paginationRange.to)"
                :key="row.id"
                :rowOrder="rowOrder"
                :tableRowData="row"

                @edit="handleEditButtonClicked"
                @remove="handleRemoveButtonClicked"
            />
            <Pagination :totalAmount="allEmployees.length" @rangeChanged="handlePaginationRangeChange"/>
        </template>
        <PopupRemoveConfirm
            v-if="popups.remove"
            :chosenEmployee="selectedRow"
            @confirm="removeConfirmed"
            @close="handlePopupClose('remove')"
        />

        <PopupUserData :userData="selectedRow" v-if="popups.add" @close="handlePopupClose('add')" @added="employeeAddedHandler"/>

        <PopupUserData :userData="selectedRow" v-if="popups.edit" @close="handlePopupClose('edit')" isEdit @updated="employeeUpdatedHandler"/>
    </div>
</template>

<script>
import ArrowIcon from "../Icons/ArrowIcon.vue";
import Btn from "../InputElems/Btn.vue";
import Dropdown from "../InputElems/Dropdown.vue";
import Pagination from "../InputElems/Pagination.vue";
import PopupRemoveConfirm from "../Popups/PopupRemoveConfirm.vue";
import PopupUserData from "../Popups/PopupUserData.vue"
import TableHeading from "./TableHeading.vue";
import TableRow from "./TableRow.vue";

export default {
    name: "Table",
    components: {
        ArrowIcon,
        Btn,
        Dropdown,
        Pagination,
        PopupUserData,
        PopupRemoveConfirm,
        TableHeading,
        TableRow,
    },
    data() {
        return {
            allEmployees: [],
            highestId: -1,
            paginationRange: {
                from: 0,
                to: 10,
            },
            popups: {
                add: false,
                edit: false,
                remove: false,
            },
            rowOrder: ['id', 'first_name', 'last_name', 'email', 'gender', 'earnings', 'experience'],
            selectedRow: {
                email: "",
                earnings: "",
                experience: "",
                first_name: "",
                gender: "female",
                id: -1,
                last_name: "",
            },
            sortedBy: 'id',
            sortingAsc: true,
        }
    },
    methods: {
        clearSelectedRow() {
            this.selectedRow = {
                earnings: "",
                email: "",
                experience: "",
                first_name: "",
                gender: "female",
                id: -1,
                last_name: "",
            }
        },
        employeeAddedHandler(data) {
            this.popups.add = false;
            this.allEmployees.push(data);
            this.showSnackbar(this.$translations[this.language]['employee_added']);
        },
        employeeUpdatedHandler(data) {
            this.popups.edit = false;
            this.allEmployees.forEach((item, index) => {
                if (item.id === data.id) {
                    this.allEmployees[index] = {...data}
                }
            })
            this.showSnackbar(this.$translations[this.language]['data_updated']);
        },
        handleEditButtonClicked(selectedRow) {
            this.selectedRow = selectedRow;
            this.popups.edit = true;
        },
        handlePaginationRangeChange(range) {
            this.paginationRange = {...range}
        },
        handlePopupClose(type) {
            this.popups[type] = false;
            this.clearSelectedRow();
        },
        handleRemoveButtonClicked(selectedRow) {
            this.popups.remove = true;
            this.selectedRow = selectedRow;
        },
        removeConfirmed() {
            if (!this.requestLock) {
                this.requestLock = true;
                fetch(`http://localhost:3000/employees/${this.selectedRow.id}`, {
                    method: 'DELETE', // Ustawienie metody na DELETE
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            console.log('Pracownik został usunięty.'); //TODO podmienic na snackbar
                            this.allEmployees = this.allEmployees.filter(item => item.id !== this.selectedRow.id);
                            this.handlePopupClose('remove');
                            this.showSnackbar(this.$translations[this.language]['user_removed'], 3000, 'success');
                        } else {
                            throw new Error('Wystąpił problem podczas usuwania pracownika.');
                        }
                    })
                    .catch(error => {
                        console.error('Wystąpił błąd:', error);
                    })
                    .finally(() => {
                        this.requestLock = false;
                    });
            }
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
        },
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
    }
}
</script>

<style lang="scss" scoped>
.table {
    padding-top: 24px;
    width: 100%;

    .table_title {
        .title_btn_wrapper {
            h1 {
                color: v-bind('displayColorGetter("neutral900")');
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