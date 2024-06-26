<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { FUEL_PRICE } from "../configs/gameplay.config.ts"
import { ICONS_LIST } from "../utils/utils.ts"
import IconFuelLevel from "/public/assets/icons/ship-params/fuel-level.svg"

const props = defineProps<{
    maxFuel: number
    currentFuel: number
    color: string
    id: number
    gold: number
}>()

const fuelAmount = ref<number>(0)

const fuelBill = computed(() => fuelAmount.value * FUEL_PRICE)

const maxFueling = computed(() => props.maxFuel - props.currentFuel)

const errorMessages = computed<string[]>(() => {
    const messages = []
    if (props.gold < fuelBill.value) {
        messages.push("Не хватает золота")
    }

    return messages
})

const roundedCurrentFuel = computed<number>(() => {
    return Math.round(props.currentFuel)
})

watch(
    () => props.id,
    () => {
        fuelAmount.value = 0
    }
)
</script>

<template>
    <div class="ship-refueling">
        <div class="ship-refueling__left">
            <IconFuelLevel class="ship-refueling__icon" />
        </div>
        <div class="ship-refueling__center">
            <v-text-field
                class="ship-refueling__input"
                :value="fuelBill"
                :color="props.color"
                density="comfortable"
                label="Стоимость заправки"
                variant="outlined"
                :suffix="`${fuelAmount + roundedCurrentFuel}/${maxFuel}`"
                :error-messages="errorMessages"
                readonly
                focused
            >
                <template #prepend-inner>
                    <component class="ship-refueling__gold-icon" :is="ICONS_LIST.gold"></component>
                </template>
            </v-text-field>
            <v-slider class="ship-refueling__slider" v-model="fuelAmount" :max="maxFueling" :step="1" :color="props.color" />
        </div>
        <div class="ship-refueling__right">
            <v-btn class="repair-ship__btn" size="large" variant="elevated" :color="props.color" :disabled="fuelBill === 0 || fuelBill > props.gold">Заправить</v-btn>
        </div>
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
    &__icon {
        width: 50px;
        height: 50px;
    }
}
</style>
