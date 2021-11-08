<script lang="ts">
  import { appStatus, displayMapStore, playSoundsStore } from './stores/appStatus';
  import { GameStatus } from './enums';
  import { gameState } from './stores/gameState';

  function goToWelcomeScreen() {
    appStatus.set(GameStatus.PAUSED);
  }

  function toggledisplayMapStore() {
    displayMapStore.set(!$displayMapStore);
  }

  function toggleSounds() {
    playSoundsStore.set(!$playSoundsStore);
  }

  // Debug
  function goToResultScreen() {
    appStatus.set(GameStatus.FINISHED);
  }
</script>

<div class="header">
  <div id="npc-avatar">
    {#if $gameState.gender === 'M'}
      <img src='/assets/images/avatar_Arya.png' alt="Arya"/>
      <p>Arya</p>
    {:else}
      <img src='/assets/images/avatar_Jon.png' alt="Jon"/>
      <p>Jon</p>
    {/if}
  </div>

  <div id="settings">
    {#if $playSoundsStore}
      <svg on:click={toggleSounds} class="icon map">
        <use href='assets/sprite_icons.svg#volume' />
      </svg>
    {:else}
      <svg on:click={toggleSounds} class="icon map">
        <use href='assets/sprite_icons.svg#volume-slash' />
      </svg>
    {/if}
    <!-- Debug to go to result screen -->
    <svg on:click={goToResultScreen} class="icon map">
      <use href='assets/sprite_icons.svg#award' />
    </svg>
    <svg on:click={toggledisplayMapStore} class="icon map">
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
    background: var(--color-primary);
    padding-left: 1em;
    color: white;
    font-style: bold;
    position: sticky;
    top: 0;
    text-align: left;
    height: 3.5em;

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
</style>