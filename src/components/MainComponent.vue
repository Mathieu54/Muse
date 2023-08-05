<template>
  <section class="h-100">
    <v-main style="height: 100vh" class="h-100 d-flex justify-center align-center bg-blue-grey-darken-2">
      <v-container>
        <v-row no-gutters class="text-center" v-if="getActualShowRecommendationGenerated.length <= 0">
          <v-col cols="12">
            <v-icon icon="mdi-emoticon-sad" class="mb-2" size="x-large" style="font-size: 50px"></v-icon>
            <p class="text-h6">{{ $t("Vous n'avez créé aucune recommandation !") }}</p>
            <p  class="text-h6">{{ $t("Commencer en cliquant sur le bouton !") }}</p>
            <v-btn @click="createNewRecommendation()" size="x-large" variant="tonal" class="mt-2" prepend-icon="mdi-plus">
              {{ $t("Nouvelle recommandation") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="text-center justify-center" v-else>
          <v-col cols="12">
            <h2>Muse 1 vous recommandes ces 3 musiques :</h2>
          </v-col>
          <v-col class="bg-blue-grey-darken-3" v-for="(musicSelectedIA1, index) in getActualShowRecommendationGenerated.musicIASelect1" :key="index" cols="12" :md="getColumnWidth(getActualShowRecommendationGenerated.numberRecommendation)">
            <p>{{musicSelectedIA1.title}}</p>
            <p>{{musicSelectedIA1.duration}}</p>
            <p>{{musicSelectedIA1.year}}</p>
          </v-col>
          <v-col cols="12" v-if="getActualShowRecommendationGenerated.isRating === false">
            <p>Noter la recommendations de Muse 1 :</p>
            <v-rating density="compact" v-model="ratingIA1" length="10" color="amber-lighten-1"
                      :item-labels="['1', '', '', '', '', '', '', '', '', '10']" item-label-position="bottom">
              <template v-slot:item-label="props">
                <span class="text-amber-lighten-1">{{ props.label }}</span>
              </template>
            </v-rating>
          </v-col>
          <v-col cols="12">
            <h2>Muse 2 vous recommandes ces 3 musiques :</h2>
          </v-col>
          <v-col class="bg-blue-grey-darken-3" v-for="(musicSelectedIA2, index) in getActualShowRecommendationGenerated.musicIASelect2" :key="index" cols="12" :md="getColumnWidth(getActualShowRecommendationGenerated.numberRecommendation)">
            <p>{{musicSelectedIA2.title}}</p>
            <p>{{musicSelectedIA2.duration}}</p>
            <p>{{musicSelectedIA2.year}}</p>
            <v-btn :icon="isMusicPlaying(index) ? 'mdi-stop' : 'mdi-play'" @click="togglePlay(index, music.id)" color="white" variant="tonal" class="mr-3" size="small"></v-btn>
          </v-col>
          <v-col cols="12" v-if="getActualShowRecommendationGenerated.isRating === false">
            <p>Noter la recommendations de Muse 2 :</p>
            <v-rating density="compact" v-model="ratingIA2" length="10" color="amber-lighten-1"
                      :item-labels="['1', '', '', '', '', '', '', '', '', '10']" item-label-position="bottom">
              <template v-slot:item-label="props">
                <span class="text-amber-lighten-1">{{ props.label }}</span>
              </template>
            </v-rating>
          </v-col>
          <v-col cols="12" md="12" v-if="getActualShowRecommendationGenerated.isRating === false">
            <v-btn variant="tonal" size="large" @click="sendRatings()">Envoyer vos avis</v-btn>
          </v-col>
          <v-col cols="12" md="12">
            <v-btn v-if="getActualShowRecommendationGenerated.isSave === false" class="mr-2" variant="tonal" size="large" @click="saveRecommandation()">Enregistrer Recommandation</v-btn>
            <v-btn variant="tonal" size="large" @click="createNewRecommendation()">{{ $t("Nouvelle recommandation") }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </section>
</template>

<script>
import {defineComponent} from 'vue'
import {recommendationStore} from "@/store/recommendationStore";
import CryptoJS from 'crypto-js';

export default defineComponent({
  name: 'MainComponent',
  data() {
    return {
      ratingIA1: null,
      ratingIA2: null,
      isMusicPlayingList: [],
      audioObject: new Audio()
    }
  },
  computed: {
    getActualShowRecommendationGenerated() {
      return recommendationStore().getActualShowRecommendationGenerated;
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
    getColumnWidth(numCols) {
      switch (numCols) {
        case 1:
          return 12;
        case 2:
          return 6;
        case 3:
          return 4;
        case 4:
          return 6;
        case 5:
          return 4;
        default:
          return 12;
      }
    },
    createNewRecommendation() {
      recommendationStore().isDialogCreateOpen = true;
    },
    async sendRatings() {
      await recommendationStore().createRatings(recommendationStore().getActualShowRecommendationGenerated.number, "").then(response => {
        console.log(response);
      });
      let getDate = recommendationStore().getActualShowRecommendationGenerated;
      const year = getDate.createDate.getFullYear();
      const month = String(getDate.createDate.getMonth() + 1).padStart(2, '0');
      const day = String(getDate.createDate.getDate()).padStart(2, '0');
      const hours = String(getDate.createDate.getHours()).padStart(2, '0');
      const minutes = String(getDate.createDate.getMinutes()).padStart(2, '0');
      const seconds = String(getDate.createDate.getSeconds()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      let idSaveCheck = CryptoJS.MD5(formattedDate).toString();
      if(recommendationStore().saveDataRecommendations.some(item => item.idSave === idSaveCheck)) {
        console.log("trouvé !");
        recommendationStore().saveDataRecommendations.find(item => item.idSave === idSaveCheck).isRating = true;
      } else {
        console.log("pas trouvé !");
        recommendationStore().actualShowRecommendationGenerated.isRating = true;
      }
    },
    saveRecommandation() {
      let getDate = recommendationStore().getActualShowRecommendationGenerated;
      const year = getDate.createDate.getFullYear();
      const month = String(getDate.createDate.getMonth() + 1).padStart(2, '0');
      const day = String(getDate.createDate.getDate()).padStart(2, '0');
      const hours = String(getDate.createDate.getHours()).padStart(2, '0');
      const minutes = String(getDate.createDate.getMinutes()).padStart(2, '0');
      const seconds = String(getDate.createDate.getSeconds()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      let idSave = CryptoJS.MD5(formattedDate).toString();
      recommendationStore().actualShowRecommendationGenerated.idSave = idSave;
      recommendationStore().actualShowRecommendationGenerated.isSave = true;
      recommendationStore().saveDataRecommendations.push(recommendationStore().getActualShowRecommendationGenerated);
    }
  }
})
</script>