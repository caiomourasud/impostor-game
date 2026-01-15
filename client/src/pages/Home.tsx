import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useGameState } from '@/hooks/useGameState';
import { useState } from 'react';
import { X, Plus, Play, RotateCcw } from 'lucide-react';

/**
 * Design: Minimalismo Moderno com Foco em Interação
 * - Clareza absoluta em cada elemento
 * - Espaço negativo generoso
 * - Hierarquia tipográfica forte
 * - Micro-interações significativas
 */

export default function Home() {
  const {
    state,
    addPlayer,
    removePlayer,
    setImpostorCount,
    setSelectedTheme,
    startGame,
    revealCurrentPlayer,
    nextPlayer,
    resetGame,
    goToFinished,
    goToRevelation,
    goToConfiguration,
    clearAllPlayers,
  } = useGameState();

  const [playerInput, setPlayerInput] = useState('');
  const [customTheme, setCustomTheme] = useState('');
  const [showCustomThemeInput, setShowCustomThemeInput] = useState(false);

  const handleAddPlayer = () => {
    if (playerInput.trim()) {
      addPlayer(playerInput);
      setPlayerInput('');
    }
  };

  const handleStartGame = () => {
    const themeToUse = customTheme.trim() || state.selectedTheme;
    if (themeToUse) {
      setSelectedTheme(themeToUse);
      startGame();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  const handleSelectTheme = (theme: string) => {
    setSelectedTheme(theme);
    setCustomTheme('');
    setShowCustomThemeInput(false);
  };

  const handleCustomTheme = () => {
    if (customTheme.trim()) {
      setShowCustomThemeInput(false);
    }
  };

  const handleResetGame = () => {
    resetGame();
    setCustomTheme('');
    setShowCustomThemeInput(false);
  };

  // Tela de Preparação - Todos largam o celular e começam o jogo
  if (state.gamePhase === 'preparation') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 md:p-8 shadow-lg text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              🌟
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pronto para Começar!
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Todos os celulares devem ser largados agora.
            </p>
            <p className="text-sm md:text-base text-foreground font-semibold mb-8">
              O jogo começará em ordem. Boa sorte!
            </p>
          </div>

          {/* Botão para começar */}
          <Button
            onClick={goToRevelation}
            className="w-full py-3 text-base md:text-lg font-bold rounded-md transition-all duration-200 hover:scale-105 mb-4"
          >
            <Play className="w-5 h-5 mr-2" />
            Começar Jogo
          </Button>

          {/* Informação de jogadores */}
          <p className="text-xs md:text-sm text-muted-foreground">
            {state.players.length} jogadores | {state.impostorCount} impostor(es)
          </p>
        </Card>
      </div>
    );
  }

  // Tela de Revelação - Mostra quem era o quê antes do fim de jogo
  if (state.gamePhase === 'revelation') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-6 md:p-8 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
            Revelação Final
          </h1>

          {/* Lista de Jogadores Revelados */}
          <div className="mb-8 space-y-2 max-h-96 overflow-y-auto">
            {state.revealedPlayers.map((player) => (
              <div
                key={player.id}
                className={`p-3 md:p-4 rounded-lg border-2 flex justify-between items-center ${
                  player.isImpostor
                    ? 'bg-destructive/10 border-destructive'
                    : 'bg-primary/10 border-primary'
                }`}
              >
                <p className="font-semibold text-foreground text-sm md:text-base">{player.name}</p>
                <span
                  className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold whitespace-nowrap ${
                    player.isImpostor
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {player.isImpostor ? 'IMPOSTOR' : player.theme}
                </span>
              </div>
            ))}
          </div>

          {/* Botão para Ir ao Resultado */}
          <Button
            onClick={goToFinished}
            className="w-full py-3 text-lg font-bold rounded-md transition-all duration-200 hover:scale-105"
          >
            Registrar Resultado
          </Button>
        </Card>
      </div>
    );
  }

  // Tela Final - Resultado do Jogo
  if (state.gamePhase === 'finished' && state.gameStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-6 md:p-8 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
            Quem Ganhou?
          </h1>

          {/* Pergunta Final - Responsivo */}
          <div className="mb-6 flex flex-col gap-3">
            <Button
              onClick={resetGame}
              className="w-full py-3 text-base md:text-lg font-bold rounded-md transition-all duration-200 hover:scale-105 bg-destructive hover:bg-destructive/90"
            >
              Impostores Ganharam
            </Button>
            <Button
              onClick={resetGame}
              className="w-full py-3 text-base md:text-lg font-bold rounded-md transition-all duration-200 hover:scale-105"
            >
              Cidadãos Ganharam
            </Button>
          </div>

          {/* Botão Novo Jogo */}
          <Button
            onClick={handleResetGame}
            variant="outline"
            className="w-full py-3 text-base md:text-lg font-bold rounded-md transition-all duration-200 hover:scale-105"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Novo Jogo
          </Button>
        </Card>
      </div>
    );
  }

  // Tela de Configuração (Número de Impostores e Tema)
  if (state.gamePhase === 'configuration') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 md:p-8 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
            Configuração
          </h1>

          {/* Seleção de Impostores */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-3">
              Número de Impostores
            </label>
            <div className="flex gap-2">
              {Array.from({ length: Math.min(state.players.length - 1, 5) }).map(
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => setImpostorCount(i + 1)}
                    className={`flex-1 py-2 px-3 rounded-md font-semibold transition-all duration-200 text-sm md:text-base ${
                      state.impostorCount === i + 1
                        ? 'bg-primary text-primary-foreground scale-105'
                        : 'bg-secondary text-foreground hover:bg-muted'
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Seleção de Tema */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-3">
              Escolha um Tema
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto mb-3">
              {state.themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleSelectTheme(theme)}
                  className={`py-2 px-3 rounded-md text-xs md:text-sm font-medium transition-all duration-200 ${
                    state.selectedTheme === theme && !customTheme
                      ? 'bg-primary text-primary-foreground scale-105'
                      : 'bg-secondary text-foreground hover:bg-muted'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>

            {/* Campo de Tema Customizado */}
            {!showCustomThemeInput ? (
              <button
                onClick={() => setShowCustomThemeInput(true)}
                className="w-full py-2 px-3 rounded-md text-sm font-medium bg-secondary text-foreground hover:bg-muted transition-all duration-200"
              >
                + Tema Personalizado
              </button>
            ) : (
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Digite o tema"
                  value={customTheme}
                  onChange={(e) => setCustomTheme(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <Button
                  onClick={handleCustomTheme}
                  className="px-3 py-2 rounded-md font-bold transition-all duration-200 hover:scale-105"
                >
                  OK
                </Button>
              </div>
            )}
            {customTheme && (
              <p className="text-xs md:text-sm text-primary font-semibold mt-2">
                Tema: {customTheme}
              </p>
            )}
          </div>

          {/* Botão Iniciar */}
          <Button
            onClick={handleStartGame}
            disabled={!state.selectedTheme && !customTheme.trim()}
            className="w-full py-3 text-base md:text-lg font-bold rounded-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5 mr-2" />
            Iniciar Jogo
          </Button>
        </Card>
      </div>
    );
  }

  // Tela de Jogo - Revelação por Turno
  if (state.gamePhase === 'playing' && state.gameStarted) {
    const currentPlayer = state.players[state.currentPlayerIndex];
    const isRevealed = currentPlayer?.revealed;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 md:p-8 shadow-lg">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-xs md:text-sm font-semibold text-muted-foreground mb-2">
              Jogador {state.currentPlayerIndex + 1} de {state.players.length}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground break-words">
              {currentPlayer?.name}
            </h1>
          </div>

          {/* Área de Revelação */}
          <div className="mb-6 md:mb-8">
            {!isRevealed ? (
              <div
                className="aspect-square bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={revealCurrentPlayer}
              >
                <p className="text-primary-foreground font-bold text-base md:text-lg text-center px-4">
                  Clique para Revelar
                </p>
              </div>
            ) : (
              <div className="aspect-square bg-card rounded-lg flex flex-col items-center justify-center border-2 border-border p-4 md:p-6 animate-in fade-in duration-500">
                {currentPlayer?.isImpostor ? (
                  <div className="text-center">
                    <p className="text-xs md:text-sm font-semibold text-muted-foreground mb-2">
                      Você é
                    </p>
                    <p className="text-3xl md:text-4xl font-bold text-destructive">IMPOSTOR</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-xs md:text-sm font-semibold text-muted-foreground mb-2">
                      Tema
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-primary font-mono break-words">
                      {currentPlayer?.theme}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Botão Próximo */}
          {isRevealed && (
            <Button
              onClick={nextPlayer}
              className="w-full py-3 text-base md:text-lg font-bold rounded-md transition-all duration-200 hover:scale-105 animate-in fade-in"
            >
              Próximo Jogador
            </Button>
          )}
        </Card>
      </div>
    );
  }

  // Tela Principal - Adicionar Jogadores
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 md:p-8 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">
          Impostor
        </h1>
        <p className="text-center text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
          Jogo de dedução e engano
        </p>

        {/* Input para Adicionar Jogadores */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2">
            Adicionar Jogadores
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Nome do jogador"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-3 py-2 rounded-md border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
            />
            <Button
              onClick={handleAddPlayer}
              className="px-3 md:px-4 py-2 rounded-md font-bold transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Lista de Jogadores */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-foreground mb-3">
            Jogadores ({state.players.length})
          </p>
          <div className="space-y-2 max-h-48 md:max-h-64 overflow-y-auto">
            {state.players.length === 0 ? (
              <p className="text-center text-muted-foreground py-4 text-sm">
                Nenhum jogador adicionado
              </p>
            ) : (
              state.players.map((player) => (
                <div
                  key={player.id}
                  className="flex justify-between items-center p-2 md:p-3 bg-secondary rounded-md hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground text-sm md:text-base break-words flex-1">
                    {player.name}
                  </span>
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="p-1 hover:bg-destructive/20 rounded-md transition-colors text-destructive flex-shrink-0 ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Botões Iniciar Jogo e Limpar */}
        <div className="space-y-2">
          <Button
            onClick={goToConfiguration}
            disabled={state.players.length < 2}
            className="w-full py-3 text-base md:text-lg font-bold rounded-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5 mr-2" />
            Iniciar Jogo
          </Button>
          {state.players.length > 0 && (
            <Button
              onClick={clearAllPlayers}
              variant="outline"
              className="w-full py-2 text-sm font-medium rounded-md transition-all duration-200 text-destructive hover:bg-destructive/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Limpar Jogadores
            </Button>
          )}
        </div>
        {state.players.length < 2 && (
          <p className="text-center text-xs text-muted-foreground mt-2">
            Adicione pelo menos 2 jogadores
          </p>
        )}
      </Card>
    </div>
  );
}
