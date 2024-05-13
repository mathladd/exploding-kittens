import { Card, Player } from '../../../../types/common';

export const getDeck = (): Card[] => [
  {
    id: 'RAINBOW_CAT',
    category: 'THIEF',
    label: 'Rainbow cat',
    image: '/assets/images/rainbow_cat.png',
  },
];

export const getPlayerCards = (): Card[] => [
  {
    id: 'TACO_CAT',
    category: 'THIEF',
    label: 'Taco cat',
    image: '/assets/images/taco_cat.png',
  },
];

export const getPlayers = (): Player[] => [];
