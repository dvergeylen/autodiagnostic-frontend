<script lang="ts">
  import { gameState } from './stores/gameState';
  import { appStatus, playMusicStore } from './stores/appStatus';
  import { GameStatus } from './enums';
  import Footer from "./Footer.svelte";

  let newGamePressed: boolean = false;
  let isNewGame = false;
  let isGenderConfigured: boolean;
  let gender: 'M' | 'F' | '' = '';

  function toggleMusic() {
    playMusicStore.set(!$playMusicStore);
  }

  function toggleCharacter(g: 'M' | 'F') {
    gender = gender !== g ? g : '';
  }

  function toggleNewGamePressed() {
    newGamePressed = !newGamePressed;
    if (newGamePressed) {
      window.scrollTo(0,document.body.scrollHeight);
    }
  }

  function startGame() {
    $gameState.gender = gender === '' ? 'M' : gender;
    $gameState.nodes = {};
    $appStatus = GameStatus.INTRO;
  }

  $: isNewGame = (Object.entries($gameState.nodes).length === 0);
  $: isGenderConfigured = ($gameState?.gender?.length || 0) > 0;

  const urlHorizontalBarSubtitle = `url('${[process.env.APP_PATH_PREFIX, 'assets/images/horizontal_bar_subtitle.svg'].join('/')}')`;
  const urlTrameSowalfin = `url('${[process.env.APP_PATH_PREFIX, 'assets/images/trame_sowalfin_color_06.svg'].join('/')}')`;
</script>

