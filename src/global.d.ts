/// <reference types="svelte" />

interface ScenarioHash {
  [chapterId: string]: Scenario,
}

interface GameState {
  gender: 'm' | 'f' | '',
  language: 'fr' | 'en',
  attribution: {
    leader: number,
    bricoleur: number,
    coequipier: number,
    planificateur: number,
    idealiste: number,
    creatif: number,
    audacieux: number,
    explorateur: number
  },
  nodes: {
    [chapterId: string]: Array<string>,
  }
}

interface DialogNode {
  id: string,
  text: {
    fr: string | {
      m: string,
      f: string,
    },
    en?: string,
  },
  nextNodes: Array<string>,
  incomingNodes?: Array<string>,
  character: "Player" | "NPC1" | "Narrator",
  attribution?: {
    leader?: number,
    bricoleur?: number,
    coequipier?: number,
    planificateur?: number,
    idealiste?: number,
    creatif?: number,
    audacieux?: number,
    explorateur?: number,
  }
  imagePath?: string,
}

interface Scenario {
  metadata: {
    part: string,
    chapter: string,
    title: {
      fr: string,
      en?: string,
    }
    mapMarker: {
      longitude: number,
      latitude: number,
      zoom: number,
      label: {
        fr: string,
        en?: string,
      }
    }
  };
  dialogNodes: {
    [id: string]: DialogNode,
  };
}