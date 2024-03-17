<script setup lang="ts">
import type { IChildcareProvider } from '@/models/childcare-provider.interface';
import ProviderItem from './ProviderItem.vue';
import { LoaderCircle } from 'lucide-vue-next';

defineProps<{ providers: IChildcareProvider[]; isLoading: boolean }>();
defineEmits<{
  (e: 'provider-selected', provider: IChildcareProvider): void;
}>();
</script>
<template>
  <div class="p-1">
    <div v-if="isLoading" class="flex mt-96 justify-center">
      <LoaderCircle :size="64" class="animate-spin text-gray-800" />
    </div>
    <div v-if="providers.length > 0">
      <ProviderItem
        class="hover:cursor-pointer hover:bg-gray-100"
        v-for="provider in providers"
        :key="provider.id"
        :provider="provider"
        @click="() => $emit('provider-selected', provider)"
      />
    </div>
    <div v-if="providers.length === 0 && !isLoading" class="flex mt-96 justify-center">
      No providers found. Please type in a county to begin
    </div>
  </div>
</template>

<style scoped></style>
