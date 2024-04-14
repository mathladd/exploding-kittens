import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CardDisplay from 'components/CardDisplay';
import { Card, Player } from 'types/types';
import Stack from 'components/Stack';
import TransitionScreen from 'components/TransitionScreen';

const VIEW_TIME_SECS = 1;
const TRANSITION_TIME_SECS = 1;

export default function Deck({
  deck,
  players,
  currentTurn,
  setDeck,
  setPlayers,
  setCurrentTurn,
}: {
  deck: Card[];
  players: Player[];
  currentTurn: number;
  setDeck: Dispatch<SetStateAction<Card[]>>;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  setCurrentTurn: Dispatch<SetStateAction<number>>;
}) {
  const [bomb, setBomb] = useState<Card>();
  const [isPlayed, setIsPlayed] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const [isMount, setIsMount] = useState(false);

  const onDraw = () => {
    if (isPlayed) {
      return;
    }
    if (deck[0].category === 'BOMB') {
      setBomb(deck[0]);
    } else {
      setPlayers((prev) =>
        prev.map((player, index) => {
          const p = { ...player };
          index === currentTurn && (p.cards = [...p.cards, deck[0]]);
          return p;
        }),
      );
      setIsPlayed(true);
      setTimeout(() => {
        setShowScreen(true);
      }, VIEW_TIME_SECS * 1000);
      setTimeout(() => {
        setIsPlayed(false);
        setShowScreen(false);
        setCurrentTurn((prev) => (prev + 1 < players.length ? prev + 1 : 0));
      }, (TRANSITION_TIME_SECS + VIEW_TIME_SECS) * 1000);
    }
    setDeck((prev) => prev.slice(1));
  };

  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) return null;

  return (
    <div className="w-fit h-fit relative z-10">
      {!!showScreen && (
        <TransitionScreen
          nextPlayer={players[currentTurn + 1 === players.length ? 0 : currentTurn + 1]}
          transitionTime={TRANSITION_TIME_SECS}
        />
      )}
      <Stack className="space-x-3">
        {!!deck[0] && (
          <CardDisplay
            id={deck[0]?.id}
            category={deck[0]?.category}
            label={deck[0]?.label}
            image={deck[0]?.image}
            onPlayed={onDraw}
            deck={deck}
            players={players}
            currentTurn={currentTurn}
            setDeck={setDeck}
            setPlayers={setPlayers}
            setCurrentTurn={setCurrentTurn}
            isShown={false}
          />
        )}
        {!!bomb && (
          <CardDisplay
            id={bomb?.id}
            category={bomb?.category}
            label={bomb?.label}
            image={bomb?.image}
            onPlayed={bomb?.onPlayed}
            deck={deck}
            players={players}
            currentTurn={currentTurn}
            setDeck={setDeck}
            setPlayers={setPlayers}
            setCurrentTurn={setCurrentTurn}
            isShown={!!bomb}
          />
        )}
      </Stack>
    </div>
  );
}
