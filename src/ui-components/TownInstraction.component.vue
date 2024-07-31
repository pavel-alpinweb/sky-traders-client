<script setup lang="ts">
import IconGold from "/public/assets/icons/resources/gold.svg"

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
                <v-card-text>Главная цель вашего пребывания в городе — это торговля.</v-card-text>
                <v-card-text>
                    Торговля осуществляется на экране рынка. Спекулируя на ценах, покупая одни товары дешевле и продавая их дороже, вы зарабатываете золото
                    <IconGold class="gold-icon" />
                </v-card-text>
                <v-card-text>Каждый город специализируется на разных товарах. Одни и те же товары в разных городах будут стоить по-разному.</v-card-text>
                <v-card-text>Чтобы выгодно торговать, вам надо покупать товары в городах, где эти товары дешевле, и продавать в городах, где товары дороже.</v-card-text>
                <v-card-text>Также от города зависит объем склада. Это максимальный объем товаров, который будет вмещать в себя город.</v-card-text>
                <v-card-text>Если склад заполнен полностью, то постепенно количество товаров в нем будет уменьшаться, пока не достигнет половины объема склада.</v-card-text>
                <v-card-text>Если склад заполнен менее чем наполовину, количество товаров будет расти, пока склад не заполнится полностью.</v-card-text>
                <v-card-text>
                    В зависимости от объема склада цена на товары будет меняться. Чем меньше товара на складе, тем товар дороже. Если склад заполняется полностью, цены на товар падают.
                </v-card-text>
                <v-card-text>Экран верфи предназначен для обслуживания ваших кораблей или покупки новых.</v-card-text>
                <v-card-text>В разделе обслуживания корабля вы можете отремонтировать и заправить ваш корабль. Здесь же вы можете сменить корабль.</v-card-text>
                <v-card-text>Цена ремонта зависит от корабля и его состояния. У более дорогих кораблей цена ремонта выше.</v-card-text>
                <v-card-text>Чем хуже состояние корабля, тем дороже ремонт.</v-card-text>
                <v-card-text>В разделе покупки корабля вы можете приобрести новый корабль.</v-card-text>
                <v-card-text>
                    Более дорогие корабли имеют лучшие характеристики, в том числе и объем топлива, что позволит вам летать в более далекие города. Сражаться с пиратами также проще на более мощных
                    кораблях.
                </v-card-text>
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

.gold-icon {
    @include icon-styles;
    position: relative;
    top: 4px;
}
</style>
