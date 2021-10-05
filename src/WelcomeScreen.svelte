<script lang="ts">
  import { gameState } from './stores/gameState';
  import { appStatus, playMusicStore } from './stores/appStatus';
  import { GameStatus } from './enums';
  import Footer from "./Footer.svelte";

  let newGamePressed: boolean = false;
  let isNewGame = false;
  let isGenderConfigured: boolean;

  function toggleMusic() {
    playMusicStore.set(!$playMusicStore);
  }

  function toggleNewGamePressed() {
    newGamePressed = !newGamePressed;
    if (newGamePressed) {
      window.scrollTo(0,document.body.scrollHeight);
    }
  }

  function startGame() {
    $appStatus = GameStatus.INTRO;
  }

  function startNewGame(gender: 'M' | 'F') {
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


  <div id="intro-text">
    <div class="is-flex">
      <p class="is-bold">Bienvenue !</p>
      <div id="music-settings-wrapper">
        {#if $playMusicStore}
          <svg on:click={toggleMusic} class="icon map">
            <use href='assets/sprite_icons.svg#music' />
          </svg>
        {:else}
          <svg on:click={toggleMusic} class="icon map">
            <use href='assets/sprite_icons.svg#music-slash' />
          </svg>
        {/if}
      </div>
    </div>
    <p class="is-bold">
      Tu as décidé de tester ton niveau actuel de compétences…<br />Et ça démarre maintenant.
    </p>
    <p>
      Tu vas assister aux échanges de SMS entre Arya et Jon.<br />
      Ces deux-là sont les meilleurs amis du monde …<br />
      Mais la vie les sépare pour 1 an. 12 longs mois !<br />
      Le temps d'un séjour au Japon pour l'un.<br />
      Pendant que l'autre reste en Belgique.<br />
      Mais, ils restent connectés.<br />
      Ils se soutiennent dans des péripéties que tu vas découvrir au fil de leurs échanges de textos.
    </p>
    <p>
      Pour pouvoir établir ton profil actuel de compétences, tu vas jouer un personnage.<br />
      Tu dois répondre à sa place lorsque des choix multiples te sont proposés.<br />
      Tu dois veiller à choisir la réponse qui te correspond le plus.<br />
      Bref, que ferais-tu/que dirais-tu dans la même situation ?<br />
      Tes choix doivent refléter qui tu es, comment tu fonctionnes en général.<br />
    </p>
    <p>
      Joue spontanément et honnêtement...<br />
      Et tu découvriras ton profil dès la partie finie 😉<br />
      (Environ dans 20 minutes)
    </p>
    <p>
      C'est parti !
    </p>

    <div id="buttons-container" class="is-grid">
      {#if !isNewGame && isGenderConfigured }
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
      <button on:click={() => startNewGame('M')}>
        <svg class="icon" >
          <use href='assets/sprite_icons.svg#mars' />
        </svg>
        Masculin
      </button>
      <button on:click={() => startNewGame('F')}>
        <svg class="icon" >
          <use href='assets/sprite_icons.svg#venus' />
        </svg>
        Féminin
      </button>
    </div>
  </div>
</main>

<Footer />

<style lang="scss">
  .protagoniste {
    padding: 1em;
    border: 1px solid black;
    max-width: 80%;
    margin: auto;
  }

  button {
    width: 15em;
    margin: 1em auto auto auto; /* top right bottom left */
  }

  div#intro-text {
    text-align: left;
    padding: 0.5em;
    border: 1px solid var(--color-primary);
    border-radius: 0.25em;
    max-width: 35em;
    margin-left: auto;
    margin-right: auto;

    // Phones
    @media (max-width: 769px) {
      font-size: 0.9em;
    line-height: 1.4em;
    }

    p:first-child{
      margin-top: 0;
    }
  }

  div#buttons-container {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  div#music-settings-wrapper {
    text-align: right;
    flex-grow: 1;
  }

  svg.icon {
    fill: var(--anthracite);
  }
</style>