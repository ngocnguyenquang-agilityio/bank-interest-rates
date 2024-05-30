'use client';

import { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

// Components
import { Button, FormControl, MultipleSelect } from '@/components';

// Constants
import { API_ROUTER, PAGE_ROUTES, REGEX } from '@/constants';

// Services
import { fetcher, postMethod } from '@/services/fetcher';

// Types
import { Tech } from '@/interfaces/tech';

interface IFormInput {
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
  entryDate: string;
  avatar: string;
  techStacks: string[];
}

export const CreateUserForm = () => {
  const router = useRouter();

  const { data = [], isLoading } = useSWR(API_ROUTER.TECH_LIST, fetcher);

  const [selectedData, setSelectedData] = useState<string[]>([]);

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IFormInput>({
    defaultValues: {
      entryDate: new Date().toISOString(),
      dob: new Date().toISOString(),
      avatar: ''
    }
  });

  const { trigger, isMutating } = useSWRMutation(API_ROUTER.USER_LIST, postMethod);

  if (isLoading) {
    return (
      <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );
  }

  const options = data
    .filter((item: Tech) => !selectedData.includes(item.id!))
    .map((option: Tech) => {
      return { ...option, image: option.logo };
    });

  const selectedOptions = data.filter((item: Tech) => selectedData.includes(item.id!));

  const onSelect = (id: string) => {
    setSelectedData((prev: string[]) => [...prev, id]);
  };

  const onRemove = (id: string) => {
    setSelectedData((prev: string[]) => [...prev.filter((it) => it !== id)]);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const newData = { ...data, techStacks: selectedData };

    await trigger(newData);
    router.push(PAGE_ROUTES.USER_LIST);
  };
  const newDate = new Date();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md border border-gray-200 bg-gray-50 p-4 md:p-6">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <Controller
              control={control}
              name="firstName"
              rules={{
                required: 'First name is required',
                pattern: { value: REGEX.NAME, message: 'Invalid First name' }
              }}
              render={({ field: { onChange } }) => (
                <FormControl
                  labelText="First name"
                  placeholder="First name"
                  id="firstName"
                  required
                  error={errors?.firstName ? true : false}
                  errorText={errors?.firstName?.message}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              control={control}
              name="lastName"
              rules={{
                required: 'Last name is required',
                pattern: { value: REGEX.NAME, message: 'Invalid Last name' }
              }}
              render={({ field: { onChange } }) => (
                <FormControl
                  labelText="Last name"
                  placeholder="Last name"
                  id="lastName"
                  required
                  error={errors?.lastName ? true : false}
                  errorText={errors?.lastName?.message}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <Controller
            control={control}
            name="phone"
            rules={{
              required: 'Phone is required',
              pattern: { value: REGEX.PHONE, message: 'Invalid Phone number' }
            }}
            render={({ field: { onChange } }) => (
              <FormControl
                labelText="Phone number"
                placeholder="123-456-7891"
                id="phone"
                required
                error={errors?.phone ? true : false}
                errorText={errors?.phone?.message}
                onChange={onChange}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <Controller
            control={control}
            name="dob"
            render={({ field: { onChange } }) => (
              <FormControl
                type="date"
                defaultValue={newDate.toISOString().substring(0, 10)}
                max={newDate.toISOString().substring(0, 10)}
                labelText="Date of Birth"
                id="dob"
                onChange={(e) => onChange(new Date(e.target.value).toISOString())}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <Controller
            control={control}
            name="entryDate"
            render={({ field: { onChange } }) => (
              <FormControl
                type="date"
                defaultValue={newDate.toISOString().substring(0, 10)}
                min={newDate.toISOString().substring(0, 10)}
                labelText="Entry Date"
                id="entry-date"
                onChange={(e) => onChange(new Date(e.target.value).toISOString())}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <Controller
            control={control}
            name="avatar"
            render={({ field: { onChange } }) => (
              <FormControl
                labelText="Avatar URL"
                placeholder="https://avatar-link.com"
                id="avatar"
                onChange={onChange}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <MultipleSelect
            id="tech-stack"
            label="Techstacks"
            options={options}
            onSelect={onSelect}
            selectedOptions={selectedOptions}
            onRemove={onRemove}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/users"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button disabled={isMutating} type="submit">
          Create User
        </Button>
      </div>
    </form>
  );
};
