import { Metadata } from 'next';

// Components
import { Breadcrumb, HomeContent } from '@/components';

// Constants
import { PAGE_ROUTES } from '@/constants';

export const metadata: Metadata = {
  title: 'Home'
};

const Home = () => {
  return (
    <main>
      <Breadcrumb breadcrumbs={[{ label: 'Home', href: PAGE_ROUTES.HOME }]} />
      <HomeContent />
    </main>
  );
};

export default Home;
