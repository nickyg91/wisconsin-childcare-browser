<script setup lang="ts">
import type { IChildcareProvider } from '@/models/childcare-provider.interface';
import { computed } from 'vue';
const props = defineProps<{
  place: google.maps.places.PlaceResult;
  provider: IChildcareProvider;
}>();

const isBusiness = computed(() => {
  return props.place.business_status && props.place.business_status === 'OPERATIONAL';
});

const rating = computed(() => {
  if (isBusiness.value) {
    return {
      rating: props.place.rating,
      totalRatings: props.place.user_ratings_total,
      priceLevel: props.place.price_level,
      website: props.place.website
    };
  }
  return null;
});
</script>

<template>
  <div>
    <div>{{ isBusiness }}</div>
    <div v-if="rating">{{ JSON.stringify(rating) }}</div>
  </div>
</template>

<style scoped></style>
