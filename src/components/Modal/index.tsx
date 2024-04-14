import { PropsWithChildren } from 'react';
import Stack from 'components/Stack';

export default function Modal({ isOpen, children }: { isOpen: boolean } & PropsWithChildren) {
  if (!isOpen) return null;
  return (
    <Stack className="z-50 justify-center items-center fixed w-screen h-screen top-0 left-0">
      <div className="z-10 absolute w-full h-full opacity-50 bg-black" />
      <div className="z-20 bg-white w-80 h-80 rounded-xl overflow-hidden">{children}</div>
    </Stack>
  );
}
