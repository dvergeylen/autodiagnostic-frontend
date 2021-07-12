<script lang="ts">
  import { onMount } from 'svelte';
  import L from 'leaflet';


  onMount(() => {
    // Default map-marker images aren't loaded correctly,
    // see: https://github.com/Leaflet/Leaflet/issues/4968
    L.Icon.Default.mergeOptions({
      imagePath: '/assets/images/leaflet/',
    });

    const mymap = L.map('mapid').setView([50.63799, 5.56918], 7);

    // add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">Contributeurs OpenStreetMap</a>'
    }).addTo(mymap);

    // show the scale bar on the lower left corner
    L.control.scale().addTo(mymap);

    // show a marker on the map
    L.marker([50.63799, 5.56918]).addTo(mymap) // Sowalfin
		.bindPopup("<b>Départ du Voyage</b>");
  });
</script>

 <div id="mapid"></div>

 <style lang="scss">
   #mapid {
     height: 500px;
   }
 </style>