<main style="--url-horizontal-bar-subtitle: {urlHorizontalBarSubtitle}; --url-trame-background: {urlTrameSowalfin};">
  <div class="h1-wrapper">
    <h1>ON MY WAY</h1>
  </div>
  <h3>UNE AVENTURE D'INTROSPECTION</h3>

  <!--
  <div id="warning-dev">
    <p>🚧 Version en Développement</p>
  </div>
  -->

  <div id="intro-text">
    <div class="is-flex">
      <h4 class="is-bold">Bienvenue!</h4>
      <div id="music-settings-wrapper">
        {#if $playMusicStore}
          <svg on:click={toggleMusic} class="icon music">
            <use href={[process.env.APP_PATH_PREFIX, 'assets/sprite_icons.svg#music'].join('/')} />
          </svg>
        {:else}
          <svg on:click={toggleMusic} class="icon music">
            <use href={[process.env.APP_PATH_PREFIX, 'assets/sprite_icons.svg#music-slash'].join('/')} />
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
      Mais la vie les sépare pour 1 an. 12 longs mois!<br />
      Le temps d'un séjour au Japon pour l'un.<br />
      Pendant que l'autre reste en Belgique.<br />
      Mais, ils restent connectés.<br />
      Ils se soutiennent dans des péripéties que tu vas découvrir au fil de leurs échanges de textos.
    </p>
    <p>
      Pour pouvoir établir ton profil actuel de compétences, tu vas jouer un personnage.<br />
      Tu dois répondre à sa place lorsque des choix multiples te sont proposés.<br />
      Tu dois veiller à choisir la réponse qui te correspond le plus.<br />
      Bref, que ferais-tu/que dirais-tu dans la même situation?<br />
      Tes choix doivent refléter qui tu es, comment tu fonctionnes en général.<br />
    </p>
    <p>
      Joue spontanément et honnêtement...<br />
      Et tu découvriras ton profil dès la partie finie 😉<br />
      (Environ dans 20 minutes)
    </p>
    <p>
      C'est parti!
    </p>

    <div id="buttons-wrapper">
      <div id="buttons-settings" class="is-grid">
        {#if !isNewGame && isGenderConfigured }
          <button class:pressed={!newGamePressed} on:click={startGame} class="is-uppercase">
            Continuer ⟶
        </button>
        {/if}
      </div>
      <div class="buttons-protagoniste">
        <p class="is-uppercase">
          Nouvelle Partie :
        </p>
        <p class="is-uppercase is-small">
          Choisis ton personnage :
        </p>
        <div class="is-flex">
          <div on:click={() => toggleCharacter('F')}>

              <img class:selected={gender === 'F'} src={[process.env.APP_PATH_PREFIX, 'assets/images/avatar_Arya_intro.png'].join('/')} alt="Arya"/>
              <div class:selected={gender === 'F'} class="is-button is-uppercase">
                Arya
              </div>
          </div>
          <div on:click={() => toggleCharacter('M')}>
              <img class:selected={gender === 'M'} src={[process.env.APP_PATH_PREFIX, 'assets/images/avatar_Jon_intro.png'].join('/')} alt="Jon"/>
              <div class:selected={gender === 'M'} class="is-button is-uppercase">
                Jon
              </div>
          </div>
        </div>
      </div>
      <div class="has-text-centered" class:is-hidden={gender.length === 0}>
        <button on:click={startGame} disabled={gender.length === 0} class="is-uppercase" class:disabled={gender.length === 0}>
          Démarrer
        </button>
      </div>
    </div>
  </div>
</main>

<Footer />

<style lang="scss">
  main {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
  div.h1-wrapper {
    background-color: var(--color-primary);
    margin-top: 1em;
    margin-bottom: 0.25em;
    padding-top: 0;
    padding-bottom: 0;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    h1 {
      color: white;
      font-size: 2.5em;
      margin-bottom: 0;
      margin-top: 0.5em;
      margin-left: 1em;
      margin-right: 1em;
    }
  }

  .h1-wrapper::after {
    content: "";
    height: 1em;
    background-image: var(--url-trame-background);
    background-repeat: repeat-x;
    display: inline-block;
    width: 100%;
  }

  h3 {
    margin-top: 0.5em;
    color: var(--color-primary);
    font-weight: 900;
    font-size: 1.5em;
  }

  div#intro-text {
    text-align: left;
    max-width: 35em;
    margin-left: auto;
    margin-right: auto;

    // Phones
    @media (max-width: 769px) {
      font-size: 0.9em;
      line-height: 1.4em;
    }

    h4 {
      margin-top: 0;
    }
    h4::after {
      content: "";
      height: 0.5em;
      background-image: var(--url-horizontal-bar-subtitle);
      background-repeat: repeat-x;
      display: inline-block;
      width: 75%;
    }
  }

  div#buttons-wrapper {
    background-color: var(--color06);
    padding: 1em;
    border-radius: 0.25em;

    .buttons-protagoniste {
      margin: auto;
      margin-top: 1em;
      margin-bottom: 1em;
      color: white;
      border: 1.5px solid white;
      border-radius: 0.25em;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
      padding-left: 1em;
      padding-right: 1em;
      max-width: 20em;
      text-align: center;
      font-weight: 700;
      background-color: rgba(255, 255, 255, 0.25);
      p {
        margin-top: 0;
        margin-bottom: 0.5em;
      }
      div {
        width: 100%;
        div {
          width: 50%;
          cursor: pointer;

          .is-button {
            padding-top: 0.25em;
            padding-bottom: 0.25em;
            border: 1.5px solid white;
            padding-left: 0.5em;
            padding-right: 0.5em;
            border-radius: 0.15em;
            background-color: rgba(255,255,255,0.25);
            font-size: 0.8em;
            margin: auto;
          }

          img {
            max-width: 7em;
          }
        }
      }
    }
  }
  div#buttons-wrapper::after {
    content: "";
    height: 1em;
    background-image: var(--url-trame-background);
    background-repeat: repeat-x;
    display: inline-block;
    width: 100%;
  }

  div#music-settings-wrapper {
    text-align: right;
    flex-grow: 1;
  }

  img.selected, .is-button.selected {
    border: 2px solid red !important;
  }

  button, .is-button {
    margin: auto;
    color: white;
    border: 1.5px solid white;
    border-radius: 0.25em;
    background-color: rgba(255, 255, 255, 0.25);
    font-weight: bold;
    font-size: 0.7em;
    padding-top: 1em;
    padding-bottom: 1em;
    width: 100%;
    max-width: 25em;
  }

  button.disabled {
    background-color: rgba(255, 255, 255, 0.6);
  }

  svg.music {
    fill: var(--color09);
  }

  div#warning-dev {
    background: #fdcccc;
    border: 1px solid red;
    max-width: 35em;
    margin-top: 1em;
    margin-bottom: 1em;
    align-self: center;
    width: 90%;
  }
</style>
