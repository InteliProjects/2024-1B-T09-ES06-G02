import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import HomeScreen from '../../app/home'; 


test('deve exibir carregando inicialmente', async () => {
  render(<HomeScreen />);
  
  // Verifique se a mensagem "Loading..." é exibida inicialmente
  expect(screen.getByTestId('loading')).toBeTruthy();
});

test('deve carregar e exibir subThemes corretamente', async () => {
  render(<HomeScreen />);
  
  // Aguarde a tela carregar
  await waitFor(() => {
    expect(screen.queryByTestId('loading')).toBeNull();
  });
  
  // Verifique se os subtemas são exibidos
  const subThemeElements = await waitFor(() => screen.getAllByTestId(/^subtheme-/));
  expect(subThemeElements.length).toBeGreaterThan(0);
});

test('deve exibir mensagem de erro ao falhar na busca de subThemes', async () => {
  // Simular falha na chamada da API ao desligar o servidor ou retornar um status de erro
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('Failed to fetch subthemes'))
  );

  render(<HomeScreen />);
  
  // Aguarde a tela carregar
  await waitFor(() => {
    expect(screen.queryByTestId('loading')).toBeNull();
  });
  
  // Verifique se a mensagem de erro é exibida
  await waitFor(() => {
    expect(screen.getByTestId('error')).toBeTruthy();
  });
});
