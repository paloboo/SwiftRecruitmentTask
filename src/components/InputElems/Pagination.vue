<template>
    <div class="pagination">
        <Dropdown
            :currentOption="perPage"
            :dropdownDesc="$translations[language]['results_per_page']"
            isSmall
            :options="dropdownOptions"
            @optionChanged="(option) => handlePerPageChange(option)"
        />
        <div class="pagination_buttons">
            <div class="buttons_single prev" :class="{'disabled': currentPage===1}" @click="handleArrowClick('down')">
                <ArrowHeadIcon />
            </div>
            <div v-for="page in paginationArrayCp" :key="page" @click="handleCurrentPageChange(page)" class="buttons_single" :class="{'current': Number(page)===currentPage, 'disabled': isNaN(Number(page))}">
                <span>
                    {{page}}
                </span>
            </div>
            <div class="buttons_single next" :class="{'disabled': currentPage===pageAmountCp}"  @click="handleArrowClick('up')">
                <ArrowHeadIcon />
            </div>
        </div>
    </div>
</template>

<script>
import ArrowHeadIcon from "../Icons/ArrowHeadIcon.vue";
import Dropdown from "./Dropdown.vue";
export default {
    name: "Pagination",
    components: {
        ArrowHeadIcon,
        Dropdown,
    },
    props: {
        totalAmount: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            currentPage: 1,
            dropdownOptions: [10, 20, 50],
            perPage: 10,
        }
    },
    methods: {
        generatePagination(currentPage, totalPages) {
            const pages = [];

            if (totalPages <= 2 + 2) {
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                if (currentPage - 2 / 2 > 2) {
                    pages.push('...');
                }

                for (let i = Math.max(2, currentPage - 2 / 2); i <= Math.min(totalPages - 1, currentPage + 2 / 2); i++) {
                    pages.push(i);
                }

                if (currentPage + 2 / 2 < totalPages - 1) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }

            return pages;
        },
        getPagesRange() {
            const range = {
                from: (this.currentPage * this.perPage)-this.perPage,
                to: (this.currentPage * this.perPage)
            }
            this.$emit('rangeChanged', range);
        },
        handleArrowClick(direction) {
            if (direction==='up' && this.currentPage<this.pageAmountCp) {
                this.currentPage++;
            } else if (direction==='down' && this.currentPage>1) {
                this.currentPage--;
            }
            this.getPagesRange();
        },
        handleCurrentPageChange(page) {
            if (!isNaN(Number(page))) {
                this.currentPage = page
                this.getPagesRange();
            }
        },
        handlePerPageChange(perPage) {
            this.perPage = perPage;
            this.currentPage = 1;
            this.getPagesRange();
        },

    },
    computed: {
        pageAmountCp() {
            return  Math.ceil(this.totalAmount/this.perPage)
        },
        paginationArrayCp() {
            return this.generatePagination(this.currentPage, this.pageAmountCp)
        }
    },
}
</script>

<style lang="scss" scoped>
    .pagination {
        @media screen and (min-width: 768px) {
            margin-top: 48px;
            position: relative;
        }

        .dropdown {
            @media screen and (min-width: 768px) {
                bottom: 0;
                left: 0;
                position: absolute;
            }
        }

        .pagination_buttons {
            display: flex;
            gap: 4px;
            margin: 32px auto;
            max-width: 100%;
            width: max-content;

            .buttons_single {
                align-items: center;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                justify-content: center;
                min-width: 24px;
                min-height: 24px;

                svg {
                    max-width: 16px;
                    max-height: 16px;
                }

                &.disabled {
                    pointer-events: none;
                }

                &.dots {
                    border: none;
                    pointer-events: none;
                }

                &.next {
                    transform: rotate(180deg);
                }

                span {
                    font-size: 12px;
                    line-height: 14px;
                    font-weight: 700;
                }

                &.current {
                    background-color:v-bind('displayColorGetter("gray400")');
                    border: 1px solid v-bind('displayColorGetter("gray400")');
                    pointer-events: none;

                    span {
                        color: #000000;
                    }
                }

                &:hover {
                    @media screen and (min-width: 1280px) {
                        background-color:v-bind('displayColorGetter("gray100")');
                        border: 1px solid v-bind('displayColorGetter("gray100")');
                    }
                }
            }
        }
    }
</style>