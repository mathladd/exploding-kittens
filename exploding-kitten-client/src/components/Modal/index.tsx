import { Dispatch, PropsWithChildren } from 'react';
import { SetStateAction } from 'jotai';
import Stack from 'components/Stack';
import IClose from 'icons/IClose';
import Button from 'components/Button';

export default function Modal({
  isOpen,
  setIsOpen,
  children,
}: { isOpen: boolean; setIsOpen?: Dispatch<SetStateAction<boolean>> } & PropsWithChildren) {
  if (!isOpen) return null;
  return (
    <Stack className="z-50 justify-center items-center fixed w-screen h-screen top-0 left-0">
      <div className="z-10 absolute w-full h-full opacity-50 bg-black" />
      <div className="z-20 bg-white w-80 h-80 rounded-xl overflow-hidden relative">
        {!!setIsOpen && (
          <Button
            variant="none"
            className="w-5 h-5 bg-slate-300 rounded-full p-1 absolute right-2 top-2 hover:scale-110 active:scale-75 transition cursor-pointer"
            onClick={() => !!setIsOpen && setIsOpen(false)}
          >
            <IClose />
          </Button>
        )}
        {children}
      </div>
    </Stack>
  );
}
