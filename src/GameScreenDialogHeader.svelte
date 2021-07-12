<script lang="ts">
  import { appStatus } from './stores/appStatus';
  import { GameStatus } from './enums';
  import { gameState } from './stores/gameState';
  import MapScreen from "./Map.svelte";

  let displayMap = false;

  function goToWelcomeScreen() {
    appStatus.set(GameStatus.PAUSED);
  }

  function toggleDisplayMap() {
    displayMap = !displayMap;
  }

  // Debug
  function goToResultScreen() {
    appStatus.set(GameStatus.FINISHED);
  }
</script>

<div class="header">
  <div id="npc-avatar">
    {#if $gameState.gender === 'm'}
      <img src='/assets/images/avatar_ayra.jpeg' alt="Ayra"/>
      <p>Ayra</p>
    {:else}
      <img src='/assets/images/avatar_jon.jpeg' alt="Jon"/>
      <p>Jon</p>
    {/if}
    <p class:is-hidden={!displayMap}>Display map</p>
  </div>

  <div id="settings">
    <!-- Debug to go to result screen -->
    <svg on:click={goToResultScreen} class="icon map">
      <use href='assets/sprite_icons.svg#award' />
    </svg>
    <svg on:click={toggleDisplayMap} class="icon map">
      <use href='assets/sprite_icons.svg#map-marked-alt' />
    </svg>
    <svg on:click={goToWelcomeScreen} class="icon home">
      <use href='assets/sprite_icons.svg#home' />
    </svg>
  </div>
</div>

<style lang="scss">
  .header {
    flex-grow: 1;
    background: #075e54;
    padding-left: 1em;
    color: white;
    font-style: bold;
    position: sticky;
    top: 0;
    text-align: left;

    display: grid;
    grid-template-columns: auto auto;
  }

  #npc-avatar {
    text-align: left;
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      width: 2em;
      margin-right: 0.5em;
    }
  }

  #settings {
    display: flex;
    align-items: center;

    .icon:first-child {
      margin-left: auto;
    }
    .icon:not(:first-child) {
      margin-left: 1em;
    }
    .icon:last-child {
      margin-right: 1em;
    }
  }

  // Commons
  .icon {
    width: 1.2em;
    height: 1.2em;
    fill: white;
    vertical-align: middle;
    cursor: pointer;
  }
  .is-hidden {
    display: none;
  }
</style>