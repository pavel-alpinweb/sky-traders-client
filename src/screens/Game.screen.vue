<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useMapLevel } from "../levels/map.level.ts"
import { EventBus } from "../utils/utils.ts"
import { router } from "../router.ts"
import { useTown } from "../store/town.ts"
import { Game } from "phaser"

const isShowTownAlert = ref(false)
let game: null | Game = null

const townStore = useTown()

const goToTown = () => {
    if (game) {
        game?.destroy(true)
    }
    router.push({ path: "/town" })
}

onMounted(() => {
    game = useMapLevel()
    // eslint-disable-next-line
    EventBus.on("fly-on-town", (params: any) => {
        townStore.setTown(params.town)
        townStore.setCoords(params.coords)
    })
    EventBus.on("leave-town", () => {
        isShowTownAlert.value = false
    })
    EventBus.on("arrive-town", () => {
        isShowTownAlert.value = true
    })
})
</script>

<template>
    <div class="game-screen">
        <div v-if="isShowTownAlert" class="game-screen__town-alert">
            <div class="game-screen__name">Вы хотите приземлиться в городе {{ townStore.name }}?</div>
            <button @click="goToTown">В город!</button>
        </div>
        <div id="game" class="game-screen__game-wrapper"></div>
    </div>
</template>

<style scoped lang="scss">
.game-screen {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &__game-wrapper {
        width: 1365px;
        height: 768px;
    }
    &__town-alert {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        height: 50px;
        background-color: #fff;
        color: #1a1a1a;
    }
}
</style>
