
import React, { useState } from 'react';
import { Player } from '../types';
import { Plus, Trash2, Users, Play, X } from 'lucide-react';
import { useTranslation } from '../i18n';

interface LobbyProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  onStart: () => void;
}

const Lobby: React.FC<LobbyProps> = ({ players, setPlayers, onStart }) => {
  const [newPlayerName, setNewPlayerName] = useState('');
  const { t, language, setLanguage, availableLanguages } = useTranslation();

  const addPlayer = () => {
    const trimmed = newPlayerName.trim();
    if (!trimmed) return;

    setPlayers(prev => [
      ...prev,
      { id: crypto.randomUUID(), name: trimmed, isImpostor: false }
    ]);
    setNewPlayerName('');
  };

  const removePlayer = (id: string) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  const removeAll = () => {
    if (confirm(t('lobby.confirmClear'))) {
      setPlayers([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addPlayer();
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex justify-end gap-1 mb-2">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`text-xl px-2 py-1 rounded-lg transition-all ${
              language === lang.code
                ? 'bg-blue-500/20 ring-2 ring-blue-500/40'
                : 'opacity-50 hover:opacity-100'
            }`}
            aria-label={lang.label}
            title={lang.label}
          >
            {lang.flag}
          </button>
        ))}
      </div>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4 border border-blue-500/20">
          <Users className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          {t('lobby.heading')}
        </h1>
        <p className="text-slate-400 text-sm mt-1">{t('lobby.subtitle')}</p>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={t('lobby.placeholder')}
          className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          onClick={addPlayer}
          className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition-colors shadow-lg shadow-blue-900/20"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-6">
        {players.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-2 opacity-50">
            <Users className="w-12 h-12" />
            <p>{t('lobby.emptyState')}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between bg-slate-700/50 border border-slate-700 p-3 rounded-xl hover:bg-slate-700 transition-colors group"
              >
                <span className="font-semibold text-slate-200">{player.name}</span>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-700">
        <button
          onClick={onStart}
          disabled={players.length < 3}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl ${
            players.length >= 3
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-900/20'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'
          }`}
        >
          <Play className="w-5 h-5 fill-current" />
          {t('lobby.play')}
        </button>

        {players.length > 0 && (
          <button
            onClick={removeAll}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            {t('lobby.clearAll')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Lobby;
