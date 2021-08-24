<script lang="ts">
  import { onMount } from "svelte";
  import { gameState } from './stores/gameState';
  import { appStatus, playMusicStore, playSoundsStore } from './stores/appStatus';
  import { GameStatus } from './enums';
  import WelcomeScreen from "./WelcomeScreen.svelte";
  import GameScreen from "./GameScreen.svelte";
  import ResultScreen from "./ResultScreen.svelte";
  import ErrorScreen from "./ErrorScreen.svelte";

  let showGameScreen: boolean = false;
  let showResultScreen: boolean = false;
  let showErrorScreen: boolean = false;
  let muteMusic: boolean = false;
  let muteSounds: boolean = false;

  onMount(() => {
    const localStorage = window.localStorage;

    if (localStorage && localStorage.getItem('state')) {
      gameState.set(JSON.parse(localStorage.getItem('state')));
    }
  });

  // Svelte doesn't give access to Typescript out of <script> tag
  $: showGameScreen = ($appStatus === GameStatus.ONGOING || $appStatus === GameStatus.INTRO);
  $: showResultScreen = ($appStatus === GameStatus.FINISHED);
  $: showErrorScreen = ($appStatus === GameStatus.ERROR);
  $: muteMusic = !$playMusicStore;
  $: muteSounds = !$playSoundsStore;
</script>

{#if showGameScreen}
  <GameScreen />
{:else if showResultScreen}
  <ResultScreen />
{:else if showErrorScreen}
  <ErrorScreen />
{:else}
  <WelcomeScreen />
  <audio id="background-music" src="/assets/sounds/watermarked_Sounds_Like_Sander_When_Stars_Collide_instrumental_3_49.mp3" autoplay loop bind:muted={muteMusic}>
    <track kind="captions">
  </audio>
{/if}

<style lang="scss">
  :global {
    @import './stylesheets/commons.scss';
  }
</style>