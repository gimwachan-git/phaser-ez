<script setup>
import { ref, defineAsyncComponent } from "vue";
import Loader from "@/components/Loader.vue";

const phaserRef = ref();
const PhaserGame = defineAsyncComponent(() => import("./game/PhaserGame.vue"));
</script>

<template>
  <div>
    <client-only>
      <PhaserGame ref="phaserRef" />
    </client-only>
    <Loader />
  </div>
</template>
