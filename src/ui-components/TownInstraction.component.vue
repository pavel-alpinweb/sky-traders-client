<script setup lang="ts">
import IconGold from "/public/assets/icons/resources/gold.svg"

const props = defineProps<{
    color: string
}>()
</script>

<template>
    <v-dialog max-width="600" scrollable>
        <template #activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" :color="`${props.color}-darken-4`" variant="elevated" size="x-large" v-tooltip="'Инструкция'" icon="mdi-help-circle" />
        </template>
        <template #default="{ isActive }">
            <v-card title="Инструкции во время полетов" :color="`${props.color}-lighten-5`">
                <v-card-text>Для передвижения по небу нажмите левой кнопкой мыши на место, куда вы хотите полететь, и ваш корабль начнет движение в этом направлении.</v-card-text>
                <v-card-text>
                    Для передвижения по небу нажмите левой кнопкой мыши на место, куда вы хотите полететь, и ваш корабль начнет движение в этом направлении.
                    <IconGold class="gold-icon" />
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
