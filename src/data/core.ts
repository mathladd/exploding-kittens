/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Player } from 'types/types';

export const CARDS = [
  {
    id: 'RAINBOW_CAT',
    category: 'THIEF',
    label: 'Rainbow cat',
    image: '/assets/images/rainbow_cat.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('rainbow cat played');
      // setDeck((prev) => prev.slice(1));
    },
  },
  {
    id: 'TACO_CAT',
    category: 'THIEF',
    label: 'Taco cat',
    image: '/assets/images/taco_cat.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('taco cat played');
      // setDeck((prev) => prev.slice(1));
    },
  },
  {
    id: 'BOMB_1',
    category: 'BOMB',
    label: 'C-4',
    image: '/assets/images/bomb.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('bomb played');
    },
  },
  {
    id: 'BOMB_2',
    category: 'BOMB',
    label: 'BOMBERMAN',
    image: '/assets/images/bomb.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('bomb played');
    },
  },
  {
    id: 'BOMB_3',
    category: 'BOMB',
    label: 'CATNAMITE',
    image: '/assets/images/bomb.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('bomb played');
    },
  },
  {
    id: 'CATOMIC_BOMB',
    category: 'EFFECT',
    label: 'CATOMIC BOMB',
    image: '/assets/images/bomb.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('bomb played');
    },
  },
  {
    id: 'ALTER_FUTURE_X2',
    category: 'FUTURE',
    label: 'ALTER THE FUTURE (X2)',
    image: '/assets/images/alter_future_1.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('future card played');
    },
  },
  {
    id: 'ALTER_FUTURE_X3',
    category: 'FUTURE',
    label: 'ALTER THE FUTURE (X3)',
    image: '/assets/images/alter_future_2.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('future card played');
    },
  },
  {
    id: 'ALTER_FUTURE_X5',
    category: 'FUTURE',
    label: 'ALTER THE FUTURE (X5)',
    image: '/assets/images/alter_future_3.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('future card played');
    },
  },
  {
    id: 'ATTACK_X2',
    category: 'ATTACK',
    label: 'SLAP (X2)',
    image: '/assets/images/attack.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('future card played');
    },
  },
  {
    id: 'ATTACK_X3',
    category: 'ATTACK',
    label: 'SLAP (X3)',
    image: '/assets/images/attack.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('future card played');
    },
  },
  {
    id: 'ATTACK_SELF',
    category: 'ATTACK',
    label: 'SELF SLAP (X3)',
    image: '/assets/images/attack_self.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('future card played');
    },
  },
  {
    id: 'SHUFFLE',
    category: 'EFFECT',
    label: 'SHUFFLE',
    image: '/assets/images/shuffle.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('future card played');
    },
  },
  {
    id: 'SHUFFLE_FAKE',
    category: 'EFFECT',
    label: 'FAKE SHUFFLE',
    image: '/assets/images/shuffle_fake.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('future card played');
    },
  },
  {
    id: 'SKIP',
    category: 'SELF_EFFECT',
    label: 'SKIP',
    image: '/assets/images/skip.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('future card played');
    },
  },
  {
    id: 'DRAW_BOTTOM',
    category: 'SELF_EFFECT',
    label: 'DRAW FROM BOTTOM',
    image: '/assets/images/skip.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('future card played');
    },
  },
  {
    id: 'DEFUSE_1',
    category: 'DEFUSE',
    label: 'DEFUSE',
    image: '/assets/images/defuse_1.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('future card played');
    },
  },
  {
    id: 'DEFUSE_2',
    category: 'DEFUSE',
    label: 'DEFUSE',
    image: '/assets/images/defuse_2.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('future card played');
    },
  },
  {
    id: 'DEFUSE_3',
    category: 'DEFUSE',
    label: 'DEFUSE',
    image: '/assets/images/defuse_3.png',
    onPlayed: ({ deck, players, currentTurn, setPlayers, setDeck, setCurrentTurn }) => {
      console.log('future card played');
    },
  },
] as Card[];

export const PLAYERS = [
  { id: 'p1', label: 'Player 1', cards: [] },
  { id: 'p2', label: 'Player 2', cards: [] },
  { id: 'p3', label: 'Player 3', cards: [] },
  { id: 'p4', label: 'Player 4', cards: [] },
] as Player[];
