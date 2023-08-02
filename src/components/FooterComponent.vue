<template>
  <section id="footer">
    <v-row class="text-center mt-5">
      <v-col cols="12">
        <h2 class="second-title">{{ $t("Site crée par") }} <a href="https://harmant-mathieu.fr" target="_blank" style="text-decoration-color: #CB1100; text-decoration-thickness: 3px;">Harmant Mathieu</a> {{ $t("et") }} Augustin Dirand</h2>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterComponent',
})
</script>