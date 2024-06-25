<script setup lang="ts">
import IconFuelLevel from "/public/assets/icons/ship-params/fuel-level.svg"
import { computed } from "vue"

const props = defineProps<{
    currentFuel: number
    maxFuel: number
}>()

const fuelPercentage = computed<number>(() => props.currentFuel / (props.maxFuel / 100))
</script>

<template>
    <div class="fuel-widget">
        <IconFuelLevel class="fuel-widget__icon" v-tooltip="'Текущий запас топлива'" />
        <div class="fuel-widget__bar">
            <v-progress-linear color="green" :model-value="fuelPercentage" height="20" rounded />
        </div>
    </div>
</template>

<style scoped lang="scss">
.fuel-widget {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 300px;

    &__icon {
        width: 50px;
        height: 50px;
    }

    &__bar {
        flex-grow: 1;
    }
}
</style>
