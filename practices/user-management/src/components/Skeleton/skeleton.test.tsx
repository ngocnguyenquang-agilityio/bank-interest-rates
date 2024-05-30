import { render } from '@testing-library/react';

// Components
import { UserTableSkeleton, TechTableSkeleton } from '.';

describe('UserTable Skeleton', () => {
  test('Should render successfully', () => {
    const comp = render(<UserTableSkeleton />);
    expect(comp).toBeTruthy();
  });

  test('Should match snapshot', () => {
    const comp = render(<UserTableSkeleton />);
    expect(comp).toMatchSnapshot();
  });
});

describe('TechTable Skeleton', () => {
  test('Should render successfully', () => {
    const comp = render(<TechTableSkeleton />);
    expect(comp).toBeTruthy();
  });

  test('Should match snapshot', () => {
    const comp = render(<TechTableSkeleton />);
    expect(comp).toMatchSnapshot();
  });
});
