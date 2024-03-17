import { Loader, type LoaderOptions } from '@googlemaps/js-api-loader';
import { HomeIcon } from 'lucide-vue-next';
import { h, render } from 'vue';

export const useGoogleMaps = () => {
  let map: google.maps.Map | null = null;
  const markers: google.maps.marker.AdvancedMarkerElement[] = [];
  const createMap = async (
    mapId: string,
    selector: string,
    options: LoaderOptions,
    position: GeolocationPosition
  ) => {
    if (map != null) {
      return;
    }
    const loader = new Loader(options);
    await loader.load();
    const pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map = new google.maps.Map(document.querySelector(selector)!, {
      zoom: 12,
      center: pos,
      mapId: mapId
    });
    addMarker('Your Location', position.coords.latitude, position.coords.longitude, true);
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
        title: name,
        content: el
      });
    } else {
      marker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: new google.maps.LatLng(lat, long),
        title: name
      });
    }

    markers.push(marker);
  };

  const resetMarkers = () => {
    if (map == null) {
      return;
    }
    markers.map((marker) => {
      marker.map = null;
    });
  };

  const setLocation = (lat: number, long: number) => {
    if (map == null) {
      return;
    }
    map.setCenter(new google.maps.LatLng(lat, long));
  };

  return {
    createMap,
    addMarker,
    resetMarkers,
    setLocation
  };
};
