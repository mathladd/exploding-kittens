import { Card } from "../../types/common";

export const DECK = [
  {
    id: "RAINBOW_CAT",
    category: "THIEF",
    label: "Rainbow cat",
    image: "/assets/images/rainbow_cat.png",
  },
  {
    id: "TACO_CAT",
    category: "THIEF",
    label: "Taco cat",
    image: "/assets/images/taco_cat.png",
  },
  {
    id: "BOMB_1",
    category: "BOMB",
    label: "C-4",
    image: "/assets/images/bomb.png",
  },
  {
    id: "BOMB_2",
    category: "BOMB",
    label: "BOMBERMAN",
    image: "/assets/images/bomb.png",
  },
  {
    id: "BOMB_3",
    category: "BOMB",
    label: "CATNAMITE",
    image: "/assets/images/bomb.png",
  },
  {
    id: "CATOMIC_BOMB",
    category: "EFFECT",
    label: "CATOMIC BOMB",
    image: "/assets/images/bomb.png",
  },
  {
    id: "ALTER_FUTURE_X2",
    category: "FUTURE",
    label: "ALTER THE FUTURE (X2)",
    image: "/assets/images/alter_future_1.png",
  },
  {
    id: "ALTER_FUTURE_X3",
    category: "FUTURE",
    label: "ALTER THE FUTURE (X3)",
    image: "/assets/images/alter_future_2.png",
  },
  {
    id: "ALTER_FUTURE_X5",
    category: "FUTURE",
    label: "ALTER THE FUTURE (X5)",
    image: "/assets/images/alter_future_3.png",
  },
  {
    id: "ATTACK_X2",
    category: "ATTACK",
    label: "SLAP (X2)",
    image: "/assets/images/attack.png",
  },
  {
    id: "ATTACK_X3",
    category: "ATTACK",
    label: "SLAP (X3)",
    image: "/assets/images/attack.png",
  },
  {
    id: "ATTACK_SELF",
    category: "ATTACK",
    label: "SELF SLAP (X3)",
    image: "/assets/images/attack_self.png",
  },
  {
    id: "SHUFFLE",
    category: "EFFECT",
    label: "SHUFFLE",
    image: "/assets/images/shuffle.png",
  },
  {
    id: "SHUFFLE_FAKE",
    category: "EFFECT",
    label: "FAKE SHUFFLE",
    image: "/assets/images/shuffle_fake.png",
  },
  {
    id: "SKIP",
    category: "SELF_EFFECT",
    label: "SKIP",
    image: "/assets/images/skip.png",
  },
  {
    id: "DRAW_BOTTOM",
    category: "SELF_EFFECT",
    label: "DRAW FROM BOTTOM",
    image: "/assets/images/skip.png",
  },
  {
    id: "DEFUSE_1",
    category: "DEFUSE",
    label: "DEFUSE",
    image: "/assets/images/defuse_1.png",
  },
  {
    id: "DEFUSE_2",
    category: "DEFUSE",
    label: "DEFUSE",
    image: "/assets/images/defuse_2.png",
  },
  {
    id: "DEFUSE_3",
    category: "DEFUSE",
    label: "DEFUSE",
    image: "/assets/images/defuse_3.png",
  },
] as Card[];

export const PLAYERS = [
  { id: "p1", label: "Player 1", cards: [] },
  { id: "p2", label: "Player 2", cards: [] },
  { id: "p3", label: "Player 3", cards: [] },
  { id: "p4", label: "Player 4", cards: [] },
];
