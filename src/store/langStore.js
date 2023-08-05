import { defineStore } from 'pinia'
export const langStore = defineStore('langStore', {
    state: () => {
        return {
            langSelected: 'en',
        }
    },
    getters: {
        getLangSelected: (state) => {
            return state.langSelected;
        },
    },
    persist: {
        storage: localStorage,
        paths: ['langSelected'],
    },
})