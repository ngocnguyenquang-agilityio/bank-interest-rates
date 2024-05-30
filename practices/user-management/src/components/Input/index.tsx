import { cls } from '@/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'danger' | 'outline';
  disabled?: boolean;
  error?: boolean;
}

const classes = {
  base: 'bg-transparent block w-full border text-black text-sm font-md rounded-lg p-2.5',
  disabled: 'cursor-not-allowed opacity-50 shadow-inner',
  variant: {
    primary:
      'border-none outline outline-1 outline-offset-1 outline-gray-500 focus:ring-blue-500 focus:outline-2 focus:outline-blue-500 placeholder-gray-400',
    danger: 'focus:outline-none border-red-600 focus:border-red-600',
    outline: 'border-none outline-none focus:border-none focus:outline-none'
  }
};

export const Input = ({ className, variant = 'primary', error = false, disabled = false, ...rest }: InputProps) => {
  return (
    <input
      {...rest}
      disabled={disabled}
      className={cls(`
      ${classes.base} 
      ${classes.variant[variant]}
      ${error && classes.variant['danger']} 
      ${disabled && classes.disabled} 
      ${className}`)}
    />
  );
};
