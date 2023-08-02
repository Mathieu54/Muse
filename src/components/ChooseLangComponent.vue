<template>
  <v-menu class="pa-2">
    <template v-slot:activator="{ props }">
      <v-btn class="pa-0 position-absolute mr-md-4 mt-4 mr-2 mt-md-5" color="orange-lighten-5" size="large" style="top: 0; right: 0;" v-bind="props">
        <div v-if="$i18n.locale === 'en'" class="d-flex justify-center align-center"><country-flag class="ma-0" country='gb' size="medium"/><p class="mr-3 size-button-text">
          {{ $t("Anglais") }}</p></div>
        <div v-if="$i18n.locale === 'fr'" class="d-flex justify-center align-center"><country-flag class="ma-0" country='fr' size="medium"/><p class="mr-3 size-button-text">{{ $t("Français") }}</p></div>
      </v-btn>
    </template>
    <v-list class="pa-0 my-2">
      <v-list-item class="pa-0 select-lang">
        <v-list-item-title class="pa-0 d-flex justify-center align-center justify-md-start" @click="selectLang('fr')"><country-flag class="ma-0" country='fr' size='medium'/><p class="size-button-text">{{ $t("Français") }}</p></v-list-item-title>
      </v-list-item>
      <v-list-item class="pa-0 select-lang">
        <v-list-item-title class="pa-0 d-flex justify-center align-center justify-md-start" @click="selectLang('en')"><country-flag class="ma-0" country='gb' size='medium'/><p class="size-button-text">{{ $t("Anglais") }}</p></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChooseLangComponent',
  methods: {
    selectLang(lang) {
      this.$i18n.locale = lang;
    }
  }
})
</script>
<style scoped>
.select-lang {
  cursor: pointer;
}
.select-lang:hover {
  background: #FFE0B2;
}
@media screen and (max-width: 960px) {
  .size-button-text {
    display: none;
  }
}
</style>