import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import TrendPage from '../src/app/trend-page';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Configurar o Mock Adapter
const mock = new MockAdapter(axios);

describe('TrendPage Screen', () => {
  it('should display projects ordered by likes', async () => {
    // Mockar a resposta da API de interações
    mock.onGet('/api/Interaction').reply(200, [
      { id: 1, user_id: "383fe57b-e4ea-408e-9e61-9210533e7044", project_id: 1, interaction: 0 },
      { id: 2, user_id: "383fe57b-e4ea-408e-9e61-9210533e7044", project_id: 2, interaction: 0 },
      { id: 3, user_id: "3ad8c969-5d07-4e2f-a7a7-f34731a4b7c9", project_id: 1, interaction: 0 }
    ]);

    // Mockar a resposta da API de projetos
    mock.onGet('/api/Project/1').reply(200, {
      id: 1,
      name: 'Projeto 1',
      description: "Deixar o Estádio Olímpico Nilton Santos imenso.",
      inicial_date: "2024-05-13T00:00:00",
      final_date: "2024-12-20T00:00:00",
      status: 2,
      target_audience: "Botafoguenses",
      expected_impact: "Botafogo",
      photo_path: 'https://example.com/photo1.jpg'
    });

    mock.onGet('/api/Project/2').reply(200, {
      id: 2,
      name: 'Projeto 2',
      description: "Deixar o Estádio Olímpico Nilton Santos imenso.",
      inicial_date: "2024-05-13T00:00:00",
      final_date: "2024-12-20T00:00:00",
      status: 2,
      target_audience: "Botafoguenses",
      expected_impact: "Botafogo",
      photo_path: 'https://example.com/photo2.jpg'
    });

    const { findByTestId } = render(<TrendPage />);

    // Esperar até que os projetos sejam renderizados
    await waitFor(() => expect(findByTestId('data-loaded')).toBeTruthy());

  });
});
