<script setup lang="ts">
import { RouterView } from 'vue-router';
import DialogProvider from '@/components/DialogProvider.vue';
</script>

<template>
  <div class="min-h-screen">
    <header></header>
    <RouterView class="p-5" />
    <DialogProvider />
  </div>
</template>

<style scoped></style>
