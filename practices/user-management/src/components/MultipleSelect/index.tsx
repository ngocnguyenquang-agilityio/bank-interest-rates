'use client';

import { useState } from 'react';
import Image from 'next/image';

// Hooks
import { useClickOutside } from '@/hooks';

interface IOptions {
  id: string;
  name: string;
  image?: string;
}

export interface MultipleSelectProps {
  id: string;
  label: string;
  options: IOptions[];
  selectedOptions?: IOptions[];
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export const MultipleSelect = ({
  id,
  label,
  options,
  selectedOptions = [],
  onSelect,
  onRemove,
  disabled = false
}: MultipleSelectProps) => {
  const [openOptions, setOpenOptions] = useState(false);
  const showOptions = () => {
    !disabled && setOpenOptions(true);
  };

  const hideOptions = () => {
    setOpenOptions(false);
  };

  const dropdownRef = useClickOutside(() => {
    hideOptions();
  });

  return (
    <>
      <label className="block mb-1.5 text-sm text-gray-400" htmlFor={id}>
        {label}
      </label>
      <div
        className={`mt-2 w-full rounded-lg placeholder-gray-400 border-none ${
          openOptions
            ? 'outline outline-2 outline-offset-2 outline-blue-500'
            : 'outline outline-1 outline-offset-1 outline-gray-500'
        } ${disabled && 'cursor-not-allowed'}`}
        ref={dropdownRef}
        onClick={showOptions}
        data-testid="select"
      >
        {selectedOptions.length > 0 && (
          <div className="bg-transparent w-full p-2">
            <div className="w-full py-2">
              {selectedOptions.map(({ id, name }: IOptions) => (
                <span key={id} className={`border rounded-full bg-blue-400 p-2 mx-0.5 text-sm text-center text-white `}>
                  {name}
                  <button
                    className="ml-2 pl-2 border-l-2 cursor-pointer disabled:cursor-not-allowed "
                    onClick={() => onRemove(id!)}
                    data-testid={`select-${id}`}
                    disabled={disabled}
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="relative w-full focus:outline-2 focus:outline-blue-500 focus:border-none">
          {selectedOptions.length < 1 && (
            <p className="p-2.5 text-sm font-md opacity-50 shadow-inner">Select options</p>
          )}
          {openOptions && (
            <div className="w-full p-2" data-testid="options">
              {options.map(({ id, name, image }: IOptions) => (
                <div
                  key={id}
                  onClick={() => onSelect(id!)}
                  className="flex items-center gap-2 px-2 my-2 hover:bg-blue-500 hover:rounded cursor-pointer"
                  data-testid={`option-${id}`}
                >
                  {image && (
                    <Image
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px] object-cover rounded-full"
                      src={image}
                      alt={name}
                    />
                  )}
                  <span className="text-black font-md">{name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
