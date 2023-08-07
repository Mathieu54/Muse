<template>
  <v-app>
    <NavigationDrawerComponent />
    <AppBarComponent />
    <MainComponent />
  </v-app>
  <DialogCreateComponent />
</template>
<script>
import {defineComponent} from 'vue';
import NavigationDrawerComponent from "@/components/NavigationDrawerComponent";
import AppBarComponent from "@/components/AppBarComponent";
import MainComponent from "@/components/MainComponent";
import DialogCreateComponent from "@/components/DialogCreateComponent";

export default defineComponent({
  name: 'HomeView',
  components: {DialogCreateComponent, MainComponent, AppBarComponent, NavigationDrawerComponent},
  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'Choisir maximum 3 genres musicaux'
        case 2: return 'Choisir le nombre de recommendations donnée par l\'IA'
        case 3: return 'Choisir maximum 3 musiques par mis les genres selectionné'
        default: return 'Account created'
      }
    },
  },
  data() {
    return {
      ratingValue: 2,
      filteredGenres: ["df", "df", "aas", "df", "df", "aas", "df", "df", "df", "aas", "df", "df", "aas", "df", "df", "aas", "df", "df", "aas", "df", "df", "coucou c'est pas la fin", "peut etre ici", "pas encore la fin", "FINAL LISTE"],
      step: 1,
      dialog: false,
      drawer: false,
      group: null,
      items: [
      ],
    }
  }
})
</script>
<style>
/* Styles pour la barre de défilement */
body::-webkit-scrollbar {
  width: 10px;
}

/* Style du "pouce" de la barre de défilement */
body::-webkit-scrollbar-thumb {
  background-color: #455A64;
}

/* Style de la "piste" de la barre de défilement */
body::-webkit-scrollbar-track {
  background-color: #263238;
}
.v-rating__hidden {
  display: none;
}
.list-hover:hover {
  background-color: #455a64;
}
header {
  postion: absolute !important;
  top:0 !important;
  left: 0 !important;
  z-index: 99999 !important;
}
</style>