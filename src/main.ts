import { createApp } from "vue"
import "./style.scss"
import App from "./App.vue"
import { router } from "./router.ts"
import { createPinia } from "pinia"

createApp(App).use(router).use(createPinia()).mount("#app")
