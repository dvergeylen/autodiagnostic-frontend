// This store represents a game state
import { writable, Writable } from 'svelte/store';

const newGame: GameState = {
  gender: '',
  nodes: { },
};

export const gameState: Writable<GameState> = writable(newGame);