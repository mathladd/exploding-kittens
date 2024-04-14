import { useEffect, useState } from 'react';
import Stack from 'components/Stack';
import { Player } from 'types/types';

export default function TransitionScreen({
  nextPlayer,
  transitionTime,
}: {
  nextPlayer: Player;
  transitionTime: number;
}) {
  const [countdown, setCountdown] = useState(transitionTime);

  useEffect(() => {
    setTimeout(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);
  }, [countdown]);
  return (
    <Stack className="fixed top-0 left-0 w-screen h-screen transition bg-black opacity-80 z-50 justify-center items-center">
      <div>
        {nextPlayer.label} ready! In {countdown}
      </div>
    </Stack>
  );
}
