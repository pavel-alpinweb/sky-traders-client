<script setup lang="ts">
import { reactive } from "vue"
import { Resource } from "../types/interfaces.ts"
import { ICONS_LIST } from "../utils/utils.ts"

const props = defineProps<{
    color: string
}>()

const resources = reactive<Resource[]>([
    {
        value: 2000,
        name: "sugar",
    },
    {
        value: 2000,
        name: "corn",
    },
    {
        value: 2000,
        name: "spice",
    },
    {
        value: 2000,
        name: "grain",
    },
    {
        value: 2000,
        name: "wood",
    },
    {
        value: 2000,
        name: "hemp",
    },
    {
        value: 2000,
        name: "cotton",
    },
    {
        value: 2000,
        name: "gunpowder",
    },
    {
        value: 2000,
        name: "coal",
    },
    {
        value: 2000,
        name: "steel",
    },
    {
        value: 2000,
        name: "ivory",
    },
    {
        value: 2000,
        name: "silk",
    },
])
const gold = reactive<Resource>({
    value: 5000,
    name: "gold",
})
</script>

<template>
    <div class="resources-panel">
        <v-sheet class="resources-panel__wrapper" :color="`${props.color}-lighten-5`" :width="615" :height="50" :elevation="10" border rounded>
            <div v-for="resource in resources" :key="resource.name" class="resources-panel__item">
                <component :is="ICONS_LIST[resource.name]" :class="`resources-panel__icon resources-panel__icon--${resource.name}`"></component>
                <div :class="`resources-panel__value text-${props.color}-darken-4 text-body-1 font-weight-bold`">{{ resource.value }}</div>
            </div>
        </v-sheet>
        <v-sheet class="resources-panel__wrapper" :color="`${props.color}-lighten-5`" :height="50" :elevation="10" border rounded>
            <div class="resources-panel__item">
                <component :is="ICONS_LIST[gold.name]" class="resources-panel__icon"></component>
                <div :class="`resources-panel__value text-${props.color}-darken-4 text-body-1 font-weight-bold`">{{ gold.value }}</div>
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
