<template>
  <v-app>
    <v-app-bar color="blue-grey-darken-4" class="w-100" prominent elevation="0">
      <v-toolbar-title>Muse</v-toolbar-title>
      <v-spacer></v-spacer>
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
    <v-main style="height: 100vh" class="h-100 d-flex justify-center align-start bg-blue-grey-darken-2">
      <v-container>
        <v-row no-gutters="false">
          <v-col cols="12">
            <h2 class="text-center my-4">{{ $t("Combien souhaitez vous de recommandations ?") }}</h2>
            <v-slider
                v-model="userRecommandationNumberChoice"
                color="blue-grey-darken-3"
                track-color="white"
                :ticks="tickLabels"
                :step="1"
                min="1"
                max="5"
                show-ticks="always"
                tick-size="0"
            ></v-slider>
          </v-col>
        </v-row>
        <v-row class="text-center justify-center">
          <v-col cols="12">
            <h2 class="text-center my-8">{{ $t("Sélectionner 3 musics préférès dans la liste ci-dessous :") }}</h2>
          </v-col>
        </v-row>
        <LoadTracksComponent />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {defineComponent} from 'vue';
import {langStore} from "@/store/langStore";
import LoadTracksComponent from "@/components/LoadTracksComponent";

export default defineComponent({
  name: 'HomeView',
  components: {LoadTracksComponent},
  data() {
    return {
      userRecommandationNumberChoice: 2,
      tickLabels: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5'
      },
    }
  },
  created() {
    this.$i18n.locale = langStore().getLangSelected;
  },
  methods: {
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
:deep(.v-slider-track__background), :deep(.v-slider-track__fill) {
  height: 15px !important;
}
</style>
