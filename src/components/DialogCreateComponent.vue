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
                  <p>Séléctionner 3 genres de musiques :</p>
                  <v-text-field variant="solo" v-model="searchGenreInput" label="Rechercher un genre dans la liste" :clearable="true" prepend-inner-icon="mdi-magnify"></v-text-field>
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
                    <p>Aucun genre musical trouvé</p>
                  </div>
                  <div class="text-center">
                    <h2>Vos genres selectionnées</h2>
                    <v-row class="d-flex justify-center align-center text-center">
                      <v-col cols="12" md="4" v-if="selectedGenres.length >= 1">
                        <v-chip class="text-capitalize pa-5 mr-2 mt-2" v-for="(genreSelected, index) in selectedGenres" :key="index">
                          {{ genreSelected }}
                        </v-chip>
                        <br>
                        <v-btn @click="clearAllSelectedGenres()" color="white" variant="tonal" class="bg-red-darken-3 mt-3">{{ $t("Réinitialiser") }}</v-btn>
                      </v-col>
                      <v-col cols="12" md="4" class="h-100" v-else>
                        <p class="pa-5">Vous n'avez sélectionné aucun genre :(</p>
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
                  <p>Séléctionner le nombre de recommendations que vous souhaitez recevoir de la part de l'ia :</p>
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
          <v-window-item :value="3" class="h-100">
            <v-container class="h-100">
              <v-row class="h-100 d-flex justify-center align-center">
                <v-col cols="12" class="bg-blue-grey-darken-3">
                  <p>Séléctionner 3 musiques :</p>
                  <v-text-field variant="solo" v-model="searchMusicInput" label="Rechercher une musique dans la liste" :clearable="true" prepend-inner-icon="mdi-magnify"></v-text-field>
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
                    <p>Aucune musique trouvé</p>
                  </div>
                  <div class="text-center">
                    <h2>Vos musiques selectionnées</h2>
                    <v-row class="d-flex justify-center align-center text-center">
                      <v-col cols="12" md="4" v-if="selectedGenres.length >= 1">
                        <v-chip class="text-capitalize pa-5 mr-2 mt-2" v-for="(musicSelected, index) in selectedMusics" :key="index">
                          {{ musicSelected.title }}
                        </v-chip>
                        <br>
                        <v-btn @click="clearAllSelectedMusics()" color="white" variant="tonal" class="bg-red-darken-3 mt-3">{{ $t("Réinitialiser") }}</v-btn>
                      </v-col>
                      <v-col cols="12" md="4" class="h-100" v-else>
                        <p class="pa-5">Vous n'avez sélectionné aucune musique :(</p>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
          <v-window-item :value="4" class="h-100">
            <v-container class="h-100">
              <v-row class="h-100 d-flex justify-center align-center">
                <v-col cols="12" class="bg-blue-grey-darken-3">
                  <p>Vous avez choisi {{ selectedGenres.length }} genres :</p>
                  <v-chip class="text-capitalize pa-5 mr-2 mt-2" v-for="(genreSelected, index) in selectedGenres" :key="index">
                    {{ genreSelected }}
                  </v-chip>
                  <v-btn>Modifier les genres</v-btn>
                </v-col>
                <v-col cols="12" class="bg-blue-grey-darken-3">
                  <p>Vous avez choisi {{ selectedNumberRecommendation }} recommendations par l'ia.</p>
                  <v-btn>Modifier le nombre de recommendations </v-btn>
                </v-col>
                <v-col cols="12" class="bg-blue-grey-darken-3">
                  <p>Vous avez choisi {{ selectedMusics.length }} musiques :</p>
                  <v-chip class="text-capitalize pa-5 mr-2 mt-2" v-for="(musicSelected, index) in selectedMusics" :key="index">
                    {{ musicSelected.title }}
                  </v-chip>
                  <v-btn>Modifier les musiques </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
        </v-window>

        <v-card-actions class="d-flex justify-center align-center w-100 bg-blue-grey-darken-4">
          <v-btn @click="cancelCreationRecommendation()" v-if="stepCreationRecommendation === 1" variant="tonal" color="white" class="bg-red-darken-3">
            Annuler
          </v-btn>
          <v-btn v-if="stepCreationRecommendation >= 2" variant="tonal" :disabled="selectedGenres.length < 1" @click="previousStep()">
            Précédent
          </v-btn>
          <v-btn v-if="stepCreationRecommendation === 1" variant="tonal" :disabled="selectedGenres.length < 1" @click="nextStep()">
            Suivant
          </v-btn>
          <v-btn v-if="stepCreationRecommendation === 2" variant="tonal" @click="nextStep()">
            Suivant
          </v-btn>
          <v-btn v-if="stepCreationRecommendation === 3" variant="tonal" :disabled="selectedMusics.length < 1" @click="nextStep()">
            Suivant
          </v-btn>
          <v-btn @click="createRecommendation()" :loading="createRecommendationLoading" color="green-lighten-2" v-if="stepCreationRecommendation === 4" variant="tonal">
            Créer la recommandation
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
        case 1: return "Étape 1"
        case 2: return "Étape 2"
        case 3: return "Étape 3"
        case 4: return "Résumé"
        default: return "Erreur cette étape n'existe pas !"
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
          this.stepCreationRecommendation--;
          break;
        }
        case 3: {
          this.audioObject.pause();
          this.audioObject.currentTime = 0;
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
          this.stepCreationRecommendation++;
          break;
        }
        case 2: {
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
        case 3: {
          this.audioObject.pause();
          this.audioObject.currentTime = 0;
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
      console.log(Object.keys(dataTracks).length);
      console.log(Object.keys(dataTracksIA).length);
      await recommendationStore().createRecommendation(this.selectedNumberRecommendation, ids).then(response => {
        const matchedTitles = [];
        const matchedTitles2 = [];
        console.log("Liste des musiques choisi :");
        console.log(ids);
        response.data['song_ids_1'].forEach(id => {
          console.log(dataTracksIA[id]);
          if (dataTracksIA[id]) {
            matchedTitles.push(dataTracksIA[id]);
            console.log("ID: " + id);
          } else {
            console.log(id + ": ID MANQUANT")
          }
        });
        console.log("=======================");
        response.data['song_ids_2'].forEach(id => {
          console.log(dataTracksIA[id]);
          if (dataTracksIA[id]) {
            matchedTitles2.push(dataTracksIA[id]);
            console.log("ID: " + id);
          } else {
            console.log(id + ": ID MANQUANT")
          }
        });
        console.log(matchedTitles);
        console.log(matchedTitles2);
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