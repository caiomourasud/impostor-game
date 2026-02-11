
import React, { useState, useCallback, useMemo } from 'react';
import { GameState, Player, Winner } from './types';
import { THEMES } from './constants';
import Lobby from './components/Lobby';
import RevealPhase from './components/RevealPhase';
import GamePhase from './components/GamePhase';
import Results from './components/Results';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.LOBBY);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentTheme, setCurrentTheme] = useState<string>('');
  const [winner, setWinner] = useState<Winner>(null);

  const startGame = useCallback(() => {
    if (players.length < 3) return;

    // Pick random theme
    const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
    setCurrentTheme(randomTheme);

    // Pick random impostor
    const impostorIndex = Math.floor(Math.random() * players.length);
    const updatedPlayers = players.map((p, idx) => ({
      ...p,
      isImpostor: idx === impostorIndex
    }));

    // Sort players alphabetically for reveal phase as requested
    const sortedPlayers = [...updatedPlayers].sort((a, b) => 
      a.name.localeCompare(b.name, 'pt', { sensitivity: 'base' })
    );

    setPlayers(sortedPlayers);
    setGameState(GameState.REVEALING);
  }, [players]);

  const finishGame = useCallback((gameWinner: Winner) => {
    setWinner(gameWinner);
    setGameState(GameState.RESULTS);
  }, []);

  const resetGame = useCallback(() => {
    setWinner(null);
    setCurrentTheme('');
    setGameState(GameState.LOBBY);
  }, []);

  const playAgain = useCallback(() => {
    // Keeps same players but restarts logic
    setWinner(null);
    startGame();
  }, [startGame]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden min-h-[600px] flex flex-col">
        {gameState === GameState.LOBBY && (
          <Lobby 
            players={players} 
            setPlayers={setPlayers} 
            onStart={startGame} 
          />
        )}
        
        {gameState === GameState.REVEALING && (
          <RevealPhase 
            players={players} 
            theme={currentTheme} 
            onFinish={() => setGameState(GameState.PLAYING)} 
          />
        )}

        {gameState === GameState.PLAYING && (
          <GamePhase 
            onFinish={finishGame} 
          />
        )}

        {gameState === GameState.RESULTS && (
          <Results 
            winner={winner} 
            players={players} 
            theme={currentTheme}
            onReset={resetGame} 
            onPlayAgain={playAgain}
          />
        )}
      </div>
      
      <footer className="mt-8 text-slate-500 text-sm">
        Quem é o Impostor? &bull; 2024
      </footer>
    </div>
  );
};

export default App;
