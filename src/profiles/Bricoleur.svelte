<script lang="ts">
  export let showBadgee = false;
</script>

<h4>🎯 Points forts :</h4>
<ul class="strengths">
  <li># Débrouillardise, inventivité</li>
  <li># Utilisation de ce qui est « à portée de main »</li>
  <li># Agilité, flexibilité</li>
  <li># Goût pour l'action, les défis</li>
</ul>

<div class="share-container" class:is-hidden={!showBadgee}>
  <a href="https://www.badgee.net" target="_blank" rel="noopener noreferrer">Valorise ces compétences avec Badg'ee</a>
</div>

<h4>📜 Description :</h4>
<p>
  Alors toi, on peut dire que tu es débrouillard ! Tout ce que tu as, à portée de main, tu l'utilises pour en faire quelque chose. Bref, rien ne se perd, tout peut servir … Te servir, en l'occurrence, car tu es une personne motivée, passionnée, qui se lance volontiers dans les nouveaux défis. Et tu avances, par essai-erreur, avec les ressources dont tu disposes et en n'hésitant pas non plus à faire appel à toute autre personne qui pourrait t'aider utilement dans tes projets. 
</p>
<p>
  Ton fonctionnement te permet de vite comprendre ce qui ne fonctionnera pas. Mais cela ne te décourage pas, au contraire, tu reconfigures, tu tentes autre chose, tu recommences. Cela fait partie des risques de ta façon « bricolée » d'avancer, mais tu aimes ça !
</p>

<h4>🚀 Un conseil :</h4>
<p>
  Ce talent inné que tu as pour improviser les choses ne doit pas t'empêcher d'un peu les prévoir aussi, bref prends le temps de réfléchir et d'anticiper les évènements, cela te permettra de combiner les talents du bricoleur et du planificateur, deux profils souvent opposés, alors qu'ils sont en réalité très complémentaires !
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