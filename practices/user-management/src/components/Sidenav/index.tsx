'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons
import { PowerIcon, UserGroupIcon, HomeIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

// Helpers
import { cls } from '@/utils';

// Components
import { Button } from '@/components';

const mockLinks = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Users', href: '/users', icon: UserGroupIcon },
  {
    name: 'Tech Stacks',
    href: '/techstacks',
    icon: CodeBracketIcon
  }
];

const SideNav = () => {
  const pathName = usePathname();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40" href="/">
        <div className="w-32 text-white md:w-40">
          <div className="flex flex-row items-center leading-none text-white">
            <p className="text-[24px]">User Management</p>
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {mockLinks.map(({ name, href, icon }) => {
          const LinkIcon = icon;

          return (
            <Link
              key={name}
              href={href}
              data-testid={href}
              className={cls(
                `flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm text-black font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 
              ${pathName === href ? 'bg-sky-100 text-blue-600' : ''}`
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{name}</p>
            </Link>
          );
        })}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block" />
        <Button
          variant="secondary"
          className="gap-2 h-[48px] font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </Button>
      </div>
    </div>
  );
};

export default SideNav;
