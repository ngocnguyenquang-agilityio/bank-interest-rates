import { fireEvent, render, screen } from '@testing-library/react';

// Components
import { Input } from '.';

describe('Button Component', () => {
  test('Should render successfully', () => {
    const comp = render(<Input />);
    expect(comp).toBeTruthy();
  });

  test('Should match snapshot', () => {
    const comp = render(<Input />);
    expect(comp).toMatchSnapshot();
  });

  test('Should render error input', () => {
    render(<Input type="text" error />);
    const input = screen.getByRole('textbox');
    expect(input.getAttribute('class')).toMatch(/focus:outline-none border-red-600 focus:border-red-600/gi);
  });

  test('Should able to type', () => {
    const { getByPlaceholderText } = render(<Input type="text" placeholder="Type something" />);
    const input = getByPlaceholderText('Type something') as HTMLInputElement;
    const value = 'typing value';

    fireEvent.change(input, { target: { value: value } });
    expect(input.value).toBe(value);
  });

  test('Should call onChange function', () => {
    const mockOnChange = jest.fn();
    render(<Input type="text" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Typing value' } });
    expect(mockOnChange.mock.calls.length).toBe(1);
  });
});
