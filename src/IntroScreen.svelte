<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { currentChapterId, gameState } from './stores/gameState';
  import { chapters } from './stores/chapters';

  const dispatch = createEventDispatcher();
  let twoDigitsChapterId: string;
  let storesLoaded: boolean = false;
  let chapterDate: string;

  function abortTimer() {
    dispatch('abortTimer', {});
  }

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

<div id="intro" on:click={abortTimer}>
  <div id="titles">
    <h1>CHAPITRE {twoDigitsChapterId} :</h1>
    {#if storesLoaded}
      <p id="subtitle">{@html $chapters[$currentChapterId].metadata.title[$gameState.language]}</p>
      <p id="date">{chapterDate}</p>
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
    background-repeat: no-repeat;
    background-position: center;
    background-color: var(--color08);
    height: 100%;

    // Phones
    @media (max-width: 767px) {
      background-image: url('/assets/images/intros/chapitre01_portrait.jpg');
      background-size: cover;
    }

    // Tablets, Desktops
    @media (min-width: 768px) {
      background-image: url('/assets/images/intros/chapitre01_landscape.jpg');
      background-size: contain;
    }
  }


  #titles {
    background-color: var(--color08);
    opacity: 0.85;
    padding-top: 1em;
    padding-bottom: 1em;

    // Phones
    @media (max-width: 767px) {
      margin-top: 100%;
    }

    // Tablets, Desktops
    @media (min-width: 768px) {
      margin-top: 40em;
    }

    h1 {
      font-size: x-large;
      margin: 0;
      color: white;
    }
    p#subtitle {
      margin: 0;
      color: white;
      padding: 1em 0.5em 1em 0.5em;
    }
    p#date {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
      font-weight: 400;
      color: white;
    }
  }
</style>