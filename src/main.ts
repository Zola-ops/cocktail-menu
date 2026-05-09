import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import { useI18n } from './composables/useI18n'

const app = createApp(App)
const { initLocale } = useI18n()

initLocale()

app.mount('#app')
