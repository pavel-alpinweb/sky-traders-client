<script setup lang="ts">
import Test from "../ui-components/Test.component.vue"
import { router } from "../router.ts"

const goToMap = () => {
    router.push({ path: "/game" })
}
</script>

<template>
    <div class="town-screen">
        <button @click="goToMap">Покинуть город</button>
        <Test />
    </div>
</template>

<style scoped lang="scss">
.town-screen {
    width: 100vw;
    height: 100vh;
    background-color: #a7efff;
}
</style>
