<script setup lang="ts">
import { Ship } from "../types/interfaces.ts"
import ShipCard from "./ShipCard.vue"
import { ShipCardMode } from "../types/types.ts"

const props = defineProps<{
    color: string
    ships: Ship[]
    mode: ShipCardMode
    currentShipId?: number | null
}>()

const selectShipEmit = defineEmits<{
    (event: ShipCardMode, value: Ship): void
}>()

const selectShipHandler = (ship: Ship) => {
    selectShipEmit("select", ship)
}

const buildShipHandler = (ship: Ship) => {
    selectShipEmit("build", ship)
}
</script>

<template>
    <div class="ship-list">
        <div v-for="(ship, key) in props.ships" :key="key" class="ship-list__item">
            <ShipCard :color="props.color" :mode="props.mode" :ship="ship" :variant="ship.id === currentShipId ? 'outlined' : 'tonal'" @select="selectShipHandler" @build="buildShipHandler" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.ship-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;
    padding: 15px 0;
}
</style>
