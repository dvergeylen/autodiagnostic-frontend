<script lang="ts">
  import { gameState } from './stores/gameState';
  import { appStatus } from './stores/appStatus';
  import { GameStatus } from './enums';

  let newGamePressed: boolean = false;
  let isNewGame = false;
  let isGenderConfigured: boolean;

  function toggleNewGamePressed() {
    newGamePressed = !newGamePressed;
  }

  function startGame() {
    $appStatus = GameStatus.ONGOING;
  }

  function startNewGame(gender: 'm' | 'f') {
    $gameState.gender = gender;
    $gameState.nodes = {};
    startGame();
  }

  $: isNewGame = (Object.entries($gameState.nodes).length === 0);
  $: isGenderConfigured = ($gameState?.gender?.length || 0) > 0;
</script>

<main>
  <h1>Voyage au bout du monde</h1>
  <h3>Une aventure d'introspection</h3>
  <div class="is-grid">
    {#if isNewGame && isGenderConfigured }
      <button class:pressed={!newGamePressed} on:click={startGame}>
        Continuer
    </button>
    {/if}
    <button on:click={toggleNewGamePressed} class:pressed={newGamePressed}>
      Nouvelle Partie
    </button>
  </div>
  <div class:is-hidden={!newGamePressed} class="is-grid protagoniste">
    Protagoniste:
    <button on:click={() => startNewGame('m')}>
      <svg class="icon" >
        <use href='assets/sprite_icons.svg#mars' />
      </svg>
      Masculin
    </button>
    <button on:click={() => startNewGame('f')}>
      <svg class="icon" >
        <use href='assets/sprite_icons.svg#venus' />
      </svg>
      Féminin
    </button>
  </div>
</main>

<style lang="scss">

  .protagoniste {
    padding: 1em;
    border: 1px solid black;
    max-width: 80%;
    margin: 1em auto auto auto;
  }

  button {
    width: 15em;
    margin: 1em auto auto auto; /* top right bottom left */
  }

  // Commons
  h1 {
    color: #a10000;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  main {
    text-align: center;
    padding: 1em;
    max-width: 50em;
    margin: 0 auto;
  }
  .is-grid {
    display: grid;
  }
  .is-hidden {
    display: none;
  }
  .icon {
    width: 1em;
    height: 1em;
    color: #1F1F1F;
    vertical-align: middle;
  }
  button.pressed {
    background-color: #a10000;
    color: white;
  }
</style>