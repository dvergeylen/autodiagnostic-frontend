<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { appStatus } from './stores/appStatus';
  import { GameStatus } from './enums';
  import { gameState } from './stores/gameState';
  import { chapters, currentChapterId } from './stores/chapters';

  let displayedNodeIds: Array<string>;
  let lastDisplayedNodeId: string;

  // Display error screen if unable to load chapters
  $: if (Object.keys($chapters).includes('error')) {
    appStatus.set(GameStatus.ERROR);
  }

  function displayNextDialogNode(lastDisplayedNodeId: string | undefined) {
    // '1' is nextNode is there is no previous node (e.g: chapter root node)
    const nextNodeIds: Array<string> = lastDisplayedNodeId ? $chapters[$currentChapterId][lastDisplayedNodeId].nextNodes : ["1"];
    const nextNodes: Array<DialogNode> = Object.entries<DialogNode>($chapters[$currentChapterId])
      .filter(([_, n]) => nextNodeIds.includes(n.id))
      .map(([_, n]) => n);
    const currentSpeaker: "Player" | "NPC1" = $chapters[$currentChapterId][lastDisplayedNodeId || "1"].character;
    const nextSpeaker = nextNodes.reduce<"Player" | "NPC1">((acc, n: DialogNode) => {
      return (acc === "Player") || (n.character === "Player") ? 'Player' : acc;
    }, "NPC1");

    // Multiple replies of the same character
    if (nextSpeaker === currentSpeaker) {
      if (nextNodes.length === 1) {
        displayedNodeIds = [...displayedNodeIds, nextNodeIds[0]];
        $gameState.nodes[$currentChapterId] = [...($gameState.nodes[$currentChapterId] || []), nextNodeIds[0]];

        // Call recursively, after a random time
        const timer = Math.floor(Math.random() * 2000);
        setTimeout(() => {
          displayNextDialogNode(nextNodeIds[0]);
        }, timer);
      }
    }
  }

  function waitStoresToLoad() {
    // Stores fully loaded
    if (Object.keys($chapters).length > 0) {
      lastDisplayedNodeId = displayedNodeIds[displayedNodeIds.length - 1];
      displayNextDialogNode(lastDisplayedNodeId); // Display next Dialog box or append DialogNodes

    // Stores not fully loaded, yet
    } else {
      setTimeout(waitStoresToLoad, 10);
    }
  }

  onMount(async () => {
    waitStoresToLoad();
  });

  $: displayedNodeIds = ($gameState.nodes[$currentChapterId] || []);
  $: lastDisplayedNodeId = displayedNodeIds[displayedNodeIds.length - 1];
</script>

<div class="dialog-container-background">
  {#if $chapters[$currentChapterId]}
    <div class="dialog-container">
      {#each displayedNodeIds as dialogNodeId (dialogNodeId)}
        <div
          class:npc={$chapters[$currentChapterId][dialogNodeId].character === 'NPC1'}
          class:player={$chapters[$currentChapterId][dialogNodeId].character === 'Player'}>
            <p>
              {#if $chapters[$currentChapterId][dialogNodeId].text[$gameState.language] instanceof Object}
                {$chapters[$currentChapterId][dialogNodeId].text[$gameState.language][$gameState.gender]}
              {:else}
                {$chapters[$currentChapterId][dialogNodeId].text[$gameState.language]}
              {/if}
            </p>
        </div>
      {/each}
    </div>
    <div class="answer-container">
    </div>
  {:else}
    <p>Chargement...</p>
  {/if}
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
        border-radius: 0.5em 0.5em 0 0.5em; /* top-left corner, top-right corner, bottom-right corner, bottom-left corner */
        margin-right: 0.5em;
        text-align: right;
        justify-self: right;
      }
    }
  }
</style>