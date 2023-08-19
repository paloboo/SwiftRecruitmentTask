<template>
    <PopupWrapper
        :confirmButtonDesc="$translations[language][isEdit ? 'save' : 'add']"
        :cancelButtonDesc="$translations[language]['cancel']"
        :isConfirmButtonDisabled="isConfirmButtonDisabledCp"
        @confirm="handleConfirmButtonClicked"
    >
        <div class="popup_user_data">
            <div class="user_data_title">
                <h3>{{ capitalizeFirstLetter($translations[language][isEdit ? 'edit_employee' : 'add_employee']) }}</h3>
            </div>
            <TextField v-for="field in inputsOrder" v-model="currentUserData[field]"
                       :label="$translations[language][field]" :key="field"
                       :error="errors[field]"/>
        </div>
    </PopupWrapper>
</template>

<script>
import PopupWrapper from "./PopupWrapper.vue";
import TextField from "../InputElems/TextField.vue";

export default {
    name: "PopupUserData",
    components: {
        TextField,
        PopupWrapper
    },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
        userData: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            currentUserData: {...this.userData},
            errors: {},
            inputsOrder: ['first_name', 'last_name', 'email', 'gender', 'earnings', 'experience'],
        }
    },
    methods: {
        handleConfirmButtonClicked() {
            this.validateForm();
            if (this.isEdit) {
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
                //
                // }
            } else {
                // fetch('http://localhost:3000/employees', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         "first_name": "Marya",
                //         "last_name": "Jatczak",
                //         "email": "mjatczak0@yolasite.com",
                //         "gender": "Genderfluid",
                //         "earnings": 21121.64,
                //         "experience": 2,
                //     }),
                // })
                //     .then(response => response.json())
                //     .then(data => {
                //         console.log('Dodano nowego pracownika:', data);
                //     })
                //     .catch(error => {
                //         console.error('Wystąpił błąd:', error);
                //     });
            }
        },
        validateForm() {
            Object.keys(this.currentUserData).forEach(item => {
                if (this.currentUserData[item] === '') {
                    this.errors[item] = 'nie moze byc puste';
                }
            })
        }
    },
    computed: {
        isConfirmButtonDisabledCp() {
            // return Object.values(this.currentUserData).includes('')
            return false; //@TODO
        }
    }
}
</script>

<style lang="scss" scoped>
.popup_user_data {
    .user_data_title {
        margin: 0 0 16px 0;

        h3 {
            color: v-bind('displayColorGetter("neutral900")');
            font-size: 24px;
            line-height: 32px;
        }
    }
}
</style>