<template>
    <Layout>
        <Table />
    </Layout>
</template>

<script>
import Layout from "./layouts/Layout.vue";
import Table from "./components/Table/Table.vue";
export default {
    name: "App",
    components: {
        Table,
        Layout
    },
    data() {
        return {
        }
    },
    methods: {
    },
}
</script>

<style scoped lang="scss">

</style>
