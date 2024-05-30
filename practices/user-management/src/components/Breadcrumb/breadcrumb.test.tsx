import { fireEvent, render } from '@testing-library/react';

// Components
import { Breadcrumb } from '.';
import React, { type ReactElement } from 'react';

const props = {
  breadcrumbs: [
    {
      label: 'Home',
      href: '/home'
    },
    {
      label: 'Users',
      href: '/home/users'
    }
  ]
};

describe('Breadcrumb component', () => {
  jest.mock(
    'next/link',
    () =>
      ({ children, ...rest }: { children: ReactElement }) =>
        React.cloneElement(children, { ...rest })
  );

  test('Should render successfully', () => {
    const comp = render(<Breadcrumb {...props} />);
    expect(comp).toBeTruthy();
  });

  test('Should match snapshot', () => {
    const comp = render(<Breadcrumb {...props} />);
    expect(comp).toMatchSnapshot();
  });

  test('Should render correct active breadcrumb', () => {
    const comp = render(<Breadcrumb {...props} />);
    const breadcrumb = comp.queryByTestId('link-Users');
    expect(breadcrumb?.getAttribute('class')).toMatch(/text-blue-500/gi);
  });

  test('Should got correct href when click', async () => {
    const comp = render(<Breadcrumb {...props} />);
    const link = comp.queryByTestId('link-Home')?.querySelector('a') as HTMLAnchorElement;
    await fireEvent.click(link);
    expect(link.getAttribute('href')).toBe('/home');
  });
});
