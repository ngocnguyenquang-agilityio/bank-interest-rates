import '@testing-library/jest-dom';

jest.mock('next/navigation', () => {
  const actual = jest.mock('next/navigation');
  return {
    ...actual,
    useSearchParams: jest.fn(() => ({ get: jest.fn(() => 'mockPage') })),
    usePathname: jest.fn()
  };
});
