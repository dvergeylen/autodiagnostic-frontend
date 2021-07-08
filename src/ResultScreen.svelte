
<script lang="ts">
  import { onMount } from "svelte";
  import Planificateur from './profiles/Planificateur.svelte';

  const profiles = {
    planificateur: Planificateur,
  }
  let selectedProfile = 'planificateur';

  onMount(() => {
   window.scrollTo(0, 0);
  });
</script>
<main>
  <div id="congratulations">
    <h1>Félicitations!</h1>
    <p>
      Belle aventure ! Félicitations et merci d’avoir joué ! <br />
      Voici les résultats du test :
    </p>
  </div>

  <div id="profile">
    <h3>Ton profil:</h3>
    <h2>Le planificateur</h2>
  </div>

  <div id="graph">
    <img src="/assets/profile_results.svg" alt="Graphe des résultats"/>
  </div>

  <div id="description">
    <svelte:component this={profiles[selectedProfile]} score={5}/>
  </div>
</main>

<style lang="scss">

  #profile {
    color: white;
    background-color: #800000;
    margin-top: 1em;
    margin-bottom: 2em;
    h2 {
      margin-top: 0.15em;
      margin-bottom: 0.5em;
      font-size: 2em;
    }
    h3 {
      margin-bottom: 0;
    }
  }

  #graph {
    img {
      width: 80%;
      max-width: 25em;
    }
  }

  #description {
    text-align: left;
    max-width: 35em;
    margin: auto;
  }

  // Commons
  main {
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    // Phones
    @media (max-width: 768px) {
      max-width: 50em;
    }

    // Tablets
    @media (min-width: 769px) and (max-width: 1023px) {
      margin-left: auto;
      margin-right: auto;
      min-width: 90%;
    }

    // Desktops
    @media (min-width: 1024px) {
      max-width: 50em;
      margin-left: auto;
      margin-right: auto;
      min-width: 50%;
    }
  }
</style>