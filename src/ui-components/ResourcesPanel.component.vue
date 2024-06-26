<script setup lang="ts">
import { reactive } from "vue"
import { ResourcePanel } from "../types/interfaces.ts"
import { ICONS_LIST } from "../utils/utils.ts"

const props = defineProps<{
    color: string
    gold: number
}>()

const resources = reactive<ResourcePanel[]>([
    {
        value: 2000,
        name: "sugar",
        title: "Сахарный тростник",
    },
    {
        value: 2000,
        name: "corn",
        title: "Кукуруза",
    },
    {
        value: 2000,
        name: "spice",
        title: "Пряности",
    },
    {
        value: 2000,
        name: "grain",
        title: "Зерно",
    },
    {
        value: 2000,
        name: "wood",
        title: "Древесина",
    },
    {
        value: 2000,
        name: "hemp",
        title: "Конопля",
    },
    {
        value: 2000,
        name: "cotton",
        title: "Хлопок",
    },
    {
        value: 2000,
        name: "gunpowder",
        title: "Порох",
    },
    {
        value: 2000,
        name: "coal",
        title: "Уголь",
    },
    {
        value: 2000,
        name: "steel",
        title: "Сталь",
    },
    {
        value: 2000,
        name: "ivory",
        title: "Слоновая кость",
    },
    {
        value: 2000,
        name: "silk",
        title: "Шелк",
    },
])
const goldSlot = reactive<ResourcePanel>({
    value: props.gold,
    name: "gold",
    title: "Золото",
})
</script>

<template>
    <div class="resources-panel">
        <v-sheet class="resources-panel__wrapper" :color="`${props.color}-lighten-5`" :width="615" :height="50" :elevation="10" border rounded>
            <div v-for="resource in resources" :key="resource.name" class="resources-panel__item">
                <component :is="ICONS_LIST[resource.name]" :class="`resources-panel__icon resources-panel__icon--${resource.name}`" v-tooltip="resource.title"></component>
                <div :class="`resources-panel__value text-${props.color}-darken-4 text-body-1 font-weight-bold`">{{ resource.value }}</div>
            </div>
        </v-sheet>
        <v-sheet class="resources-panel__wrapper" :color="`${props.color}-lighten-5`" :height="50" :elevation="10" border rounded>
            <div class="resources-panel__item">
                <component :is="ICONS_LIST[goldSlot.name]" class="resources-panel__icon" v-tooltip="goldSlot.title"></component>
                <div :class="`resources-panel__value text-${props.color}-darken-4 text-body-1 font-weight-bold`">{{ goldSlot.value }}</div>
            </div>
        </v-sheet>
    </div>
</template>

<style scoped lang="scss">
@import "/public/assets/scss/mixins.scss";

.resources-panel {
    display: flex;
    align-items: center;
    gap: 10px;

    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        gap: 5px;
    }

    &__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &__icon {
        @include icon-styles;
    }
}
</style>
