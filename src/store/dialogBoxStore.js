import { defineStore } from 'pinia'
export const dialogBoxStore = defineStore('dialogBoxStore', {
    state: () => {
        return {
            showDialogBox: true,
        }
    },
    getters: {
        getShowDialogBox: (state) => {
            return state.showDialogBox;
        },
    },
    actions: {
        async checkIfDialogBoxShowFirst() {

        }
    },
    persist: {
        storage: localStorage,
        paths: ['showDialogBox'],
    },
})