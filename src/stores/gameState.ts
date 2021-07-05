// This store represents a game state: all DialogNodes already played,
// grouped by chapter
import { Readable, writable, Writable, derived } from 'svelte/store';

const newGame: GameState = {
  gender: '',
  language: 'fr',
  nodes: { },
};

export const gameState: Writable<GameState> = writable(newGame);
export const currentChapterId: Readable<string> = derived(
  gameState,
  $gameState => Object.keys($gameState.nodes).reduce((id, k) => k > id ? k : id, "1"),
);