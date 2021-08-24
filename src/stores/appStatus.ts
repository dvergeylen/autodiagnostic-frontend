// This store represents the App status
import { writable, Writable } from 'svelte/store';
import { GameStatus } from '../enums';

export const appStatus: Writable<GameStatus> = writable(GameStatus.UNSTARTED);
export const displayMapStore: Writable<boolean> = writable(false);
export const playMusicStore: Writable<boolean> = writable(true);
export const playSoundsStore: Writable<boolean> = writable(true);