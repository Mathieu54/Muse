import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import i18n from './i18n'
import countryFlag from 'vue-country-flag-next'

const pinia = createPinia();
loadFonts()

createApp(App).use(i18n)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .use(countryFlag)
  .mount('#app')
