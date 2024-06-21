<script setup lang="ts">
import { computed, ref } from "vue"
import { FUEL_PRICE } from "../configs/gameplay.config.ts"

const props = defineProps<{
    maxFuel: number
    currentFuel: number
}>()

const fuelAmount = ref<number>(props.currentFuel)

const fuelBill = computed(() => fuelAmount.value * FUEL_PRICE)
</script>

<template>
    <div class="ship-refueling"></div>
</template>

<style scoped lang="scss"></style>
