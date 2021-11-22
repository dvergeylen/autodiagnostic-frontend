<script lang="ts">
  import { onMount, onDestroy, afterUpdate, tick, createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { sendTimestampTelemetry } from './telemetry';
  import { appStatus, displayMapStore } from './stores/appStatus';
  import { GameStatus } from './enums';
  import { gameState, currentChapterId } from './stores/gameState';
  import { chapters } from './stores/chapters';

  const dispatch = createEventDispatcher();
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
  let userClickedOnAnswer: boolean = false;
  let timerId: NodeJS.Timeout;

  // Display error screen if unable to load chapters
  $: if (Object.keys($chapters).includes('error')) {
    appStatus.set(GameStatus.ERROR);
  }

  function displayResultsScreen() {
    appStatus.set(GameStatus.FINISHED);
  }

  function clearTimer() {
    if (!userClickedOnAnswer) {
      clearTimeout(timerId);
      waitStoresToLoad(true);
    } else {
      userClickedOnAnswer = false;
    }
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

    // Display Answer DialogNode div when 'Player' and multiple nextNodes
    } else if (currentSpeaker === 'Player' && (nextNodes.length > 1)) {
      const timerReply = 500;
      timerId = setTimeout(() => {
        displayAnswerDialogBox(nextNodeIds);
      }, skipTimer ? 0 : timerReply);

    // 'Narrator', display node immediately
    } else if (currentSpeaker === 'Narrator') {
      // ...unless multiple Narrator nodes are displayed consecutively
      const timerReply = 3500;
      timerId = setTimeout(() => {
        $gameState.nodes[$currentChapterId] = [...($gameState.nodes[$currentChapterId] || []), nextNodeIds[0]];

        // Call next DialogNode, if any
        displayNextDialogNode(nextNodeIds[0]);
      }, (previousSpeaker !== 'Narrator') || skipTimer ? 0 : timerReply);
    // Display next node, after some time typing (varying according to nextnode's length)
    } else {
      const parentNodeLength = $chapters[$currentChapterId].dialogNodes[parentNodeId]?.text[$gameState.language] instanceof Object ?
        $chapters[$currentChapterId].dialogNodes[parentNodeId].text[$gameState.language][$gameState.gender.toLowerCase()].length :
        $chapters[$currentChapterId].dialogNodes[parentNodeId]?.text[$gameState.language]?.length || 10;
      // BeforeIsTyping time is reduced when responses from a same character are following
      const timerBeforeIsTyping = Math.floor(parentNodeLength * (previousSpeaker === currentSpeaker ? 20 : 30));
      timerId = setTimeout(() => {
        showIsTyping = true;

        const nextNodeLength = $chapters[$currentChapterId].dialogNodes[nextNodeIds[0]].text[$gameState.language] instanceof Object ?
          $chapters[$currentChapterId].dialogNodes[nextNodeIds[0]].text[$gameState.language][$gameState.gender.toLowerCase()].length :
          $chapters[$currentChapterId].dialogNodes[nextNodeIds[0]].text[$gameState.language].length;
        const timerIsTyping = Math.floor((nextNodeLength || 10) * 40);
        timerId = setTimeout(() => {
          showIsTyping = false;
          $gameState.nodes[$currentChapterId] = [...($gameState.nodes[$currentChapterId] || []), nextNodeIds[0]];

          // Play sound
          dispatch('playSound', {});

          // Call recursively
          displayNextDialogNode(nextNodeIds[0]);
        },  skipTimer ? 0 : timerIsTyping);
      },  skipTimer ? 0 : timerBeforeIsTyping);
    }
  }

  function addAnswer(dialogNodeid: string) {
    // Clear Map, if any
    displayMapStore.set(false);

    // Clear AnswerDialogBox
    answersNodeIds = [];

    // Prevent click on answer being interpreted as clearTimer
    userClickedOnAnswer = true;

    // Append to displayedNodeIds
    $gameState.nodes[$currentChapterId] = [...($gameState.nodes[$currentChapterId] || []), dialogNodeid];

    // Play sound
    dispatch('playSound', {});

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
    const headerHeight = document.querySelector('.header').clientHeight;
    const dialogContainerBackgroundHeight = document.getElementById('dialog-container-background').clientHeight;
    window.scrollTo(0, headerHeight + dialogContainerBackgroundHeight);
  }

  onMount(() => {
    waitStoresToLoad();
  });

  onDestroy(() => {
    clearTimeout(timerId);
    displayMapUnsubscribe();
  })

  afterUpdate(() => {
    const bodyHeight = document.querySelector('body').clientHeight;
    const dialogContainerHeight = document.getElementById('dialog-container').clientHeight;
    const headerHeight = document.querySelector('.header').clientHeight;
    const dialogContainerBackgroundHeight = document.getElementById('dialog-container-background').clientHeight;
    const yOffset = (bodyHeight * 0.4) >= (dialogContainerHeight + headerHeight) ? 0 : (headerHeight + dialogContainerBackgroundHeight);
    window.scrollTo(0, yOffset);
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
        <div class="phylactery"
            class:npc1={$chapters[$currentChapterId].dialogNodes[dialogNodeId].character === 'NPC1'}
            class:player={$chapters[$currentChapterId].dialogNodes[dialogNodeId].character === 'Player'}
            class:narrator={$chapters[$currentChapterId].dialogNodes[dialogNodeId].character === 'Narrator'}>
          {#if $chapters[$currentChapterId].dialogNodes[dialogNodeId].character === 'NPC1'}
            <div class="avatar">
              {#if $gameState.gender === 'M'}
                <img src='/assets/images/avatar_Arya.png' alt="Arya"/>
              {:else}
                <img src='/assets/images/avatar_Jon.png' alt="Jon"/>
              {/if}
            </div>
          {/if}
            {#if $chapters[$currentChapterId].dialogNodes[dialogNodeId].imagePath}
              <div class="dialog image-container">
                <picture>
                    {#if $chapters[$currentChapterId].dialogNodes[dialogNodeId].imagePath.endsWith('webp')}
                    <source type="image/webp" srcset="{$chapters[$currentChapterId].dialogNodes[dialogNodeId].imagePath}">
                    <img
                      on:load={updateScrollHeight}
                      class="video"
                      data-src="{$chapters[$currentChapterId].dialogNodes[dialogNodeId].imagePath.replace('.webp', '.gif')}"
                      alt="{$chapters[$currentChapterId].dialogNodes[dialogNodeId].imageAlt}" />
                  {:else}
                    <img
                      on:load={updateScrollHeight}
                      src="{$chapters[$currentChapterId].dialogNodes[dialogNodeId].imagePath}"
                      alt="{$chapters[$currentChapterId].dialogNodes[dialogNodeId].imageAlt}" />
                  {/if}
                </picture>
              </div>
            {:else}
              <div class="dialog">
                <p>
                  {#if $chapters[$currentChapterId].dialogNodes[dialogNodeId].text[$gameState.language] instanceof Object}
                    {@html $chapters[$currentChapterId].dialogNodes[dialogNodeId].text[$gameState.language][$gameState.gender.toLowerCase()]}
                  {:else}
                    {@html $chapters[$currentChapterId].dialogNodes[dialogNodeId].text[$gameState.language]}
                  {/if}
                </p>
              </div>
            {/if}
          {#if $chapters[$currentChapterId].dialogNodes[dialogNodeId].character === 'Player'}
            <div class="avatar">
              {#if $gameState.gender === 'M'}
                <img src='/assets/images/avatar_Jon.png' alt="Jon"/>
              {:else}
                <img src='/assets/images/avatar_Arya.png' alt="Arya"/>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
      <div id="typing-container" class:is-hidden={!showIsTyping} class:npc1={npc1Typing} class:player={playerTyping}>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
    <div id="answer-container" class:is-hidden={answersNodeIds.length === 0}>
      <div class="phylactery player">
        <div class="dialog" class:is-grid-2x2={answersNodeIds.reduce((acc, id) => acc || $chapters[$currentChapterId].dialogNodes[id].imagePath, false)}>
          {#each answersNodeIds as answerDialogNodeId (answerDialogNodeId)}
              {#if $chapters[$currentChapterId].dialogNodes[answerDialogNodeId].imagePath}
                <picture on:load={updateScrollHeight}>
                    {#if $chapters[$currentChapterId].dialogNodes[answerDialogNodeId].imagePath.endsWith('webp')}
                    <source type="image/webp" srcset="{$chapters[$currentChapterId].dialogNodes[answerDialogNodeId].imagePath}">
                    <img
                      on:load={updateScrollHeight}
                      on:click={() => addAnswer(answerDialogNodeId)}
                      class="video"
                      data-src="{$chapters[$currentChapterId].dialogNodes[answerDialogNodeId].imagePath.replace('.webp', '.gif')}"
                      alt="{$chapters[$currentChapterId].dialogNodes[answerDialogNodeId].imageAlt}" />
                  {:else}
                    <img
                      on:load={updateScrollHeight}
                      on:click={() => addAnswer(answerDialogNodeId)}
                      src="{$chapters[$currentChapterId].dialogNodes[answerDialogNodeId].imagePath}"
                      alt="{$chapters[$currentChapterId].dialogNodes[answerDialogNodeId].imageAlt}" />
                  {/if}
                </picture>
              {:else}
                <p class="choice" on:click={() => addAnswer(answerDialogNodeId)}>
                  {#if $chapters[$currentChapterId].dialogNodes[answerDialogNodeId].text[$gameState.language] instanceof Object}
                    {$chapters[$currentChapterId].dialogNodes[answerDialogNodeId].text[$gameState.language][$gameState.gender.toLowerCase()]}
                  {:else}
                    {$chapters[$currentChapterId].dialogNodes[answerDialogNodeId].text[$gameState.language]}
                  {/if}
                </p>
              {/if}
          {/each}
        </div>
        <div class="avatar">
          {#if $gameState.gender === 'M'}
            <img src='/assets/images/avatar_Jon.png' alt="Jon"/>
          {:else}
            <img src='/assets/images/avatar_Arya.png' alt="Arya"/>
          {/if}
        </div>
      </div>
    </div>
    {#if displayNextChapterBox}
      <div id="next-chapter-container" on:click={startNextChapter}>
        <p>Continuer (Chapitre {nextChapterId}) ⟶</p>
      </div>
    {/if}
    {#if displayResultsBox}
      <div id="next-chapter-container" on:click={displayResultsScreen}>
        <p>Fin de l'Aventure (Résultats) ⟶</p>
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
    background-color: var(--color-background-chat);
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
        border-radius: 0.5em;
        box-shadow: 0.1em 0.1em 0 0 #dbbbbd;
        display: grid;

        @media (min-width: 640px) {
          max-width: 80%;
        }
        @media (max-width: 640px) {
          max-width: 90%;
        }
        p {
          display: inline-block;
          margin-top: 0.3em;
          margin-bottom: 0.3em;
        }
      }

      .phylactery {
        box-shadow: none;
        display: flex;
        align-items: center;
        padding-left: 0.25em;
        padding-right: 0.25em;

        .avatar {
          box-shadow: none;
          padding: 0;

          img {
            width: 2em;
            height: 2em;
          }
        }

        .dialog {
          animation-name: fadeIn;
          animation-duration: 0.5s;
          align-items: center;
          justify-content: center;

          img {
            max-width: 15em;
          }
          img.video {
            max-width: 8em;
            margin: auto;
            cursor: pointer;
            max-height: 100%;
          }
          picture:only-child {
            margin: auto;
            padding-top: 0.5em;
            padding-bottom: 0.5em;
            display: flex;
            align-items: center;
            img.video {
              max-width: 12em;
            }
          }
        }

        .dialog.image-container {
          padding-left: 0.5em;
          padding-right: 0.5em;
          max-width: 100%;
          width: fit-content;
        }
      }

      .phylactery.npc1 {
        justify-self: left;

        .dialog {
          background: white;
          margin-left: 0.5em;
          text-align: left;
        }
      }
      .phylactery.player {
        justify-self: right;
        justify-content: flex-end;;

        .dialog {
          background: var(--color04);
          margin-right: 0.5em;
          text-align: right;
          display: grid;
          width: -moz-fit-content;
          width: fit-content;

          p.choice {
            color: var(--anthracite);
            cursor: pointer;
            margin: 0;
            padding-top: 0.3em;
            padding-bottom: 0.3em;
            font-weight: 500;
          }
          p.choice:not(:last-child) {
            border-bottom: solid 1px var(--anthracite);
          }
        }
      }

      .phylactery.npc1 ~ .phylactery.npc1 {
        .avatar {
          display: none;
        }
      }

      .phylactery.player ~ .phylactery.player {
        .avatar {
          display: none;
        }
      }


      @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
      }
      .phylactery.narrator {
        background: white;
        text-align: center;
        justify-self: center;
        box-shadow: none;
        animation-name: fadeIn;
        animation-duration: 0.5s;
        text-transform: uppercase;
        border: 1px solid red;
        font-weight: 700;
        font-size: 0.8em;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        max-width: 75%;
        .dialog {
          box-shadow: none;
          margin-left: auto;
          margin-right: auto;
        }
      }

      .is-grid-2x2 {
        grid-template-columns: auto auto;
        grid-gap: 1em;
        margin: 0;
        padding: 0.5em;
        max-width: none !important;
      }

      @keyframes isTyping {
        0% {
          transform: translateY(0px);
        }
        28% {
          transform: translateY(-3.5px);
        }
        44% {
          transform: translateY(0px);
        }
      }
      #typing-container {
        height: 2em;
        display: flex;
        align-items: center;
        border-radius: 0.5em;
      }
      .dot {
        animation: isTyping 1s infinite ease-in-out;
        background-color: var(--anthracite);
        border-radius: 50%;
        height: 0.1em;
        width: 0.1em;
        margin-right: 0.15em;
        vertical-align: middle;
        display: inline-block;
        padding: 0;
        box-shadow: none;
      }
      .dot:nth-child(1) {
        animation-delay: 400ms;
      }
      .dot:nth-child(2) {
        animation-delay: 500ms;
      }
      .dot:nth-child(3) {
        animation-delay: 600ms;
      }
      #typing-container.npc1 {
        background: white;
      }
      #typing-container.player {
        background: var(--color04);
        justify-self: right;
      }
    }
  }

  #next-chapter-container {
    background-color: white;
    font-weight: 700;
    cursor: pointer;
    animation-name: fadeIn;
    animation-duration: 2s;
    border: 2px solid red;
    margin-top: 1em;
  }
</style>