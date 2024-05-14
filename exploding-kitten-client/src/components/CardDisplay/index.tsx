import Image from 'next/image';
import { useMemo, useState } from 'react';
import Stack from 'components/Stack';
import { Card } from '../../../../types/common';

export default function CardDisplay({
  id,
  category,
  label,
  image,
  isShown,
}: Card & {
  isShown: boolean;
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const cardBg = useMemo(() => {
    if (isShown) {
      switch (category) {
        case 'BOMB':
          return 'bg-black text-white';
        case 'FUTURE':
          return 'bg-purple-900 text-white';
        case 'SELF_EFFECT':
          return 'bg-blue-600 text-white';
        case 'DEFUSE':
          return 'bg-lime-400 text-lime-900';
        case 'ATTACK':
          return 'bg-orange-600 text-white';
        default:
          return 'bg-white text-slate-600';
      }
    }
    return 'bg-red-300';
  }, [category, isShown]);

  const onCardPlayed = () => {
    setIsOpenModal(true);
  };

  return (
    <button
      type="button"
      onClick={onCardPlayed}
      className={`relative rounded-xl ${cardBg} w-fit min-w-[20vh] h-[25vh] cursor-pointer bg transition shadow-[0px_4px_12px_0px_rgba(0,0,0,0.10)] hover:shadow-[0px_0px_20px_0px_rgba(240,92,34,0.75)] overflow-hidden hover:[&>div:nth-of-type(1)]:opacity-100`}
    >
      {!!isShown && (
        <Stack className="items-center flex-col space-y-4 relative h-full rounded-xl transition border-2 border-transparent z-0 p-2">
          <div className="relative w-full pb-[100%] rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={id}
              fill
              style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
              sizes="(max-width: 743px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
          </div>
          <Stack className="justify-start ml-[1px]">
            <div className="text-base font-bold leading-normal text-center">{label}</div>
          </Stack>
        </Stack>
      )}
    </button>
  );
}
