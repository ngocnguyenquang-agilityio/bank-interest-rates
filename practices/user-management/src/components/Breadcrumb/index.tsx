import Link from 'next/link';

// Helpers
import { cls } from '@/utils';

interface Breadcrumb {
  label: string;
  href: string;
}

export const Breadcrumb = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className="flex text-xl md:text-xl">
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <li
              key={breadcrumb.href}
              data-testid={`link-${breadcrumb.label}`}
              className={cls(`${index + 1 === breadcrumbs.length ? 'text-blue-500' : 'text-gray-400'} `)}
            >
              <Link href={breadcrumb.href} className="hover:text-blue-400">
                {breadcrumb.label}
              </Link>
              {index < breadcrumbs.length - 1 ? <span className="mx-3 inline-block">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
