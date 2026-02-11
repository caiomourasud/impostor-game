
export enum GameState {
  LOBBY = 'LOBBY',
  REVEALING = 'REVEALING',
  PLAYING = 'PLAYING',
  RESULTS = 'RESULTS'
}

export interface Player {
  id: string;
  name: string;
  isImpostor: boolean;
}

export type Winner = 'IMPOSTOR' | 'TEAM' | null;
