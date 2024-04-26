import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Card, Player } from 'types/types';
import { useAtomValue } from 'jotai';
import TransitionScreen from 'components/TransitionScreen';
import CardDisplay from 'components/CardDisplay';
import Stack from 'components/Stack';
import { socketAtom } from 'atoms/connection';

export default function Deck() {
  const userSocket = useAtomValue(socketAtom);
  return <></>;
}
