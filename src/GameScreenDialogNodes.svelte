<script lang="ts">
  import { onMount, onDestroy, afterUpdate, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import { sendTimestampTelemetry } from './telemetry';
  import { appStatus, displayMapStore } from './stores/appStatus';
  import { GameStatus } from './enums';
  import { gameState, currentChapterId } from './stores/gameState';
  import { chapters } from './stores/chapters';

  let displayedNodeIds: Array<string>;
  let displayNextChapterBox: boolean = false;
  let displayResultsBox: boolean = false;
  let nextChapterId: number;
  let answersNodeIds: Array<string> = [];
  let showIsTyping: boolean = false;
  let npc1Typing: boolean = false;
  let playerTyping: boolean = false;
  let narratorTyping: boolean = false;
  let displayMap: boolean = false;
  let timerId: NodeJS.Timeout;

  // Display error screen if unable to load chapters
  $: if (Object.keys($chapters).includes('error')) {
    appStatus.set(GameStatus.ERROR);
  }

  function displayResultsScreen() {
    appStatus.set(GameStatus.FINISHED);
  }

  function clearTimer() {
    clearTimeout(timerId);
    waitStoresToLoad(true);
  }

  async function startNextChapter() {
    $gameState.nodes[String(nextChapterId)] = [];
    displayNextChapterBox = false;
    await tick();
    appStatus.set(GameStatus.INTRO);
  }

  function displayAnswerDialogBox(nextNodeIds: Array<string>) {
    answersNodeIds = nextNodeIds;
  }

  function displayNextDialogNode(parentNodeId: string | undefined, isRootNode: boolean = false, skipTimer: boolean = false) {
    // '1' is nextNode is there is no previous node (e.g: chapter root node)
    const nextNodeIds: Array<string> = isRootNode ? ["1"] : $chapters[$currentChapterId].dialogNodes[parentNodeId].nextNodes;
    const nextNodes: Array<DialogNode> = Object.entries<DialogNode>($chapters[$currentChapterId].dialogNodes)
      .filter(([_, n]) => nextNodeIds.includes(n.id))
      .map(([_, n]) => n);
    const previousSpeaker: "Player" | "NPC1" | "Narrator" = $chapters[$currentChapterId].dialogNodes[parentNodeId || "1"].character;
    const currentSpeaker = nextNodes.reduce<"Player" | "NPC1" | "Narrator">((acc, n: DialogNode) => {
      return (acc === "Player") || (n.character === "Player") ? 'Player' : acc;
    }, nextNodes[0]?.character || "NPC1");
    npc1Typing = currentSpeaker === 'NPC1';
    playerTyping = currentSpeaker === 'Player';
    narratorTyping = currentSpeaker === 'Narrator';



    // End of Chapter
    if (nextNodes.length === 0) {
      const maxChapterId = Object.keys($chapters).reduce((id, k) => Number(k) > id ? Number(k) : id, 1);
      nextChapterId = Number($currentChapterId) + 1;
      if (maxChapterId >= nextChapterId) {
        displayNextChapterBox = true;
      } else {
        displayResultsBox = true;
      }

    // Display Answer DialogNode div:
    // - when transitioning from NPCx → Player (event if 1 choice)
    // - when Player and multiple nextNodes
    } else if (currentSpeaker === 'Player' && (nextNodes.length > 1)) {
      const timerReply = 1000;
      timerId = setTimeout(() => {
        displayAnswerDialogBox(nextNodeIds);
      }, skipTimer ? 0 : timerReply);

    // Narrator, display node immediately
    } else if (currentSpeaker === 'Narrator') {
      $gameState.nodes[$currentChapterId] = [...($gameState.nodes[$currentChapterId] || []), nextNodeIds[0]];

      // Call next DialogNode, if any
      displayNextDialogNode(nextNodeIds[0]);

    // Display next node, after a random time typing
    } else {
      const timerIsTyping = Math.floor(Math.random() * (750 - 500 + 1) + 500);
      timerId = setTimeout(() => {
        showIsTyping = true;

        const timerReply = Math.floor(Math.random() * (1500 - 1000 + 1) + 1000);
        timerId = setTimeout(() => {
          showIsTyping = false;
          $gameState.nodes[$currentChapterId] = [...($gameState.nodes[$currentChapterId] || []), nextNodeIds[0]];

          // Call recursively
          displayNextDialogNode(nextNodeIds[0]);
        },  skipTimer ? 0 : timerReply);
      },  skipTimer ? 0 : timerIsTyping);
    }
  }

  function addAnswer(dialogNodeid: string) {
    // Clear Map, if any
    displayMapStore.set(false);

    // Clear AnswerDialogBox
    answersNodeIds = [];

    // Append to displayedNodeIds
    $gameState.nodes[$currentChapterId] = [...($gameState.nodes[$currentChapterId] || []), dialogNodeid];

    // Update gameState
    if ($chapters[$currentChapterId].dialogNodes[dialogNodeid].character === 'Player') {
      $gameState.attribution = Object.entries($gameState.attribution).reduce((acc, [k, v]) => ({
        ...acc,
        [k]: v + $chapters[$currentChapterId].dialogNodes[dialogNodeid].attribution[k],
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

      // Update Stats (TODO: if user permitted it)
      const attributions = Object.entries<number>($chapters[$currentChapterId].dialogNodes[dialogNodeid].attribution)
                                 .filter(([k, v]) => v !== 0);
      if (attributions.length > 0) {
        sendTimestampTelemetry('1', $currentChapterId, dialogNodeid, attributions[0][0], attributions[0][1]);
      }
    }

    // Continue dialog, if any
    displayNextDialogNode(dialogNodeid);
  }

  function waitStoresToLoad(skipTimer = false) {
    // Stores fully loaded
    if (Object.keys($chapters).length > 0) {
      const parentNodeId = displayedNodeIds[displayedNodeIds.length - 1];
      displayNextDialogNode(parentNodeId, (parentNodeId === undefined), skipTimer); // Display next Dialog box or append DialogNodes

    // Stores not fully loaded, yet
    } else {
      setTimeout(waitStoresToLoad, 10);
    }
  }

  // Image loading doesn't trigger an 'afterUpdate' svelte event,
  // thus linking this function to images
  function updateScrollHeight() {
    window.scrollTo(0,document.body.scrollHeight);
  }

  onMount(() => {
    waitStoresToLoad();
  });

  onDestroy(() => {
    clearTimeout(timerId);
    displayMapUnsubscribe();
  })

  afterUpdate(() => {
    window.scrollTo(0,document.body.scrollHeight);
  });

  const displayMapUnsubscribe = displayMapStore.subscribe(newVal => {
    if (newVal && !displayMap) {
      clearTimeout(timerId);
    } else if (newVal == false && displayMap === true) {
      waitStoresToLoad();
    }
    displayMap = newVal;
  });

  $: displayedNodeIds = ($gameState.nodes[$currentChapterId] || []);
</script>


<div id="dialog-container-background" on:click={clearTimer} in:fade>
  {#if $chapters[$currentChapterId]}
    <div id="dialog-container">
      {#each displayedNodeIds as dialogNodeId (dialogNodeId)}
        <div
          class:npc1={$chapters[$currentChapterId].dialogNodes[dialogNodeId].character === 'NPC1'}
          class:player={$chapters[$currentChapterId].dialogNodes[dialogNodeId].character === 'Player'}
          class:narrator={$chapters[$currentChapterId].dialogNodes[dialogNodeId].character === 'Narrator'}>
          {#if $chapters[$currentChapterId].dialogNodes[dialogNodeId].imagePath}
            <img src="{$chapters[$currentChapterId].dialogNodes[dialogNodeId].imagePath}"
              alt="{$chapters[$currentChapterId].dialogNodes[dialogNodeId].imageAlt}"
              on:load={updateScrollHeight} />
          {:else}
            <p>
              {#if $chapters[$currentChapterId].dialogNodes[dialogNodeId].text[$gameState.language] instanceof Object}
                {$chapters[$currentChapterId].dialogNodes[dialogNodeId].text[$gameState.language][$gameState.gender]}
              {:else}
                {$chapters[$currentChapterId].dialogNodes[dialogNodeId].text[$gameState.language]}
              {/if}
            </p>
          {/if}
        </div>
      {/each}
      <div id="typing-container" class:is-hidden={!showIsTyping} class:npc1={npc1Typing} class:player={playerTyping}>
        <p>
          ...
        </p>
      </div>
    </div>
    <div id="answer-container">
      <div class="player" class:is-grid-2x2={answersNodeIds.reduce((acc, id) => acc || $chapters[$currentChapterId].dialogNodes[id].imagePath, false)}>
        {#each answersNodeIds as answerDialogNodeId (answerDialogNodeId)}
            {#if $chapters[$currentChapterId].dialogNodes[answerDialogNodeId].imagePath}
              <img src="{$chapters[$currentChapterId].dialogNodes[answerDialogNodeId].imagePath}"
              alt="{$chapters[$currentChapterId].dialogNodes[answerDialogNodeId].imageAlt}"
               on:click={() => addAnswer(answerDialogNodeId)}
               on:load={updateScrollHeight}/>
            {:else}
              <p class="choice" on:click={() => addAnswer(answerDialogNodeId)}>
                {#if $chapters[$currentChapterId].dialogNodes[answerDialogNodeId].text[$gameState.language] instanceof Object}
                  {$chapters[$currentChapterId].dialogNodes[answerDialogNodeId].text[$gameState.language][$gameState.gender]}
                {:else}
                  {$chapters[$currentChapterId].dialogNodes[answerDialogNodeId].text[$gameState.language]}
                {/if}
              </p>
            {/if}
        {/each}
      </div>
    </div>
    {#if displayNextChapterBox}
      <div id="next-chapter-container" on:click={startNextChapter}>
        <p>Continuer (Chapitre {nextChapterId}) →</p>
      </div>
    {/if}
    {#if displayResultsBox}
      <div id="next-chapter-container" on:click={displayResultsScreen}>
        <p>Fin de l'Aventure (Résultats) →</p>
      </div>
    {/if}
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
        display: grid;
        width: -moz-fit-content;
        width: fit-content;

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

      div.player, div.npc1 {
        img {
          max-width: 9.5em;
          margin: auto;
          cursor: pointer;
          max-height: 10em;
        }
        img:only-child {
          margin: auto;
          padding-top: 0.5em;
          padding-bottom: 0.5em;
        }
      }

      .is-grid-2x2 {
        grid-template-columns: auto auto;
        grid-gap: 1em;
        margin: 0;
        padding: 0.5em;
        max-width: none !important;
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

  #next-chapter-container {
    background-color: darkgray;
    font-weight: 600;
    cursor: pointer;
      animation-name: fadeIn;
      animation-duration: 2s;
  }
</style>