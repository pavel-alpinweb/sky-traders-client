<script setup lang="ts">
import Test from "../ui-components/Test.component.vue"
import { router } from "../router.ts"

const goToMap = () => {
    router.push({ path: "/game" })
}
</script>

<template>
    <div class="town-screen">
        <h1>Town screen</h1>
        <button @click="goToMap">Покинуть город</button>
        <Test />
    </div>
</template>

<style scoped lang="scss"></style>
