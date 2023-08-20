<template>
    <PopupWrapper
        :cancelButtonDesc="$translations[language]['cancel']"
        :confirmButtonDesc="$translations[language][isEdit ? 'save' : 'add']"
        :isConfirmButtonDisabled="isConfirmButtonDisabledCp"
        @confirm="handleConfirmButtonClicked"
    >
        <div class="popup_user_data">
            <div class="user_data_title">
                <h3>{{ capitalizeFirstLetter($translations[language][isEdit ? 'edit_employee' : 'add_employee']) }}</h3>
            </div>
            <template v-for="field in inputsOrder" :key="field">
                <RadioboxList v-if="field==='gender'"
                              :title="$translations[language][field]"
                              :options="['female', 'male']"
                              v-model="currentUserData[field]"
                />
                <TextField v-else
                           :error="errors[field]"
                           :label="$translations[language][field]"
                           v-model="currentUserData[field]"
                />
            </template>
        </div>
    </PopupWrapper>
</template>

<script>
import PopupWrapper from "./PopupWrapper.vue";
import RadioboxList from "../InputElems/RadioboxList.vue";
import TextField from "../InputElems/TextField.vue";

export default {
    name: "PopupUserData",
    components: {
        PopupWrapper,
        RadioboxList,
        TextField,
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
            this.errors = {};
            if (!this.validateForm()) {
                this.requestLock = true;
                if (this.isEdit) {
                    fetch(`${this.baseURL()}/${this.currentUserData.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "first_name": this.currentUserData.first_name,
                            "last_name": this.currentUserData.last_name,
                            "email": this.currentUserData.email,
                            "gender": this.currentUserData.gender,
                            "earnings": Number(this.currentUserData.earnings),
                            "experience": Number(this.currentUserData.experience),
                        }),
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(response.status);
                            }
                            return response.json()
                        })
                        .then(data => {
                            this.$emit('updated', data);
                        })
                        .catch(error => {
                            this.$emit('close');
                            this.showSnackbar(this.$translations[this.language]['something_went_wrong'] + '. '+ error, 10000, 'error')
                        })
                        .finally(() => {
                            this.requestLock = false;
                        });
                } else {
                    fetch(this.baseURL(), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "first_name": this.currentUserData.first_name,
                            "last_name": this.currentUserData.last_name,
                            "email": this.currentUserData.email,
                            "gender": this.currentUserData.gender,
                            "earnings": Number(this.currentUserData.earnings),
                            "experience": Number(this.currentUserData.experience),
                        }),
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(response.status);
                            }
                            return response.json()
                        })
                        .then(data => {
                            this.$emit('added', data);
                        })
                        .catch(error => {
                            this.$emit('close');
                            this.showSnackbar(this.$translations[this.language]['something_went_wrong'] + '. '+ error, 10000, 'error')
                        }).finally(() => {
                        this.requestLock = false;
                    });
                }
            }
        },
        validateForm() {
            Object.keys(this.currentUserData).forEach(item => {
                if (this.currentUserData[item] === '') {
                    this.errors[item] = this.$translations[this.language]['field_must_not_be_empty'];
                } else if (this.currentUserData[item].toString().length>100) {
                    this.errors[item] = this.$translations[this.language]['maximum_number_of_characters_is_100'];
                } else {
                    if (item === 'email') {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(this.currentUserData[item])) {
                            this.errors[item] = this.$translations[this.language]['incorrect_mail_format'];
                        }
                    }

                    if (item === 'earnings') {
                        const numberPattern = /^\d+(\.\d{1,2})?$/;
                        this.currentUserData[item] = this.currentUserData[item].toString().replaceAll(',', '.');
                        if (!numberPattern.test(this.currentUserData[item])) {
                            this.errors[item] = this.$translations[this.language]['incorrect_price_format'];
                        }
                    }

                    if (item === 'experience') {
                        const positiveIntegerPattern = /^(?:0|[1-9]\d*)$/;

                        if (!positiveIntegerPattern.test(this.currentUserData[item])) {
                            this.errors[item] = this.$translations[this.language]['the_value_should_be_an_integer_greater_than_zero'];
                        }
                    }
                }
            })
            return Object.values(this.errors).length > 0
        }
    },
    computed: {
        isConfirmButtonDisabledCp() {
            return Object.values(this.currentUserData).includes('')
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

    .text_field {
        margin-bottom: 8px;
    }

    .radiobox_list {
        margin-bottom: 32px;
    }
}
</style>