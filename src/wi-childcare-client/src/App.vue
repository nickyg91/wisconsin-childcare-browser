<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useDialogService } from './composables/dialog-service.composable';
const dialogService = useDialogService();
</script>

<template>
  <div class="min-h-screen">
    <header></header>
    <RouterView class="p-5" />
    <div v-for="[key, dialog] of dialogService.openDialogs.value" :key="key">
      <component :is="dialog" />
    </div>
  </div>
</template>

<style scoped></style>
