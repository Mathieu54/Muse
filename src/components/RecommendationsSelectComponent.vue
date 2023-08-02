<template>
  <section v-if="getShowMusicChoose">
    <v-row>
      <v-col cols="12">
        <h2 class="text-center my-8">{{ $t("Combien voulez vous de recommandations ?") }}</h2>
        <v-slider
            v-model="userRecommandationNumberChoice"
            color="orange"
            track-color="red"
            :ticks="tickLabels"
            :step="1"
            min="1"
            max="5"
            show-ticks="always"
            tick-size="0"
            @update:modelValue="onUpdateSliderSelect()"
        ></v-slider>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import {generalStore} from "@/store/generalStore";

export default defineComponent({
  name: 'RecommendationsSelectComponent',
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
  computed: {
    getShowMusicChoose() {
      return generalStore().getShowMusicChoose;
    }
  },
  created() {
    this.onUpdateSliderSelect();
  },
  methods: {
    onUpdateSliderSelect() {
      generalStore().recommendationsNumberStore = this.userRecommandationNumberChoice;
    }
  }
})
</script>
<style scoped>
:deep(.v-slider-track__background), :deep(.v-slider-track__fill) {
  height: 15px !important;
}
</style>