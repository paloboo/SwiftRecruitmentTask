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
                    :currentOption="sortedBy"
                    :dropdownDesc="$translations[language]['sort']"
                    isTranslated
                    :options="Object.keys(allEmployees[0])"
                    @optionChanged="(option) => sort(option)"
                />
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
                @edit="handleEditButtonClicked"
                :key="row.id"
                @remove="handleRemoveButtonClicked"
                :rowOrder="rowOrder"
                :tableRowData="row"
                v-for="row in allEmployees.slice(paginationRange.from, paginationRange.to)"
            />
            <Pagination
                @rangeChanged="handlePaginationRangeChange"
                :totalAmount="allEmployees.length"
            />
        </template>
        <PopupRemoveConfirm
            :chosenEmployee="selectedRow"
            @close="handlePopupClose('remove')"
            @confirm="removeConfirmed"
            v-if="popups.remove"
        />

        <PopupUserData
            @added="employeeAddedHandler"
            @close="handlePopupClose('add')"
            :userData="selectedRow"
            v-if="popups.add"
        />

        <PopupUserData
            @close="handlePopupClose('edit')"
            isEdit
            @updated="employeeUpdatedHandler"
            :userData="selectedRow"
            v-if="popups.edit"
        />
        <PopupDataLoadingFailed
            @close="handlePopupClose('loadingFailed')"
            @confirm="reloadPage"
            v-if="popups.loadingFailed"
        />
    </div>
</template>

<script>
import ArrowIcon from "../Icons/ArrowIcon.vue";
import Btn from "../InputElems/Btn.vue";
import Dropdown from "../InputElems/Dropdown.vue";
import Pagination from "../InputElems/Pagination.vue";
import PopupDataLoadingFailed from "../Popups/PopupDataLoadingFailed.vue";
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
        PopupDataLoadingFailed,
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
                loadingFailed: false,
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
        reloadPage() {
            location.reload()
        },
        removeConfirmed() {
            if (!this.requestLock) {
                this.requestLock = true;
                fetch(`http://localhost:3000/employees/${this.selectedRow.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            this.allEmployees = this.allEmployees.filter(item => item.id !== this.selectedRow.id);
                            this.handlePopupClose('remove');
                            this.showSnackbar(this.$translations[this.language]['user_removed'], 3000, 'success');
                        } else {
                            throw new Error('Wystąpił problem podczas usuwania pracownika.');
                        }
                    })
                    .catch(() => {
                        this.showSnackbar(this.$translations[this.language]['something_went_wrong'], 10000, 'error')
                        this.handlePopupClose('remove');
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
            .catch(() => {
                this.popups.loadingFailed = true;
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
                    height: 40px;
                    width: 40px;

                    :deep(span) {
                        display: flex;
                        transform: rotate(90deg);
                        transition: transform .3s ease-in-out;
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