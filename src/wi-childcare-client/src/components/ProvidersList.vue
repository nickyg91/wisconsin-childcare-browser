<script setup lang="ts">
import type { IChildcareProvider } from '@/models/childcare-provider.interface';
import ProviderItem from './ProviderItem.vue';

defineProps<{ providers: IChildcareProvider[] }>();
</script>
<template>
  <div class="p-1">
    <div v-if="providers.length > 0">
      <ProviderItem
        class="hover:cursor-pointer hover:bg-gray-100"
        v-for="provider in providers"
        :key="provider.id"
        :provider="provider"
      />
    </div>
    <div v-else class="mt-96">No providers found. Please type in a county to begin</div>
  </div>
</template>

<style scoped></style>
