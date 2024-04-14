import { Dispatch, SetStateAction } from 'react';

export type CardPlayedParams = {
  deck: Card[];
  players: Player[];
  currentTurn: number;
  setDeck: Dispatch<SetStateAction<Card[]>>;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  setCurrentTurn: Dispatch<SetStateAction<number>>;
  playerSelectedAlterTheFutureArray?: Card[];
  playerSelectedHasDefuse?: boolean;
  playerSelectedBombLocation?: number;
};

export type CardCategory =
  | 'BOMB'
  | 'ATTACK'
  | 'THIEF'
  | 'FUTURE'
  | 'SELF_EFFECT'
  | 'EFFECT'
  | 'DEFUSE';

export type Card = {
  id: string;
  category: CardCategory;
  label: string;
  image: string;
  onPlayed: (param: CardPlayedParams) => void;
};

export type Player = {
  id: string;
  label: string;
  cards: Card[];
};
