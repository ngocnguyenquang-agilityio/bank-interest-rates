'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

// Components
import { Button, FormControl, Modal } from '@/components';

// Constants
import { API_ROUTER, NOT_FOUND, PAGE_ROUTES, REGEX } from '@/constants';

// Services
import { putMethod, fetcher, deleteMethod } from '@/services/fetcher';

// Hooks
import { useModal } from '@/hooks';

interface IFormInput {
  name: string;
  logo: string;
  description: string;
}

interface EditTechFormProps {
  id: string;
}

export const EditTechForm = ({ id }: EditTechFormProps) => {
  const router = useRouter();
  const { isShowModal, openModal, hideModal } = useModal();
  const { data, isLoading } = useSWR(API_ROUTER.TECH_DETAIL(id), fetcher);

  if (data === NOT_FOUND) {
    notFound();
  }

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IFormInput>({ values: data });

  const { trigger: editTech, isMutating: isEditTechMutating } = useSWRMutation(API_ROUTER.TECH_DETAIL(id), putMethod);
  const { trigger: deleteTech, isMutating: isDeleteTechMutating } = useSWRMutation(
    API_ROUTER.TECH_DETAIL(id),
    deleteMethod
  );

  const handleDelete = async () => {
    try {
      await deleteTech();
      hideModal();

      router.push(PAGE_ROUTES.TECH_LIST);
    } catch {
      throw new Error('Something wrong when delete this tech');
    }
  };

  if (isLoading)
    return (
      <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await editTech(data);
    } catch {
      throw new Error('Edit tech stack failed!');
    }

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
                id="name"
                required
                defaultValue={data.name}
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
              <FormControl
                labelText="Logo URL"
                placeholder="https://avatar-link.com"
                id="logo"
                defaultValue={data.logo || ''}
                onChange={onChange}
              />
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
                  defaultValue={data.description || ''}
                />
              </div>
            )}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Link
          href={PAGE_ROUTES.TECH_LIST}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Back
        </Link>
        <Button type="button" variant="danger" disabled={isDeleteTechMutating} onClick={openModal}>
          Delete
        </Button>
        <Button disabled={isEditTechMutating} type="submit">
          Save
        </Button>
        {isShowModal && (
          <Modal title="Delete Techstack" content="Do you want to delete this techstack?" onClickHideModal={hideModal}>
            <Button type="button" variant="danger" disabled={isDeleteTechMutating} onClick={handleDelete}>
              Delete
            </Button>
          </Modal>
        )}
      </div>
    </form>
  );
};
