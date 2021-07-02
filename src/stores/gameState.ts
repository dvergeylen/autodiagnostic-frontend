// This store represents a game state: all DialogNodes already played,
// grouped by chapter
import { writable, Writable } from 'svelte/store';

const newGame: GameState = {
  gender: '',
  language: 'fr',
  nodes: { },
};

export const gameState: Writable<GameState> = writable(newGame);