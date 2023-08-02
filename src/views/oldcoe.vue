<v-app>
<v-navigation-drawer
    app
    v-model="drawer"
    class="bg-blue-grey-darken-3"
    permanent
>
  <div class="h-100 d-flex flex-column justify-center align-center">
    <p>Aucune demande enregistré trouvé</p>
    <v-btn @click="dialog = true" variant="tonal" class="mt-2" prepend-icon="mdi-plus">{{ $t("Créer une demande") }}</v-btn>
  </div>
  <v-list class="pa-0"
          :items="items"
  ></v-list>
</v-navigation-drawer>
<v-app-bar color="blue-grey-darken-4"  dark flat app prominent elevation="0">
  <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

  <v-toolbar-title>Muse</v-toolbar-title>

  <v-spacer></v-spacer>

  <v-btn variant="tonal" class="mr-2" prepend-icon="mdi-plus">{{ $t("Demande") }}</v-btn>
  <v-menu
      transition="slide-x-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn variant="tonal" size="small" v-bind="props" icon="mdi-google-translate"></v-btn>
    </template>

    <v-list class="pa-0">
      <v-list-item>
        <v-list-item-title class="d-flex justify-start align-center"><country-flag class="ma-0" country='fr' size="medium"/>Francais</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="d-flex justify-start align-center"><country-flag class="ma-0" country='gb' size="medium"/>Anglais</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</v-app-bar>
<v-main style="height: 100vh" class="d-flex justify-center align-center bg-blue-grey-darken-2">
  <v-container>
    <v-row no-gutters class="text-center">
      <v-col cols="12">
        <v-icon icon="mdi-emoticon-sad" class="mb-2"></v-icon>
        <p>Vous n'avez crée aucune demande !</p><p>Muse ne peut vous recommandées des musiques !</p>
        <v-btn @click="dialog = true" variant="tonal" class="mt-2" prepend-icon="mdi-plus">{{ $t("Créer une demande") }}</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="text-center">
      <v-col cols="12">
        <p>Vous avez sélectionner ces 3 musiques :</p>
        <p>Muse vous recommandes ces 3 musiques :</p>
        <v-rating density="compact" v-model="ratingValue" length="10" color="blue-grey-lighten-4" :item-labels="['1', '', '', '', '', '', '', '', '', '10']" item-label-position="bottom">
          <template v-slot:item-label="props">
            <span>{{ props.label }}</span>
          </template>
        </v-rating>
      </v-col>
    </v-row>
    <!--<v-row no-gutters>
      <v-col cols="12" md="6">
        <v-btn variant="tonal" size="large">Envoyer votre avis</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn variant="tonal" size="large">Nouvelle demande</v-btn>
      </v-col>
    </v-row>!-->
  </v-container>
</v-main>
</v-app>