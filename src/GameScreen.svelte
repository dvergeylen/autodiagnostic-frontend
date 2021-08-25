<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { displayMapStore, appStatus } from './stores/appStatus';
  import { GameStatus } from './enums';
  import GameScreenDialogHeader from './GameScreenDialogHeader.svelte';
  import GameScreenDialogNodes from './GameScreenDialogNodes.svelte';
  import Map from './Map.svelte';
  import IntroScreen from './IntroScreen.svelte';

  let timer: NodeJS.Timeout;

  function abortTimer() {
    clearTimeout(timer);
    appStatus.set(GameStatus.ONGOING);
  }

  function resumeGame() {
    timer = setTimeout(() => {
      appStatus.set(GameStatus.ONGOING);
    }, 4000);
  }

  onMount(resumeGame);

  onDestroy(() => {
    clearTimeout(timer);
  });

  $: if ($appStatus === GameStatus.INTRO) {
    resumeGame();
  }
</script>

<main>
  {#if $appStatus === GameStatus.INTRO}
    <IntroScreen on:abortTimer={abortTimer}/>
  {:else}
    <GameScreenDialogHeader />
    {#if $displayMapStore}
      <Map />
    {/if}
    <GameScreenDialogNodes on:playSound />
  {/if}
</main>