<template>
  <section id="show-recommandations-music" class="d-flex align-center flex-column">
    <h2 class="text-center mb-3" v-if="getRecommendations > 1">Musiques recommandées :</h2>
    <h2 class="text-center mb-3" v-else>Musique recommandée :</h2>
    <v-row class="text-center justify-center">
      <v-col v-for="col in getMusicListIARecommend" :key="col" cols="12" :md="getColumnWidth(getRecommendations)">
        <v-card class="ma-2 pa-5 bg-orange-lighten-5">
          <h2 style="text-overflow: ellipsis; width: 100%; white-space: nowrap; overflow: hidden;">{{ col.title }}</h2>
          <p class="text-left">Genre : <span class="mr-2" v-for="genre in col.genre" :key="genre">{{ genre}}</span> </p>
          <p class="text-left">Year: {{ col.year }}</p>
          <p class="text-left">Durations: {{ col.duration }} seconds</p>
          <v-btn
              class="ma-2"
              color="orange-lighten-4"
              icon="mdi-play"
          ></v-btn>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import {generalStore} from "@/store/generalStore";

export default defineComponent({
  name: 'ShowResultRecommendationsComponent',
  computed: {
    getMusicListIARecommend() {
      return generalStore().getMusicListIARecommend;
    },
    getRecommendations() {
      return generalStore().getRecommendationsNumberStore;
    }
  },
  methods: {
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
  },
})
</script>
