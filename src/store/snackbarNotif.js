import { defineStore } from 'pinia'
export const snackbarNotifStore = defineStore('snackbarNotif', {
    state: () => {
        return {
            snackbarNotifData: {
                show: false,
                message: '',
                color: 'success',
                timeout: 5000
            }
        }
    },
    actions: {
        showNotification(message, show, color, timeout) {
            this.snackbarNotifData = {
                show,
                message,
                color,
                timeout
            };
        }
    }
})