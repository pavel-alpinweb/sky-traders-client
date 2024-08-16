<script setup lang="ts">
import { TradeMode } from "../types/types.ts"
import { computed, ComputedRef, ref } from "vue"
import { ICONS_LIST } from "../utils/utils.ts"
import { Transaction } from "../types/interfaces.ts"

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
    (event: TradeMode, value: Transaction): void
}>()

const buySell = () => {
    if (tradeMode.value === "buy") {
        buySellEmit("buy", {
            gold: totalAmount.value,
            resourceAmount: amount.value,
        })
    } else {
        buySellEmit("sell", {
            gold: totalAmount.value,
            resourceAmount: amount.value,
        })
    }
}

const disabledAction = computed<boolean>(() => {
    return amount.value === 0 || props.resource === "" || (props.playerGold < totalAmount.value && tradeMode.value === "buy")
})

const maxAmount = computed<number>(() => {
    return tradeMode.value === "buy" ? props.maxAmount : props.playerResourceAmount
})

const inputMaxValue = () => {
    amount.value = maxAmount.value
}

const errorMessages = computed<string[]>(() => {
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
                :max="maxAmount"
                class="trade-widget__input"
                density="comfortable"
                control-variant="split"
                :color="props.color"
                variant="outlined"
                :suffix="`макс. ${maxAmount}`"
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
                :append-inner-icon="tradeMode === 'buy' ? 'mdi-minus-circle-multiple' : 'mdi-plus-circle-multiple'"
                :error-messages="errorMessages"
            >
                <template #prepend-inner>
                    <component class="trade-widget__resource" :is="ICONS_LIST.gold"></component>
                </template>
            </v-text-field>
            <div class="trade-widget__slider-wrapper">
                <v-slider class="trade-widget__slider" v-model="amount" :max="tradeMode === 'buy' ? props.maxAmount : props.playerResourceAmount" :step="1" :color="props.color">
                    <template #prepend>
                        <span class="font-weight-bold" :class="`text-${props.color}-darken-4 `">0</span>
                    </template>
                    <template #append>
                        <span class="font-weight-bold" :class="`text-${props.color}-darken-4 `">{{ maxAmount }}</span>
                    </template>
                </v-slider>
                <v-btn-group :color="props.color" variant="elevated">
                    <v-btn :color="props.color" size="x-large" :disabled="maxAmount === 0" @click="inputMaxValue">макс.</v-btn>
                </v-btn-group>
                <v-btn-group :color="props.color" variant="elevated">
                    <v-btn icon="mdi-autorenew" :color="props.color" size="x-large" v-tooltip="tradeMode === 'buy' ? 'Продать товар' : 'Купить товар'" @click="changeMode" />
                    <v-btn :color="props.color" size="x-large" @click="buySell" :disabled="disabledAction">
                        {{ tradeMode === "buy" ? "Купить" : "Продать" }}
                    </v-btn>
                </v-btn-group>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
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
        flex-basis: 100%;
    }
    &__input {
        flex-basis: 49%;
        &--readonly {
            pointer-events: none;
        }
        .v-input__details {
            display: none;
        }
    }
    &__slider-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    &__slider {
        flex-grow: 1;

        .v-input__details {
            display: none;
        }
    }
    &__resource {
        margin: 0 5px;
        @include icon-styles;
    }
}
</style>
