export type Language = 'pt' | 'en' | 'es';

export interface TranslationStrings {
  'common.appTitle': string;
  'common.footer': string;

  'lobby.heading': string;
  'lobby.subtitle': string;
  'lobby.placeholder': string;
  'lobby.emptyState': string;
  'lobby.play': string;
  'lobby.clearAll': string;
  'lobby.confirmClear': string;

  'reveal.stepOf': string;
  'reveal.whoHasPhone': string;
  'reveal.tapToReveal': string;
  'reveal.impostor': string;
  'reveal.impostorHint': string;
  'reveal.themeIs': string;
  'reveal.teamHint': string;
  'reveal.revealButton': string;
  'reveal.startGame': string;
  'reveal.nextPlayer': string;
  'reveal.hideScreen': string;

  'game.inProgress': string;
  'game.instructions': string;
  'game.tipTitle': string;
  'game.tipText': string;
  'game.endGame': string;
  'game.whoWon': string;
  'game.team': string;
  'game.impostorLabel': string;
  'game.back': string;

  'results.impostorWins': string;
  'results.teamWins': string;
  'results.impostorWinMsg': string;
  'results.teamWinMsg': string;
  'results.themeWas': string;
  'results.impostorWas': string;
  'results.playAgain': string;
  'results.backToLobby': string;
}

export interface LanguageConfig {
  strings: TranslationStrings;
  themes: string[];
  locale: string;
  label: string;
  flag: string;
}
