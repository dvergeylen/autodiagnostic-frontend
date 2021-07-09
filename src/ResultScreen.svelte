
<script lang="ts">
  import { onMount } from "svelte";
  import { gameState, sortedPlayerAttributions } from './stores/gameState';
  import Leader from './profiles/Planificateur.svelte';
  import Planificateur from './profiles/Planificateur.svelte';
  import Bricoleur from './profiles/Bricoleur.svelte';
  import Coequipier from './profiles/Coequipier.svelte';
  import Idealiste from './profiles/Idealiste.svelte';
  import Creatif from './profiles/Creatif.svelte';
  import Audacieux from './profiles/Audacieux.svelte';
  import Explorateur from './profiles/Explorateur.svelte';

  let mainProfile: string;
  let selectedProfile: string;

  const profiles = {
    leader:  {
      name: 'Le Leader',
      component: Leader,
    },
    bricoleur: {
      name: 'Le Bricoleur',
      component: Bricoleur,
    },
    coequipier: {
      name: 'Le Coéquipier',
      component: Coequipier,
    },
    planificateur: {
      name: 'Le Planificateur',
      component: Planificateur,
    },
    idealiste: {
      name: 'L\'Idéaliste',
      component: Idealiste,
    },
    creatif: {
      name: 'Le Créatif',
      component: Creatif,
    },
    audacieux: {
      name: 'L\'Audacieux',
      component: Audacieux,
    },
    explorateur: {
      name: 'L\'Explorateur',
      component: Explorateur,
    },
  };

  onMount(() => {
    window.scrollTo(0, 0);
  });

  $: mainProfile = Object.entries($gameState.attribution).reduce((acc: string, [role, score]) => (
       score > $gameState.attribution[acc] ? role : acc
     ), 'planificateur');
  $: selectedProfile = mainProfile;
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
    <h2>{profiles[mainProfile].name}</h2>
  </div>

  <div id="graph">
    <img src="/assets/profile_results.svg" alt="Graphe des résultats"/>
  </div>

  <div id="description">
    <div class="has-text-centered">
      <div id="profile-select">
        <select bind:value={selectedProfile}>
          {#each $sortedPlayerAttributions as [profile, score], i (i)}
            <option value="{profile}">{profiles[profile].name} [{score}]</option>
          {/each}
        </select>
      </div>
      <p class="caption">Clique sur les autres profils pour voir leur description</p>
    </div>
    <svelte:component this={profiles[selectedProfile].component}/>
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
    padding-top: 2em;
  }

  p.caption {
    font-size: 0.8em;
    font-style: italic;
    margin-bottom: 2em;
    margin-top: 0;
  }

  select {
    // A reset of styles, including removing the default dropdown arrow
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    cursor: inherit;

    // Stack above custom arrow
    z-index: 1;

    // Remove dropdown arrow in IE10 & IE11
    // @link https://www.filamentgroup.com/lab/select-css.html
    &::-ms-expand {
      display: none;
    }

    // Remove focus outline, will add on alternate element
    outline: none;
  }

  #profile-select {
    display: grid;
    grid-template-areas: "select";
    align-items: center;
    position: relative;
    margin: auto;
    margin-bottom: 0.5em;

    select,
    &::after {
      grid-area: select;
    }

    min-width: 15ch;
    max-width: 30ch;

    border: 1px solid #800000;
    border-radius: 0.25em;
    padding: 0.25em 0.5em;

    font-size: 1.25rem;
    cursor: pointer;
    line-height: 1.1;

    // Optional styles
    // remove for transparency
    background-color: #fff;
    background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

    // Custom arrow
    &::after {
      content: "";
      justify-self: end;
      width: 0.8em;
      height: 0.5em;
      background-color: #800000;
      clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    }
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
  .has-text-centered {
    text-align: center;
  }
</style>