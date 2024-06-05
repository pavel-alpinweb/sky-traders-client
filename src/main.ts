import { createApp } from "vue"

// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

const vuetify = createVuetify({
    components,
    directives,
})

import "./style.scss"
import App from "./App.vue"
import { router } from "./router.ts"
import { createPinia } from "pinia"

createApp(App).use(router).use(createPinia()).use(vuetify).mount("#app")
