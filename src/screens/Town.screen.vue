<script setup lang="ts">
import { router } from "../router.ts"
import { onMounted, ref } from "vue"
import { Game } from "phaser"
import { useTown } from "../store/town.ts"
import { useTownLevel } from "../levels/town.level.ts"
import ResourcesPanal from "../ui-components/ResourcesPanal.component.vue"
import Market from "../windows/market.window.vue"
import IconMarket from "/public/assets/icons/screens/market.svg"
import IconShipyard from "/public/assets/icons/screens/shipyard.svg"
import IconWarehouse from "/public/assets/icons/screens/warehouse.svg"

let background: null | Game = null
const townStore = useTown()
const tab = ref(null)

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
            <ResourcesPanal :color="townStore.color" />
        </div>
        <v-btn class="text-none town-screen__back-btn" size="large" variant="elevated" :color="townStore.color" prepend-icon="mdi-location-exit" @click="goToMap"> Покинуть город </v-btn>

        <v-tabs v-model="tab" class="town-screen__menu" direction="vertical" :bg-color="townStore.color" :mandatory="false">
            <v-tab value="market"><IconMarket class="town-screen__screen-icon" />Рынок</v-tab>
            <v-tab value="shipyard"><IconShipyard class="town-screen__screen-icon" />Верфь</v-tab>
            <v-tab value="warehouse"><IconWarehouse class="town-screen__screen-icon" />Склад</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab" class="town-screen__wrapper">
            <v-tabs-window-item value="market" class="town-screen__window">
                <v-sheet :width="1200" :elevation="10" border rounded :color="`${townStore.color}-lighten-5`" class="town-screen__content">
                    <Market :color="townStore.color" />
                </v-sheet>
            </v-tabs-window-item>
            <v-tabs-window-item value="shipyard" class="town-screen__window">
                <v-sheet :width="1200" :elevation="10" border rounded :color="`${townStore.color}-lighten-5`" class="town-screen__content">
                    <h1>Верфь</h1>
                </v-sheet>
            </v-tabs-window-item>
            <v-tabs-window-item value="warehouse" class="town-screen__window">
                <v-sheet :width="1200" :elevation="10" border rounded :color="`${townStore.color}-lighten-5`" class="town-screen__content">
                    <h1>Склад</h1>
                </v-sheet>
            </v-tabs-window-item>
        </v-tabs-window>
    </div>
</template>

<style scoped lang="scss">
.town-screen {
    width: 100vw;
    height: 100vh;
    background-color: #a7efff;
    position: relative;
    overflow: auto;
    display: flex;

    &__wrapper {
        margin: 15vh auto 0;
        overflow: auto;
    }

    &__window {
        padding: 15px;
    }

    &__background {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }

    &__menu {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
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
        z-index: 2;
        padding: 15px;
    }

    &__screen-icon {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
}
</style>
