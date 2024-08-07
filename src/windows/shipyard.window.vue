<script setup lang="ts">
import { reactive, ref } from "vue"
import IconShips from "/public/assets/icons/shipyard/zeppelin.svg"
// import IconBlueprints from "/public/assets/icons/shipyard/drawing.svg"
import IconBuy from "/public/assets/icons/shipyard/buy.svg"
import { usePlayer } from "../store/player.store.ts"
import ShipList from "../ui-components/ShipList.component.vue"
import { useTown } from "../store/town.store.ts"
import { RefuelParams, Ship } from "../types/interfaces.ts"
import ShipService from "../ui-components/ShipService.component.vue"

const props = defineProps<{
    color: string
}>()

const player = usePlayer()
const town = useTown()

const tab = ref(null)
const newShip = reactive({
    isShowAlert: false,
    shipType: "",
    shipName: "",
})

const selectShipHandler = (ship: Ship) => {
    player.setCurrentShip(ship.id)
    town.setShowSinkAlert(false)
}

const buildShipHandler = (ship: Ship) => {
    player.decreaseGold(ship.price)
    player.addNewShip({
        ...ship,
        id: new Date().getMilliseconds(),
    })
    newShip.isShowAlert = true
    newShip.shipType = ship.type
    newShip.shipName = ship.name
}

const refuelHandler = (params: RefuelParams) => {
    player.refuelCurrentShip(params)
}

const repairHandler = (value: number) => {
    player.repairCurrentShip(value)
}
</script>

<template>
    <div class="shipyard-window">
        <h3 :class="`text-${props.color}-darken-4 text-h3`">Верфь</h3>
        <v-alert
            v-if="newShip.isShowAlert"
            class="shipyard-window__alert"
            :color="props.color"
            type="success"
            variant="elevated"
            :title="`Вы приобрели корабль \'${newShip.shipName}\', Капитан!`"
            text="Новый корабль уже находится среди Ваших кораблей"
            closable
        >
            <template #prepend>
                <v-img class="shipyard-window__sink-icon" :src="`/public/assets/ships/${newShip.shipType}/${newShip.shipType}-shop.png`" />
            </template>
        </v-alert>
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
                <IconBuy class="shipyard-window__menu-icon" />
                Купить корабль
            </v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item value="ships">
                <ship-service v-if="player.currentShipId" :color="props.color" @refuel="refuelHandler" @repair="repairHandler" />
                <ship-list :ships="player.ships" :color="props.color" mode="select" :current-ship-id="player.currentShipId" :player-gold="player.gold" @select="selectShipHandler" />
            </v-tabs-window-item>
            <!--            <v-tabs-window-item value="blueprints">-->
            <!--                <h2>Мои чертежи</h2>-->
            <!--            </v-tabs-window-item>-->
            <v-tabs-window-item value="building">
                <ship-list :ships="town.currentTown.ships" :color="props.color" mode="build" :player-gold="player.gold" @build="buildShipHandler" />
            </v-tabs-window-item>
        </v-tabs-window>
    </div>
</template>

<style lang="scss">
.shipyard-window {
    &__alert {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        z-index: 2;
    }
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
    &__sink-icon {
        width: 50px;
        height: 50px;
    }
}
</style>
