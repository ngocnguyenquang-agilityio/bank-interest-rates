import { fireEvent, render, screen } from '@testing-library/react';

// Components
import { MultipleSelect } from '.';

const mockOptions = [
  {
    name: 'HTML',
    logo: 'https://symbols.getvecta.com/stencil_25/37_html5.d4d8050235.svg',
    id: '1'
  },
  {
    name: 'CSS',
    logo: 'https://symbols.getvecta.com/stencil_25/14_css3.d930bfb832.svg',
    id: '2'
  },
  {
    name: 'Javascript',
    logo: 'https://symbols.getvecta.com/stencil_25/41_javascript.0ca26ec4ab.svg',
    id: '3'
  }
];

const mockSelectedOptions = [
  {
    name: 'Typescript',
    logo: 'https://symbols.getvecta.com/stencil_25/87_typescript.cb2d7326fa.svg',
    id: '4'
  },
  {
    name: 'React',
    logo: 'https://symbols.getvecta.com/stencil_25/72_react.76a8d36b4b.svg',
    id: '5'
  }
];

const defaultProps = {
  id: 'dropdown',
  label: 'Select options',
  options: mockOptions,
  selectedOptions: mockSelectedOptions,
  onSelect: jest.fn(),
  onRemove: jest.fn()
};

describe('Dropdown Component', () => {
  test('Should render correctly', () => {
    const comp = render(<MultipleSelect {...defaultProps} />);
    expect(comp).toBeTruthy();
  });

  test('Should match snapshot', () => {
    const comp = render(<MultipleSelect {...defaultProps} />);
    expect(comp).toMatchSnapshot();
  });

  test('Should show options', async () => {
    render(<MultipleSelect {...defaultProps} />);
    const text = screen.getByTestId('select');
    await fireEvent.click(text);
    const options = screen.getByTestId('options');
    expect(options).toBeInTheDocument();
  });

  test('Should render correct number of options', async () => {
    render(<MultipleSelect {...defaultProps} />);
    const text = screen.getByTestId('select');
    await fireEvent.click(text);
    const options = screen.getByTestId('options');
    expect(options.children).toHaveLength(mockOptions.length);
  });

  test('Should call onCheck when select option', async () => {
    render(<MultipleSelect {...defaultProps} />);
    const text = screen.getByTestId('select');
    await fireEvent.click(text);
    const selectedOption = screen.getByTestId('option-1');
    await fireEvent.click(selectedOption);
    expect(defaultProps.onSelect.mock.calls.length).toBe(1);
  });

  test('Should call onRemove when remove selected option', async () => {
    render(<MultipleSelect {...defaultProps} />);
    const text = screen.getByTestId('select');
    await fireEvent.click(text);
    const selectedOption = screen.getByTestId('select-4');
    await fireEvent.click(selectedOption);
    expect(defaultProps.onRemove.mock.calls.length).toBe(1);
  });
});
