<template>
    <div class="table_row">
        <p>{{tableRowData}}</p>
    </div>
</template>

<script>
export default {
    name: "TableRow",
    props: {
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

<style scoped>

</style>