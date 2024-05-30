'use client';

import Link from 'next/link';
import Image from 'next/image';

// Icons
import { UserGroupIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

// Components
import { Card, CardSkeleton, LatestItemsSkeleton } from '@/components';

// Types
import { User } from '@/interfaces/user';

// Constants
import { API_ROUTER, PAGE_ROUTES } from '@/constants/routes';

// Helpers
import { getImageUrl } from '@/utils';

// Hooks
import { useGetTotalItems, useGetLatestItems } from '@/hooks';

export const HomeContent = () => {
  const totalUsersData = useGetTotalItems(API_ROUTER.USER_LIST);
  const latestUsers = useGetLatestItems(API_ROUTER.USER_LIST);
  const totalTechData = useGetTotalItems(API_ROUTER.TECH_LIST);

  return (
    <>
      <h2 className="my-4 text-lg">Dashboard</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {!totalUsersData ? (
          <CardSkeleton />
        ) : (
          <Card title="Total Users" value={totalUsersData} icon={<UserGroupIcon className="w-5" />} />
        )}

        {!totalTechData ? (
          <CardSkeleton />
        ) : (
          <Card title="Total Techstacks" value={totalTechData} icon={<CodeBracketIcon className="w-5" />} />
        )}
      </div>
      <h2 className="my-4 text-lg">Recently Added Users</h2>
      {!latestUsers ? (
        <LatestItemsSkeleton />
      ) : (
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
          <div className="bg-white px-6">
            {latestUsers.map(({ id, lastName, firstName, avatar, entryDate, techStacks }: User) => {
              return (
                <div key={id} className="flex flex-row items-center justify-between py-4">
                  <div className="flex items-center">
                    <Image
                      src={getImageUrl(lastName, avatar)}
                      alt={`${lastName}'s profile picture`}
                      className="mr-4 rounded-full"
                      width={32}
                      height={32}
                    />
                    <div className="min-w-0">
                      <Link
                        href={PAGE_ROUTES.USER_DETAIL(id!)}
                        className="text-sm font-semibold hover:underline hover:cursor-pointer"
                      >
                        {lastName} {firstName}
                      </Link>
                      <p className="hidden text-sm text-gray-500 sm:block">{entryDate.substring(0, 10)}</p>
                    </div>
                  </div>
                  <p className="truncate text-sm font-medium">{techStacks.length}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
