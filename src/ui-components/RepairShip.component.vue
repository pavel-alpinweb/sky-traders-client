<script setup lang="ts">
import { computed } from "vue"
import { ICONS_LIST } from "../utils/utils.ts"
import IconRepair from "/public/assets/icons/ship-params/repair.svg"

const props = defineProps<{
    gold: number
    repairPrice: number
    currentHealth: number
    maxHealth: number
    color: string
}>()

const roundedCurrentHealth = computed<number>(() => {
    return Math.round(props.currentHealth)
})

const repairBill = computed<number>(() => (props.maxHealth - roundedCurrentHealth.value) * props.repairPrice)

const errorMessages = computed<string[]>(() => {
    const messages = []
    if (props.gold < repairBill.value) {
        messages.push("Не хватает золота")
    }

    return messages
})
</script>

<template>
    <div class="repair-ship">
        <IconRepair class="repair-ship__repair-icon" />
        <v-text-field
            class="repair-ship__input"
            :value="repairBill"
            :color="props.color"
            density="comfortable"
            label="Стоимость ремонта"
            variant="outlined"
            readonly
            focused
            :error-messages="errorMessages"
        >
            <template #prepend-inner>
                <component class="repair-ship__gold-icon" :is="ICONS_LIST.gold"></component>
            </template>
        </v-text-field>
        <v-btn class="repair-ship__btn" size="large" variant="elevated" :color="props.color" :disabled="repairBill === 0 || repairBill > props.gold">Ремонтировать</v-btn>
    </div>
</template>

<style scoped lang="scss">
.repair-ship {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 15px;
    &__repair-icon {
        width: 50px;
        height: 50px;
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
