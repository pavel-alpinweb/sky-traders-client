<script setup lang="ts">
import IconGold from "/public/assets/icons/resources/gold.svg"
import IconFuel from "/public/assets/icons/ship-params/fuel.svg"
import IconArmor from "/public/assets/icons/ship-params/shield.svg"
import IconSink from "/public/assets/icons/alerts/sink.svg"
import IconPirate from "/public/assets/icons/alerts/pirate.svg"
import IconTown from "/public/assets/icons/map/town.svg"
import IconShips from "/public/assets/icons/shipyard/zeppelin.svg"
import IconAward from "/public/assets/icons//alerts/award.svg"

const props = defineProps<{
    color: string
}>()
</script>

<template>
    <v-dialog max-width="600" max-height="90vh">
        <template #activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" :color="`${props.color}-darken-4`" variant="elevated" size="x-large" v-tooltip="'Инструкция'" icon="mdi-help-circle" />
        </template>
        <template #default="{ isActive }">
            <v-card title="Инструкции во время полетов" :color="`${props.color}-lighten-5`">
                <v-card-text>
                    Для передвижения по небу нажмите левой кнопкой мыши <v-icon icon="mdi-mouse-left-click" :color="props.color" /> на место, куда вы хотите полететь, и ваш корабль
                    <IconShips class="instruction-icon" /> начнет движение <v-icon icon="mdi-ship-wheel" :color="props.color" /> в этом направлении.
                </v-card-text>
                <v-card-text>Для ориентации используйте карту <v-icon icon="mdi-map" :color="props.color" />, которую можно вызвать в нижнем левом углу.</v-card-text>
                <v-card-text
                    >Во время передвижения <v-icon icon="mdi-ship-wheel" :color="props.color" /> ваш корабль <IconShips class="instruction-icon" /> тратит топливо
                    <IconFuel class="instruction-icon" />. Также состояние <IconArmor class="instruction-icon" /> корабля медленно ухудшается.</v-card-text
                >
                <v-card-text
                    >Если хотя бы один показатель корабля <IconArmor class="instruction-icon" /> <IconFuel class="instruction-icon" /> опустится до нуля, ваш корабль потерпит крушение
                    <IconSink class="instruction-icon" />. В этом случае вы потеряете корабль <IconShips class="instruction-icon" /> и весь ваш груз
                    <v-icon icon="mdi-train-car-container" :color="props.color" />.</v-card-text
                >
                <v-card-text>Золото <IconGold class="instruction-icon" /> при крушении <IconSink class="instruction-icon" /> не теряется.</v-card-text>
                <v-card-text>Ваш груз <v-icon icon="mdi-train-car-container" :color="props.color" /> показан на панели сверху.</v-card-text>
                <v-card-text
                    >В некоторых районах неба на вас могут напасть пираты <IconPirate class="instruction-icon" />. Цель пиратов <IconPirate class="instruction-icon" /> — уничтожить ваш корабль
                    <IconShips class="instruction-icon" /> и захватить груз <v-icon icon="mdi-train-car-container" :color="props.color" />.</v-card-text
                >
                <v-card-text>Чтобы скрыться от пиратов <IconPirate class="instruction-icon" />, вы должны приземлиться в любом из городов <IconTown class="instruction-icon" />.</v-card-text>
                <v-card-text
                    >Вы можете сразиться с пиратами <IconPirate class="instruction-icon" />. Для того чтобы стрелять по пиратам, нажмите клавишу "ПРОБЕЛ"
                    <v-icon icon="mdi-keyboard-space" :color="props.color" />.</v-card-text
                >
                <v-card-text class="instruction"
                    >За уничтожение <IconAward class="instruction-icon" /> каждого пиратского корабля <IconPirate class="instruction-icon" /> вы получаете награду в 10000
                    <IconGold class="instruction-icon"
                /></v-card-text>
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
