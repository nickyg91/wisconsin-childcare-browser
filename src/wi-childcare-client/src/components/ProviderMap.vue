<script setup lang="ts">
import type { onMounted } from 'vue';
const map = new google.maps.Map(document.querySelector('.map'), {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 8
});
onMounted(() => {});
</script>
<template>
  <div class="map"></div>
</template>

<style scoped></style>
