<script lang="ts">
  import { onMount } from 'svelte';
  import L from 'leaflet';
  import { currentChapterId, gameState } from './stores/gameState';
  import { chapters } from './stores/chapters';

  function setMap() {
    // Default map-marker images aren't loaded correctly,
    // see: https://github.com/Leaflet/Leaflet/issues/4968
    L.Icon.Default.mergeOptions({
      imagePath: '/assets/images/leaflet/',
    });

    const zoom = $chapters[$currentChapterId].metadata.mapMarker.zoom;
    const maxZoom = Math.min(18, zoom + 10);
    const mapMarkers = [...Array(Number($currentChapterId)).keys()].map((i) => {
      const index = i + 1; // Array starts at index 0

      return new L.LatLng($chapters[index].metadata?.mapMarker.latitude,
      $chapters[index].metadata.mapMarker.longitude);
    });
    const mymap = L.map('mapid').setView(mapMarkers[mapMarkers.length - 1], zoom);

    // add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">Contributeurs OpenStreetMap</a>'
    }).addTo(mymap);

    // show the scale bar on the lower left corner
    L.control.scale().addTo(mymap);

    // show $currentChapterId's map-marker on the map
    const label = $chapters[$currentChapterId].metadata.mapMarker.label[$gameState.language];
    L.marker(mapMarkers[mapMarkers.length - 1]).addTo(mymap).bindPopup(label);

    // If map marker position change in comparison with previous chapter,
    // draw the two ones and draw a line inbetween.
    // Draw the currentchapterId mapmarker only otherwise
    if ((mapMarkers.length > 1)
      && (mapMarkers[mapMarkers.length - 1].lat !== mapMarkers[mapMarkers.length - 2].lat
      || mapMarkers[mapMarkers.length - 1].lng !== mapMarkers[mapMarkers.length - 2].lng)) {
      // show previous chapter's marker on the map
      const label = $chapters[String(Number($currentChapterId) - 1)].metadata.mapMarker.label[$gameState.language];
      L.marker(mapMarkers[mapMarkers.length - 2]).addTo(mymap).bindPopup(label);

      // Draw line between map-markers
      if (mapMarkers.length > 1) {
        L.polyline(mapMarkers.slice(mapMarkers.length - 2,), {
          dashArray: '10, 10', // see: https://developer.mozilla.org/fr/docs/Web/SVG/Attribute/stroke-dasharray
        }).addTo(mymap);
      }
    }
  }

  function waitStoresToLoad() {
    // Stores fully loaded
    if (Object.keys($chapters).length > 0 && $currentChapterId) {
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