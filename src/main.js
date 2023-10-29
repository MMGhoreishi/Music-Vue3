import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from '@/includes/validation'
import { auth } from '@/includes/firebase'
import { registerSW } from 'virtual:pwa-register'
import progressBar from '@/includes/progress-bar'
import withUUID from 'vue-uuid'

import VueAwesomePaginate from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'

import './assets/base.css'
import './assets/main.css'
import 'nprogress/nprogress.css'

registerSW({ immediate: true })

progressBar(router)

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = withUUID(createApp(App))

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatePlugin)
    app.use(VueAwesomePaginate)

    app.mount('#app')
  }
})
