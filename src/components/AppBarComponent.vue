<template>
  <section>
    <v-app-bar color="blue-grey-darken-4" class="w-100" prominent elevation="0">
      <!--<v-app-bar-nav-icon variant="text" @click="openNavigationDrawer()"></v-app-bar-nav-icon>-->
      <v-toolbar-title>Muse</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-2" variant="tonal" size="small" icon="mdi-information" @click="showInfos()"></v-btn>
      <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-btn variant="tonal" size="small" v-bind="props" icon="mdi-google-translate"></v-btn>
        </template>
        <v-list class="pa-0 bg-blue-grey-darken-3 mt-6">
          <v-list-item class="list-hover">
            <v-list-item-title class="d-flex justify-start align-center" @click="langSelected('fr')">
              <country-flag class="ma-0" country='fr' size="medium"/>
              {{ $t('Français') }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="list-hover">
            <v-list-item-title class="d-flex justify-start align-center" @click="langSelected('en')">
              <country-flag class="ma-0" country='gb' size="medium" />
              {{ $t('Anglais') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </section>
</template>

<script>
import {defineComponent} from 'vue'
import {langStore} from "@/store/langStore";
import {recommendationStore} from "@/store/recommendationStore";
import {dialogBoxStore} from "@/store/dialogBoxStore";

export default defineComponent({
  name: 'AppBarComponent',
  created() {
    this.$i18n.locale = langStore().getLangSelected;
  },
  methods: {
    showInfos() {
      dialogBoxStore().showDialogBox = true;
    },
    openNavigationDrawer() {
      recommendationStore().isNavigationDrawerOpen = !recommendationStore().getIsNavigationDrawerOpen;
    },
    langSelected(lang) {
      langStore().langSelected = lang;
      this.$i18n.locale = lang;
    }
  }
})
</script>

<style scoped>
.list-hover {
  cursor: pointer;
}
</style>