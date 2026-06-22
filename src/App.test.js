import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

test('renders the marketplace home page', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByRole('heading', { name: /omnipod creator marketplace/i })).toBeInTheDocument();
});
