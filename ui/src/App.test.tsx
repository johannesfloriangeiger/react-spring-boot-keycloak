import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Message:/i);
  expect(linkElement).toBeInTheDocument();
});
