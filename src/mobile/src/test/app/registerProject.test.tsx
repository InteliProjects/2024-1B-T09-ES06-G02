import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterProject from '../../app/registerProject';

// Configuração do jest-fetch-mock
import fetchMock from 'jest-fetch-mock';

describe('RegisterProject Integration Tests', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('envia dados para a API ao submeter o formulário', async () => {
    // Renderiza o componente
    const { getByLabelText, getByText } = render(<RegisterProject />);

    // Simulação de dados inseridos no formulário
    const projectData = {
      name: 'Projeto de Teste',
      targetAudience: 'Testadores',
      expectedImpact: 'Impacto de teste',
      description: 'Descrição do projeto de teste',
    };

    // Preenche os campos do formulário
    fireEvent.changeText(getByLabelText('Nome'), projectData.name);
    fireEvent.changeText(getByLabelText('Público Alvo'), projectData.targetAudience);
    fireEvent.changeText(getByLabelText('Impacto esperado'), projectData.expectedImpact);
    fireEvent.changeText(getByLabelText('Descrição'), projectData.description);

    // Simula a resposta da API ao enviar os dados
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }), { status: 200 });

    // Submete o formulário
    fireEvent.press(getByText('arrow-right'));

    // Espera pela resposta da API e verifica se os dados foram enviados corretamente
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith('http://localhost:8000/api/Project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectData.name,
          description: projectData.description,
          inicial_date: expect.any(String), 
          final_date: expect.any(String), 
          status: 1, 
          target_audience: projectData.targetAudience,
          expected_impact: projectData.expectedImpact,
          photo_path: "https://picsum.photos/400/400"
        }),
      });
    });

    // Verifica se a mensagem de sucesso foi exibida
    expect(getByText('Success')).toBeTruthy();
  });

  it('exibe erro ao falhar ao enviar dados para a API', async () => {
    // Renderiza o componente
    const { getByText } = render(<RegisterProject />);

    // Simula erro ao enviar os dados para a API
    fetchMock.mockRejectOnce(new Error('Falha ao conectar à API'));

    // Submete o formulário
    fireEvent.press(getByText('arrow-right'));

    // Espera pela exibição da mensagem de erro
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(getByText('Error')).toBeTruthy(); 
    });
  });
});

