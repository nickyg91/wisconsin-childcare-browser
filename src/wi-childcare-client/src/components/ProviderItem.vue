<script setup lang="ts">
import type { IChildcareProvider } from '@/models/childcare-provider.interface';

defineProps<{ provider: IChildcareProvider }>();
</script>
<template>
  <div class="p-2 border-solid border-b border-b-white">
    <div>Name: {{ provider.facility_name }}</div>
    <div>Address: {{ provider.address }}, {{ provider.city }}, {{ provider.state }}</div>
    <div>Phone: {{ provider.provider_phone }}</div>
    <div>
      {{ provider.application_type }}
    </div>
    <div>Capacity: {{ provider.capacity }}</div>
  </div>
</template>

<style scoped></style>
