import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProfileScreen from '../src/app/profile';

describe('ProfileScreen', () => {

  it('should display user information correctly', async () => {

    const { getByTestId } = render(<ProfileScreen />);

    // Esperar até que os dados do usuário sejam renderizados
    await waitFor(() => expect(getByTestId('user-name').props.children).toBe('Lea Mourão'));
    expect(getByTestId('user-enterprise').props.children).toBe('Maersk');

    // Verificar se o número de projetos e likes está correto
    await waitFor(() => expect(getByTestId('user-projects-count').props.children).toBe(0));
    await waitFor(() => expect(getByTestId('user-likes-count').props.children).toBe(1));
  });
});
