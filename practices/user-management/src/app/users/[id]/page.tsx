import { Metadata } from 'next';
import { Suspense } from 'react';

// Components
import { Breadcrumb, CreateUserForm, EditUserForm } from '@/components';

// Constants
import { NEW_ID, PAGE_ROUTES } from '@/constants';

export const metadata: Metadata = {
  title: 'User details'
};

const UserDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <main>
      {id === NEW_ID ? (
        <>
          <Breadcrumb
            breadcrumbs={[
              { label: 'Users', href: PAGE_ROUTES.USER_LIST },
              {
                label: 'Create User',
                href: PAGE_ROUTES.USER_DETAIL(id)
              }
            ]}
          />
          <CreateUserForm />
        </>
      ) : (
        <>
          <Breadcrumb
            breadcrumbs={[
              { label: 'Users', href: PAGE_ROUTES.USER_LIST },
              { label: 'User Details', href: PAGE_ROUTES.USER_DETAIL(id) }
            ]}
          />

          <Suspense
            fallback={
              <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
              </div>
            }
          >
            <EditUserForm id={id} />
          </Suspense>
        </>
      )}
    </main>
  );
};

export default UserDetailPage;
