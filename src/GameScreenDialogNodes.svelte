<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { appStatus } from './stores/appStatus';
  import { GameStatus } from './enums';
  import { gameState, currentChapterId } from './stores/gameState';
  import { chapters } from './stores/chapters';

  let displayedNodeIds: Array<string>;
  let answersNodeIds: Array<string> = [];
  let showIsTyping: boolean = false;
  let npc1Typing: boolean = false;
  let playerTyping: boolean = false;
  let narratorTyping: boolean = false;

  // Display error screen if unable to load chapters
  $: if (Object.keys($chapters).includes('error')) {
    appStatus.set(GameStatus.ERROR);
  }


  function displayAnswerDialogBox(nextNodeIds: Array<string>) {
    answersNodeIds = nextNodeIds;
  }

  function displayNextDialogNode(parentNodeId: string | undefined, isRootNode: boolean = false) {
    // '1' is nextNode is there is no previous node (e.g: chapter root node)
    const nextNodeIds: Array<string> = isRootNode ? ["1"] : $chapters[$currentChapterId][parentNodeId].nextNodes;
    const nextNodes: Array<DialogNode> = Object.entries<DialogNode>($chapters[$currentChapterId])
      .filter(([_, n]) => nextNodeIds.includes(n.id))
      .map(([_, n]) => n);
    const previousSpeaker: "Player" | "NPC1" | "Narrator" = $chapters[$currentChapterId][parentNodeId || "1"].character;
    const currentSpeaker = nextNodes.reduce<"Player" | "NPC1" | "Narrator">((acc, n: DialogNode) => {
      return (acc === "Player") || (n.character === "Player") ? 'Player' : acc;
    }, nextNodes[0]?.character || "NPC1");
    npc1Typing = currentSpeaker === 'NPC1';
    playerTyping = currentSpeaker === 'Player';
    narratorTyping = currentSpeaker === 'Narrator';



    // Display Answer DialogNode div:
    // - when transitioning from NPCx → Player (event if 1 choice)
    // - when Player and multiple nextNodes
    if (nextNodes.length === 0) {
      console.log("End of chapter");
    } else if (currentSpeaker === 'Player' && (nextNodes.length > 1 || previousSpeaker !== currentSpeaker)) {
      const timerReply = 1000;
      setTimeout(() => {
        displayAnswerDialogBox(nextNodeIds);
      }, timerReply);
    } else if (currentSpeaker === 'Narrator') {
      // Display node immediately
      $gameState.nodes[$currentChapterId] = [...($gameState.nodes[$currentChapterId] || []), nextNodeIds[0]];

      // Call next DialogNode, if any
      displayNextDialogNode(nextNodeIds[0]);
    } else {
      // Display node, after a random time typing
      const timerIsTyping = Math.floor(Math.random() * (750 - 500 + 1) + 500);
      setTimeout(() => {
        showIsTyping = true;

        const timerReply = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000);
        setTimeout(() => {
          showIsTyping = false;
          $gameState.nodes[$currentChapterId] = [...($gameState.nodes[$currentChapterId] || []), nextNodeIds[0]];

          // Call recursively
          displayNextDialogNode(nextNodeIds[0]);
        }, timerReply);
      }, timerIsTyping);
    }
  }

  function addAnswer(dialogNodeid: string) {
    // Clear AnswerDialogBox
    answersNodeIds = [];

    // Append to displayedNodeIds
    $gameState.nodes[$currentChapterId] = [...($gameState.nodes[$currentChapterId] || []), dialogNodeid];

    // Update gameState
    if ($chapters[$currentChapterId][dialogNodeid].character === 'Player') {
      $gameState.attribution = Object.keys($gameState.attribution).reduce((acc, [k, v]) => ({
        ...acc,
        [k]: v + $chapters[$currentChapterId][dialogNodeid].attribution[k],
      }), {
        leader: 0,
        bricoleur: 0,
        coequipier: 0,
        planificateur: 0,
        idealiste: 0,
        creatif: 0,
        audacieux: 0,
        explorateur: 0
      });
    }

    // Continue dialog, if any
    displayNextDialogNode(dialogNodeid);
  }

  function waitStoresToLoad() {
    // Stores fully loaded
    if (Object.keys($chapters).length > 0) {
      const parentNodeId = displayedNodeIds[displayedNodeIds.length - 1];
      displayNextDialogNode(parentNodeId, (parentNodeId === undefined)); // Display next Dialog box or append DialogNodes

    // Stores not fully loaded, yet
    } else {
      setTimeout(waitStoresToLoad, 10);
    }
  }

  onMount(async () => {
    waitStoresToLoad();
  });

  afterUpdate(() => {
    window.scrollTo(0,document.body.scrollHeight);
  })

  $: displayedNodeIds = ($gameState.nodes[$currentChapterId] || []);
