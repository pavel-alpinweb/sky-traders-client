<script setup lang="ts">
import RepairShip from "../ui-components/RepairShip.component.vue"
import ShipRefueling from "../ui-components/ShipRefueling.component.vue"
import { usePlayer } from "../store/player.store.ts"
import { RefuelParams } from "../types/interfaces.ts"

const props = defineProps<{
    color: string
}>()

const player = usePlayer()

const serviceEmits = defineEmits<{
    (event: "refuel", params: RefuelParams): void
    (event: "repair", value: number): void
}>()

const refuelHandler = (params: RefuelParams) => {
    serviceEmits("refuel", params)
}

const repairHandler = (value: number) => {
    serviceEmits("repair", value)
}
</script>

<template>
    <div class="ship-service">
        <div :class="`text-${props.color}-darken-4 shipyard-window__service-title text-h5 text-center`">Обслуживание корабля: {{ player.currentShip.name }}</div>
        <div class="ship-service__grid">
            <RepairShip
                :color="props.color"
                :current-health="player.currentShip.currentHealth"
                :max-health="player.currentShip.maxHealth"
                :repair-price="player.currentShip.repairPrice"
                :gold="player.gold"
                @repair="repairHandler"
            />
            <ShipRefueling
                :color="props.color"
                :max-fuel="player.currentShip.maxFuel"
                :current-fuel="player.currentShip.currentFuel"
                :id="player.currentShip.id"
                :gold="player.gold"
                @refuel="refuelHandler"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.ship-service {
    padding: 15px 0 0;
    &__grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 15px;
    }
}
</style>
