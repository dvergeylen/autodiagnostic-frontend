<script lang="ts">
  import { appStatus } from './stores/appStatus';
  import { GameStatus } from './enums';

  function updateAppStatus() {
    appStatus.set(GameStatus.PAUSED);
  }
</script>

<div class="is-flex is-justify-content-center">
  <svg class="icon navbar-icon" on:click={updateAppStatus}>
    <use href='assets/sprite_icons.svg#home' />
  </svg>
  <svg class="icon navbar-icon">
    <use href='assets/sprite_icons.svg#square' />
  </svg>
  <svg class="icon navbar-icon">
    <use href='assets/sprite_icons.svg#square' />
  </svg>
  <svg class="icon navbar-icon">
    <use href='assets/sprite_icons.svg#square' />
  </svg>
  <svg class="icon navbar-icon">
    <use href='assets/sprite_icons.svg#square' />
  </svg>
  <svg class="icon navbar-icon">
    <use href='assets/sprite_icons.svg#square' />
  </svg>
  <svg class="icon navbar-icon">
    <use href='assets/sprite_icons.svg#square' />
  </svg>
</div>

<style lang="scss">
  .navbar-icon {
    margin-right: 0.5em;
    cursor: pointer;
  }
  // Commons
  .is-flex {
    display: flex;
  }
  .is-justify-content-center {
    justify-content: center;
  }
  .icon {
    width: 1em;
    height: 1em;
    color: #1F1F1F;
    vertical-align: middle;
  }
</style>