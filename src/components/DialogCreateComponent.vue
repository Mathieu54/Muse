<template>
  <section>
    <v-dialog style="z-index: 9999999" v-model="getIsDialogCreateOpen" :fullscreen="true" :scrollable="true" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar color="blue-grey-darken-4">
          <v-toolbar-title class="text-center">{{ getCurrentStepTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear color="blue-grey-darken-1" :model-value="stepCreationRecommendation" :height="8" max="4"></v-progress-linear>
        <v-window v-model="stepCreationRecommendation" class="bg-blue-grey-darken-2 h-100 overflow-y-auto" :touch="{left: null, right: null}">
          <v-window-item :value="1" class="h-100">
            <v-container class="h-100">
              <v-row class="h-100 d-flex justify-center align-center">
                <v-col cols="12" class="bg-blue-grey-darken-3">
                  <p>{{ $t("Sélectionner 3 genres de musique :") }}</p>
                  <v-text-field variant="solo" v-model="searchGenreInput" :label="$t('Rechercher un genre dans la liste')" :clearable="true" prepend-inner-icon="mdi-magnify"></v-text-field>
                  <div style="max-height: 350px; height: 100vh; overflow-y: scroll" v-if="filterGenres.length >= 1">
                    <div v-for="(genre, index) in filterGenres" :key="index" class="d-flex justify-center align-center">
                      <v-checkbox
                          class="text-right text-capitalize text-white"
                          v-model="selectedGenres"
                          :disabled="disableSelectedGenre(genre)"
                          :label="genre"
                          :value="genre"
                          hide-details
                      ></v-checkbox>
                    </div>
                  </div>
                  <div style="max-height: 350px; height: 100vh; overflow-y: scroll" class="d-flex flex-column justify-center align-content-center text-center" v-else>
                    <v-icon class="text-h3 mx-auto" icon="mdi-emoticon-cry"></v-icon>
                    <p>{{ $t("Aucun genre musical trouvé.") }}</p>
                  </div>
                  <div class="text-center">
                    <h2>{{ $t("Vos genres sélectionnés :") }}</h2>
                    <v-row class="d-flex justify-center align-center text-center">
                      <v-col cols="12" md="4" v-if="selectedGenres.length >= 1">
                        <v-chip class="text-capitalize pa-5 mr-2 mt-2" v-for="(genreSelected, index) in selectedGenres" :key="index">
                          {{ genreSelected }}
                        </v-chip>
                        <br>
                        <v-btn @click="clearAllSelectedGenres()" color="gray" variant="tonal" class="mt-3" icon="mdi-close"></v-btn>
                      </v-col>
                      <v-col cols="12" md="4" class="h-100" v-else>
                        <p class="pa-5">{{ $t("Vous n'avez sélectionné aucun genre.") }}</p>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
          <v-window-item :value="2" class="h-100">
            <v-container class="h-100">
              <v-row class="h-100 d-flex justify-center align-center">
                <v-col cols="12" class="bg-blue-grey-darken-3">
                  <p>{{ $t("Sélectionner 3 morceaux de musique :") }}</p>
                  <v-text-field variant="solo" v-model="searchMusicInput" :label="$t('Rechercher un morceau de musique dans la liste')" :clearable="true" prepend-inner-icon="mdi-magnify"></v-text-field>
                  <div style="max-height: 350px; height: 100vh; overflow-y: scroll" v-if="filterMusics.length >= 1">
                    <div v-for="(music, index) in filterMusics" :key="index" class="d-flex justify-center align-center">
                      <v-checkbox
                          class="text-right text-capitalize text-white"
                          v-model="selectedMusics"
                          :disabled="disableSelectedMusic(music.id)"
                          :label="music.title"
                          :value="music"
                          hide-details
                      ></v-checkbox>
                      <v-btn :icon="isMusicPlaying(index) ? 'mdi-stop' : 'mdi-play'"
                             @click="togglePlay(index, music.id)" color="white" variant="tonal" class="mr-3" size="small"></v-btn>
                    </div>
                  </div>
                  <div style="max-height: 350px; height: 100vh; overflow-y: scroll" class="d-flex flex-column justify-center align-content-center text-center" v-else>
                    <v-icon class="text-h3 mx-auto" icon="mdi-emoticon-cry"></v-icon>
                    <p>{{ $t("Aucune musique trouvée.") }}</p>
                  </div>
                  <div class="text-center">
                    <h2>{{ $t("Vos musiques sélectionnées :") }}</h2>
                    <v-row class="d-flex justify-center align-center text-center">
                      <v-col cols="12" md="4" v-if="selectedMusics.length >= 1">
                        <v-chip class="text-capitalize pa-5 mr-2 mt-2" v-for="(musicSelected, index) in selectedMusics" :key="index">
                          {{ musicSelected.title }}
                        </v-chip>
                        <br>
                        <v-btn @click="clearAllSelectedMusics()" color="gray" variant="tonal" class="mt-3" icon="mdi-close"></v-btn>
                      </v-col>
                      <v-col cols="12" md="4" class="h-100" v-else>
                        <p class="pa-5">{{ $t("Vous n'avez sélectionné aucune musique.") }}</p>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
          <v-window-item :value="3" class="h-100">
            <v-container class="h-100">
              <v-row class="h-100 d-flex justify-center align-center">
                <v-col cols="12" class="bg-blue-grey-darken-3">
                  <p>{{ $t("Sélectionner le nombre de recommandations que vous souhaitez recevoir de Muse :") }}</p>
                  <v-slider
                      v-model="selectedNumberRecommendation"
                      color="white"
                      track-color="blue-grey-darken-1"
                      :ticks="labelTicksNumberRecommendation"
                      :step="1"
                      min="1"
                      max="5"
                      show-ticks="always"
                      tick-size="0"
                  ></v-slider>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
          <v-window-item :value="4" class="h-100">
            <v-container class="h-100">
              <v-row class="h-100 d-flex justify-center align-center">
                <v-col cols="12" class="bg-blue-grey-darken-3 text-center">
                  <p class="text-h5 my-5">{{$t("Vous avez choisi ")}}{{ selectedNumberRecommendation }} {{ $t("recommendation(s) par Muse.")}}</p>
                  <v-btn @click="stepCreationRecommendation = 3" rounded="0" variant="tonal" class="bg-blue-grey-darken-2" prepend-icon="mdi-plus">{{ $t("Modifier les recommandations") }}</v-btn>
                  <p class="text-h5 my-5">{{ $t("Vous avez choisi ")}}{{ selectedMusics.length }}{{$t(" musiques :")}}</p>
                  <div class="mb-3">
                  <v-chip class="text-capitalize pa-5 mr-2 mt-2" v-for="(musicSelected, index) in selectedMusics" :key="index">
                    {{ musicSelected.title }}
                  </v-chip>
                  </div>
                  <v-btn @click="stepCreationRecommendation = 2" rounded="0" variant="tonal" class="bg-blue-grey-darken-2 my-3" prepend-icon="mdi-plus">{{ $t("Modifier les musiques") }}</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
        </v-window>

        <v-card-actions class="d-flex justify-center align-center w-100 bg-blue-grey-darken-4">
          <v-btn @click="cancelCreationRecommendation()" v-if="stepCreationRecommendation === 1" variant="tonal" color="white" class="bg-red-darken-3">
            {{ $t("Annuler") }}
          </v-btn>
          <v-btn v-if="stepCreationRecommendation >= 2" variant="tonal" :disabled="selectedGenres.length < 1" @click="previousStep()">
            {{ $t("Précédent") }}
          </v-btn>
          <v-btn v-if="stepCreationRecommendation === 1" color="green-lighten-2" variant="tonal" :disabled="selectedGenres.length < 1" @click="nextStep()">
            {{ $t("Suivant") }}
          </v-btn>
          <v-btn v-if="stepCreationRecommendation === 3" color="green-lighten-2" variant="tonal" @click="nextStep()">
            {{ $t("Suivant") }}
          </v-btn>
          <v-btn v-if="stepCreationRecommendation === 2" color="green-lighten-2" variant="tonal" :disabled="selectedMusics.length < 1" @click="nextStep()">
            {{ $t("Suivant") }}
          </v-btn>
          <v-btn @click="createRecommendation()" :loading="createRecommendationLoading" color="green-lighten-2" v-if="stepCreationRecommendation === 4" variant="tonal">
            {{ $t("Créer la recommandation") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import {defineComponent} from 'vue'
import dataTracks from "@/assets/data/tracks.json";
import dataTracksIA from "@/assets/data/tracksIA.json";
import {recommendationStore} from "@/store/recommendationStore";

export default defineComponent({
  name: 'DialogCreateComponent',
  created() {
    this.getGenreFromDataTracks();
  },
  computed: {
    getIsDialogCreateOpen() {
      return recommendationStore().getIsDialogCreateOpen;
    },
    getCurrentStepTitle () {
      switch (this.stepCreationRecommendation) {
        case 1: return this.$t("Étape ") + '1';
        case 2: return this.$t("Étape ") + '2';
        case 3: return this.$t("Étape ") + '3';
        case 4: return this.$t("Résumé");
        default: return this.$t("Erreur cette étape n'existe pas !");
      }
    },
    filterGenres() {
      if (typeof this.searchGenreInput === 'string') {
        return this.listGenres.filter((genre) =>
            genre.toLowerCase().includes(this.searchGenreInput.toLowerCase())
        );
      } else {
        return this.listGenres;
      }
    },
    filterMusics() {
      if (typeof this.searchMusicInput === 'string') {
        return this.listMusics.filter((music) =>
            music.title.toLowerCase().includes(this.searchMusicInput.toLowerCase())
        );
      } else {
        return this.listMusics;
      }
    },
  },
  data() {
    return {
      stepCreationRecommendation: 1,
      searchGenreInput: "",
      listGenres: [],
      selectedGenres: [],
      labelTicksNumberRecommendation: {1: '1', 2: '2', 3: '3', 4: '4', 5: '5'},
      selectedNumberRecommendation: 2,
      searchMusicInput: "",
      listMusics: [],
      selectedMusics: [],
      createRecommendationLoading: false,
      audioObject: new Audio(),
      isMusicPlayingList: []
    }
  },
  methods: {
    togglePlay(index, srcAudio) {
      if (this.isMusicPlayingList[index] === false || this.isMusicPlayingList[index] === undefined) {
        this.audioObject.src = "audio/" + srcAudio.replace(/^0+/, '') + ".low.mp3";
        this.audioObject.play();
        this.audioObject.addEventListener('ended', () => {
          if (index !== -1) {
            this.isMusicPlayingList[index] = false;
          }
        });
      } else {
        this.audioObject.pause();
      }
      this.isMusicPlayingList[index] = !this.isMusicPlayingList[index];
      for (let i = 0; i < this.isMusicPlayingList.length; i++) {
        if (i !== index) {
          this.isMusicPlayingList[i] = false;
        }
      }
    },
    isMusicPlaying(index) {
      return this.isMusicPlayingList[index] === true;
    },
    cancelCreationRecommendation() {
      this.selectedGenres = [];
      this.selectedNumberRecommendation = 2;
      this.selectedMusics = [];
      recommendationStore().isDialogCreateOpen = false;
    },
    clearAllSelectedGenres() {
      this.selectedGenres = [];
    },
    disableSelectedGenre(titleGenre) {
      if (this.selectedGenres.length >= 3) {
        return !this.selectedGenres.includes(titleGenre);
      }
      return false;
    },
    getGenreFromDataTracks() {
      const uniqueGenres = [];
      for (var item in dataTracks) {
        for (var item2 in dataTracks[item].genre) {
          if (!uniqueGenres.includes(dataTracks[item].genre[item2])) {
            uniqueGenres.push(dataTracks[item].genre[item2]);
          }
        }
      }
      this.listGenres = uniqueGenres;
    },
    previousStep() {
      switch (this.stepCreationRecommendation) {
        case 2: {
          this.audioObject.pause();
          this.audioObject.currentTime = 0;
          this.stepCreationRecommendation--;
          break;
        }
        case 3: {
          this.stepCreationRecommendation--;
          break;
        }
        case 4: {
          this.stepCreationRecommendation--;
          break;
        }
        default:
          return "Erreur cette étape n'existe pas !";
      }
    },
    nextStep() {
      switch (this.stepCreationRecommendation) {
        case 1: {
          this.listMusics = [];
          for (let item in dataTracks) {
            if (this.selectedGenres.length > 0) {
              let filteredData = this.selectedGenres.some(genre => dataTracks[item].genre.includes(genre))
                  ? { ...dataTracks[item], id: item }
                  : null;
              if (filteredData != null) {
                this.listMusics.push(filteredData);
              }
            }
          }
          this.stepCreationRecommendation++;
          break;
        }
        case 2: {
          this.audioObject.pause();
          this.audioObject.currentTime = 0;
          this.stepCreationRecommendation++;
          break;
        }
        case 3: {
          this.stepCreationRecommendation++;
          break;
        }
        default:
          return "Erreur cette étape n'existe pas !";
      }
    },
    disableSelectedMusic(musicId) {
      for (const music of this.selectedMusics) {
        if(music.id === musicId) {
          return false;
        }
      }
      if (this.selectedMusics.length >= 3) {
        return !this.selectedMusics.includes(musicId);
      }
      return false;
    },
    clearAllSelectedMusics() {
      this.selectedMusics = [];
    },
    async createRecommendation() {
      this.createRecommendationLoading = true;
      const ids = [];
      this.selectedMusics.forEach(music => {
        ids.push(music.id);
      });
      await recommendationStore().createRecommendation(this.selectedNumberRecommendation, ids).then(response => {
        let matchedTitles = [];
        const matchedTitles2 = [];
        response.data['song_ids_1'].forEach(id => {
          if (dataTracksIA[id]) {
            const matchedTitle = {
              "title": dataTracksIA[id].title,
              "genre": dataTracksIA[id].genre,
              "duration": dataTracksIA[id].duration,
              "year": dataTracksIA[id].year,
              "id": id
            };
            matchedTitles.push(matchedTitle);
          } else {
            console.log(id + ": ID MANQUANT")
          }
        });
        response.data['song_ids_2'].forEach(id => {
          if (dataTracksIA[id]) {
            const matchedTitle2 = {
              "title": dataTracksIA[id].title,
              "genre": dataTracksIA[id].genre,
              "duration": dataTracksIA[id].duration,
              "year": dataTracksIA[id].year,
              "id": id
            };
            matchedTitles2.push(matchedTitle2);
          } else {
            console.log(id + ": ID MANQUANT")
          }
        });
        recommendationStore().actualShowRecommendationGenerated = {
          idSave: null,
          genresSelect: this.selectedGenres,
          numberRecommendation: this.selectedNumberRecommendation,
          musicsSelect: this.selectedMusics,
          isRating: false,
          isSave: false,
          musicIASelect1: matchedTitles,
          musicIASelect2: matchedTitles2,
          createDate: new Date()
        }
          }

      );
      this.selectedGenres = [];
      this.selectedMusics = [];
      this.stepCreationRecommendation = 1;
      this.createRecommendationLoading = false;
      recommendationStore().isDialogCreateOpen = false;
    }
  }
})
</script>

<style scoped>
:deep(.v-slider-track__background), :deep(.v-slider-track__fill) {
  height: 15px !important;
}
</style>