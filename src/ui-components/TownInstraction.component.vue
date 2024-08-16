<script setup lang="ts">
import IconGold from "/public/assets/icons/resources/gold.svg"
import IconMarket from "/public/assets/icons/screens/market.svg"
import IconSilk from "/public/assets/icons/resources/silk.svg"
import IconShipyard from "/public/assets/icons/screens/shipyard.svg"
import IconFuel from "/public/assets/icons/ship-params/fuel.svg"
import IconArmor from "/public/assets/icons/ship-params/shield.svg"
import IconPirate from "/public/assets/icons/alerts/pirate.svg"

const props = defineProps<{
    color: string
}>()
</script>

<template>
    <v-dialog max-width="600" max-height="768">
        <template #activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" :color="`${props.color}-darken-4`" variant="elevated" size="x-large" v-tooltip="'Инструкция'" icon="mdi-help-circle" />
        </template>
        <template #default="{ isActive }">
            <v-card title="Инструкции для городов" :color="`${props.color}-lighten-5`">
                <v-card-text
                    >Главная цель вашего пребывания в городе <v-icon icon="mdi-home-city" :color="props.color" /> — это торговля
                    <v-icon icon="mdi-plus-circle-multiple" :color="props.color" />.</v-card-text
                >
                <v-card-text> Торговля осуществляется на экране рынка <IconMarket class="instruction-icon" />. </v-card-text>
                <v-card-text>
                    Спекулируя на ценах <v-icon icon="mdi-label-percent-outline" :color="props.color" />, покупая <v-icon icon="mdi-minus-circle-multiple" :color="props.color" /> одни товары
                    <IconSilk class="instruction-icon instruction-icon--silk" /> дешевле и продавая <v-icon icon="mdi-plus-circle-multiple" :color="props.color" /> их дороже , вы зарабатываете золото
                    <IconGold class="instruction-icon" />
                </v-card-text>
                <v-card-text
                    >Каждый город <v-icon icon="mdi-home-city" :color="props.color" /> специализируется на разных товарах <IconSilk class="instruction-icon instruction-icon--silk" />.
                </v-card-text>
                <v-card-text>
                    Одни и те же товары <IconSilk class="instruction-icon instruction-icon--silk" /> в разных городах <v-icon icon="mdi-home-city" :color="props.color" /> будут стоить
                    <v-icon icon="mdi-label-percent-outline" :color="props.color" /> по-разному.
                </v-card-text>
                <v-card-text>
                    Чтобы узнать специализацию города <v-icon icon="mdi-home-city" :color="props.color" />, читайте его описание <v-icon icon="mdi-script-text-outline" :color="props.color" />.
                </v-card-text>
                <v-card-text
                    >Чтобы выгодно торговать, вам надо покупать <v-icon icon="mdi-minus-circle-multiple" :color="props.color" /> товары <IconSilk class="instruction-icon instruction-icon--silk" /> в
                    городах <v-icon icon="mdi-home-city" :color="props.color" />, где эти товары <IconSilk class="instruction-icon instruction-icon--silk" /> дешевле, и продавать
                    <v-icon icon="mdi-plus-circle-multiple" :color="props.color" /> в городах <v-icon icon="mdi-home-city" :color="props.color" />, где товары дороже.</v-card-text
                >
                <v-card-text>Также от города <v-icon icon="mdi-home-city" :color="props.color" /> зависит объем склада <v-icon icon="mdi-warehouse" :color="props.color" />. </v-card-text>
                <v-card-text>
                    Это максимальный объем товаров
                    <IconSilk class="instruction-icon instruction-icon--silk" />, который будет вмещать в себя город <v-icon icon="mdi-home-city" :color="props.color" />.
                </v-card-text>
                <v-card-text
                    >Если склад <v-icon icon="mdi-warehouse" :color="props.color" /> заполнен полностью, то постепенно количество товаров <IconSilk class="instruction-icon instruction-icon--silk" /> в
                    нем будет уменьшаться <v-icon icon="mdi-package-variant-closed-minus" :color="props.color" />, пока не достигнет половины объема склада
                    <v-icon icon="mdi-warehouse" :color="props.color" />.</v-card-text
                >
                <v-card-text
                    >Если склад <v-icon icon="mdi-warehouse" :color="props.color" /> заполнен менее чем наполовину, количество товаров будет расти
                    <v-icon icon="mdi-package-variant-closed-plus" :color="props.color" />, пока склад не заполнится полностью.</v-card-text
                >
                <v-card-text>
                    В зависимости от объема склада <v-icon icon="mdi-warehouse" :color="props.color" /> цены <v-icon icon="mdi-label-percent-outline" :color="props.color" /> на товары
                    <IconSilk class="instruction-icon instruction-icon--silk" /> будут меняться.
                </v-card-text>
                <v-card-text>
                    Чем меньше товаров <IconSilk class="instruction-icon instruction-icon--silk" /> на складе <v-icon icon="mdi-warehouse" :color="props.color" />, тем товары
                    <IconSilk class="instruction-icon instruction-icon--silk" /> дороже.
                </v-card-text>
                <v-card-text>
                    Если склад <v-icon icon="mdi-warehouse" :color="props.color" /> заполняется полностью, цены <v-icon icon="mdi-label-percent-outline" :color="props.color" /> на товар
                    <IconSilk class="instruction-icon instruction-icon--silk" /> падают.
                </v-card-text>
                <v-card-text
                    >Экран верфи <IconShipyard class="instruction-icon" /> предназначен для обслуживания ваших кораблей <v-icon icon="mdi-airballoon" :color="props.color" /> или покупки
                    новых.</v-card-text
                >
                <v-card-text
                    >В разделе обслуживания корабля <v-icon icon="mdi-airballoon" :color="props.color" /> вы можете отремонтировать <IconArmor class="instruction-icon" /> и заправить
                    <IconFuel class="instruction-icon" /> ваш корабль <v-icon icon="mdi-airballoon" :color="props.color" />.
                </v-card-text>
                <v-card-text>
                    Здесь же вы можете сменить корабль
                    <v-icon icon="mdi-airballoon" :color="props.color" />.</v-card-text
                >
                <v-card-text
                    >Цена <v-icon icon="mdi-label-percent-outline" :color="props.color" /> ремонта зависит от корабля <v-icon icon="mdi-airballoon" :color="props.color" /> и его состояния
                    <IconArmor class="instruction-icon" />.</v-card-text
                >
                <v-card-text>
                    У более дорогих кораблей <v-icon icon="mdi-airballoon" :color="props.color" /> цена <v-icon icon="mdi-label-percent-outline" :color="props.color" /> ремонта выше.
                </v-card-text>
                <v-card-text>Чем хуже состояние <IconArmor class="instruction-icon" /> корабля <v-icon icon="mdi-airballoon" :color="props.color" />, тем дороже ремонт.</v-card-text>
                <v-card-text
                    >В разделе покупки корабля <v-icon icon="mdi-airballoon" :color="props.color" /> вы можете приобрести новый корабль
                    <v-icon icon="mdi-airballoon" :color="props.color" />.</v-card-text
                >
                <v-card-text>
                    Более дорогие корабли <v-icon icon="mdi-airballoon" :color="props.color" /> имеют лучшие характеристики, в том числе и объем топлива <IconFuel class="instruction-icon" />, что
                    позволит вам летать в более далекие города <v-icon icon="mdi-home-city" :color="props.color" />.
                </v-card-text>
                <v-card-text> Сражаться с пиратами <IconPirate class="instruction-icon" /> также проще на более мощных кораблях <v-icon icon="mdi-airballoon" :color="props.color" />. </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :color="props.color" text="Закрыть" @click="isActive.value = false"></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped lang="scss">
@import "/public/assets/scss/mixins.scss";

.instruction-icon {
    @include icon-styles;
    position: relative;
    top: 4px;
}
</style>
