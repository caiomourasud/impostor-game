import { useState, useCallback } from 'react';

export interface Player {
  id: string;
  name: string;
  isImpostor: boolean;
  theme?: string;
  revealed: boolean;
}

export interface GameState {
  players: Player[];
  impostorCount: number;
  selectedTheme: string;
  gameStarted: boolean;
  gamePhase: 'setup' | 'configuration' | 'playing' | 'preparation' | 'revelation' | 'finished';
  currentPlayerIndex: number;
  themes: string[];
  revealedPlayers: Player[];
}

const DEFAULT_THEMES = [
  'Profissões',
  'Animais',
  'Filmes',
  'Países',
  'Comidas',
  'Esportes',
  'Marcas',
  'Celebridades',
  'Instrumentos Musicais',
  'Planetas',
];

export function useGameState() {
  // Carregar jogadores salvos do localStorage
  const loadSavedPlayers = (): Player[] => {
    try {
      const saved = localStorage.getItem('impostor-game-players');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Erro ao carregar jogadores salvos:', error);
    }
    return [];
  };

  const [state, setState] = useState<GameState>({
    players: loadSavedPlayers(),
    impostorCount: 1,
    selectedTheme: '',
    gameStarted: false,
    gamePhase: 'setup',
    currentPlayerIndex: 0,
    themes: DEFAULT_THEMES,
    revealedPlayers: [],
  });

  const addPlayer = useCallback((name: string) => {
    if (name.trim()) {
      setState((prev) => {
        const newPlayers = [
          ...prev.players,
          {
            id: `player-${Date.now()}-${Math.random()}`,
            name: name.trim(),
            isImpostor: false,
            revealed: false,
          },
        ];
        localStorage.setItem('impostor-game-players', JSON.stringify(newPlayers));
        return {
          ...prev,
          players: newPlayers,
        };
      });
    }
  }, []);

  const removePlayer = useCallback((playerId: string) => {
    setState((prev) => {
      const newPlayers = prev.players.filter((p) => p.id !== playerId);
      localStorage.setItem('impostor-game-players', JSON.stringify(newPlayers));
      return {
        ...prev,
        players: newPlayers,
      };
    });
  }, []);

  const setImpostorCount = useCallback((count: number) => {
    setState((prev) => ({
      ...prev,
      impostorCount: Math.min(count, Math.max(1, prev.players.length - 1)),
    }));
  }, []);

  const setSelectedTheme = useCallback((theme: string) => {
    setState((prev) => ({
      ...prev,
      selectedTheme: theme,
    }));
  }, []);

  const startGame = useCallback(() => {
    setState((prev) => {
      if (prev.players.length === 0 || !prev.selectedTheme) {
        return prev;
      }

      // Embaralhar apenas para atribuir impostores, mas manter ordem original para o jogo
      const shuffledForImpostors = [...prev.players].sort(() => Math.random() - 0.5);
      const impostorIndices = new Set(
        shuffledForImpostors.slice(0, prev.impostorCount).map(p => p.id)
      );

      // Manter a ordem original dos jogadores
      const updatedPlayers = prev.players.map((player) => ({
        ...player,
        isImpostor: impostorIndices.has(player.id),
        theme: impostorIndices.has(player.id) ? undefined : prev.selectedTheme,
        revealed: false,
      }));

      return {
        ...prev,
        players: updatedPlayers,
        gameStarted: true,
        gamePhase: 'playing',
        currentPlayerIndex: 0,
      };
    });
  }, []);

  const revealCurrentPlayer = useCallback(() => {
    setState((prev) => {
      if (prev.currentPlayerIndex >= prev.players.length) {
        return prev;
      }

      const updatedPlayers = [...prev.players];
      updatedPlayers[prev.currentPlayerIndex].revealed = true;

      return {
        ...prev,
        players: updatedPlayers,
      };
    });
  }, []);

  const nextPlayer = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentPlayerIndex + 1;

      if (nextIndex >= prev.players.length) {
        // Ir para a tela de preparação
        return {
          ...prev,
          gamePhase: 'preparation',
        };
      }

      return {
        ...prev,
        currentPlayerIndex: nextIndex,
        players: prev.players.map((p) => ({
          ...p,
          revealed: false,
        })),
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState((prev) => ({
      ...prev,
      gameStarted: false,
      gamePhase: 'setup',
      currentPlayerIndex: 0,
      revealedPlayers: [],
      selectedTheme: '',
      impostorCount: 1,
    }));
  }, []);

  const clearAllPlayers = useCallback(() => {
    setState((prev) => {
      localStorage.removeItem('impostor-game-players');
      return {
        ...prev,
        players: [],
        gameStarted: false,
        gamePhase: 'setup',
        currentPlayerIndex: 0,
        revealedPlayers: [],
        selectedTheme: '',
        impostorCount: 1,
      };
    });
  }, []);

  const revealAll = useCallback(() => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) => ({
        ...p,
        revealed: true,
      })),
    }));
  }, []);

  const goToFinished = useCallback(() => {
    setState((prev) => ({
      ...prev,
      gamePhase: 'finished',
    }));
  }, []);

  const goToRevelation = useCallback(() => {
    setState((prev) => {
      const shuffledPlayers = [...prev.players].sort(() => Math.random() - 0.5);
      return {
        ...prev,
        gamePhase: 'revelation',
        revealedPlayers: shuffledPlayers,
      };
    });
  }, []);

  const goToConfiguration = useCallback(() => {
    setState((prev) => ({
      ...prev,
      gamePhase: 'configuration',
    }));
  }, []);

  return {
    state,
    addPlayer,
    removePlayer,
    setImpostorCount,
    setSelectedTheme,
    startGame,
    revealCurrentPlayer,
    nextPlayer,
    resetGame,
    revealAll,
    goToFinished,
    goToRevelation,
    goToConfiguration,
    clearAllPlayers,
  };
}
