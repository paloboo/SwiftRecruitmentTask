<template>
    <PopupWrapper>
        <div class="popup_user_data">
            <div class="user_data_title">
                <h3>{{capitalizeFirstLetter($translations[language][isEdit ? 'edit_employee' : 'add_employee'])}}</h3>
            </div>
            <TextField v-for="field in inputsOrder" v-model="currentUserData[field]" :label="$translations[language][field]" :key="field"/>
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
                return {

                }
            }
        }
    },
    data() {
        return {
            currentUserData: {...this.userData},
            inputsOrder: ['first_name', 'last_name', 'email', 'gender', 'earnings', 'experience'],
        }
    }
}
</script>

<style lang="scss" scoped>
    .popup_user_data {
        .user_data_title {
            margin: 16px 0;

            h3 {
                font-size: 24px;
                line-height: 32px;
            }
        }
    }
</style>