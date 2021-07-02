<script lang="ts">
  import { appStatus } from './stores/appStatus';
  import { GameStatus } from './enums';
  import { gameState } from './stores/gameState';
  import { chapters, currentChapterId } from './stores/chapters';
  let currentNodeId;

  $: if (Object.keys($chapters).includes('error')) {
    appStatus.set(GameStatus.ERROR);
  }

  $: currentNodeId = ($gameState.nodes[$currentChapterId] || []).pop() || '2';
  $: console.log(currentNodeId);
//  $chapters[$currentChapterId][]
// TODO: lire et ajouter les noeuds déjà choisis par le joueur, et préparer la logique pour en ajouter dynamiquement

</script>

<div class="dialog-container-background">
  <div class="dialog-container">
    {#each ($gameState.nodes[$currentChapterId] || []) as dialogNodeId, i}
      <div>
        {$chapters[$currentChapterId].dialogNodes[dialogNodeId].id}
      </div>
    {/each}
    <div class="npc">
      <p>Trop stylé! Ceci est une longue phrase</p>
    </div>
    <div class="player">
      <p>En effet, trop bien ce truc</p>
    </div>
    <div class="player">
      <p>Test 😊</p>
    </div>
    <div class="npc">
      <p class="is-loading">...</p>
    </div>
  </div>
</div>

<style lang="scss">

  .dialog-container-background {
    min-height: 30vh;
    height: 100%;
    background-color: #E0E0E0;

    .dialog-container {
      display: grid;
      padding-top: 1em;
      grid-gap: 0.5em;

      div {
        height: min-content;
        padding-left: 1em;
        padding-right: 1em;
        width: -moz-fit-content;
        width: fit-content;
        box-shadow: 0 0 0.5em #a3a3a3;
        display: grid;

        @media (min-width: 640px) {
          max-width: 60%;
        }
        @media (max-width: 640px) {
          max-width: 80%;
        }
        p {
          display: inline-block;
          margin-top: 0.3em;
          margin-bottom: 0.3em;
        }
      }

      div.npc {
        background: white;
        border-radius: 0 0.5em 0.5em 0.5em; /* top-left corner, top-right corner, bottom-right corner, bottom-left corner */
        margin-left: 0.5em;
        text-align: left;
        justify-self: left;
      }

      div.player {
        background: #e1ffc7;
        border-radius: 0.5em 0 0.5em 0.5em; /* top-left corner, top-right corner, bottom-right corner, bottom-left corner */
        margin-right: 0.5em;
        text-align: right;
        justify-self: right;
      }
    }
  }
</style>