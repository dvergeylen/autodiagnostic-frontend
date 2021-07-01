<script lang="ts">
  import { onMount } from "svelte";
  import { gameState } from './stores/state';
  import { appStatus } from './stores/appStatus';
  import { GameStatus } from './enums';

  interface ScenarioHash {
    [key: string]: DialogNode,
  }

  let scenariosPromises: Promise<ScenarioHash>;

  onMount(async () => {
      const promises: Array<Promise<DialogNode>> = Array.from(Array(10).keys()).map(async (i: number): Promise<DialogNode> => {
        const scenarioFile = await fetch(`scenarios/chapitre${String(i + 1).padStart(2, '0')}.json`);

        if (scenarioFile.ok) {
          const scenario: string = await scenarioFile.text();
          return JSON.parse(scenario);
        } else {
          throw new Error(`Impossible de lire le scénario n°${String(i).padStart(2, '0')}`);
        }
      });

      scenariosPromises = new Promise(async (resolve, reject) => {
        try {
          const scenariosArray = await Promise.all(promises);
          const results: ScenarioHash = scenariosArray.reduce((acc: ScenarioHash, scenario: DialogNode) => ({
            ...acc,
            [scenario.id]: scenario,
          }), {});
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
{:then scenarios}
  <p>Les scénarios sont chargés</p>
{:catch error}
  <p style="color: red">{error}</p>
{/await}