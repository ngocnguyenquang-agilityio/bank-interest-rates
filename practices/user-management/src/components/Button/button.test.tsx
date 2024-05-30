import { fireEvent, render, screen } from '@testing-library/react';

// Components
import { Button } from '.';

describe('Button Component', () => {
  test('Should render successfully', () => {
    const comp = render(<Button>Button</Button>);
    expect(comp).toBeTruthy();
  });

  test('Should match snapshot', () => {
    const comp = render(<Button>Button</Button>);
    expect(comp).toMatchSnapshot();
  });

  test('Should render correct variants secondary', () => {
    render(<Button variant="secondary">Button</Button>);
    const button = screen.getByRole('button');
    expect(button.getAttribute('class')).toMatch(
      /bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 active:bg-gray-300/gi
    );
  });

  test('Should render correct variants danger ', () => {
    render(<Button variant="danger">Button</Button>);
    const button = screen.getByRole('button');
    expect(button.getAttribute('class')).toMatch(
      /bg-red-500 text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-red-600/gi
    );
  });

  test('Should render correct size sm', () => {
    render(<Button size="sm">Button</Button>);
    const button = screen.getByRole('button');
    expect(button.getAttribute('class')).toMatch(/px-2 py-1/gi);
  });

  test('Should render correct size lg', () => {
    render(<Button size="lg">Button</Button>);
    const button = screen.getByRole('button');
    expect(button.getAttribute('class')).toMatch(/px-8 py-3/gi);
  });

  test('Should render correct rounded sm', () => {
    render(<Button rounded="sm">Button</Button>);
    const button = screen.getByRole('button');
    expect(button.getAttribute('class')).toMatch(/rounded/gi);
  });

  test('Should render correct rounded lg', () => {
    render(<Button rounded="lg">Button</Button>);
    const button = screen.getByRole('button');
    expect(button.getAttribute('class')).toMatch(/rounded-lg/gi);
  });

  test('Should render correct rounded full', () => {
    render(<Button rounded="full">Button</Button>);
    const button = screen.getByRole('button');
    expect(button.getAttribute('class')).toMatch(/rounded-full/gi);
  });

  test('Should call onClick function', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Button</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick.mock.calls.length).toBe(1);
  });
});
