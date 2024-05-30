import { fireEvent, render } from '@testing-library/react';

// Components
import SideNav from '.';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  }
}));

describe('SideNav Component', () => {
  test('Should render successfully', () => {
    const comp = render(<SideNav />);
    expect(comp).toBeTruthy();
  });

  test('Should match snapshot', () => {
    const comp = render(<SideNav />);
    expect(comp).toMatchSnapshot();
  });

  test('Should call usePathname ', async () => {
    const comp = render(<SideNav />);
    const link = comp.queryByTestId('/home') as HTMLAnchorElement;
    await fireEvent.click(link);
    expect(mockUsePathname).toBeCalled();
  });
});
