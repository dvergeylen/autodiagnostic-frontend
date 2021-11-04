// This store represents a game state: all DialogNodes already played,
// grouped by chapter
import { Readable, writable, Writable, derived } from 'svelte/store';

const newGame: GameState = {
  gender: '',
  language: 'fr',
  attribution: {
    leader: 0,
    bricoleur: 0,
    coequipier: 0,
    planificateur: 0,
    idealiste: 0,
    creatif: 0,
    audacieux: 0,
    explorateur: 0
  },
  nodes: { },
};

export const gameState: Writable<GameState> = writable(newGame);
export const currentChapterId: Readable<string> = derived(
  gameState,
  $gameState => Object.keys($gameState.nodes).reduce((id, k) => Number(k) > Number(id) ? k : id, "0"),
);
export const sortedPlayerAttributions = derived(
  gameState,
  $gameState => Object.entries($gameState.attribution).sort(([keyA, scoreA], [keyB, scoreB]) => scoreB - scoreA),
);