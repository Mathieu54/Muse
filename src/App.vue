<template>
  <router-view/>
  <SnackbarInfosComponent />
  <ChooseLangComponent />
</template>

<script>
import SnackbarInfosComponent from "@/components/SnackbarInfosComponent";
import ChooseLangComponent from "@/components/ChooseLangComponent.vue";

export default {
  name: 'App',
  components: {ChooseLangComponent, SnackbarInfosComponent},
}
</script>

<style>
html, body {
  background-color: #202124;
  font-family: 'Bungee Spice', cursive;
}
</style>
