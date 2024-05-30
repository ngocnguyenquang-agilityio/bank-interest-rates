// Helpers
import { cls } from '@/utils';

// Components
import { Input } from '@/components';

// Types
import type { InputProps } from '../Input';

interface FormControlProps extends InputProps {
  labelText: string;
  required?: boolean;
  errorText?: string;
  disabled?: boolean;
}

export const FormControl = ({
  id = '',
  className = '',
  labelText = '',
  errorText = '',
  error = false,
  disabled = false,
  required = false,
  ...rest
}: FormControlProps) => {
  return (
    <div className={cls(`relative ${className}`)}>
      <label className="block mb-1.5 text-sm text-gray-400" htmlFor={id}>
        {labelText} {required && '*'}
      </label>
      <Input {...rest} id={id} error={error} disabled={disabled} />
      {error && <p className="ml-2 mt-1 text-sm text-red-600">{errorText}</p>}
    </div>
  );
};
