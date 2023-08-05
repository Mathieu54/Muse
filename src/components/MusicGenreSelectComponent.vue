<template>
  <section>
    <v-row class="text-center">
      <v-col cols="12">
        <h2 class="text-center my-8 second-title">{{ $t("Sélectionner") }} {{ maxMusicGenreSelect }} {{ $t("de vos genres musicaux préférés") }}</h2>
        <div style="height: 50px; cursor: pointer" class="d-flex align-center bg-orange-lighten-5" @click="dialog=true">
          <v-tooltip
              v-if="getGenreSelected.length > 0"
              activator="parent"
              location="top"
          >Cliquez pour modifier vos genres musicaux</v-tooltip>
          <v-icon icon="mdi-magnify" class="mx-3"></v-icon>
          <div v-if="getGenreSelected.length <= 0">
            {{ $t("Cliquez pour choisir vos genres") }}
          </div>
          <div v-else class="d-flex flex-column flex-md-row">
            <p>Vos genres sélectionnés :</p>
            <p v-for="(genreList, index) in getGenreSelected" :key="index" class="mx-2">
              <span v-if="index === 0">
                {{ genreList }}
              </span>
              <span v-else>
                {{ genreList }}
              </span>
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog
        v-model="dialog"
        scrollable
        fullscreen
    >
      <v-card color="orange-lighten-5">
        <v-card-title class="text-center">{{ $t("Sélectionner 3 genres musicaux") }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;" class="text-center">
          <v-text-field v-model="searchQuery" label="Rechercher un genre" outlined style="top: 0"></v-text-field>
          <div v-for="(titleGenre, index) in filteredGenres" :key="index" class="d-flex justify-center">
            <v-checkbox
                class="text-right"
                v-model="selected"
                :disabled="shouldDisableCheckbox(titleGenre)"
                :label="titleGenre"
                :value="titleGenre"
                hide-details
            ></v-checkbox>
          </div>
        </v-card-text>
        <div class="d-flex flex-column align-center justify-center bg-orange-lighten-4">
            <p class="my-5">{{ $t("Vous avez sélectionné") }} {{ numberGenreSelect }} {{ $t("genre(s)")}}</p>
          <div class="flex-row mb-5 text-center">
            <v-chip closable class="mr-2" v-for="test in selected" :key="test" @click="removeSpecificGenre(test)">{{test}}</v-chip>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="d-flex flex-column bg-orange-lighten-4">
          <v-btn
              style="background: white;"
              class="w-25 ma-auto my-2"
              variant="text"
              size="x-large"
              :loading="validateLoading"
              :disabled="numberGenreSelect > 3 || numberGenreSelect === 0"
              @click="validateSelectedGenre()"
          >
            {{ $t("Valider") }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import tracksJson from "@/assets/data/tracks.json";
import {generalStore} from "@/store/generalStore";

export default defineComponent({
  name: 'MusicGenreSelectComponent',
  data() {
    return {
      selected: [],
      dialog: false,
      maxMusicGenreSelect: 3,
      musicGenreData: [],
      searchQuery: '',
      validateLoading: false
    }
  },
  computed: {
    getGenreSelected() {
      return generalStore().getMusicGenreStore;
    },
    filteredGenres() {
      return this.musicGenreData.filter((genre) =>
          genre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    numberGenreSelect() {
      return this.selected.length;
    }
  },
  created() {
    this.getJsonGenre();
  },
  methods: {
    validateSelectedGenre() {
      this.validateLoading = true;
      setTimeout(() => {
      const genreArray = Object.values(this.selected);
      let listMusic = [];
      for (let item in tracksJson) {
        if (genreArray.length > 0) {
          let filteredData = genreArray.some(genre => tracksJson[item].genre.includes(genre))
              ? { ...tracksJson[item], id: item }
              : null;
          if (filteredData != null) {
            listMusic.push(filteredData);
          }
        }
      }
      this.dialog = false;
      generalStore().musicGenreStore = genreArray;
      generalStore().musicListStore = listMusic;
      generalStore().showMusicChoose = true;
      this.validateLoading = false;
      }, 1500);
    },
    removeSpecificGenre(title) {
      const indexToRemove = this.selected.indexOf(title);
      if (indexToRemove !== -1) {
        this.selected.splice(indexToRemove, 1);
      }
    },
    shouldDisableCheckbox(titleGenre) {
      if (this.selected.length >= 3) {
        return !this.selected.includes(titleGenre);
      }
      return false;
    },
    async getJsonGenre() {
      const uniqueGenres = [];
      for (var item in tracksJson) {
        for (var item2 in tracksJson[item].genre) {
          if (!uniqueGenres.includes(tracksJson[item].genre[item2])) {
            uniqueGenres.push(tracksJson[item].genre[item2]);
          }
        }
      }
      this.musicGenreData = uniqueGenres;
    },
  },
})
</script>
<style scoped>
:deep(.v-label) {
  display: flex;
  justify-content: center;
}
</style>