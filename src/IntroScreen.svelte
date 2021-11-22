<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { currentChapterId, gameState } from './stores/gameState';
  import { chapters } from './stores/chapters';

  const dispatch = createEventDispatcher();
  let twoDigitsChapterId: string;
  let storesLoaded: boolean = false;
  let chapterDate: string;

  function abortTimer() {
    dispatch('abortTimer', {});
  }

  function waitStoresToLoad() {
    // Stores fully loaded
    if (Object.keys($chapters).length > 0) {
      storesLoaded = true;
      chapterDate = new Intl.DateTimeFormat('fr-FR', {month: "long", day: '2-digit'}).format(new Date($chapters[$currentChapterId].metadata.date));

    // Stores not fully loaded, yet
    } else {
      setTimeout(waitStoresToLoad, 10);
    }
  }

  onMount(() => {
    waitStoresToLoad();
    window.scrollTo(0,document.body.scrollHeight);
  });

  $: twoDigitsChapterId = $currentChapterId.padStart(2, '0');
  const url_smartphone = `url('/assets/images/intros/${$currentChapterId.padStart(2, '0')}_${($gameState.gender == 'M') ? 'Arya' : 'Jon'}_Ratio2-5.png')`;
  const url_tablet = `url('/assets/images/intros/${$currentChapterId.padStart(2, '0')}_${($gameState.gender == 'M') ? 'Arya' : 'Jon'}_Ratio2.png')`;
  const url_desktop = `url('/assets/images/intros/${$currentChapterId.padStart(2, '0')}_${($gameState.gender == 'M') ? 'Arya' : 'Jon'}_Ratio1-6.png')`;
</script>

<div id="intro"
  on:click={abortTimer}
  style="--url-smartphone: {url_smartphone};--url-tablet: {url_tablet}; --url-desktop: {url_desktop};">
  <div id="titles">
    <fieldset>
      <legend>{$currentChapterId === '0' ? 'INTRODUCTION' : `CHAPITRE ${twoDigitsChapterId}`}</legend>
      {#if storesLoaded}
        <p id="date">
          <svg class="icon calendar">
            <use href='assets/sprite_icons.svg#calendar-alt' />
          </svg>
          {chapterDate}
        </p>
        <p id="subtitle">{ @html $chapters[$currentChapterId].metadata.title[$gameState.language]}</p>
        {#if $chapters[$currentChapterId].metadata.progress}
          <p id="progress-motto">Ton profil s'affine, sa précision est actuellement de :</p>
          <div id="progress-container">
            <div id="progress" style="--width: {(100 - Number($chapters[$currentChapterId].metadata.progress))}%;--padding-left: {$currentChapterId === '10' ? '0' : '0.5em'};">
            </div>
            <p id="progress-score">
              {Number($currentChapterId) * 10}%
            </p>
          </div>
        {/if}
      {/if}
    </fieldset>
  </div>
</div>

<style lang="scss">
  #intro {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-repeat: no-repeat;
    background-position: center;
    background-color: var(--color-background-intro);

    // Phones
    @media (max-width: 767px) {
      background-image: var(--url-smartphone);
      background-size: cover;
    }

    // Tablets
    @media (min-width: 768px) and (max-width: 1024px) {
      background-image: var(--url-tablet);
      background-size: cover;
    }

    // Desktops
    @media (min-width: 1024px) {
      background-image: var(--url-desktop);
      background-size: cover;
    }

    // Wide Desktops
    @media (min-width: 1280px) {
      background-size: contain;
    }
  }


  #titles {
    background-color: var(--color-titles-intro);
    opacity: 0.85;
    padding-top: 1em;
    padding-bottom: 1em;
    position: sticky;
    top: 100%;

    fieldset {
      border-style: solid none none none; /* top, right, bottom, left */
      border-width: 0.15em;
      border-color: white;
      max-width: 90%;
      margin-left: auto;
      margin-right: auto;
      padding-top: 0;
      padding-bottom: 0;

      legend {
        margin: auto;
        padding-left: 5%;
        padding-right: 5%;
        font-weight: 900;
        color: white;
        font-size: x-large;
        white-space: nowrap;
        width: 50%;

        // Narrow Phones
        @media (max-width: 320px) {
          font-size: large;
        }
      }
      p#subtitle {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        color: white;
        font-style: italic;
        font-size: 0.8em;

        // Narrow Phones
        @media (max-width: 320px) {
          font-size: 0.7em;
        }
      }
      p#date {
        margin-top: 0;
        margin-bottom: 0.5em;
        font-weight: 400;
        color: white;

        .calendar {
          vertical-align: top;
        }
      }
      #progress-motto {
        margin-top: 1em;
        margin-bottom: 0.5em;
        font-size: 0.8em;
        color: white;

        // Narrow Phones
        @media (max-width: 320px) {
          font-size: 0.7em;
        }
      }
      #progress-container {
        background: linear-gradient(to right, #ca241d, #feca00);
        border-radius: 1em;
        max-width: 20em;
        margin-left: auto;
        margin-right: auto;
        display: flex;

        #progress {
          background-color: white;
          font-weight: 900;
          text-align: left;
          padding-left: var(--padding-left);
          padding-top: 0.25em;
          padding-bottom: 0.25em;
          width: var(--width);
          margin-left: auto;
          border-top-right-radius: 1em;
          border-bottom-right-radius: 1em;
          height: 1em;
        }
        #progress-score {
          color: white;
          position: absolute;
          margin: 0;
          padding-left: 0.5em;
          padding-top: 0.25em;
          padding-bottom: 0.25em;
          vertical-align: middle;
          font-weight: 900;
        }
      }
    }
  }
</style>