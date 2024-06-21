<script setup lang="ts">
import { computed, ref } from "vue"
import { FUEL_PRICE } from "../configs/gameplay.config.ts"
import { ICONS_LIST } from "../utils/utils.ts"

const props = defineProps<{
    maxFuel: number
    currentFuel: number
    color: string
}>()

const fuelAmount = ref<number>(props.currentFuel)

const fuelBill = computed(() => fuelAmount.value * FUEL_PRICE)
</script>

<template>
    <div class="ship-refueling">
        <div class="ship-refueling__left"></div>
        <div class="ship-refueling__center">
            <v-text-field class="ship-refueling__input" :value="fuelBill" :color="props.color" density="comfortable" label="Стоимость ремонта" variant="outlined" readonly focused>
                <template #prepend-inner>
                    <component class="ship-refueling__gold-icon" :is="ICONS_LIST.gold"></component>
                </template>
            </v-text-field>
        </div>
        <div class="ship-refueling__right"></div>
    </div>
</template>

<style scoped lang="scss">
.ship-refueling {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 15px;
    &__center {
        flex-grow: 1;
    }
    &__input {
        pointer-events: none;
    }
    &__gold-icon {
        width: 20px;
        height: 20px;
        margin: 0 5px;
    }
}
</style>
