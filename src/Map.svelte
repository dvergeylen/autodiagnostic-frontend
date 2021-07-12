<script lang="ts">
  import { onMount } from 'svelte';
  import L from 'leaflet';
  import { currentChapterId, gameState } from './stores/gameState';
  import { chapters } from './stores/chapters';

  let longitude: number;
  let latitude: number;
  let zoom: number;
  let maxZoom: number;
  let label: string;

  function setMap() {
    // Default map-marker images aren't loaded correctly,
    // see: https://github.com/Leaflet/Leaflet/issues/4968
    L.Icon.Default.mergeOptions({
      imagePath: '/assets/images/leaflet/',
    });

    const mymap = L.map('mapid').setView([longitude, latitude], zoom);

    // add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">Contributeurs OpenStreetMap</a>'
    }).addTo(mymap);

    // show the scale bar on the lower left corner
    L.control.scale().addTo(mymap);

    // show a marker on the map
    L.marker([longitude, latitude]).addTo(mymap)
    .bindPopup(label);
  }

  function waitStoresToLoad() {
    // Stores fully loaded
    if (Object.keys($chapters).length > 0 && $currentChapterId) {
      longitude = $chapters[$currentChapterId].metadata.mapMarker.longitude;
      latitude = $chapters[$currentChapterId].metadata?.mapMarker.latitude;
      zoom = $chapters[$currentChapterId].metadata.mapMarker.zoom;
      maxZoom = Math.min(18, zoom + 10);
      label = $chapters[$currentChapterId].metadata.mapMarker.label[$gameState.language];

      setMap();

    // Stores not fully loaded, yet
    } else {
      setTimeout(waitStoresToLoad, 10);
    }
  }

  onMount(() => {
    waitStoresToLoad();
  });

</script>

 <div id="mapid"></div>

 <style lang="scss">
   #mapid {
     height: 500px;
      position: sticky !important;
      top: 4.4em;
   }
 </style>