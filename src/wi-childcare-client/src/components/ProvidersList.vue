<script setup lang="ts">
import type { IChildcareProvider } from '@/models/childcare-provider.interface';
import ProviderItem from './ProviderItem.vue';

defineProps<{ providers: IChildcareProvider[] }>();
</script>
<template>
  <div class="p-1">
    <ProviderItem v-for="provider in providers" :key="provider.id" :provider="provider" />
  </div>
</template>

<style scoped></style>
