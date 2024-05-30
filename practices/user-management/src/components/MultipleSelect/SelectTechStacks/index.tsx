'use client';

import useSWR from 'swr';

// Components
import { MultipleSelect } from '..';

// Constants
import { API_ROUTER } from '@/constants';

// Services
import { fetcher } from '@/services/fetcher';

// Types
import { Tech } from '@/interfaces/tech';

export const SelectTechStacks = ({
  selectedOptions,
  id,
  onSelect,
  onRemove
}: {
  selectedOptions: string[];
  id: string;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}) => {
  const { data = [], isLoading } = useSWR(API_ROUTER.TECH_LIST, fetcher);

  const options = data
    .filter((item: Tech) => !selectedOptions.includes(item.id!))
    .map((option: Tech) => {
      return { ...option, image: option.logo };
    });

  const selectedOptionTest = data.filter((item: Tech) => selectedOptions.includes(item.id!));

  return (
    <MultipleSelect
      id={id}
      label="Techstacks"
      options={options}
      selectedOptions={selectedOptionTest}
      onSelect={onSelect}
      onRemove={onRemove}
      disabled={isLoading}
    />
  );
};
