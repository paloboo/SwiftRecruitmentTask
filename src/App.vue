<template>
    <Layout>
        <Table :employees="allEmployees" v-if="allEmployees.length>0"/>
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
            allEmployees: [],
        }
    },
    methods: {
        remove() {

        },
        update() {
            fetch('http://localhost:3000/employees/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": "0",
                    "first_name": "Marya",
                    "last_name": "Jatczak",
                    "email": "mjatczak0@yolasite.com",
                    "gender": "Genderfluid",
                    "earnings": 21121.64,
                    "experience": 2,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Zaktualizowano pracownika:', data);
                })
                .catch(error => {
                    console.error('Wystąpił błąd:', error);
                });
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

<style scoped lang="scss">

</style>
