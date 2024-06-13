<script setup lang="ts">
import { TradeMode } from "../types/types.ts"
import { computed, ComputedRef, ref } from "vue"
import { ICONS_LIST } from "../utils/utils.ts"

const props = defineProps<{
    maxAmount: number
    sellPrice: number
    buyPrice: number
    color: string
    resource: string
    playerGold: number
    playerResourceAmount: number
}>()

const tradeMode = ref<TradeMode>("buy")
const amount = ref<number>(0)

const totalAmount: ComputedRef<number> = computed(() => (tradeMode.value === "buy" ? amount.value * props.sellPrice : amount.value * props.buyPrice))
const changeMode = () => {
    tradeMode.value = tradeMode.value === "buy" ? "sell" : "buy"
}

const buySellEmit = defineEmits<{
    (event: "buy", value: number): void
    (event: "sell", value: number): void
}>()

const buySell = () => {
    if (tradeMode.value === "buy") {
        buySellEmit("buy", amount.value)
    } else {
        buySellEmit("sell", amount.value)
    }
}

const disabledAction = computed(() => {
    return amount.value === 0 || props.resource === "" || (props.playerGold < totalAmount.value && tradeMode.value === "buy")
})

const errorMessages = computed(() => {
    const messages = []
    if (props.playerGold < totalAmount.value && tradeMode.value === "buy") {
        messages.push("Не хватает золота")
    }

    return messages
})
</script>

<template>
    <div class="trade-widget">
        <div class="trade-widget__center-control">
            <v-number-input
                v-model="amount"
                :max="tradeMode === 'buy' ? props.maxAmount : props.playerResourceAmount"
                class="trade-widget__input"
                density="comfortable"
                control-variant="split"
                :color="props.color"
                variant="outlined"
                :suffix="`макс. ${props.maxAmount}`"
                label="Количество"
            >
                <template #prepend-inner>
                    <component :class="`trade-widget__resource trade-widget__resource--${props.resource}`" :is="ICONS_LIST[props.resource]"></component>
                </template>
            </v-number-input>
            <v-text-field
                :value="totalAmount"
                class="trade-widget__input trade-widget__input--readonly"
                :color="props.color"
                density="comfortable"
                readonly
                variant="outlined"
                :label="`Общая стоимость ${tradeMode === 'buy' ? 'покупки' : 'продажи'}`"
                focused
                :append-inner-icon="tradeMode === 'buy' ? 'mdi-cash-minus' : 'mdi-cash-plus'"
                :error-messages="errorMessages"
            >
                <template #prepend-inner>
                    <component class="trade-widget__resource" :is="ICONS_LIST.gold"></component>
                </template>
            </v-text-field>
            <v-slider class="trade-widget__slider" v-model="amount" :max="tradeMode === 'buy' ? props.maxAmount : props.playerResourceAmount" :step="1" :color="props.color" />
        </div>
        <div class="trade-widget__right-control">
            <v-btn-group color="green" variant="elevated">
                <v-btn :icon="tradeMode === 'buy' ? 'mdi-cash-plus' : 'mdi-cash-minus'" :color="props.color" size="x-large" @click="changeMode" />
                <v-btn :color="props.color" size="x-large" @click="buySell" :disabled="disabledAction">
                    {{ tradeMode === "buy" ? "Купить" : "Продать" }}
                </v-btn>
            </v-btn-group>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "/public/assets/scss/mixins.scss";

.trade-widget {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 15px 5px;
    position: relative;
    &__center-control {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        flex-basis: 80%;
    }
    &__right-control {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    &__input {
        flex-grow: 1;
        &--readonly {
            pointer-events: none;
        }
    }
    &__slider {
        width: 100%;
    }
    &__resource {
        margin: 0 5px;
        @include icon-styles;
    }
}
</style>
