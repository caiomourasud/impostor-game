
import React, { useState } from 'react';
import { Player } from '../types';
import { Eye, EyeOff, User, ArrowRight, ShieldAlert } from 'lucide-react';

interface RevealPhaseProps {
  players: Player[];
  theme: string;
  onFinish: () => void;
}

const RevealPhase: React.FC<RevealPhaseProps> = ({ players, theme, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentPlayer = players[currentIndex];
  const isLastPlayer = currentIndex === players.length - 1;

  const handleNext = () => {
    if (isLastPlayer) {
      onFinish();
    } else {
      setIsRevealed(false);
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-full p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <span className="text-indigo-400 text-sm font-bold tracking-widest uppercase">
          Passo {currentIndex + 1} de {players.length}
        </span>
        <h2 className="text-2xl font-extrabold text-white mt-2">Quem está com o celular?</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center border-2 border-indigo-500/40">
            <User className="w-12 h-12 text-indigo-400" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
            {currentPlayer.name}
          </div>
        </div>

        <div className={`w-full p-8 rounded-3xl border-2 transition-all duration-300 min-h-[160px] flex flex-col items-center justify-center ${
          isRevealed 
            ? currentPlayer.isImpostor 
              ? 'bg-red-500/10 border-red-500/50 shadow-lg shadow-red-900/10' 
              : 'bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-900/10'
            : 'bg-slate-700/50 border-slate-600'
        }`}>
          {!isRevealed ? (
            <p className="text-slate-400 text-center font-medium">
              Toque no botão abaixo para revelar o seu papel em segredo.
            </p>
          ) : (
            <div className="text-center animate-in zoom-in-95 duration-300">
              {currentPlayer.isImpostor ? (
                <>
                  <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h3 className="text-red-500 text-2xl font-black uppercase tracking-tighter">IMPOSTOR</h3>
                  <p className="text-red-300/80 text-sm mt-1">Ninguém pode descobrir!</p>
                </>
              ) : (
                <>
                  <span className="text-emerald-500 text-xs font-black uppercase tracking-widest mb-1 block">O TEMA É</span>
                  <h3 className="text-emerald-400 text-4xl font-black tracking-tight drop-shadow-sm">{theme}</h3>
                  <p className="text-emerald-300/80 text-sm mt-2">Tente descobrir o impostor!</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 space-y-4">
        {!isRevealed ? (
          <button
            onClick={() => setIsRevealed(true)}
            className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl"
          >
            <Eye className="w-6 h-6" />
            REVELAR TEMA
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-900/20"
          >
            {isLastPlayer ? 'COMEÇAR JOGO' : 'PRÓXIMO JOGADOR'}
            <ArrowRight className="w-6 h-6" />
          </button>
        )}
        
        {isRevealed && (
          <p className="text-center text-slate-500 text-xs italic animate-pulse">
            Esconda a tela antes de passar!
          </p>
        )}
      </div>
    </div>
  );
};

export default RevealPhase;
