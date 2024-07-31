<script setup lang="ts">
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
                <v-card-text>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </v-card-text>
                <v-card-text>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :color="props.color" text="Закрыть" @click="isActive.value = false"></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped lang="scss"></style>
