<script setup lang="ts">
import ProviderMap from '@/components/ProviderMap.vue';
import ProvidersList from '@/components/ProvidersList.vue';
import Input from '@/components/ui/input/Input.vue';
import { useChildcareSearchService } from '@/composables/api/childcare-search-service.composable';
import type { IChildcareProvider } from '@/models/childcare-provider.interface';
import { watchDebounced } from '@vueuse/core';
import { ref } from 'vue';
const childcareSearchService = useChildcareSearchService();
const providers = ref<IChildcareProvider[]>([]);
const county = ref<string>('');
watchDebounced(
  county,
  async (newValue) => {
    if (newValue.length > 2) {
      const response = await childcareSearchService.getChildcareProvidersByCounty(newValue);
      providers.value = response;
    }
    if (newValue.length === 0) {
      providers.value = [];
    }
  },
  {
    debounce: 500
  }
);
</script>

<template>
  <main>
    <div class="p-2">
      <Input v-model="county" placeholder="Enter a county" />
    </div>

    <div class="flex">
      <ProvidersList class="max-h-lvh w-1/4 overflow-y-scroll" :providers="providers" />
      <ProviderMap class="w-3/4 min-h-lvh" :providers="providers" />
    </div>
  </main>
</template>
