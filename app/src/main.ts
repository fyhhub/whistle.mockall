import { createApp } from 'vue'
import App from './pages/Mock/index.vue'
import { createPinia } from 'pinia'
import './main.css';
const app = createApp(App)
app.use(createPinia())

app.mount('#app')
