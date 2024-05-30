import { RenderResult, fireEvent, render, screen } from '@testing-library/react';

// Components
import { FormControl } from '.';

const defaultProps = {
  id: 'test',
  labelText: 'Form Control',
  placeholder: 'Type something'
};

describe('FormControl Component', () => {
  let comp: RenderResult;
  comp = render(<FormControl {...defaultProps} />);

  test('Should render successfully', () => {
    expect(comp).toBeTruthy();
  });

  test('Should match snapshot', () => {
    expect(comp).toMatchSnapshot();
  });

  test('Should render correctly if required', () => {
    render(<FormControl {...defaultProps} required />);
    const result = comp.queryByText('Form Control *');
    expect(result).toBeInTheDocument();
  });

  test('Should render correctly if error', () => {
    render(<FormControl {...defaultProps} error errorText="Error message" />);
    const errorMessage = comp.getByText('Error message');
    expect(errorMessage).toBeInTheDocument();
    const errorInput = screen.getByRole('textbox');
    expect(errorInput.getAttribute('class')).toMatch(/focus:outline-none border-red-600 focus:border-red-600/gi);
  });

  test('Should call onChange function', () => {
    const mockOnChange = jest.fn();
    render(<FormControl {...defaultProps} onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Typing value' } });
    expect(mockOnChange.mock.calls.length).toBe(1);
  });
});
