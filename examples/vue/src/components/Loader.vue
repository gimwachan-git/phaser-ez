<script setup>
import { useAppStore } from '@/stores/useAppStore'
import LoaderIcon from '@/components/icons/LoaderIcon.vue'

const appStore = useAppStore()
</script>

<template>
  <div class="loader" v-show="appStore.isLoading">
    <LoaderIcon />
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
