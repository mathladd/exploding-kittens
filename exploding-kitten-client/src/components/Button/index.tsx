import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export default function Button({
  variant,
  extraClassName,
  children,
  ...props
}: {
  variant: 'primary' | 'secondary' | 'none';
  extraClassName?: string;
} & PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={clsx(
        {
          'text-white bg-orange-500 hover:brightness-125 border rounded-lg p-2 disabled:opacity-50 disabled:border-0 transition':
            variant === 'primary',
          'text-blue-500 hover:brightness-125 rounded-lg p-2 disabled:opacity-50 disabled:border-0 transition':
            variant === 'secondary',
        },
        extraClassName,
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </button>
  );
}
