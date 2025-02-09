<script setup lang="ts">
/// <reference types="@types/google.maps" />
import { useGoogleMaps } from '@/composables/google-maps.composable';
import type { IDhsProviderData } from '@/models/dhs-provider-data.interface';
import { type LoaderOptions } from '@googlemaps/js-api-loader';
import { onMounted, ref, watch } from 'vue';
import { useDialogService } from '@/composables/dialog-service.composable';
import PlaceSummary from './PlaceSummary.vue';
import { useMarkerEventBus } from '@/composables/marker-event-bus.composable';
import { LoaderCircle } from 'lucide-vue-next';

const isLoading = ref(true);
const eventEmitter = useMarkerEventBus();
const dialogService = useDialogService();
const map = useGoogleMaps();
const componentEmitters = defineEmits<{
  (e: 'mapInteractable', value: boolean): void;
}>();
const props = defineProps<{
  providers: IDhsProviderData[];
  focusedProvider: IDhsProviderData | null;
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
  async (newValue) => {
    if (newValue) {
      map.setLocation(newValue.lat, newValue.long);
      map.setZoom(16);
      const place = await map.getPlaceDetailsByAddress(newValue.address);
      const marker = map.getMarkerByName(newValue.facility_name);
      if (marker) {
        google.maps.event.addListener(marker, 'gmp-click', () => {
          dialogService.showDialog('providerDetails', PlaceSummary, {
            title: newValue.facility_name,
            description: place?.formatted_address,
            props: {
              provider: newValue,
              place: place
            },
            emits: {
              closeSummary: () => {
                dialogService.closeDialog('providerDetails');
              }
            }
          });
        });
      }
    }
  }
);

onMounted(async () => {
  const key = import.meta.env.VITE_GMAPS_API_KEY as string;
  const loaderOptions = {
    apiKey: key,
    version: 'beta',
    libraries: ['places', 'maps', 'marker', 'streetView']
  } as LoaderOptions;

  navigator.geolocation.getCurrentPosition(async (position) => {
    await map.createMap('childcare-provider-map', '.map', loaderOptions, position, () => {
      componentEmitters('mapInteractable', true);
      isLoading.value = false;
    });
  });

  eventEmitter.on('marker-clicked', async (name: string) => {
    const provider = props.providers.find((p) => p.facility_name === name);
    if (provider) {
      const place = await map.getPlaceDetailsByAddress(provider.address);
      dialogService.showDialog('providerDetails', PlaceSummary, {
        title: provider.facility_name,
        description: provider.address,
        props: {
          provider: provider,
          place: place
        },
        emits: {
          closeSummary: () => {
            dialogService.closeDialog('providerDetails');
          }
        }
      });
    }
  });
});
</script>
<template>
  <div class="min-h-screen flex items-center justify-center border rounded-lg map">
    <LoaderCircle v-if="isLoading" :size="64" class="animate-spin text-red-600" />
    <div class="map"></div>
  </div>
</template>

<style scoped></style>
