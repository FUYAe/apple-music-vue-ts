import { defineStore, createPinia } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { usePersistStore } from "./persist"
import { useConfigStore } from "./config";
import { useMusicStore } from "./music";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const useStore = defineStore("main", {
    state: () => {
        return {

            db: {} as any,
            isShowMiniPlayer: false,
            isShowControlPanel: false,

            audioRef: {} as HTMLAudioElement | null,
            currentZIndex: 1000,
        }

    }
    ,
    getters: {
        formatIndex() {
            return 0
        }
    },
    actions: {


    }
})
export {
    pinia, useStore, usePersistStore, useConfigStore,
    useMusicStore
}