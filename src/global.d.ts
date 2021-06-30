/// <reference types="svelte" />

interface GameState {
  gender: 'm' | 'f' | '',
  nodes: {
    [chapterId: string]: Array<string>,
  }
}