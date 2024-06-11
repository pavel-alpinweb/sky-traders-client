<script setup lang="ts">
import { reactive } from "vue"
import { ICONS_LIST } from "../utils/utils.ts"

const props = defineProps<{
    color: string
}>()

const HEADING = {
    NAME: "Название",
    VALUE: "Количество на складе",
    BUY_PRICE: "Цена покупки",
    SELL_PRICE: "Цена продажи",
}

const items = reactive([
    {
        [HEADING.NAME]: "Сахарный тростник",
        key: "sugar",
        [HEADING.VALUE]: 262,
        [HEADING.BUY_PRICE]: 16,
        [HEADING.SELL_PRICE]: 23,
    },
    {
        [HEADING.NAME]: "Кукуруза",
        key: "corn",
        [HEADING.VALUE]: 262,
        [HEADING.BUY_PRICE]: 16,
        [HEADING.SELL_PRICE]: 23,
    },
    {
        [HEADING.NAME]: "Пряности",
        key: "spice",
        [HEADING.VALUE]: 262,
        [HEADING.BUY_PRICE]: 16,
        [HEADING.SELL_PRICE]: 23,
    },
    {
        [HEADING.NAME]: "Зерно",
        key: "grain",
        [HEADING.VALUE]: 262,
        [HEADING.BUY_PRICE]: 16,
        [HEADING.SELL_PRICE]: 23,
    },
    {
        [HEADING.NAME]: "Древесина",
        key: "wood",
        [HEADING.VALUE]: 262,
        [HEADING.BUY_PRICE]: 16,
        [HEADING.SELL_PRICE]: 23,
    },
    {
        [HEADING.NAME]: "Конопля",
        key: "hemp",
        [HEADING.VALUE]: 262,
        [HEADING.BUY_PRICE]: 16,
        [HEADING.SELL_PRICE]: 23,
    },
    {
        [HEADING.NAME]: "Хлопок",
        key: "cotton",
        [HEADING.VALUE]: 262,
        [HEADING.BUY_PRICE]: 16,
        [HEADING.SELL_PRICE]: 23,
    },
    {
        [HEADING.NAME]: "Порох",
        key: "gunpowder",
        [HEADING.VALUE]: 262,
        [HEADING.BUY_PRICE]: 16,
        [HEADING.SELL_PRICE]: 23,
    },
    {
        [HEADING.NAME]: "Уголь",
        key: "coal",
        [HEADING.VALUE]: 262,
        [HEADING.BUY_PRICE]: 16,
        [HEADING.SELL_PRICE]: 23,
    },
    {
        [HEADING.NAME]: "Сталь",
        key: "steel",
        [HEADING.VALUE]: 262,
        [HEADING.BUY_PRICE]: 16,
        [HEADING.SELL_PRICE]: 23,
    },
    {
        [HEADING.NAME]: "Слоновая кость",
        key: "ivory",
        [HEADING.VALUE]: 262,
        [HEADING.BUY_PRICE]: 16,
        [HEADING.SELL_PRICE]: 23,
    },
    {
        [HEADING.NAME]: "Шелк",
        key: "silk",
        [HEADING.VALUE]: 262,
        [HEADING.BUY_PRICE]: 16,
        [HEADING.SELL_PRICE]: 23,
    },
])
</script>

<template>
    <v-data-table :class="`bg-${props.color}-lighten-4`" :items-per-page="12" :items="items" show-select>
        <template #[`header.${[HEADING.NAME]}`]="{ column }">
            <span :class="`text-${props.color}-darken-4 font-weight-bold`">{{ column.title }}</span>
        </template>
        <template #[`header.${[HEADING.VALUE]}`]="{ column }">
            <span :class="`text-${props.color}-darken-4 font-weight-bold`">{{ column.title }}</span>
        </template>
        <template #[`header.${[HEADING.BUY_PRICE]}`]="{ column }">
            <span :class="`text-${props.color}-darken-4 font-weight-bold`">{{ column.title }}</span>
        </template>
        <template #[`header.${[HEADING.SELL_PRICE]}`]="{ column }">
            <span :class="`text-${props.color}-darken-4 font-weight-bold`">{{ column.title }}</span>
        </template>
        <template #[`item.${HEADING.NAME}`]="{ item }">
            <div class="trade-table__item">
                <component :class="`trade-table__icon trade-table__icon--${item.key}`" :is="ICONS_LIST[item.key]"></component>
                <span :class="`text-${props.color}-darken-4`">{{ item[HEADING.NAME] }}</span>
            </div>
        </template>
        <template #[`item.${HEADING.VALUE}`]="{ item }">
            <div class="trade-table__item">
                <span :class="`text-${props.color}-darken-4`">{{ item[HEADING.VALUE] }}</span>
            </div>
        </template>
        <template #[`item.${HEADING.BUY_PRICE}`]="{ item }">
            <div class="trade-table__item">
                <span :class="`text-${props.color}-darken-4`">{{ item[HEADING.BUY_PRICE] }}</span>
                <component class="trade-table__icon" :is="ICONS_LIST.gold"></component>
            </div>
        </template>
        <template #[`item.${HEADING.SELL_PRICE}`]="{ item }">
            <div class="trade-table__item">
                <span :class="`text-${props.color}-darken-4`">{{ item[HEADING.SELL_PRICE] }}</span>
                <component class="trade-table__icon" :is="ICONS_LIST.gold"></component>
            </div>
        </template>
        <template #[`header.key`]></template>
        <template #[`item.key`]></template>
        <template #bottom></template>
    </v-data-table>
</template>

<style scoped lang="scss">
@import "/public/assets/scss/variables.scss";

.trade-table {
    &__item {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    &__icon {
        width: 20px;
        height: 20px;
        @each $name, $attr in $resourcesMap {
            &--#{$name} {
                fill: $attr;
                color: $attr;
            }
        }
    }
}
</style>
