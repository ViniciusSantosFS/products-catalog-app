import { render, screen } from '@testing-library/react-native';
import App from '../App';

test('basic test', () => {
  render(<App />);
  expect(screen.getByText('Community')).toBeOnTheScreen();
});
