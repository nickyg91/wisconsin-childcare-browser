<script setup lang="ts">
/// <reference types="@types/google.maps" />
import { useGoogleMaps } from '@/composables/google-maps.composable';
import type { IChildcareProvider } from '@/models/childcare-provider.interface';
import { type LoaderOptions } from '@googlemaps/js-api-loader';
import { onMounted, watch } from 'vue';
const map = useGoogleMaps();
const props = defineProps<{
  providers: IChildcareProvider[];
  focusedProvider: IChildcareProvider | null;
}>();
watch(
  () => props.providers,
  (newValue) => {
    if (newValue.length > 0) {
      map.resetMarkers();
      newValue.forEach((provider) => {
        map.addMarker(provider.facility_name, provider.lat, provider.long);
      });
      map.setLocation(newValue[0].lat, newValue[0].long);
    }
  },
  {
    immediate: true
  }
);
watch(
  () => props.focusedProvider,
  (newValue) => {
    if (newValue) {
      map.setLocation(newValue.lat, newValue.long);
      map.setZoom(16);
    }
  }
);

onMounted(async () => {
  const key = import.meta.env.VITE_GMAPS_API_KEY as string;
  const loaderOptions = {
    apiKey: key,
    version: 'weekly',
    libraries: ['places', 'maps', 'marker', 'streetView']
  } as LoaderOptions;

  navigator.geolocation.getCurrentPosition(async (position) => {
    await map.createMap('childcare-provider-map', '.map', loaderOptions, position);
  });
});
</script>
<template>
  <div class="map"></div>
</template>

<style scoped></style>
