<template>
    <PopupWrapper :confirmButtonDesc="$translations[language]['refresh']"
                  :cancelButtonDesc="$translations[language]['cancel']">
        <div class="popup_data_loading_failed">
            <div class="loading_failed_title">
                <p>{{ capitalizeFirstLetter($translations[language]['something_went_wrong']) }}</p>
            </div>
            <div class="loading_failed_description">
                <p>{{ capitalizeFirstLetter($translations[language]['press_button_to_reload']) }}</p>
            </div>
        </div>
    </PopupWrapper>
</template>

<script>
import PopupWrapper from "./PopupWrapper.vue";
export default {
    name: "PopupDataLoadingFailed",
    components: {PopupWrapper}
}
</script>

<style lang="scss" scoped>
.popup_data_loading_failed {
    .loading_failed_title{
        p {
            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
        }
    }

    .loading_failed_description {
        margin-top: 16px;
    }
}
</style>