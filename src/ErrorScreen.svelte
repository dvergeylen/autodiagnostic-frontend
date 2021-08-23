<script lang="ts">
  import { chapters } from './stores/chapters';

  const message = $chapters.error;
</script>

<main>
  <h1>Voyage au bout du monde</h1>
  <h3>Une aventure d'introspection</h3>
  <div class="error-container">
    <p class="error">Une erreur est survenue lors du chargement des chapitres du jeu: <br />{message}</p>
  </div>
</main>

<style lang="scss">
  div.error-container {
    margin:auto;

    @media (min-width: 640px) {
      max-width: 80%;
    }
    @media (max-width: 640px) {
      max-width: 90%;
    }
  }
  p.error {
    color: #a10000;
    padding: 1em;
    text-align: center;
    border: #a10000 solid 1px;
    border-radius: 0.3em;
  }
</style>