<script lang="ts">
  export let showBadgee = false;
</script>

<h4>🎯 Points forts :</h4>
<ul class="strengths">
  <li># Goût pour « faire équipe » avec les autres</li>
  <li># Polyvalence dans le groupe (jouer divers rôles)</li>
  <li># Sens de l'autre (écoute, soutien, réconfort)</li>
  <li># Moteur pour l'équipe et son dynamisme</li>
</ul>

<div class="share-container" class:is-hidden={!showBadgee}>
  <a href="https://www.badgee.net" target="_blank" rel="noopener noreferrer">Valorise ces compétences avec Badg'ee</a>
</div>

<h4>📜 Description :</h4>
<p>
  Toi, tu es « comme un poisson dans l'eau » quand tu es dans un collectif. Être avec les autres, mais aussi et surtout, faire en sorte qu'ensemble, vous « fassiez équipe », voilà ce qui te motive. Et tu peux d'ailleurs jouer différents rôles, prendre différentes casquettes dans l'équipe pour qu'elle atteigne les objectifs qu'elle s'est fixés.
</p>
<p>
  Ton attitude est appréciée des autres, car, loin de vouloir t'exprimer et avoir raison à tout prix, tu commences toujours par observer ce qui se passe et écouter attentivement ce que les autres ont à dire. En d'autres mots, l'écoute et le respect de chacun, sont importants à tes yeux. Ceci étant, ton avis est attendu et le collectif n'hésite jamais à te solliciter, te consulter, te mobiliser. 
</p>
<p>
  On peut enfin et surtout compter sur toi pour remotiver les troupes dans les moments les plus difficiles, mais aussi réconforter, rassurer, l'un ou l'autre quand il/elle ne va pas. Tu arrives en effet à te mettre à la place des autres, à les comprendre, et surtout tu les soutiens, les réconfortes. C'est ce que l'on appelle l'empathie ! Voilà une qualité bien précieuse...
</p>

<h4>🚀 Un conseil :</h4>
<p>
  Ton sens de l'autre, cette empathie qui te caractérise tant, n'hésite pas à les mettre aussi au service de la société au sens plus large, pour un monde meilleur porté par des valeurs, cela te permettra d'associer les talents du coéquipier et de l'idéaliste, une très belle combinaison !
</p>

<style lang="scss">
  ul.strengths {
    padding-left: 0.25em;

    li {
      background-color: var(--color-primary);
      padding: 0.25em 0.5em 0.25em 0.5em;
      color: white;
      border-radius: 1em;
      width: -moz-fit-content;
    }
    li:not(:last-child) {
      margin-bottom: 0.3em;
    }
  }

  .share-container {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      margin: auto;
      padding: 1em;
      border: 1px solid #ccc;
      color: var(--anthracite);
      outline: none;
      background-color: #f4f4f4;
      &:hover {
        text-decoration: none;
      }
    }
  }
</style>