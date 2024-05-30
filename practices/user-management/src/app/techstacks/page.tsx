import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

// Components
import { Breadcrumb, TechTable, TechTableSkeleton } from '@/components';

// Icons
import { PlusIcon } from '@heroicons/react/24/outline';

// Constants
import { NEW_ID, PAGE_ROUTES } from '@/constants';

export const metadata: Metadata = {
  title: 'Tech stacks'
};

const TechListPage = () => {
  return (
    <div className="w-full">
      <Breadcrumb
        breadcrumbs={[
          {
            label: 'Tech stacks',
            href: PAGE_ROUTES.TECH_LIST
          }
        ]}
      />
      <div className="mb-4 flex md:mt-8">
        <Link
          href={PAGE_ROUTES.TECH_DETAIL(NEW_ID)}
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Create Tech</span>
          <PlusIcon className="h-5 md:ml-4" />
        </Link>
      </div>
      <Suspense fallback={<TechTableSkeleton />}>
        <TechTable />
      </Suspense>
    </div>
  );
};

export default TechListPage;
