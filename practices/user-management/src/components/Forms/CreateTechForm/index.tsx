'use client';

import Link from 'next/link';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

// Components
import { Button, FormControl } from '@/components';

// Constants
import { API_ROUTER, PAGE_ROUTES, REGEX } from '@/constants';

// Services
import { postMethod } from '@/services/fetcher';

interface IFormInput {
  name: string;
  logo: string;
  description: string;
}

export const CreateTechForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IFormInput>({
    defaultValues: {
      logo: '',
      description: ''
    }
  });

  const { trigger, isMutating } = useSWRMutation(API_ROUTER.TECH_LIST, postMethod);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await trigger(data);
    router.push(PAGE_ROUTES.TECH_LIST);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md border border-gray-200 bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Name is required',
              pattern: { value: REGEX.NAME, message: 'Invalid name' }
            }}
            render={({ field: { onChange } }) => (
              <FormControl
                labelText="Tech name"
                placeholder="Tech name"
                id="name"
                required
                error={errors?.name ? true : false}
                errorText={errors?.name?.message}
                onChange={onChange}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <Controller
            control={control}
            name="logo"
            render={({ field: { onChange } }) => (
              <FormControl labelText="Logo URL" placeholder="https://avatar-link.com" id="logo" onChange={onChange} />
            )}
          />
        </div>

        <div className="mb-4">
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange } }) => (
              <div className="relative">
                <label className="block mb-1.5 text-sm text-gray-400" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  className="bg-transparent block w-full text-black text-sm font-md rounded-lg p-2.5 placeholder-gray-400 border-none outline outline-1 outline-offset-1 outline-gray-500 focus:ring-blue-500 focus:outline-2 focus:outline-blue-500 placeholder-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-inner"
                  placeholder="Description"
                  onChange={onChange}
                />
              </div>
            )}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={PAGE_ROUTES.TECH_LIST}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button disabled={isMutating} type="submit">
          Create Tech
        </Button>
      </div>
    </form>
  );
};
