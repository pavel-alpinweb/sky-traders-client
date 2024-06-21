<script setup lang="ts">
import { ref } from "vue"
import IconShips from "/public/assets/icons/shipyard/zeppelin.svg"
// import IconBlueprints from "/public/assets/icons/shipyard/drawing.svg"
import IconBuildings from "/public/assets/icons/shipyard/building.svg"
import { usePlayer } from "../store/player.ts"
import ShipList from "../ui-components/ShipList.component.vue"
import { useTown } from "../store/town.ts"
import { Ship } from "../types/interfaces.ts"
import RepairShip from "../ui-components/RepairShip.component.vue"
import ShipRefueling from "../ui-components/ShipRefueling.component.vue"

const props = defineProps<{
    color: string
}>()

const player = usePlayer()
const town = useTown()

const tab = ref(null)

const selectShipHandler = (ship: Ship) => {
    player.setCurrentShip(ship.id)
}
</script>

<template>
    <div class="shipyard-window">
        <h3 :class="`text-${props.color}-darken-4 text-h3`">Верфь</h3>
        <v-tabs v-model="tab" :color="props.color" align-tabs="center">
            <v-tab value="ships">
                <IconShips class="shipyard-window__menu-icon" />
                Мои корабли
            </v-tab>
            <!--            <v-tab value="blueprints">-->
            <!--                <IconBlueprints class="shipyard-window__menu-icon" />-->
            <!--                Мои чертежи-->
            <!--            </v-tab>-->
            <v-tab value="building">
                <IconBuildings class="shipyard-window__menu-icon" />
                Построить корабль
            </v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item value="ships">
                <div v-if="player.currentShip" class="shipyard-window__ship-service">
                    <div :class="`text-${props.color}-darken-4 shipyard-window__service-title text-h5 text-center`">Обслуживание корабля: {{ player.currentShip.name }}</div>
                    <div class="shipyard-window__ship-service-grid">
                        <RepairShip
                            :color="props.color"
                            :current-health="player.currentShip.currentHealth"
                            :max-health="player.currentShip.maxHealth"
                            :repair-price="player.currentShip.repairPrice"
                            :gold="player.gold"
                        />
                        <ShipRefueling :color="props.color" :max-fuel="player.currentShip.maxFuel" :current-fuel="player.currentShip.currentFuel" :id="player.currentShip.id" :gold="player.gold" />
                    </div>
                </div>
                <ship-list :ships="player.ships" :color="props.color" mode="select" :current-ship-id="player.currentShipId" @select="selectShipHandler" />
            </v-tabs-window-item>
            <!--            <v-tabs-window-item value="blueprints">-->
            <!--                <h2>Мои чертежи</h2>-->
            <!--            </v-tabs-window-item>-->
            <v-tabs-window-item value="building">
                <ship-list :ships="town.ships" :color="props.color" mode="build" />
            </v-tabs-window-item>
        </v-tabs-window>
    </div>
</template>

<style lang="scss">
.shipyard-window {
    &__menu-icon {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    &__ship-service {
        padding: 15px 0 0;
    }
    &__service-title {
        margin-bottom: 30px;
    }
    &__ship-service-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 15px;
    }
}
</style>
