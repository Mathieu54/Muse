<template>
  <section id="rating">
    <v-row>
      <v-col cols="12" class="d-flex align-center flex-column">
        <h2 class="my-5">{{ $t("Votre avis sur la recommandations") }}</h2>
        <v-rating v-model="ratingValue" length="10" color="orange-darken-3" :item-labels="labelsRating" item-label-position="bottom">
          <template v-slot:item-label="props">
            <span>{{ props.label }}</span>
          </template>
        </v-rating>
        <v-btn @click="sendRating()" class="mt-10" color="orange-lighten-5" density="default" size="large" :loading="loadingButtonSendRating">{{ $t("Envoyer la notation") }}</v-btn>
      </v-col>
    </v-row>
  </section>
</template>
<script>
import {defineComponent} from 'vue'
import {snackbarNotifStore} from "@/store/snackbarNotif";
import axios from "axios";
export default defineComponent({
  name: 'RatingResultComponent',
  data() {
    return {
      ratingValue: null,
      labelsRating: ['1', '', '', '', '', '', '', '', '', '10'],
      loadingButtonSendRating: false
    }
  },
  methods: {
    async sendRating() {
      this.loadingButtonSendRating = true;
      await axios.post(process.env.VUE_APP_API_HOST + process.env.VUE_APP_API_RATINGS, {
        rating: this.ratingValue,
        idRecommendationsMusic: this.recommendationsMusic,
      }).then(async response => {
        console.log(response);
        this.loadingButtonSendRating = false;
        return true;
      }).catch(async error => {
        await snackbarNotifStore().showNotification("Une erreur est survenu lors de l'envoi", true, "red", 5000);
        console.log(error);
        this.loadingButtonSendRating = false;
        return false;
      });
    }
  }
})
</script>