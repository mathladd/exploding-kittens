import { PropsWithChildren } from 'react';

export default function Stack({ children, className }: { className?: string } & PropsWithChildren) {
  return <div className={`flex ${className}`}>{children}</div>;
}
