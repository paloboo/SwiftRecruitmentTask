import {mapWritableState} from 'pinia'
import mainStore from "../store/mainStore";

export default {
    computed: {
        ...mapWritableState(mainStore, ['displayMode', 'colors', 'displayColorGetter', 'isSnackbarVisible', 'language', 'requestLock', 'snackbarMessage', 'snackbarType']),
    },
    methods: {
        capitalizeFirstLetter(str) {
            if (typeof str !== "string" || str.length === 0) {
                return str;
            }
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        showSnackbar(message, duration=3000, type = 'success') {
            this.isSnackbarVisible = true;
            this.snackbarType = type;
            this.snackbarMessage = message;

            setTimeout(() => {
                this.isSnackbarVisible = false;
            }, duration)
        }
    }
}