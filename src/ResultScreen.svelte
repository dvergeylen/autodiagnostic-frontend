
<script lang="ts">
  import { onMount } from "svelte";
  import { currentChapterId, gameState, sortedPlayerAttributions } from './stores/gameState';
  import { sendResultsTelemetry } from './telemetry';
  import Strengths from './profiles/Strengths.svelte';
  import Descriptions from './profiles/Descriptions.svelte';
  import Footer from "./Footer.svelte";

  let mainProfile: string;
  let selectedProfile: string;

  // Arbitrary order in which the profiles
  // have to be computed on the graph to match
  // labels in background svgs symbol
  const profilesOrdered = [
    "creatif",
    "audacieux",
    "leader",
    "explorateur",
    "bricoleur",
    "planificateur",
    "idealiste",
    "coequipier"
  ];

  const profiles = {
    leader:  {
      name: 'Le Leader',
      avatarName: 'Leader',
    },
    bricoleur: {
      name: 'Le Bricoleur',
      avatarName: 'Bricoleur',
    },
    coequipier: {
      name: 'Le Coéquipier',
      avatarName: 'Coequipier',
    },
    planificateur: {
      name: 'Le Planificateur',
      avatarName: 'Planificateur',
    },
    idealiste: {
      name: 'L\'Idéaliste',
      avatarName: 'Idealiste',
    },
    creatif: {
      name: 'Le Créatif',
      avatarName: 'Creatif',
    },
    audacieux: {
      name: 'L\'Audacieux',
      avatarName: 'Audacieux',
    },
    explorateur: {
      name: 'L\'Explorateur',
      avatarName: 'Explorateur',
    },
  };

  // Width, height depends on screen resolution, hence fetch them dynamically
  let width = 500;  // px
  let height = 500; // px

  // 'y' coordinates points to bottom ↓, hence the minus sign
  const coordinates = profilesOrdered.map((profile, i) => ({
    x: Math.floor(((width  / 2) + (0.85 * (width  / 2) / 10) * $gameState.attribution[profile] * Math.cos(2 * Math.PI * i * (1 / 8)))),
    y: Math.floor(((height / 2) - (0.85 * (height / 2) / 10) * $gameState.attribution[profile] * Math.sin(2 * Math.PI * i * (1 / 8)))),
  }));
  const path = coordinates.reduce((acc, coord, i) => i === 0 ? acc + `M${coord.x} ${coord.y}`: acc + ` L${coord.x} ${coord.y}`, '');

  onMount(() => {
    window.scrollTo(0, 0);

    if ($currentChapterId === '10') { // otherwise game did not finish
      sendResultsTelemetry($gameState.attribution);
    }
  });

  $: mainProfile = Object.entries($gameState.attribution).reduce((acc: string, [role, score]) => (
       score > $gameState.attribution[acc] ? role : acc
     ), 'planificateur');
  $: selectedProfile = mainProfile;
</script>


<main>
  <div id="congratulations">
    <h2>FÉLICITATIONS</h2>
    <p class="is-bold">
      Belle aventure ! Félicitations et merci d’avoir joué ! <br />
      Voici les résultats du test :
    </p>
  </div>

  <fieldset id="profile">
    <legend>Ton profil dominant</legend>
    <h2>{profiles[mainProfile].name}</h2>
  </fieldset>


  <div id="profile-avatar-container">
    <picture>
       <source srcset="assets/images/profiles/{profiles[mainProfile].avatarName}_{$gameState.gender}_Medium.png"
            media="(min-width: 769px)">
       <source srcset="assets/images/profiles/{profiles[mainProfile].avatarName}_{$gameState.gender}_Small.png"
            media="(max-width: 768px)">
      <img src="assets/images/profiles/{profiles[mainProfile].avatarName}_{$gameState.gender}_Small.png" alt="{profiles[mainProfile].name}" />
    </picture>
  </div>

  <div class="share-container">
    <a href="https://www.badgee.net" target="_blank" rel="noopener noreferrer">Valorise ces compétences avec Badg'ee</a>
  </div>

  <Strengths profileName={selectedProfile} />

  <fieldset id="graph-title">
    <legend>
      <svg class="icon magnifying-glass">
        <use href='assets/sprite_icons.svg#search' />
      </svg>
      TES RÉSULTATS DÉTAILLÉS :
    </legend>
  </fieldset>
  <div id="graph-container">
    <svg id="graph" viewBox="0 0 500 500">
      <use href='assets/sprite_results.svg#results-background' xlink:href='assets/sprite_results.svg#results-background' />
      <path d="{path} Z" stroke="var(--color-primary)" stroke-width="3" fill="#FF505099"/>
      {#each profilesOrdered as profile, i (i)}
        <circle cx="{coordinates[i].x}" cy="{coordinates[i].y}" r="5" fill="#FF5050"/>
      {/each}

      Votre navigateur ne permet pas d'afficher le graphe des résultats.
    </svg>
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
    <Descriptions profileName={selectedProfile} />
  </div>
</main>

<Footer />

<style lang="scss">
  #congratulations {
    h2 {
      background-color: var(--color-primary);
      color: white;
      font-weight: 900;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
      font-size: 2em;
    }
    p {
      font-size: 0.8em;
    }
  }

  #profile {
    margin-top: 1em;
    margin-bottom: 2em;
    border: 5px solid red;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 0.25em;

    legend {
      margin: auto;
      padding-left: 5%;
      padding-right: 5%;
      font-weight: 700;
    }
    h2 {
      font-weight: 900;
      margin-top: 0.15em;
      margin-bottom: 0;
      font-size: 2em;
    }
  }

  #profile-avatar-container {
    max-width: 90%;
    margin: auto;

    img {
      height: auto;
      width: 100%;
      max-width: 25em;
      max-height: 25em;
    }
  }

  fieldset#graph-title {
    border-style: solid none none none;
    border-top: 3px solid red;
    margin-top: 2.5em;
    legend {
      margin: auto;
      padding-left: 5%;
      padding-right: 5%;
      font-weight: 900;
    }
  }

  .magnifying-glass {
    fill: red;
    margin-right: 0.5em;
    vertical-align: top;
  }

  #graph-container {
    width: 100%;
    max-width: 25em;
    margin: auto;
  }

  #graph {
    width: 100%;
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

    border: 1px solid var(--color-primary);
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
      background-color: var(--color-primary);
      clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    }
  }
</style>