import { mapWritableState } from 'pinia'
import mainStore from "../store/mainStore";

export default {
    computed: {
        ...mapWritableState(mainStore, ['displayMode', 'colors', 'displayColorGetter', 'language']),
    },
}