</script>

<div id="dialog-container-background">
  {#if $chapters[$currentChapterId]}
    <div id="dialog-container">
      {#each displayedNodeIds as dialogNodeId (dialogNodeId)}
        <div
          class:npc1={$chapters[$currentChapterId][dialogNodeId].character === 'NPC1'}
          class:player={$chapters[$currentChapterId][dialogNodeId].character === 'Player'}
          class:narrator={$chapters[$currentChapterId][dialogNodeId].character === 'Narrator'}>
            <p>
              {#if $chapters[$currentChapterId][dialogNodeId].text[$gameState.language] instanceof Object}
                {$chapters[$currentChapterId][dialogNodeId].text[$gameState.language][$gameState.gender]}
              {:else}
                {$chapters[$currentChapterId][dialogNodeId].text[$gameState.language]}
              {/if}
            </p>
        </div>
      {/each}
      <div id="typing-container" class:is-hidden={!showIsTyping} class:npc1={npc1Typing} class:player={playerTyping}>
        <p>
          ...
        </p>
      </div>
    </div>
    <div id="answer-container">
      <div class="player">
        {#each answersNodeIds as answerDialogNodeId (answerDialogNodeId)}
          <p class="choice" on:click={() => addAnswer(answerDialogNodeId)}>
            {#if $chapters[$currentChapterId][answerDialogNodeId].text[$gameState.language] instanceof Object}
              {$chapters[$currentChapterId][answerDialogNodeId].text[$gameState.language][$gameState.gender]}
            {:else}
              {$chapters[$currentChapterId][answerDialogNodeId].text[$gameState.language]}
            {/if}
          </p>
        {/each}
      </div>
    </div>
  {:else}
    <p>Chargement...</p>
  {/if}
</div>

<style lang="scss">

  #dialog-container-background {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: #E0E0E0;
    padding-bottom: 1em;

    #dialog-container, #answer-container {
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

      div.npc1 {
        background: white;
        border-radius: 0 0.5em 0.5em 0.5em; /* top-left corner, top-right corner, bottom-right corner, bottom-left corner */
        margin-left: 0.5em;
        text-align: left;
        justify-self: left;
        animation-name: fadeIn;
        animation-duration: 0.5s;
      }

      div.player {
        background: #e1ffc7;
        border-radius: 0.5em 0.5em 0 0.5em; /* top-left corner, top-right corner, bottom-right corner, bottom-left corner */
        margin-right: 0.5em;
        text-align: right;
        justify-self: right;
        animation-name: fadeIn;
        animation-duration: 0.5s;

        p.choice {
          color: #2577e1;
          cursor: pointer;
          margin: 0;
          padding-top: 0.3em;
          padding-bottom: 0.3em;
        }
        p.choice:not(:last-child) {
          border-bottom: solid 1px lightgray;
        }
      }

      @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
      }
      div.narrator {
        background: gray;
        border-radius: 0; /* top-left corner, top-right corner, bottom-right corner, bottom-left corner */
        text-align: center;
        justify-self: center;
        border-radius: 0.5em;
        background-color: #b7b5b5;
        box-shadow: none;
        animation-name: fadeIn;
        animation-duration: 0.5s;
      }
    }
  }

  // Commons
  .is-hidden {
    display: none !important;
  }
</style>