import {mapWritableState} from 'pinia'
import mainStore from "../store/mainStore";

export default {
    computed: {
        ...mapWritableState(mainStore, ['displayMode', 'colors', 'displayColorGetter', 'language', 'requestLock']),
    },
    methods: {
        capitalizeFirstLetter(str) {
            if (typeof str !== "string" || str.length === 0) {
                return str;
            }
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

    }
}

