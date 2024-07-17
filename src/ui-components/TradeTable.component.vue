<script setup lang="ts">
import { ref, watch } from "vue"
import { ICONS_LIST } from "../utils/utils.ts"
import { ResourceTable, HEADING } from "../types/interfaces.ts"

const props = defineProps<{
    color: string
    resources: ResourceTable[]
}>()

const currentRow = ref<ResourceTable[]>([])

const selectResource = (data: unknown) => {
    const row = data as ResourceTable[]
    if (row?.length > 0) {
        currentRow.value = row
    } else {
        return
    }
}

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
        :class="`bg-${props.color}-lighten-4`"
        item-value="key"
        :items-per-page="12"
        :items="resources"
        :row-props="rowProps"
        :header-props="{ class: `bg-${props.color}-darken-1` }"
        select-strategy="single"
        show-select
        return-object
        @update:model-value="selectResource"
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
        <template #[`header.optima`]></template>
        <template #[`item.optima`]></template>
        <template #[`header.maxValue`]></template>
        <template #[`item.maxValue`]></template>
        <template #[`header.minBuyPrice`]></template>
        <template #[`item.minBuyPrice`]></template>
        <template #[`header.minSellPrice`]></template>
        <template #[`item.minSellPrice`]></template>
        <template #[`header.maxBuyPrice`]></template>
        <template #[`item.maxBuyPrice`]></template>
        <template #[`header.maxSellPrice`]></template>
        <template #[`item.maxSellPrice`]></template>
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
