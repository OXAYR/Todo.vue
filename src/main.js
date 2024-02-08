import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './styles.css'

const app = createApp(App)
import axios from "axios";

axios.defaults.baseURL = 'http://3.232.244.22'

app.use(createPinia())
app.use(router)

app.mount('#app')


