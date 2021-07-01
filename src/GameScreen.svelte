<script lang="ts">
  import GameScreenNavbar from './GameScreenNavbar.svelte';
  import GameScreenDialogHeader from './GameScreenDialogHeader.svelte';
  import GameScreenDialogNodes from './GameScreenDialogNodes.svelte';
</script>

<main>
  <GameScreenNavbar />
  <GameScreenDialogHeader />
  <GameScreenDialogNodes />
</main>

<style lang="scss">
  // Commons
  main {
    text-align: center;
    padding: 1em;
    max-width: 50em;
    margin: 0 auto;
  }
</style>