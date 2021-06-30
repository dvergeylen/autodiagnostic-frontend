// This store represents the App status
import { writable, Writable } from 'svelte/store';
import { GameStatus } from '../enums';

export const appStatus: Writable<GameStatus> = writable(GameStatus.UNSTARTED);