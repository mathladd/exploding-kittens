export type CardPlayedParams = {
  deck: Card[];
  players: Player[];
  currentTurn: number;
  playerSelectedAlterTheFutureArray?: Card[];
  playerSelectedHasDefuse?: boolean;
  playerSelectedBombLocation?: number;
};

export type CardCategory =
  | "BOMB"
  | "ATTACK"
  | "THIEF"
  | "FUTURE"
  | "SELF_EFFECT"
  | "EFFECT"
  | "DEFUSE";

export type Card = {
  id: string;
  category: CardCategory;
  label: string;
  image: string;
};

export type Player = {
  id: string;
  label: string;
  cards: Card[];
};
