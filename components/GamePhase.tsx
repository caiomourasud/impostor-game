
import React, { useState } from 'react';
import { Winner } from '../types';
import { Flag, Trophy, UserX, Users } from 'lucide-react';
import { useTranslation } from '../i18n';

interface GamePhaseProps {
  onFinish: (winner: Winner) => void;
}

const GamePhase: React.FC<GamePhaseProps> = ({ onFinish }) => {
  const [showWinnerDialog, setShowWinnerDialog] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full p-8">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div className="w-32 h-32 bg-orange-500/10 rounded-full flex items-center justify-center border-4 border-orange-500/20 animate-pulse">
          <Flag className="w-16 h-16 text-orange-400" />
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-black text-white tracking-tight">{t('game.inProgress')}</h2>
          <p className="text-slate-400 max-w-xs mx-auto">
            {t('game.instructions')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full pt-8">
          <div className="p-4 bg-slate-700/30 rounded-2xl border border-slate-700">
            <h4 className="text-slate-300 font-bold mb-1">{t('game.tipTitle')}</h4>
            <p className="text-slate-500 text-sm">{t('game.tipText')}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {!showWinnerDialog ? (
          <button
            onClick={() => setShowWinnerDialog(true)}
            className="w-full py-5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-xl shadow-2xl shadow-red-900/30 transition-all active:scale-95"
          >
            {t('game.endGame')}
          </button>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-center font-bold text-slate-300 mb-2 uppercase tracking-widest text-sm">{t('game.whoWon')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => onFinish('TEAM')}
                className="flex flex-col items-center gap-2 p-6 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-900/20"
              >
                <Users className="w-8 h-8" />
                <span>{t('game.team')}</span>
              </button>
              <button
                onClick={() => onFinish('IMPOSTOR')}
                className="flex flex-col items-center gap-2 p-6 bg-red-600 hover:bg-red-500 rounded-2xl font-bold transition-all shadow-xl shadow-red-900/20"
              >
                <UserX className="w-8 h-8" />
                <span>{t('game.impostorLabel')}</span>
              </button>
            </div>
            <button
              onClick={() => setShowWinnerDialog(false)}
              className="w-full text-slate-500 font-medium py-2 hover:text-slate-400 transition-colors"
            >
              {t('game.back')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePhase;
