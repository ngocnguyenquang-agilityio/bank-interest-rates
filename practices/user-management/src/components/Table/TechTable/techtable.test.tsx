import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

// Components
import { TechTable } from '.';
import useSWR from 'swr';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';

const mockDataResponse = [
  {
    description: 'HTML description ',
    id: '1',
    logo: 'https://cdn0.iconfinder.com/data/icons/HTML5/512/HTML_Logo.png',
    name: 'HTML'
  },
  {
    description: 'CSS description ',
    id: '2',
    logo: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/badge-css-3-128.png',
    name: 'CSS'
  },
  {
    description: 'Javascript description',
    id: '3',
    logo: 'https://www.svgrepo.com/show/303206/javascript-logo.svg',
    name: 'Javascript'
  }
];

jest.mock('swr');

const useMockSwr = jest.mocked(useSWR);

describe('TechTable Component', () => {
  beforeEach(() => {
    useMockSwr.mockImplementation(() => ({
      data: mockDataResponse,
      isLoading: false,
      error: '',
      mutate: function (): Promise<unknown> {
        return new Promise<void>(() => {
          return {
            data: mockDataResponse,
            opts: true
          };
        });
      },
      isValidating: false
    }));
  });

  const mockDeleteButton = jest.fn();
  const mockCancelButton = jest.fn();

  const renderModal = () =>
    render(
      <Modal title="Delete User" content="Do you want to delete this user?" onClickHideModal={mockCancelButton}>
        <Button type="button" variant="danger" onClick={mockDeleteButton}>
          Delete
        </Button>
      </Modal>
    );

  test('Should match snapshot', () => {
    const comp = render(<TechTable />);
    expect(comp).toMatchSnapshot();
  });

  test('Should click delete button', async () => {
    const { getByTestId } = renderModal();
    const comp = render(<TechTable />);
    const button = comp.queryByTestId('delete-1') as HTMLButtonElement;
    fireEvent.click(button);
    await waitFor(() => getByTestId('modal-1'));
    const deleteButton = screen.getByTestId('confirm-delete');
    expect(deleteButton).toBeInTheDocument();
    await fireEvent.click(deleteButton);
    // TODO: Test click delete tech
  });

  test('Should able to click correct edit button', async () => {
    const comp = render(<TechTable />);
    const button = comp.queryByTestId('edit-1') as HTMLLinkElement;
    await fireEvent.click(button);
    expect(button.getAttribute('href')).toBe('/techstacks/1');
  });
});
