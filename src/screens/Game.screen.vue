<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useMapLevel } from "../levels/map.level.ts"
import { EventBus } from "../utils/utils.ts"

const townName = ref("")
const isShowTownAlert = ref(false)

onMounted(() => {
    useMapLevel()
    // eslint-disable-next-line
    EventBus.on("fly-on-town", (params: any) => {
        console.log(params.town)
        townName.value = params.town
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
            <div class="game-screen__name">Вы хотите приземлиться в городе {{ townName }}?</div>
            <button>В город!</button>
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
