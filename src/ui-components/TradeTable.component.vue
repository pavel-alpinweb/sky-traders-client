<script setup lang="ts">
import { reactive, ref, watch } from "vue"
import { ICONS_LIST } from "../utils/utils.ts"
import { ResourceTable, HEADING } from "../types/interfaces.ts"

const props = defineProps<{
    color: string
}>()

const items = reactive<ResourceTable[]>([
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

const currentRow = ref<ResourceTable[]>([])

const rowProps = (data: Record<string, ResourceTable>) => {
    return {
        class: {
            [`bg-${props.color}-accent-1`]: data.item.key === currentRow.value[0]?.key,
        },
    }
}

const toggleResource = defineEmits<{
    (event: "toggle", value: ResourceTable): void
}>()

watch(currentRow, () => {
    toggleResource("toggle", currentRow.value[0])
})
</script>

<template>
    <v-data-table
        v-model="currentRow"
        :class="`bg-${props.color}-lighten-4`"
        item-value="key"
        :items-per-page="12"
        :items="items"
        :row-props="rowProps"
        :header-props="{ class: `bg-${props.color}-darken-1` }"
        select-strategy="single"
        show-select
        return-object
    >
        <template #[`header.${[HEADING.NAME]}`]="{ column }">
            <span class="text-white font-weight-bold">{{ column.title }}</span>
        </template>
        <template #[`header.${[HEADING.VALUE]}`]="{ column }">
            <span class="text-white font-weight-bold">{{ column.title }}</span>
        </template>
        <template #[`header.${[HEADING.BUY_PRICE]}`]="{ column }">
            <span class="text-white font-weight-bold">{{ column.title }}</span>
        </template>
        <template #[`header.${[HEADING.SELL_PRICE]}`]="{ column }">
            <span class="text-white font-weight-bold">{{ column.title }}</span>
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
@import "/public/assets/scss/mixins.scss";

.trade-table {
    &__item {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    &__icon {
        @include icon-styles;
    }
}
</style>
