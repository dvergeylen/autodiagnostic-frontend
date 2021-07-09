import { Readable, readable, Subscriber, Unsubscriber, derived } from 'svelte/store';

export const chapters = readable({}, start);

function start(set: Subscriber<{}>): Unsubscriber {
  // Adapt Array(10) with the number of the available chapters
  const promises: Array<Promise<Scenario>> = Array.from(Array(10).keys()).map(async (i: number): Promise<Scenario> => {
    const scenarioFile = await fetch(`chapters/chapitre${String(i + 1).padStart(2, '0')}.json`);

    if (scenarioFile.ok) {
      const scenario: string = await scenarioFile.text();
      return JSON.parse(scenario);
    } else {
      throw new Error(`Impossible de lire le scénario n°${String(i + 1).padStart(2, '0')}`);
    }
  });

  // Transform Array<Scenario> into an adressable Hash {[scenarioId]: DialogNodes}
  Promise.all(promises).then((chaptersArray: Array<Scenario>) => {
    const results: ScenarioHash = chaptersArray.reduce((acc: ScenarioHash, scenario: Scenario) => ({
      ...acc,
      [scenario.metadata.chapter]: scenario.dialogNodes,
    }), {})

    set(results);
  }).catch((e) => {
    set({ error: e.message });
  });

  return function stop() { }; // Nothing to do when stopping
}