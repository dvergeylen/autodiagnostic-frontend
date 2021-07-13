<script lang="ts">
  import { onMount } from 'svelte';
  import { currentChapterId, gameState } from './stores/gameState';
  import { chapters } from './stores/chapters';

  let twoDigitsChapterId: string;
  let storesLoaded: boolean = false;
  let chapterDate: string;

  function waitStoresToLoad() {
    // Stores fully loaded
    if (Object.keys($chapters).length > 0) {
      storesLoaded = true;
      chapterDate = new Intl.DateTimeFormat('fr-FR', {month: "long", day: '2-digit'}).format(new Date($chapters[$currentChapterId].metadata.date));

    // Stores not fully loaded, yet
    } else {
      setTimeout(waitStoresToLoad, 10);
    }
  }

  onMount(waitStoresToLoad);

  $: twoDigitsChapterId = $currentChapterId.padStart(2, '0');
</script>

<div id="intro">
  <div id="titles">
    <h1>CHAPITRE {twoDigitsChapterId} :</h1>
    {#if storesLoaded}
      <h3>{$chapters[$currentChapterId].metadata.title[$gameState.language]}</h3>
      <h5 id="date">{chapterDate}</h5>
      <progress max="10" value="{$currentChapterId}"> {Number($currentChapterId) * 10}% </progress>
    {/if}
  </div>
</div>

<style lang="scss">
  #intro {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #800000;
    height: 100%;

    // Phones
    @media (max-width: 767px) {
      background-image: url('/assets/images/intros/chapitre01_portrait.jpg');
    }

    // Tablets, Desktops
    @media (min-width: 768px) {
      background-image: url('/assets/images/intros/chapitre01_landscape.jpg');
    }
  }


  #titles {
    background-color: #800000AA;
    color: white;
    padding-top: 1em;
    padding-bottom: 1em;
    margin-top: 40em;

    h1, h3, h5{
      margin: 0;
    }
    h5#date {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
      font-style: italic;
      font-weight: 400;
    }
  }
</style>