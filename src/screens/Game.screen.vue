<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useMapLevel } from "../setups/map.setup.ts"
import { EventBus, updateMarket } from "../utils/utils.ts"
import { router } from "../router.ts"
import { useTown } from "../store/town.store.ts"
import { Game } from "phaser"
import mapIcon from "/public/assets/icons/map/map.svg"
import IconPirate from "/public/assets/icons/alerts/pirate.svg"
import IconAward from "/public/assets/icons/alerts/award.svg"
import IconGold from "/public/assets/icons/resources/gold.svg"
import ResourcesPanel from "../ui-components/ResourcesPanel.component.vue"
import FuelWidget from "../ui-components/FuelWidget.component.vue"
import HealthWidget from "../ui-components/HealthWidget.component.vue"
import { usePlayer } from "../store/player.store.ts"
import { PIRATE_AWARD_VALUE } from "../configs/gameplay.config.ts"

const isShowTownAlert = ref(false)
const isShowPirateAlert = ref(false)
let game: null | Game = null

const townStore = useTown()
const player = usePlayer()

const updateMarketInterval = updateMarket(townStore)
const isShowAwardAlert = ref(false)

const goToTown = () => {
    clearInterval(updateMarketInterval)
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
    EventBus.off("show-pirate-alert")
    EventBus.off("pirate-death")
    router.push({ path: "/town" })
}

const destroyShip = (value: number | null) => {
    if ((value && value < 0) || value === 0) {
        EventBus.emit("destroy-current-ship")
    }
}

const closeHandler = () => {
    isShowAwardAlert.value = false
}

onMounted(() => {
    game = useMapLevel(townStore.coords, player.currentShip)
    EventBus.on("leave-town", () => {
        isShowTownAlert.value = false
    })
    // eslint-disable-next-line
    EventBus.on("arrive-town", (params: any) => {
        townStore.setTown(params.town)
        townStore.setCoords({
            x: params.coords.x,
            y: params.coords.y,
        })
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
        player.resetAllResources()
        townStore.setShowSinkAlert(true)
        goToTown()
    })
    EventBus.on("show-pirate-alert", () => {
        isShowPirateAlert.value = true
    })
    EventBus.on("pirate-death", () => {
        isShowAwardAlert.value = true
        player.increaseGold(PIRATE_AWARD_VALUE)
    })
})

watch(
    () => player.currentShipHealth,
    (value) => {
        destroyShip(value)
    }
)

watch(
    () => player.currentShipFuel,
    (value) => {
        destroyShip(value)
    }
)
</script>

<template>
    <div class="game-screen">
        <v-alert v-if="isShowAwardAlert" class="game-screen__alert" type="success" variant="elevated" title="Вы одержали победу, капитан!" closable @click:close="closeHandler">
            <template #prepend>
                <IconAward class="game-screen__award-icon" />
            </template>
            <template #text>
                <div class="game-screen__alert-text">Вы получаете награду 10000 <IconGold class="game-screen__gold-icon" /></div>
            </template>
        </v-alert>
        <div class="game-screen__top-panel">
            <ResourcesPanel :color="townStore.currentTown.color" :gold="player.gold" />
        </div>
        <div v-if="player.currentShip" class="game-screen__left-panel">
            <HealthWidget :current-health="player.currentShip.currentHealth" :max-health="player.currentShip.maxHealth" />
            <FuelWidget :current-fuel="player.currentShip.currentFuel" :max-fuel="player.currentShip.maxFuel" />
        </div>
        <div class="game-screen__map-button-container">
            <v-dialog max-width="1200">
                <template #activator="{ props: activatorProps }">
                    <v-btn class="game-screen__map-trigger" v-bind="activatorProps" :color="`${townStore.currentTown.color}-lighten-5`" variant="elevated" size="x-large" v-tooltip="'Карта'" icon="">
                        <mapIcon class="game-screen__map-icon" />
                    </v-btn>
                </template>
                <template #default>
                    <v-img src="/public/assets/maps/start-map.jpg" />
                </template>
            </v-dialog>
        </div>
        <div id="game" class="game-screen__game-wrapper"></div>
        <v-snackbar v-model="isShowTownAlert" :color="townStore.currentTown.color">
            Вы хотите приземлиться в городе <b>{{ townStore.currentTown.name }}</b
            >?
            <template #actions>
                <v-btn :color="`${townStore.currentTown.color}-darken-4`" variant="elevated" @click="goToTown"> OK </v-btn>
            </template>
        </v-snackbar>
        <v-snackbar v-model="isShowPirateAlert" color="red" :timeout="2000">
            <div class="game-screen__pirate-alert"><IconPirate class="game-screen__pirate-icon" /> <span class="text-black font-weight-black">Осторожно, капитан! На Вас напали пираты! </span></div>
        </v-snackbar>
    </div>
</template>

<style scoped lang="scss">
@import "/public/assets/scss/mixins.scss";

.game-screen {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &__alert {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        z-index: 2;
    }

    &__alert-text {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    &__award-icon {
        width: 50px;
        height: 50px;
    }

    &__gold-icon {
        @include icon-styles;
    }

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
        top: 30%;
        left: 40px;
        transform: translateY(-30%);
    }

    &__map-icon {
        width: 50px;
        height: 50px;
    }

    &__pirate-alert {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    &__pirate-icon {
        display: inline-block;
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
