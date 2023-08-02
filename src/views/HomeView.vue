<template>
  <v-container class="w-75">
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="size-text-title">Muse</h1>
      </v-col>
    </v-row>
    <MusicGenreSelectComponent v-if="!getShowResult" />
    <RecommendationsSelectComponent v-if="!getShowResult" />
    <MusicChooseSelectComponent v-if="!getShowResult" />
    <ShowResultRecommendationsComponent v-if="getShowResult" />
    <RatingResultComponent v-if="getShowResult" />
    <FooterComponent />
  </v-container>
</template>

<script>
import {defineComponent} from 'vue';
import MusicGenreSelectComponent from "@/components/MusicGenreSelectComponent";
import RecommendationsSelectComponent from "@/components/RecommendationsSelectComponent";
import MusicChooseSelectComponent from "@/components/MusicChooseSelectComponent";
import ShowResultRecommendationsComponent from "@/components/ShowResultRecommendationsComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import RatingResultComponent from "@/components/RatingResultComponent.vue";
import {generalStore} from "@/store/generalStore";

export default defineComponent({
  name: 'HomeView',
  components: {
    RatingResultComponent,
    FooterComponent,
    ShowResultRecommendationsComponent,
    MusicChooseSelectComponent, RecommendationsSelectComponent, MusicGenreSelectComponent},
  computed: {
    getShowResult() {
      return generalStore().getShowResult;
    },
  }
})
</script>
