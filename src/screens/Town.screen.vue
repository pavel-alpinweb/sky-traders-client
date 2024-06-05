<script setup lang="ts">
import { router } from "../router.ts"
import { onMounted } from "vue"
import { Game } from "phaser"
import { useTown } from "../store/town.ts"
import { useTownLevel } from "../levels/town.level.ts"

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
        <div class="town-screen__content">
            <v-btn size="x-large" class="text-none" variant="elevated" color="green" @click="goToMap">Покинуть город</v-btn>
        </div>
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
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }

    &__content {
        position: relative;
        z-index: 1;
    }
}
</style>
