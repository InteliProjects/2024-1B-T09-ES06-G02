import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Register from '../src/app/register';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Configurar o Mock Adapter
const mock = new MockAdapter(axios);

describe('Register Screen', () => {
  it('should submit form and show success message', async () => {
    // Mockar a resposta da API
    mock.onPost('/api/user').reply(200, {
      message: 'Usuário cadastrado com sucesso!'
    });

    const { getByLabelText, getByText, getByTestId } = render(<Register />);

    // Preencher os campos do formulário
    fireEvent.changeText(getByLabelText('Nome'), 'João Silva');
    fireEvent.changeText(getByLabelText('Cargo'), 'Desenvolvedor');
    fireEvent.changeText(getByLabelText('Empresa'), 'Tech Company');
    fireEvent.changeText(getByLabelText('CPF'), '12345678900');

    // Simular o clique no botão de cadastro
    fireEvent.press(getByText('Cadastrar'));

    // Esperar pela mensagem de sucesso
    await waitFor(() => {
      expect(getByTestId('successMessage')).toBeTruthy();
    });
  });
});
