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
const isLoading = ref<boolean>(false);
const selectedProvider = ref<IChildcareProvider | null>(null);
watchDebounced(
  county,
  async (newValue) => {
    if (newValue.length > 2) {
      isLoading.value = true;
      providers.value = [];
      const response = await childcareSearchService.getChildcareProvidersByCounty(newValue);
      providers.value = response;
    }
    if (newValue.length === 0) {
      providers.value = [];
    }
    isLoading.value = false;
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
      <ProvidersList
        class="max-h-lvh w-1/5 overflow-y-scroll"
        :is-loading="isLoading"
        :providers="providers"
        @provider-selected="selectedProvider = $event"
      />
      <ProviderMap
        class="w-4/5 min-h-lvh"
        :providers="providers"
        :focused-provider="selectedProvider"
      />
    </div>
  </main>
</template>
