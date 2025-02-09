<script setup lang="ts">
import type { IDhsProviderData } from '@/models/dhs-provider-data.interface';
import ProviderItem from './ProviderItem.vue';
import { LoaderCircle } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import Input from '@/components/ui/input/Input.vue';

const props = defineProps<{ providers: IDhsProviderData[]; isLoading: boolean }>();
const emits = defineEmits<{
  (e: 'providerSelected', provider: IDhsProviderData): void;
}>();

const selectedProvider = ref<IDhsProviderData | null>(null);
const filterCriteria = ref<string>('');

const filteredProviders = computed(() => {
  return props.providers.filter((provider) => {
    return (
      provider.facility_name.toLowerCase().includes(filterCriteria.value.toLowerCase()) ||
      provider.address.toLowerCase().includes(filterCriteria.value.toLowerCase())
    );
  });
});

const onProviderSelected = (provider: IDhsProviderData) => {
  selectedProvider.value = provider;
  emits('providerSelected', provider);
};

const isSelected = (id: number) => {
  return selectedProvider.value?.id === id;
};
</script>
<template>
  <div class="p-2">
    <div class="sticky top-0 bg-white z-10">
      <Input v-model="filterCriteria" placeholder="Enter Name or Address" />
    </div>
    <div>
      <div v-if="isLoading" class="flex mt-96 justify-center">
        <LoaderCircle :size="64" class="text-red-600 animate-spin" />
      </div>
      <div v-if="filteredProviders.length > 0">
        <ProviderItem
          :class="isSelected(provider.id) ? 'bg-gray-200' : ''"
          class="hover:cursor-pointer hover:bg-gray-100 mt-3"
          v-for="provider in filteredProviders"
          :key="provider.id"
          :provider="provider"
          @click="onProviderSelected(provider)"
        />
      </div>
      <div v-if="filteredProviders.length === 0 && !isLoading" class="flex mt-96 justify-center">
        No providers found. Please type in a county to begin
      </div>
    </div>
  </div>
</template>

<style scoped></style>
