<script setup lang="ts">
import type { IChildcareProvider } from '@/models/dhs-provider-data.interface';
import ProviderItem from './ProviderItem.vue';
import { LoaderCircle } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import Input from '@/components/ui/input/Input.vue';

const props = defineProps<{ providers: IChildcareProvider[]; isLoading: boolean }>();
const emits = defineEmits<{
  (e: 'providerSelected', provider: IChildcareProvider): void;
}>();

const selectedProvider = ref<IChildcareProvider | null>(null);
const filterCriteria = ref<string>('');

const filteredProviders = computed(() => {
  return props.providers.filter((provider) => {
    return (
      provider.facility_name.toLowerCase().includes(filterCriteria.value.toLowerCase()) ||
      provider.address.toLowerCase().includes(filterCriteria.value.toLowerCase())
    );
  });
});

const onProviderSelected = (provider: IChildcareProvider) => {
  selectedProvider.value = provider;
  emits('providerSelected', provider);
};

const isSelected = (id: number) => {
  return selectedProvider.value?.id === id;
};
</script>
<template>
  <div class="p-2">
    <div v-if="isLoading" class="flex mt-96 justify-center">
      <LoaderCircle :size="64" class="animate-spin text-gray-800" />
    </div>
    <div v-if="filteredProviders.length > 0">
      <Input v-model="filterCriteria" placeholder="Enter Name or Address" />
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
</template>

<style scoped></style>
@/models/dhs-provider-data.interface
