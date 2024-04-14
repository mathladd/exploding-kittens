import { useEffect, useState } from 'react';
import Stack from 'components/Stack';

export default function BaseLayout({ children }: { children: React.ReactElement }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Stack className="justify-center items-center bg-orange-200 w-screen h-32">
        <div
          className={`text-orange-600 font-bold text-3xl transition-all duration-2000 ${
            show ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Exploding Kittens */}
        </div>
      </Stack>
      {children}
    </>
  );
}
