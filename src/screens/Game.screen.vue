<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useMapLevel } from "../setups/map.setup.ts"
import { EventBus } from "../utils/utils.ts"
import { router } from "../router.ts"
import { useTown } from "../store/town.ts"
import { Game } from "phaser"
import mapIcon from "/public/assets/icons/map/map.svg"
import ResourcesPanel from "../ui-components/ResourcesPanel.component.vue"
import FuelWidget from "../ui-components/FuelWidget.component.vue"
import HealthWidget from "../ui-components/HealthWidget.component.vue"
import { usePlayer } from "../store/player.ts"

const isShowTownAlert = ref(false)
let game: null | Game = null

const townStore = useTown()
const player = usePlayer()

const goToTown = () => {
    if (game) {
        game?.destroy(true)
    }
    EventBus.off("fly-on-town")
    EventBus.off("leave-town")
    EventBus.off("arrive-town")
    EventBus.off("decrease-fuel")
    EventBus.off("decrease-health")
    EventBus.off("damage-player")
    EventBus.off("damage-pirate")
    EventBus.off("destroy-current-ship")
    EventBus.off("crush-ship-end")
    router.push({ path: "/town" })
}

onMounted(() => {
    game = useMapLevel(townStore.coords, player.currentShip)
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
    EventBus.on("decrease-fuel", () => {
        player.decreaseCurrentShipFuel()
    })
    EventBus.on("decrease-health", () => {
        player.decreaseCurrentShipHealth()
    })
    EventBus.on("damage-player", () => {
        player.damageCurrentShip()
    })
    EventBus.on("crush-ship-end", () => {
        player.removeCurrentShip()
        townStore.setShowSinkAlert(true)
        goToTown()
    })
})

watch(
    () => player.currentShipHealth,
    (value) => {
        if (value === 0) {
            EventBus.emit("destroy-current-ship")
        }
    }
)
</script>

<template>
    <div class="game-screen">
        <div class="game-screen__top-panel">
            <ResourcesPanel :color="townStore.color" :gold="player.gold" />
        </div>
        <div v-if="player.currentShip" class="game-screen__left-panel">
            <HealthWidget :current-health="player.currentShip.currentHealth" :max-health="player.currentShip.maxHealth" />
            <FuelWidget :current-fuel="player.currentShip.currentFuel" :max-fuel="player.currentShip.maxFuel" />
        </div>
        <div class="game-screen__map-button-container">
            <v-dialog max-width="1200">
                <template #activator="{ props: activatorProps }">
                    <v-btn class="game-screen__map-trigger" v-bind="activatorProps" :color="`${townStore.color}-lighten-5`" variant="elevated" size="x-large" v-tooltip="'Карта'" icon="">
                        <mapIcon class="game-screen__map-icon" />
                    </v-btn>
                </template>
                <template #default>
                    <v-img src="/public/assets/maps/start-map.jpg" />
                </template>
            </v-dialog>
        </div>
        <div id="game" class="game-screen__game-wrapper"></div>
        <v-snackbar v-model="isShowTownAlert" color="green">
            Вы хотите приземлиться в городе <b>{{ townStore.name }}</b
            >?
            <template #actions>
                <v-btn color="green-darken-4" variant="elevated" @click="goToTown"> OK </v-btn>
            </template>
        </v-snackbar>
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
        width: 100vw;
        height: 100vh;
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
    &__top-panel {
        position: fixed;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
    }

    &__left-panel {
        display: flex;
        flex-direction: column;
        gap: 15px;
        position: fixed;
        top: 50%;
        left: 40px;
        transform: translateY(-50%);
    }

    &__map-icon {
        width: 50px;
        height: 50px;
    }

    &__map-button-container {
        position: absolute;
        left: 30px;
        bottom: 30px;
    }
}
</style>
