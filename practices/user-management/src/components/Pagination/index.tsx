'use client';

import { usePathname, useSearchParams } from 'next/navigation';
// Components
import { Button } from '@/components';

// Helpers
import Link from 'next/link';

interface PaginationProps {
  totalPages: number;
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav className="pt-4 flex justify-end">
      <ul data-testid="pagination" className="inline-flex -space-x-px text-md gap-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page, idx) => {
          return (
            <Link href={createPageURL(page)} key={idx}>
              <Button variant={currentPage === page ? 'primary' : 'outlinePrimary'} value={currentPage.toString()}>
                {page}
              </Button>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};
