import { Loader, type LoaderOptions } from '@googlemaps/js-api-loader';
import { HomeIcon } from 'lucide-vue-next';
import { h, ref, render } from 'vue';
import { useMarkerEventBus } from './marker-event-bus.composable';

export const useGoogleMaps = () => {
  let isFirstLoad = true;
  const eventEmitter = useMarkerEventBus();
  let map: google.maps.Map | null = null;
  const homeLocation = ref<google.maps.LatLng | null>(null);
  const markers = new Map<string, google.maps.marker.AdvancedMarkerElement>();
  let placesService: google.maps.places.PlacesService | null = null;

  const createMap = async (
    mapId: string,
    selector: string,
    options: LoaderOptions,
    position: GeolocationPosition,
    mapLoaded: () => void
  ) => {
    if (map != null) {
      return;
    }
    const loader = new Loader(options);
    await loader.importLibrary('core');
    const pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map = new google.maps.Map(document.querySelector(selector)!, {
      zoom: 12,
      center: pos,
      mapId: mapId
    });
    isFirstLoad = true;
    map.addListener('tilesloaded', () => {
      if (isFirstLoad) {
        mapLoaded();
        isFirstLoad = false;
      }
    });
    homeLocation.value = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    addMarker('Your Location', position.coords.latitude, position.coords.longitude, true);
    placesService = new google.maps.places.PlacesService(map);
  };

  const addMarker = (name: string, lat: number, long: number, isHomeMarker = false) => {
    if (map == null) {
      return;
    }
    let marker: google.maps.marker.AdvancedMarkerElement;
    if (isHomeMarker) {
      const hIcon = h(HomeIcon, { size: 24, color: 'blue', fill: 'white' });
      const el = document.createElement('div');
      render(hIcon, el);
      marker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: new google.maps.LatLng(lat, long),
        content: el,
        gmpClickable: true
      });
    } else {
      marker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: new google.maps.LatLng(lat, long),
        title: name,
        gmpClickable: true
      });
      google.maps.event.addListener(marker, 'gmp-click', () => {
        eventEmitter.emit('marker-clicked', name);
      });
    }

    markers.set(name, marker);
  };

  const resetMarkers = () => {
    if (map == null) {
      return;
    }
    markers.forEach((marker) => {
      if (
        marker.position?.lat !== homeLocation.value?.lat() &&
        marker.position?.lng !== homeLocation.value?.lng()
      ) {
        marker.map = null;
      }
    });
  };

  const setLocation = (lat: number, long: number) => {
    if (map == null) {
      return;
    }
    map.panTo(new google.maps.LatLng(lat, long));
  };

  const setZoom = (zoom: number) => {
    if (map == null) {
      return;
    }
    map.setZoom(zoom);
  };

  const getPlaceDetailsByAddress = async (
    address: string
  ): Promise<google.maps.places.PlaceResult | null> => {
    return new Promise((resolve, reject) => {
      if (!placesService) {
        return;
      }
      placesService.findPlaceFromQuery(
        {
          query: address,
          fields: ['all']
        },
        (results, status) => {
          if (status === 'OK') {
            const foundPlace = results ? results[0] : null;
            if (foundPlace) {
              return placesService?.getDetails(
                {
                  placeId: foundPlace.place_id!,
                  fields: [
                    'website',
                    'business_status',
                    'rating',
                    'user_ratings_total',
                    'types',
                    'price_level'
                  ]
                },
                (place, status) => {
                  if (status === 'OK') {
                    resolve(place);
                  }
                }
              );
            }
          } else {
            reject(status);
          }
        }
      );
    });
  };

  const getMarkerByName = (name: string): google.maps.marker.AdvancedMarkerElement | null => {
    const marker = markers.get(name);
    if (!marker || name === 'Your Location') {
      return null;
    }
    return marker;
  };

  return {
    createMap,
    addMarker,
    resetMarkers,
    setLocation,
    setZoom,
    getPlaceDetailsByAddress,
    getMarkerByName
  };
};
