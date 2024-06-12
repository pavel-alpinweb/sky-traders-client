<script setup lang="ts">
import IconSugar from "/public/assets/icons/resources/sugar.svg"
import IconCorn from "/public/assets/icons/resources/corn.svg"
import IconSpice from "/public/assets/icons/resources/spice.svg"
import IconGrain from "/public/assets/icons/resources/grain.svg"
import IconWood from "/public/assets/icons/resources/wood.svg"
import IconHemp from "/public/assets/icons/resources/hemp.svg"
import IconCotton from "/public/assets/icons/resources/cotton.svg"
import IconGunPower from "/public/assets/icons/resources/gunpowder.svg"
import IconCoal from "/public/assets/icons/resources/coal.svg"
import IconSteel from "/public/assets/icons/resources/steel.svg"
import IconIvory from "/public/assets/icons/resources/ivory.svg"
import IconSilk from "/public/assets/icons/resources/silk.svg"
import IconGold from "/public/assets/icons/resources/gold.svg"
import { reactive } from "vue"
import { Resource } from "../types/interfaces.ts"

const props = defineProps<{
    color: string
}>()

const resources = reactive<Resource[]>([
    {
        value: 2000,
        name: "sugar",
        component: IconSugar,
    },
    {
        value: 2000,
        name: "corn",
        component: IconCorn,
    },
    {
        value: 2000,
        name: "spice",
        component: IconSpice,
    },
    {
        value: 2000,
        name: "grain",
        component: IconGrain,
    },
    {
        value: 2000,
        name: "wood",
        component: IconWood,
    },
    {
        value: 2000,
        name: "hemp",
        component: IconHemp,
    },
    {
        value: 2000,
        name: "cotton",
        component: IconCotton,
    },
    {
        value: 2000,
        name: "gunpowder",
        component: IconGunPower,
    },
    {
        value: 2000,
        name: "coal",
        component: IconCoal,
    },
    {
        value: 2000,
        name: "steel",
        component: IconSteel,
    },
    {
        value: 2000,
        name: "ivory",
        component: IconIvory,
    },
    {
        value: 2000,
        name: "silk",
        component: IconSilk,
    },
])
const gold = reactive<Resource>({
    value: 10000,
    name: "gold",
    component: IconGold,
})
</script>

<template>
    <div class="resources-panel">
        <v-sheet class="resources-panel__wrapper" :color="`${props.color}-lighten-5`" :width="615" :height="50" :elevation="10" border rounded>
            <div v-for="resource in resources" :key="resource.name" class="resources-panel__item">
                <component :is="resource.component" :class="`resources-panel__icon resources-panel__icon--${resource.name}`"></component>
                <div :class="`resources-panel__value text-${props.color}-darken-4 text-body-1 font-weight-bold`">{{ resource.value }}</div>
            </div>
        </v-sheet>
        <v-sheet class="resources-panel__wrapper" :color="`${props.color}-lighten-5`" :height="50" :elevation="10" border rounded>
            <div class="resources-panel__item">
                <component :is="gold.component" class="resources-panel__icon"></component>
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
