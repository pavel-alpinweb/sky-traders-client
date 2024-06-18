<script setup lang="ts">
import { Ship } from "../types/interfaces.ts"
import ShipCard from "./ShipCard.vue"

const props = defineProps<{
    color: string
    ships: Ship[]
}>()
</script>

<template>
    <div class="ship-list">
        <div v-for="(ship, key) in props.ships" :key="key" class="ship-list__item">
            <ShipCard :color="props.color" mode="select" :ship="ship" />
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
