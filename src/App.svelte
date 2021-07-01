<script lang="ts">
  import { onMount } from "svelte";
  import { gameState } from './stores/gameState';
  import { appStatus } from './stores/appStatus';
  import { GameStatus } from './enums';
  import WelcomeScreen from "./WelcomeScreen.svelte";
  import GameScreen from "./GameScreen.svelte";
  import ResultScreen from "./ResultScreen.svelte";

  let showGameScreen: boolean = false;
  let showResultScreen: boolean = false;

  onMount(() => {
    const localStorage = window.localStorage;

    if (localStorage && localStorage.getItem('state')) {
      gameState.set(JSON.parse(localStorage.getItem('state')));
    }
  });

  // Svelte doesn't give access to Typescript out of <script> tag
  $: showGameScreen = ($appStatus === GameStatus.ONGOING);
  $: showResultScreen = ($appStatus === GameStatus.FINISHED);
</script>

{#if showGameScreen}
  <GameScreen />
{:else if showResultScreen}
  <ResultScreen />
{:else}
  <WelcomeScreen />
{/if}