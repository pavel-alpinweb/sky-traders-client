<script setup lang="ts">
import IconArmor from "/public/assets/icons/ship-params/shield.svg"
import { computed } from "vue"
import { useProgressBarColor } from "../utils/utils.ts"

const props = defineProps<{
    currentHealth: number
    maxHealth: number
}>()

const healthPercentage = computed<number>(() => props.currentHealth / (props.maxHealth / 100))
const healthBarColor = useProgressBarColor(healthPercentage)
</script>

<template>
    <div class="health-widget">
        <IconArmor class="health-widget__icon" v-tooltip="'Состояние корабля'" />
        <div class="health-widget__bar">
            <v-progress-linear :color="healthBarColor" :model-value="healthPercentage" height="20" rounded />
        </div>
    </div>
</template>

<style scoped lang="scss">
.health-widget {
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
