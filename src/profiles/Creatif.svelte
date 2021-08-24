<script lang="ts">
  export let showBadgee = false;
</script>

<h4>🎯 Points forts :</h4>
<ul class="strengths">
  <li># Curiosité, ouverture d'esprit</li>
  <li># Bonnes intuitions</li>
  <li># Capacité à imaginer des idées originales</li>
  <li># Capacité à évaluer les meilleures idées</li>
</ul>

<div class="share-container" class:is-hidden={!showBadgee}>
  <a href="https://www.badgee.net" target="_blank" rel="noopener noreferrer">Valorise ces compétences avec Badg'ee</a>
</div>

<h4>📜 Description :</h4>
<p>
  Alors toi, tu es vraiment curieux de tout, ouvert d'esprit, attentif à l'environnement dans lequel tu te trouves et aux personnes présentes. Tu as beaucoup d'intuition aussi. Cela te permet d'identifier facilement des besoins pour lesquels il conviendrait de trouver des solutions originales.
</p>
<p>
  Quand une situation, un problème, ou encore un projet nécessitent de trouver des idées originales, c'est donc incontestablement à toi que les autres songent. Et oui, tes capacités créatives sont connues et reconnues ! Qui d'autre, mieux que toi, serait capable d'émettre beaucoup d'idées et, de bonnes idées, de surcroît ? Tu as en effet ce talent d'avoir des idées, mais aussi de rebondir sur celles des autres, par associations, métaphores ou autres techniques, pour continuer à en produire encore de nouvelles. 
</p>
<p>
  Tu parviens également à évaluer la valeur, la pertinence, le degré d'originalité d'idées émises (les tiennes et celles des autres), ce qui est bien utile quand arrive le moment de faire un choix.
</p>

<h4>🚀 Un conseil :</h4>
<p>
  N'hésite pas à nourrir les autres de tes brillantes idées pour « faire équipe » avec eux autour de nouveaux projets, cela te permettra d'associer les talents du créatif et du coéquipier, une belle combinaison !
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