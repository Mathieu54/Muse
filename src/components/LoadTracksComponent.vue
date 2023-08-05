<template>
  <v-row class="h-100 d-flex justify-center align-center">
    <v-col cols="12" class="bg-blue-grey-darken-3">
      <v-autocomplete
          prepend-inner-icon="mdi-magnify"
          color="orange-lighten-5"
          :chips="true"
          :multiple="true"
          :clearable="true"
          :closable-chips="false"
          v-model="userMusicGenreChoice"
          bg-color="orange-lighten-5"
          :items="musicGenreData"
      ></v-autocomplete>
      <div style="max-height: 350px; height: 100vh; overflow-y: scroll">
        <div v-for="(track, index) in filteredTracks" :key="index">
          <v-checkbox
              class="text-right text-capitalize text-white"
              v-model="selectedMusics"
              :label="track.title"
              :value="track"
              hide-details
          ></v-checkbox>
        </div>
        <v-btn variant="tonal" @click="loadMore" :disabled="allTracksLoaded || !hasMoreTracks">Load More</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import dataTracks from "@/assets/data/tracks.json";
export default {
  name: "LoadTracksComponent",
  data() {
    return {
      totalTracksLoaded: 0,
      tracks: [],
      itemsPerPage: 100,
      currentPage: 1,
      userMusicGenreChoice: [],
      musicGenreData: [],
      allTracksLoaded: false,
      selectedMusics: []
    };
  },
  computed: {
    filteredTracks() {
      return this.tracks.filter((track) => {
        if (this.userMusicGenreChoice.length === 0) {
          return true;
        } else {
          return this.userMusicGenreChoice.some((genre) =>
              track.genre.includes(genre)
          );
        }
      });
    },
    hasMoreTracks() {
      // Vérifier si des pistes supplémentaires sont disponibles à charger
      return (
          this.totalTracksLoaded < Object.values(dataTracks).length &&
          (!this.userMusicGenreChoice.length ||
              this.filteredTracks.length < this.tracks.length)
      );
    },
  },
  methods: {
    loadMore() {
      const startIndex = this.totalTracksLoaded;
      const endIndex = startIndex + this.itemsPerPage;
      const newTracksData = Object.values(dataTracks).slice(startIndex, endIndex);

      const newTracks = newTracksData.map((trackData) => {
        const id = Object.keys(dataTracks).find(
            (key) => dataTracks[key] === trackData
        );
        return { id, ...trackData };
      });

      this.tracks = [...this.tracks, ...newTracks];
      this.totalTracksLoaded += newTracks.length;
      this.currentPage++;

      if (this.totalTracksLoaded >= Object.keys(dataTracks).length) {
        this.allTracksLoaded = true;
      }
    },
    async getJsonGenre() {
      const uniqueGenres = [];
      for (var item in dataTracks) {
        for (var item2 in dataTracks[item].genre) {
          if (!uniqueGenres.includes(dataTracks[item].genre[item2])) {
            uniqueGenres.push(dataTracks[item].genre[item2]);
          }
        }
      }
      this.musicGenreData = uniqueGenres;
    },
  },
  created() {
    this.getJsonGenre();
    this.loadMore();
  },
};
</script>