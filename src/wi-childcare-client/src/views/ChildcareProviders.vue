<script setup lang="ts">
import ProviderMap from '@/components/ProviderMap.vue';
import ProvidersList from '@/components/ProvidersList.vue';
import Input from '@/components/ui/input/Input.vue';
import { useDshSearchService } from '@/composables/api/dhs-data-search-service.composable';
import type { IDhsProviderData } from '@/models/dhs-provider-data.interface';
import { watchDebounced } from '@vueuse/core';
import { ref } from 'vue';
const dhsSearchService = useDshSearchService();
const providers = ref<IDhsProviderData[]>([]);
const county = ref<string>('');
const isLoading = ref<boolean>(false);
const selectedProvider = ref<IDhsProviderData | null>(null);
watchDebounced(
  county,
  async (newValue) => {
    if (newValue.length > 2) {
      isLoading.value = true;
      providers.value = [];
      const response = await dhsSearchService.getChildcareProvidersByCounty(newValue);
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
    <div class="flex">
      <ProvidersList
        class="max-h-lvh w-1/5 overflow-y-scroll"
        :is-loading="isLoading"
        :providers="providers"
        @provider-selected="selectedProvider = $event"
      />
      <div class="flex flex-col w-4/5 min-h-lvh">
        <div class="p-2">
          <Input v-model="county" placeholder="Enter a county" />
        </div>
        <div>
          <ProviderMap
            class="min-h-lvh"
            :providers="providers"
            :focused-provider="selectedProvider"
          />
        </div>
      </div>
    </div>

    <div class="flex"></div>
  </main>
</template>
