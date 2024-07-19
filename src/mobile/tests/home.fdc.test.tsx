import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../src/app/home.fdc'; 
import api from '@/services/api'; 

jest.mock('@/services/api', () => ({
  get: jest.fn(),
}));

describe('HomeScreen component', () => {
  test('renders correctly with subthemes', async () => {

    const mockSubThemesData = [
      { id: 1, name: 'Subtema 1', projectCount: 10 },
    ];

    api.get.mockResolvedValue({ data: mockSubThemesData });

    const { findByText } = render(<HomeScreen />);

    await waitFor(() => {
      const subthemeName = findByText('Subtema 1');
      expect(subthemeName).toBeDefined();
    });
  });
});
