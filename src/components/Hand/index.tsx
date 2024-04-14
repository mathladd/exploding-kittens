import { Dispatch, SetStateAction } from 'react';
import CardDisplay from 'components/CardDisplay';
import { Card, Player } from 'types/types';

export default function Hand({
  cards,
  deck,
  players,
  currentTurn,
  setDeck,
  setPlayers,
  setCurrentTurn,
  isCurrentTurn,
}: {
  cards: Card[];
  deck: Card[];
  players: Player[];
  currentTurn: number;
  setDeck: Dispatch<SetStateAction<Card[]>>;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  setCurrentTurn: Dispatch<SetStateAction<number>>;
  isCurrentTurn: boolean;
}) {
  const numCards = cards.length;
  const getRotation = (index: number, totalCards: number) => {
    const halfCard = totalCards % 2 === 0 ? totalCards / 2 - 0.5 : Math.floor(totalCards / 2);
    if (index === halfCard || totalCards === 1) {
      return 0;
    }
    if (index < halfCard) {
      return 0 - (halfCard - index) * 10;
    }
    return 0 + (index - halfCard) * 10;
  };

  const getTranslationX = (index: number, totalCards: number) => {
    const halfCard = totalCards % 2 === 0 ? totalCards / 2 - 0.5 : Math.floor(totalCards / 2);
    if (index === halfCard || totalCards === 1) {
      return 0;
    }
    if (index < halfCard) {
      return 0 + (halfCard - index) * 20;
    }
    return 0 - (index - halfCard) * 20;
  };

  const getTranslationY = (index: number, totalCards: number) => {
    const halfCard = totalCards % 2 === 0 ? totalCards / 2 - 0.5 : Math.floor(totalCards / 2);
    if (index === halfCard || totalCards === 1) {
      return 0;
    }
    if (index < halfCard) {
      return 0 + (halfCard - index) * 20;
    }
    return 0 + (index - halfCard) * 20;
  };
  return (
    <>
      {cards.map((item, index) => (
        <div
          key={item.id}
          style={{
            transform: `rotate(${getRotation(index, numCards)}deg) translateX(${getTranslationX(
              index,
              numCards,
            )}px) translateY(${getTranslationY(index, numCards)}px)`,
          }}
        >
          <CardDisplay
            id={item.id}
            category={item.category}
            label={item.label}
            image={item.image}
            onPlayed={isCurrentTurn ? item.onPlayed : () => {}}
            deck={deck}
            players={players}
            currentTurn={currentTurn}
            setDeck={setDeck}
            setPlayers={setPlayers}
            setCurrentTurn={setCurrentTurn}
            isShown={isCurrentTurn}
          />
        </div>
      ))}
    </>
  );
}
