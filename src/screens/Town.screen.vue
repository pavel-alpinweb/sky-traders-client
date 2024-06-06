<script setup lang="ts">
import { router } from "../router.ts"
import { onMounted } from "vue"
import { Game } from "phaser"
import { useTown } from "../store/town.ts"
import { useTownLevel } from "../levels/town.level.ts"
import ResourcesPanal from "../ui-components/ResourcesPanal.component.vue"

let background: null | Game = null
const townStore = useTown()
const goToMap = () => {
    if (background) {
        background?.destroy(true)
    }
    router.push({ path: "/game" })
}

onMounted(() => {
    background = useTownLevel(townStore.name)
})
</script>

<template>
    <div class="town-screen">
        <div id="town" class="town-screen__background"></div>
        <div class="town-screen__panel">
            <ResourcesPanal />
        </div>
        <v-btn class="text-none town-screen__back-btn" size="x-large" variant="elevated" color="green" prepend-icon="mdi-location-exit" @click="goToMap"> Покинуть город </v-btn>
        <v-sheet :width="1200" :elevation="10" class="town-screen__content">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid dolor fuga itaque maiores nesciunt numquam unde. Accusantium adipisci exercitationem inventore itaque laudantium
                maiores, pariatur possimus reprehenderit totam vitae, voluptas.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid dolor fuga itaque maiores nesciunt numquam unde. Accusantium adipisci exercitationem inventore itaque laudantium
                maiores, pariatur possimus reprehenderit totam vitae, voluptas.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid dolor fuga itaque maiores nesciunt numquam unde. Accusantium adipisci exercitationem inventore itaque laudantium
                maiores, pariatur possimus reprehenderit totam vitae, voluptas.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid dolor fuga itaque maiores nesciunt numquam unde. Accusantium adipisci exercitationem inventore itaque laudantium
                maiores, pariatur possimus reprehenderit totam vitae, voluptas.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid dolor fuga itaque maiores nesciunt numquam unde. Accusantium adipisci exercitationem inventore itaque laudantium
                maiores, pariatur possimus reprehenderit totam vitae, voluptas.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid dolor fuga itaque maiores nesciunt numquam unde. Accusantium adipisci exercitationem inventore itaque laudantium
                maiores, pariatur possimus reprehenderit totam vitae, voluptas.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid dolor fuga itaque maiores nesciunt numquam unde. Accusantium adipisci exercitationem inventore itaque laudantium
                maiores, pariatur possimus reprehenderit totam vitae, voluptas.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid dolor fuga itaque maiores nesciunt numquam unde. Accusantium adipisci exercitationem inventore itaque laudantium
                maiores, pariatur possimus reprehenderit totam vitae, voluptas.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid dolor fuga itaque maiores nesciunt numquam unde. Accusantium adipisci exercitationem inventore itaque laudantium
                maiores, pariatur possimus reprehenderit totam vitae, voluptas.
            </p>
        </v-sheet>
    </div>
</template>

<style scoped lang="scss">
.town-screen {
    width: 100vw;
    height: 100vh;
    background-color: #a7efff;
    position: relative;

    &__background {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }

    &__panel {
        position: fixed;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
    }

    &__back-btn {
        position: fixed;
        top: 40px;
        left: 40px;
    }

    &__content {
        position: relative;
        top: 1024px;
        z-index: 2;
        margin: 0 auto;
    }
}
</style>
