import { ButtonHTMLAttributes } from 'react';

// Helpers
import { cls } from '@/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outlinePrimary' | 'outlineSecondary';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  disabled?: boolean;
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  rounded = 'md',
  disabled = false,
  ...rest
}: ButtonProps) => {
  const classes = {
    base: 'flex items-center text-sm font-md',
    disabled: 'cursor-not-allowed opacity-50',
    rounded: {
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full'
    },
    size: {
      sm: 'px-2 py-1',
      md: 'px-4 py-2',
      lg: 'px-8 py-3'
    },
    variant: {
      primary:
        'bg-blue-500 text-white border border-blue-500 transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600',
      secondary:
        'bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 active:bg-gray-300',
      danger:
        'bg-red-500 text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-red-600',
      outlinePrimary:
        'bg-transparent text-blue-500 border border-blue-500 transition-colors hover:bg-blue-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600',
      outlineSecondary:
        'bg-transparent text-gray-600 border transition-colors hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 active:bg-gray-300'
    }
  };

  return (
    <button
      {...rest}
      disabled={disabled}
      className={cls(`
      ${classes.base}
      ${classes.variant[variant]}
      ${classes.size[size]}
      ${classes.rounded[rounded]}
      ${disabled ? classes.disabled : ''}
      ${className ? className : ''}
      `)}
    >
      {children}
    </button>
  );
};
