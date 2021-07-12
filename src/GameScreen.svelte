<script lang="ts">
  import GameScreenDialogHeader from './GameScreenDialogHeader.svelte';
  import GameScreenDialogNodes from './GameScreenDialogNodes.svelte';
</script>

<main>
  <GameScreenDialogHeader />
  <GameScreenDialogNodes />
</main>

<style lang="scss">
  // Commons
  main {
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    // Phones
    @media (max-width: 768px) {
      max-width: 50em;
    }

    // Tablets
    @media (min-width: 769px) and (max-width: 1023px) {
      margin-left: auto;
      margin-right: auto;
      min-width: 90%;
    }

    // Desktops
    @media (min-width: 1024px) {
      max-width: 50em;
      margin-left: auto;
      margin-right: auto;
      min-width: 50%;
    }
  }
</style>