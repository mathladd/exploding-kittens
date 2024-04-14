import { useEffect, useState } from 'react';
import BaseLayout from 'layout/BaseLayout';
import { Card, Player } from 'types/types';
import Deck from 'components/Deck';
import Stack from 'components/Stack';
import { CARDS, PLAYERS } from 'data/core';
import Hand from 'components/Hand';
import { shuffle } from 'helpers';

export default function MainPage() {
  const [deck, setDeck] = useState<Card[]>(shuffle(CARDS as unknown[]) as Card[]);
  const [players, setPlayers] = useState<Player[]>(PLAYERS);
  const [currentTurn, setCurrentTurn] = useState(0);

  useEffect(() => {
    console.log(players);
  }, [players]);

  useEffect(() => {
    console.log(deck);
  }, [deck]);

  const getPlayerHandPlacement = (index: number) => {
    if (index === 0) {
      return 'bottom-0 left-1/2 -translate-x-1/2';
    }
    if (index === 1) {
      return 'left-0 top-1/2 -translate-y-1/2';
    }
    if (index === 2) {
      return 'top-0 left-1/2 -translate-x-1/2';
    }
    if (index === 3) {
      return 'right-0 top-1/2 -translate-y-1/2';
    }
    return '';
  };

  return (
    <BaseLayout>
      <Stack className="flex-col flex-1 relative w-full min-h-full justify-center items-center my-4">
        <Deck
          deck={deck}
          players={players}
          currentTurn={currentTurn}
          setDeck={setDeck}
          setPlayers={setPlayers}
          setCurrentTurn={setCurrentTurn}
        />
        <div className="absolute w-full h-full justify-center items-center">
          <div className="relative w-full h-full">
            {players.map((player, index) => (
              <Stack
                key={player.id}
                className={`absolute w-fit h-fit ${getPlayerHandPlacement(index)}`}
              >
                <Hand
                  cards={player.cards}
                  deck={deck}
                  players={players}
                  currentTurn={currentTurn}
                  setDeck={setDeck}
                  setPlayers={setPlayers}
                  setCurrentTurn={setCurrentTurn}
                  isCurrentTurn={currentTurn === index}
                />
              </Stack>
            ))}
          </div>
        </div>
      </Stack>
    </BaseLayout>
  );
}
