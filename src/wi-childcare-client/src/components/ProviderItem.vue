<script setup lang="ts">
import type { IDhsProviderData } from '@/models/dhs-provider-data.interface';
import { computed } from 'vue';

const props = defineProps<{ provider: IDhsProviderData }>();
const address = computed(() => {
  return `${props.provider.address}, ${props.provider.city}, ${props.provider.state}`;
});
</script>
<template>
  <div class="p-2 border-solid border-b border-b-white rounded-lg">
    <div>Name: {{ provider.facility_name }}</div>
    <div>Address: {{ address }}</div>
    <div>Contact Name: {{ provider.contact_name }}</div>
    <div>Phone: {{ provider.provider_phone }}</div>
    <div>
      {{ provider.application_type }}
    </div>
    <div>Capacity: {{ provider.capacity }}</div>
  </div>
</template>

<style scoped></style>
