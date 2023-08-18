<template>
    <div class="table_row">
        <div class="row_single_cell" v-for="description in Object.keys(tableRowData)">
            <span class="cell_description">{{$translations[currentLanguage][description]}}:</span>
            <a v-if="description==='email'" class="cell_value" :href="'mailto:'+tableRowData[description]">
                {{tableRowData[description]}}
            </a>
            <span v-else class="cell_value">{{tableRowData[description]}}</span>
        </div>
        <div class="row_single_cell buttons">
            <Btn type="edit" @click="$emit('edit', tableRowData)">
                {{$translations[currentLanguage]['edit']}}
            </Btn>
            <Btn type="remove" @click="$emit('remove', tableRowData)">
                {{$translations[currentLanguage]['remove']}}
            </Btn>
        </div>
    </div>
</template>

<script>
import Btn from "../InputElems/Btn.vue";
export default {
    name: "TableRow",
    components: {Btn},
    props: {
        currentLanguage: {
            type: String,
            default: ''
        },
        tableRowData: {
            type: Object,
            default() {
                return {

                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .table_row {
        background-color: v-bind('displayColorGetter("slate100")');
        border: 1px solid v-bind('displayColorGetter("gray200")');
        border-radius: 4px;
        margin: 16px 0;
        padding: 8px;
        transition: border .3s ease-in-out, background-color .3s ease-in-out;

        .row_single_cell {
            display: flex;
            flex-wrap: nowrap;

            &.buttons {
                gap: 12px;
                justify-content: center;
                margin-top: 12px;
            }

            span,
            a {
                font-size: 14px;
                line-height: 18px;
                overflow: hidden;

                &.cell_description {
                    font-weight: 400;
                    margin-right: 8px;
                    min-width: 100px;
                    text-transform: capitalize;
                }
                &.cell_value {
                    font-weight: 500;
                    max-width: calc(100% - 100px);
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
</style>