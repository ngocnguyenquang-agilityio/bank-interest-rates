import { Metadata } from 'next';

// Components
import Form, {
  preloadCustomer,
  preloadInvoice,
} from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  preloadInvoice(id);
  preloadCustomer();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form id={id} />
    </main>
  );
};

export default Page;
