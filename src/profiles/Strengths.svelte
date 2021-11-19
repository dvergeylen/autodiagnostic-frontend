<script lang="ts">
  export let profileName;
  const profiles = {
    leader: [
        'Inspirant, charismatique',
        'Ambassadeur, porte-voix',
        'Sens des responsabilités',
        'Aptitude à motiver les autres',
      ],
    bricoleur: [
        'Débrouillardise, inventivité',
        'Utilisation de ce qui est "à portée de main"',
        'Agilité, flexibilité',
        'Goût pour l\'action, les défis',
      ],
    coequipier: [
        'Goût pour "faire équipe" avec les autres',
        'Polyvalence dans le groupe (jouer divers rôles)',
        'Sens de l\'autre (écoute, soutien, réconfort)',
        'Moteur pour l\'équipe et son dynamisme',
      ],
    planificateur: [
        'Sens de la réflexion, de l\'analyse',
        'Poursuite d\'objectifs structurés',
        'Scénarisation fine des actions',
        'Goût pour l\'anticipation et l\'évaluation',
      ],
    idealiste: [
        'Idéalisme, sens des valeurs',
        'Convictions fortes',
        'Engagement, voire militantisme',
        'Goût pour les échanges, le débat',
      ],
    creatif: [
        'Curiosité, ouverture d\'esprit',
        'Bonnes intuitions',
        'Capacité à imaginer des idées originales',
        'Capacité à évaluer les meilleures idées',
      ],
    audacieux: [
        'Hautes ambitions',
        'Confiance en soi, optimisme',
        'Motivation à se fixer des objectifs',
        'Capacités à rebondir après un échec',
      ],
    explorateur: [
        'Goût de l\'aventure',
        'Sens fin de l\'observation',
        'Capacités à rebondir après un échec',
        'Sens de l\'évaluation, de l\'analyse',
      ],
  };
</script>

<fieldset id="strengths">
  <legend>
    <svg class="icon trophy">
      <use href='assets/sprite_icons.svg#trophy' />
    </svg>
    TES POINTS FORTS :
  </legend>
</fieldset>

<div id="strengths-container">
  {#each profiles[profileName] as strength}
    <fieldset class="is-flex has-align-items-center has-justify-content-center">
      <legend>
        <svg class="icon thumbtack">
          <use href='assets/sprite_icons.svg#thumbtack' />
        </svg>
      </legend>
      {strength}
    </fieldset>
  {/each}
</div>


<style lang="scss">
  #strengths-container {
    background-color: var(--color-primary);
    padding: 0.75em 0.5em 0.75em 0.5em;
    display: grid;
    grid-template: auto auto/auto auto;
    grid-row-gap: 0.25em;

    fieldset {
      border: solid 3px white;
      color: white;
      font-size: 0.8em;
      font-weight: 700;
      svg {
        fill: white;
      }
    }
  }

  fieldset#strengths {
    border-style: solid none none none;
    border-top: 3px solid red;
    margin-top: 2.5em;
    legend {
      margin: auto;
      padding-left: 5%;
      padding-right: 5%;
      font-weight: 900;
    }
  }

  .trophy, .thumbtack {
    fill: red;
    margin-right: 0.5em;
    margin-left: 0.5em;
    vertical-align: top;
  }
</style>