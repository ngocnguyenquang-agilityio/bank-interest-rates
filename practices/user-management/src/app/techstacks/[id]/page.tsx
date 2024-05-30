import { Metadata } from 'next';
import { Suspense } from 'react';

// Components
import { Breadcrumb, EditTechForm, CreateTechForm } from '@/components';

// Constants
import { NEW_ID, PAGE_ROUTES } from '@/constants';

export const metadata: Metadata = {
  title: 'Tech Details'
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <main>
      {id === NEW_ID ? (
        <>
          <Breadcrumb
            breadcrumbs={[
              { label: 'Users', href: PAGE_ROUTES.TECH_LIST },
              {
                label: 'Create Tech Stack',
                href: PAGE_ROUTES.TECH_DETAIL(id)
              }
            ]}
          />
          <CreateTechForm />
        </>
      ) : (
        <>
          <Breadcrumb
            breadcrumbs={[
              { label: 'Tech Stacks', href: PAGE_ROUTES.TECH_LIST },
              { label: 'Tech Stack Details', href: PAGE_ROUTES.TECH_DETAIL(id) }
            ]}
          />
          <Suspense
            fallback={
              <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-64 w-64" />
              </div>
            }
          >
            <EditTechForm id={id} />
          </Suspense>
        </>
      )}
    </main>
  );
};

export default Page;
