<template>
  <section>
    <v-dialog
        v-model="getStateDialogBox"
        persistent
        width="auto"
        z-index="999999"
    >
      <v-card>
        <v-card-title class="text-h5 pa-5 text-center">
          {{$t("Informations sur Muse")}}
        </v-card-title>
        <v-card-text class="pa-5 pt-0">
          <v-row no-gutters>
            <v-col cols="12">
          <p class="text-justify mb-8">{{$t("Bienvenue sur Muse, un projet de recommendations musicales.")}}</p>

          <p class="text-justify mb-2">{{$t("Ce site web ne récolte aucune donnée utilisateur personnelle et n'utilise aucun cookie. Les avis sont envoyés annonymement sans inclure d'information permettant de tracer l'utilisateur.")}}</p>

          <p class="text-justify mb-2">{{$t("Il est peu probable que les musiques sélectionnables vous soient connues. Utilisez vos genres préférés pour sélectionner des musiques qui vous plaisent !")}}</p>

          <p class="text-justify mb-8">{{$t("Toutes les musiques sont disponibles sur le site: ")}}<a href="https://www.jamendo.com/" target="_blank">Jamendo.com</a></p>

          <p class="text-justify mb-2">{{$t("Pensez à bien utiliser toute l'échelle pour noter les recommendations.")}}</p>

              <p class="text-left mb-1"><b>1-3</b>: {{$t("La recommendation ne vous plais pas du tout.")}}</p>
              <p class="text-left mb-1"><b>4-7</b>: {{$t("La recommendation pourrait être meilleure ou plus pertinente.")}}</p>
              <p class="text-left mb-1"><b>8-10</b>: {{$t("La recommendation vous plais énormément.")}}</p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green-darken-1"
              variant="text"
              @click="validateDialogBoxData()"
          >
            {{$t("J'ai compris")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import {defineComponent} from 'vue'
import {dialogBoxStore} from "@/store/dialogBoxStore";

export default defineComponent({
  name: 'DialogBoxComponent',
  computed: {
    getStateDialogBox() {
      return dialogBoxStore().getShowDialogBox;
    }
  },
  methods: {
    validateDialogBoxData() {
      dialogBoxStore().showDialogBox = false;
    }
  }

})
</script>