<template>
  <v-snackbar
      v-model="getSnackbarNotif.show"
      :color="getSnackbarNotif?.color"
      :timeout="getSnackbarNotif?.timeout"
      style="color: white; font-family: Arial !important;"
  >
    {{ getSnackbarNotif?.message }}
    <template v-slot:actions>
      <v-btn
          density="compact" icon="mdi-close"
          color="white"
          @click="getSnackbarNotif.show = false"
      >
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {snackbarNotifStore} from "@/store/snackbarNotif";

export default {
  name: 'SnackbarInfosComponent',
  computed: {
    getSnackbarNotif() {
      return snackbarNotifStore().snackbarNotifData;
    }
  }
}
</script>