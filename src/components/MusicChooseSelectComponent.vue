<template>
  <section v-if="getShowMusicChoose">
    <v-row>
      <v-col cols="12">
        <h2 class="text-center my-8">{{ $t("Choisir") }} {{ maxMusicChoose }} {{ $t("titres de musiques") }}</h2>
      </v-col>
    </v-row>
    <v-row no-gutters="false" class="text-left bg-orange-lighten-4" style="min-height: 63px">
      <v-col cols="11" class="border-b position-relative">
        <v-chip class="ma-3" variant="elevated" v-for="(music, index) in listMusicChoiceUser" :key="index">
          {{ music.title }} {{ index }}
        </v-chip>
      </v-col>
      <v-col cols="1" class="d-flex justify-end align-center">
          <v-btn class="mr-4" size="small" @click="clearMusicSelected()" :loading="loadingGetRecommendations" icon="mdi-close"></v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters="false" class="text-center bg-orange-lighten-5" style="max-height: 400px; overflow-y: scroll">
      <v-col class="my-3 d-flex justify-space-between align-center" cols="12" v-for="(music, index) in getMusicList"
             :key="index">
        <p class="ml-5" style="font-size: 13px">{{ music.title }}</p>
        <div class="d-flex">
          <p class="d-flex justify-center align-center mr-1" style="font-size: 10px">{{ music.duration }} seconds</p>
          <v-btn size="small" class="mr-1" :icon="isMusicPlaying(index) ? 'mdi-stop' : 'mdi-play'"
                 @click="togglePlay(index,'audio/' + music.id + '.low.mp3')"></v-btn>
          <v-btn size="small" class="mr-5" :icon="isMusicSelected(index) ? 'mdi-close-thick' : 'mdi-plus-thick'"
                 @click="selectMusic(index, music)"></v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters="false" class="text-left bg-orange-lighten-4" style="min-height: 63px">
      <v-col cols="12" class="d-flex justify-center">
        <v-btn class="mt-3" @click="getRecommendations()" :loading="loadingGetRecommendations">Commencer</v-btn>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import {generalStore} from "@/store/generalStore";
import {snackbarNotifStore} from "@/store/snackbarNotif";
import axios from "axios";

export default defineComponent({
  name: 'MusicChooseSelectComponent',
  data() {
    return {
      maxMusicChoose: 3,
      loadingGetRecommendations: false,
      isMusicPlayingList: [],
      audioObject: new Audio(),
      isMusicSelectedList: [],
      listMusicChoiceUser: [],
    }
  },
  computed: {
    getMusicList() {
      return generalStore().musicListStore;
    },
    getShowMusicChoose() {
      return generalStore().getShowMusicChoose;
    }
  },
  methods: {
    selectMusic(index, music) {
      const totalCount = this.isMusicSelectedList.reduce((count, value) => count + (value === true ? 1 : 0), 0);
      if(totalCount < 3 || this.isMusicSelectedList[index] === true) {
        this.isMusicSelectedList[index] = !this.isMusicSelectedList[index];
        if (this.isMusicSelectedList[index]) {
          this.listMusicChoiceUser.push(music);
        } else {
          const musicIndex = this.listMusicChoiceUser.indexOf(music);
          if (musicIndex !== -1) {
            this.listMusicChoiceUser.splice(musicIndex, 1);
          }
        }
      } else {
        snackbarNotifStore().showNotification("Vous ne pouvez pas sélectionner plus de 3 musiques !", true, "red", 5000);
      }
    },
    togglePlay(index, srcAudio) {
      if (this.isMusicPlayingList[index] === false || this.isMusicPlayingList[index] === undefined) {
        this.audioObject.src = srcAudio;
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
    isMusicSelected(index) {
      return this.isMusicSelectedList[index] === true;
    },
    isMusicPlaying(index) {
      return this.isMusicPlayingList[index] === true;
    },
    clearMusicSelected() {
      if(this.listMusicChoiceUser.length !== 0) {
        snackbarNotifStore().showNotification("Vous avez effacé vos sélections !", true, "green", 4000);
        this.isMusicSelectedList = [];
        this.listMusicChoiceUser = [];
      }
    },
    async getRecommendations() {
      generalStore().musicSelectedUser = this.listMusicChoiceUser;
      generalStore().showResult = true;
      this.loadingGetRecommendations = true;
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', // Spécifiez le type de contenu de votre requête (JSON dans ce cas)
        'Access-Control-Allow-Origin': '*', // Si votre API nécessite une authentification avec un jeton (token)
      };
      const params = {
        "n_song": 2,
        "song_ids": ["1421132"]
      };
      await axios.get("http://muse.augustindirand.com:50101/api/music", {
        data: params, headers: headers
      })
          .then(response => {
            // Traiter la réponse ici
            console.log(response.data);
          })
          .catch(error => {
            // Gérer les erreurs ici
            console.error(error);
          });
    }
  }
})
</script>