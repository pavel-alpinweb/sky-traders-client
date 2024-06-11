import { createApp } from "vue"

// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"
import { VNumberInput } from "vuetify/labs/VNumberInput"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import "@mdi/font/css/materialdesignicons.css"

const vuetify = createVuetify({
    components: {
        VNumberInput,
        ...components,
    },
    directives,
    icons: {
        defaultSet: "mdi",
    },
})

import "./style.scss"
import App from "./App.vue"
import { router } from "./router.ts"
import { createPinia } from "pinia"

createApp(App).use(router).use(createPinia()).use(vuetify).mount("#app")
