<script lang="ts">
  import { onMount } from "svelte";
  import { gameState } from './stores/state';
  import { appStatus } from './stores/appStatus';
  import { GameStatus } from './enums';

  let scenariosPromises: Promise<Array<Object>>;

  onMount(async () => {
      const promises: Array<Promise<Object>> = Array.from(Array(10).keys()).map(async (i) => {
        const scenarioFile = await fetch(`scenarios/chapitre${String(i).padStart(2, '0')}.json`)
        const scenario = await scenarioFile.text();

        if (scenario.length > 0) {
          return JSON.parse(scenario);
        } else {
          throw new Error(`Impossible de lire le scénario n°${String(i).padStart(2, '0')}`);
        }
      });

      scenariosPromises = new Promise(async (resolve, reject) => {
        try {
          const results = await Promise.all(promises);
          resolve(results);
        } catch (e) {
          reject(e);
        }
      });
  });

  // TODO: plutôt que d'avoir un array de scenarios, il serait utile d'en avoir un objet key → value pour chacun, adressable par scenarios[i]

</script>

<p>Game Screen!</p>

{#await scenariosPromises}
  <p>Chargement du jeu, veuillez patienter</p>
{:then scenario}
  <p>Les scénarios sont chargés</p>
{:catch error}
  <p style="color: red">Une erreur est survenue: {error}</p>
{/await}