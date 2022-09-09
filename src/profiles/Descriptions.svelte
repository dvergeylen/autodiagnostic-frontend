<script lang="ts">
  import { gameState } from '../stores/gameState';
  import { generateBadgeeHashURL } from '../badgee';

  export let profileName;
  const urlHorizontalBarSubtitle = `url('${[process.env.APP_PATH_PREFIX, 'assets/images/horizontal_bar_subtitle.svg'].join('/')}')`;
</script>

<h4>
  <svg class="icon scroll">
    <use href={[process.env.APP_PATH_PREFIX, 'assets/sprite_icons.svg#scroll'].join('/')} />
  </svg>
  Description :
</h4>

{#if profileName === 'leader'}
  <p class="masked">
    On dit de toi que tu es inspirant et motivant! Et oui, qui d'autre que toi pour guider les autres qui, assez spontanément, t'écoutent et te suivent. Ton dynamisme et ta motivation donnent ...
  </p>
{:else if profileName === 'bricoleur'}
  <p class="masked">
    Alors toi, on peut dire que tu es débrouillard! Tout ce que tu as, à portée de main, tu l'utilises pour en faire quelque chose. Bref, rien ne se perd, tout peut servir... Te servir, en l'occurrence, car tu es ...
  </p>
{:else if profileName === 'coequipier'}
  <p class="masked">
    Toi, tu es «comme un poisson dans l'eau» quand tu es dans un collectif. Être avec les autres, mais aussi et surtout, faire en sorte qu'ensemble, vous «fassiez équipe», voilà ce qui te motive. Et tu peux d'ailleurs jouer différents ...
  </p>
{:else if profileName === 'planificateur'}
  <p class="masked">
    S'il y a bien quelqu'un qui sait où il va, et comment il va y aller, c'est toi! Et oui, avant d'agir, tu réfléchis, tu imagines, tu projettes les choses pour qu'elles se déroulent comme tu le ...
  </p>
{:else if profileName === 'idealiste'}
  <p class="masked">
    S'il y a bien quelqu'un qui a des convictions, c'est toi! Différentes causes dans ce monde en transition te sont chères et tu n'hésites pas à l'afficher, à le revendiquer même parfois lorsque ton engagement se mue en véritable ...
  </p>
{:else if profileName === 'creatif'}
  <p class="masked">
    Alors toi, tu es vraiment curieux de tout, ouvert d'esprit, attentif à l'environnement dans lequel tu te trouves et aux personnes présentes. Tu as beaucoup d'intuition aussi. Cela te permet d'identifier ...
  </p>

{:else if profileName === 'audacieux'}
  <p class="masked">
    Alors, toi, on peut dire que tu es quelqu'un « qui en veut» dans la vie! Cela bouillonne dans ta tête entre les projets que tu veux réaliser, ces personnes que tu dois absolument rencontrer, sans oublier ...
  </p>
{:else}
  <p class="masked">
    Le moins que l'on puisse dire est que tu es quelqu'un d'attentif, de vigilant. Tu observes minutieusement les autres, les choses, bref l'environnement et les situations dans lesquelles tu te ...
  </p>
{/if}

<p class="has-text-centered">
  <a href={generateBadgeeHashURL($gameState)} class='is-button' target='_blank'>DECOUVRIR MON PROFIL COMPLET SUR BADGEE</a>
</p>

<style lang="scss">
  h4 {
    margin-top: 0;
    max-width: 50%;
  }
  h4::after {
    content: "";
    height: 0.5em;
    background: var(--url-horizontal-bar-subtitle);
    background-repeat: no-repeat;
    display: inline-block;
    width: 75%;
  }
  .is-button {
    margin: auto;
    color: white;
    border: 1.5px solid white;
    border-radius: 0.25em;
    background-color: red;
    font-weight: bold;
    font-size: 1em;
    width: 100%;
    max-width: 25em;
    padding: 1em;
  }
  p.masked {
    mask-image: linear-gradient(to top, rgba(0,0,0,0), rgb(0, 0, 0));
  }
</style>