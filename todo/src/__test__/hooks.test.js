import '@testing-library/jest-dom';
import App from '../App';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/userEvent';


describe('Form testing', () => {
  test('Can add an item to a list', async () => {
    render(<App/>);
    userEvent.type(screen.getByTestId('todoItem'), 'Eat Pizza');
    userEvent.type(screen.getByTestId('assignedTo'), 'Kids');
    userEvent.click(screen.getByTestId('submit'));
    let items = await waitFor(() => {
      screen.getAllByTestId('list-item');
    })
    expect(items[items.length-1]).toHaveTextContent('Eat Pizza');
  })
})


