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
  let soundPlayer;

  function playSound() {
    if ($playSoundsStore) {
      console.log('play');
      soundPlayer.play();
    }
  }

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
</script>

{#if showGameScreen}
  <GameScreen  on:playSound={playSound}/>
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

<audio bind:this={soundPlayer} id="notification-sound" src="/assets/sounds/message.mp3">
  <track kind="captions">
</audio>

<style lang="scss">
  :global {
    @import './stylesheets/commons.scss';
  }
</style>