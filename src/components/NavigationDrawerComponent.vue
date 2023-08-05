<template>
  <section>
    <v-navigation-drawer app v-model="getNavigationDrawer" class="bg-blue-grey-darken-3" @update:modelValue="updateNavigationDrawer()">
      <div class="d-flex h-100 flex-column justify-center align-center text-center" v-if="getSaveDataRecommendations.length <= 0">
          <p>{{ $t("Aucune recommandation enregistrée n'a été trouvée.") }}</p>
          <div class="position-fixed flex-column justify-end align-center w-100" style="bottom: 0; z-index: 99999">
            <v-btn @click="createNewRecommendation()" rounded="0" variant="tonal" class="w-100 bg-blue-grey-darken-2" stacked prepend-icon="mdi-plus" size="small">{{ $t("Nouvelle recommandation") }}</v-btn>
          </div>
      </div>
      <div class="d-flex h-100 flex-column justify-start align-center" v-else>
      <v-list class="px-2 py-0 overflow-y-auto w-100 scroll-bar" style="margin-bottom: 128px; margin-top: 64px;">
        <v-list-item v-for="(saveData, index) in getSaveDataRecommendations" :key="index" class="pa-0" :title="saveData.idSave" subtitle="Date">
          <template v-slot:append>
            <v-btn
                @click="deleteSpecificSaveData(index)"
                color="red-darken-3"
                icon="mdi-trash-can"
                variant="text"
                size="x-small"
            ></v-btn>
            <v-btn
                @click="showTheSpecificSaveData(index)"
                size="x-small"
                color="grey-lighten-1"
                icon="mdi-eye"
                variant="text"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
        <div class="position-fixed flex-column justify-end align-center" style="bottom: 0; z-index: 99999">
          <v-btn @click="createNewRecommendation()" rounded="0" variant="tonal" class="w-100 bg-blue-grey-darken-2" stacked prepend-icon="mdi-plus" size="small">{{ $t("Nouvelle recommandation") }}</v-btn>
          <v-btn color="white" rounded="0" variant="tonal" stacked class="w-100 bg-red-darken-3" prepend-icon="mdi-trash-can" size="small">{{ $t("Supprimer les sauvegardes") }}</v-btn>
        </div>
      </div>
    </v-navigation-drawer>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import {recommendationStore} from "@/store/recommendationStore";

export default defineComponent({
  name: 'NavigationDrawerComponent',
  data() {
    return {
      drawer: true,
    }
  },
  computed: {
    getNavigationDrawer() {
      return recommendationStore().getIsNavigationDrawerOpen;
    },
    getSaveDataRecommendations() {
      return recommendationStore().getSaveDataRecommendations;
    }
  },
  methods: {
    updateNavigationDrawer() {
      recommendationStore().isNavigationDrawerOpen = !recommendationStore().getIsNavigationDrawerOpen;
    },
    showTheSpecificSaveData(index) {
      console.log(recommendationStore().saveDataRecommendations[index]);
    },
    deleteSpecificSaveData(index) {
      const updatedSaveData = [...this.getSaveDataRecommendations];
      updatedSaveData.splice(index, 1);
      recommendationStore().saveDataRecommendations = updatedSaveData;
    },
    createNewRecommendation() {
      recommendationStore().isDialogCreateOpen = true;
    }
  }
})
</script>

<style scoped>
.scroll-bar::-webkit-scrollbar {
  width: 5px;
}
.scroll-bar::-webkit-scrollbar-thumb {
  background-color: #263238;
}

.scroll-bar::-webkit-scrollbar-track {
  background-color: #455A64;
}
</style>