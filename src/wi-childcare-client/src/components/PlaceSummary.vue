<script setup lang="ts">
import type { IChildcareProvider } from '@/models/childcare-provider.interface';
import { SquareArrowOutUpRightIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { computed } from 'vue';
const props = defineProps<{
  place: google.maps.places.PlaceResult;
  provider: IChildcareProvider;
}>();

defineEmits<{
  (e: 'closeSummary'): void;
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
    <div>
      <div>
        <label for="address" class="font-bold"> Address </label>
        <div>{{ provider.address }}</div>
      </div>
      <div class="mt-2">
        <label for="address" class="font-bold"> Contact Name </label>
        <div>{{ provider.contact_name }}</div>
      </div>
      <div class="mt-2">
        <label for="phone" class="font-bold"> Phone </label>
        <div>{{ provider.provider_phone }}</div>
      </div>
      <div class="mt-2">
        <label for="phone" class="font-bold"> Capacity </label>
        <div>{{ provider.capacity }}</div>
      </div>
      <div class="mt-2">
        <label for="capacity" class="font-bold"> Type </label>
        <div>{{ provider.application_type }}</div>
      </div>
    </div>
    <div class="mt-2" v-if="rating">
      <div>
        <label for="rating" class="font-bold"> Rating </label>
        <div>{{ rating.rating }} / 5</div>
      </div>
      <div class="mt-2">
        <label for="total user ratings" class="font-bold"> Total User Ratings </label>
        <div>{{ rating.totalRatings }}</div>
      </div>
      <div v-if="rating.priceLevel" class="mt-2">
        <label for="rating" class="font-bold"> Price Level </label>
        <div>{{ rating.priceLevel }}</div>
      </div>
      <div class="mt-2">
        <label for="website" class="font-bold"> Website </label>
        <div class="flex">
          <div>
            <a
              class="text-blue-500 flex"
              :href="rating.website"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>{{ rating.website }}</div>
              <div class="ml-2">
                <SquareArrowOutUpRightIcon class="text-blue-500" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <Button class="btn-danger" @click="$emit('closeSummary')"> Close </Button>
    </div>
  </div>
</template>

<style scoped></style>
