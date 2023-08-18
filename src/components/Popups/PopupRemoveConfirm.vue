<template>
    <PopupWrapper @close="$emit('close')" @confirm="$emit('confirm')">
        <div class="popup_remove_confirm">
            <div class="remove_confirm_title">
                <p>{{ capitalizeFirstLetter($translations[language]['remove_confirmation']) }}?</p>
            </div>
            <div class="remove_confirm_person">
                <p>{{$translations[language]['id']}}: <span>{{chosenEmployee.id}}</span></p>
                <p>{{$translations[language]['first_name']+' '+ $translations[language]['last_name'] + ': '}} <span>{{ chosenEmployee.first_name + ' ' + chosenEmployee.last_name}}</span></p>
            </div>
        </div>
    </PopupWrapper>
</template>

<script>
import PopupWrapper from "./PopupWrapper.vue";
export default {
    name: "PopupRemoveConfirm",
    components: {PopupWrapper},
    props: {
        chosenEmployee: {
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
    .popup_remove_confirm {
        .remove_confirm_title {
            p {
                font-size: 16px;
                font-weight: 500;
                line-height: 24px;
                text-align: center;
            }
        }
        .remove_confirm_person {
            border: 1px solid v-bind('displayColorGetter("gray400")');
            border-radius: 4px;
            margin: 12px auto;
            padding: 8px 12px;
            width: max-content;

            p, span {
                font-size: 14px;
                font-weight: 500;
                line-height: 18px;
                text-transform: capitalize;

                span {
                    font-weight: 400;
                }
            }

            p {
                &:last-of-type {
                    margin-top: 8px;

                    span {
                        display: block;
                    }
                }
            }
        }
    }
</style>