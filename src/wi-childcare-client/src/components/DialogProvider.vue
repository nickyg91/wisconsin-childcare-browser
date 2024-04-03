<script setup lang="ts">
import { useDialogService } from '@/composables/dialog-service.composable';

const dialogService = useDialogService(); // Assign the useDialogService function to the dialogService variable
</script>
<template>
  <div v-for="[key, dialog] of dialogService.openDialogs.value" :key="key">
    <component :is="dialog" />
  </div>
</template>

<style scoped></style>
