<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { displayMap, appStatus } from './stores/appStatus';
  import { GameStatus } from './enums';
  import GameScreenDialogHeader from './GameScreenDialogHeader.svelte';
  import GameScreenDialogNodes from './GameScreenDialogNodes.svelte';
  import Map from './Map.svelte';
  import IntroScreen from './IntroScreen.svelte';

  let timer: NodeJS.Timeout;

  function resumeGame() {
    timer = setTimeout(() => {
      appStatus.set(GameStatus.ONGOING);
    }, 4000);
  }

  onMount(resumeGame);

  onDestroy(() => {
    clearInterval(timer);
  });

  $: if ($appStatus === GameStatus.INTRO) {
    resumeGame();
  }
</script>

<main>
  {#if $appStatus === GameStatus.INTRO}
    <IntroScreen />
  {:else}
    <GameScreenDialogHeader />
    {#if $displayMap}
      <Map />
    {/if}
    <GameScreenDialogNodes />
  {/if}
</main>

<style lang="scss">
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