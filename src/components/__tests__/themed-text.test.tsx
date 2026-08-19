import { render, screen } from '@testing-library/react-native';

import { ThemedText } from '@/components/themed-text';

it('renders its children', async () => {
  await render(<ThemedText>Stay hydrated</ThemedText>);
  expect(screen.getByText('Stay hydrated')).toBeTruthy();
});
