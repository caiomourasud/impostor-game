
import React from 'react';
import { Winner, Player } from '../types';
import { RefreshCcw, Home, Trophy, Frown, ShieldAlert } from 'lucide-react';

interface ResultsProps {
  winner: Winner;
  players: Player[];
  theme: string;
  onReset: () => void;
  onPlayAgain: () => void;
}

const Results: React.FC<ResultsProps> = ({ winner, players, theme, onReset, onPlayAgain }) => {
  const impostor = players.find(p => p.isImpostor);
  const isImpostorVictory = winner === 'IMPOSTOR';

  return (
    <div className="flex flex-col h-full p-8 animate-in zoom-in-95 duration-500">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl ${
          isImpostorVictory ? 'bg-red-500 shadow-red-500/20' : 'bg-emerald-500 shadow-emerald-500/20'
        }`}>
          {isImpostorVictory ? <Frown className="w-12 h-12 text-white" /> : <Trophy className="w-12 h-12 text-white" />}
        </div>

        <div className="space-y-2">
          <h2 className={`text-4xl font-black tracking-tighter uppercase ${
            isImpostorVictory ? 'text-red-500' : 'text-emerald-500'
          }`}>
            Vítóra do {isImpostorVictory ? 'Impostor' : 'Time'}!
          </h2>
          <p className="text-slate-400 font-medium italic">
            {isImpostorVictory ? 'O infiltrado enganou a todos!' : 'O impostor foi desmascarado!'}
          </p>
        </div>

        <div className="w-full grid grid-cols-1 gap-4 pt-4">
          <div className="bg-slate-700/50 border border-slate-700 rounded-3xl p-6 space-y-4">
            <div>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-1">O TEMA ERA</span>
              <p className="text-2xl font-black text-white">{theme}</p>
            </div>
            
            <div className="pt-4 border-t border-slate-700/50">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-1">O IMPOSTOR ERA</span>
              <div className="flex items-center justify-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <p className="text-2xl font-black text-red-400">{impostor?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-3">
        <button
          onClick={onPlayAgain}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-900/20 transition-all hover:-translate-y-1"
        >
          <RefreshCcw className="w-6 h-6" />
          JOGAR NOVAMENTE
        </button>
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-300 py-3 rounded-2xl font-bold transition-all"
        >
          <Home className="w-5 h-5" />
          VOLTAR AO INÍCIO
        </button>
      </div>
    </div>
  );
};

export default Results;
