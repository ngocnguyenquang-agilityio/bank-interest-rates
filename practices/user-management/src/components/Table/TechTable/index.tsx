'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

// Components
import { Button } from '@/components/Button';
import { PaginationSkeleton, TechTableSkeleton } from '@/components/Skeleton';
import { Pagination } from '@/components/Pagination';
import { Modal } from '@/components/Modal';

// Icons
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Constants
import { API_ROUTER, PAGE_ROUTES, LIMIT_DEFAULT } from '@/constants';

// Services
import { deleteMethod, fetcher } from '@/services/fetcher';

// Types
import { Tech } from '@/interfaces/tech';

// Helpers
import { getImageUrl, getTotalPages } from '@/utils';

// Hooks
import { useModal } from '@/hooks';

export const TechTable = () => {
  const [itemId, setItemId] = useState('');
  const { isShowModal, openModal, hideModal } = useModal();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;

  const { data: totalData, isLoading: totalDataLoading } = useSWR(API_ROUTER.TECH_LIST, fetcher);
  const { data, isLoading, mutate } = useSWR(`${API_ROUTER.TECH_LIST}?page=${page}&limit=${LIMIT_DEFAULT}`, fetcher);

  if (isLoading) return <TechTableSkeleton />;

  const handleDelete = async (id: string) => {
    const newTechList = data.filter((item: Tech) => item.id !== id);
    try {
      await mutate(newTechList, false);
      await deleteMethod(API_ROUTER.TECH_DETAIL(id));

      hideModal();
    } catch {
      throw new Error('Something wrong when delete this tech');
    }
  };

  const onClickDeleteIcon = (id: string) => {
    openModal();
    setItemId(id);
  };

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map(({ id, name, logo }: Tech) => (
            <tr key={id} className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <Image
                    alt={`${name} logo`}
                    src={getImageUrl(name, logo)}
                    className="rounded-full"
                    width={28}
                    height={28}
                  />
                  <Link href={PAGE_ROUTES.TECH_DETAIL(id!)} className="hover:underline hover:cursor-pointer">
                    {name}
                  </Link>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <Link
                    href={PAGE_ROUTES.TECH_DETAIL(id!)}
                    className="group rounded-md border p-2 hover:bg-blue-400"
                    data-testid={`edit-${id}`}
                  >
                    <PencilIcon className="w-5 group-hover:text-white" />
                  </Link>
                  <Button
                    variant="outlineSecondary"
                    size="sm"
                    className="group hover:bg-red-400"
                    onClick={() => onClickDeleteIcon(id!)}
                    data-testid={`delete-${id}`}
                  >
                    <TrashIcon className="w-5 group-hover:text-white" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isShowModal && (
        <Modal
          title="Delete Techstack"
          content="Do you want to delete this techstack?"
          onClickHideModal={hideModal}
          data-testid={`modal-${itemId}`}
        >
          <Button type="button" variant="danger" onClick={() => handleDelete(itemId)} data-testid={'confirm-delete'}>
            Delete
          </Button>
        </Modal>
      )}

      {totalDataLoading ? (
        <PaginationSkeleton />
      ) : (
        <div className="mt-3 flex w-full justify-center">
          <Pagination totalPages={getTotalPages(totalData.length, LIMIT_DEFAULT)} />
        </div>
      )}
    </>
  );
};
