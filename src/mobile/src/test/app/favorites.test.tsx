import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import Favorites from '../../app/favorites';

describe('Favorites Component', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });


test('renders loading state initially', () => {
  let component: any;
  
  act(() => {
    component = TestRenderer.create(<Favorites />);
  });

  const instance = component.root;
  const loadingText = instance.findByProps({ children: 'Carregando...' });
  expect(loadingText).toBeTruthy();
});

test('renders projects after fetching data', async () => {
  let component: any;

  await act(async () => {
    component = TestRenderer.create(<Favorites />);
  });

  const instance = component.root;

  // Verifique se os projetos foram carregados (substitua pelos dados reais esperados)
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera pela simulação da resposta da API
  });

  const headerText = instance.findByProps({ children: 'Favoritos' });
  expect(headerText).toBeTruthy();

  const project1 = instance.findByProps({ children: /Projeto 1/i });
  const description1 = instance.findByProps({ children: /Descrição 1/i });
  const project2 = instance.findByProps({ children: /Projeto 2/i });
  const description2 = instance.findByProps({ children: /Descrição 2/i });

  expect(project1).toBeTruthy();
  expect(description1).toBeTruthy();
  expect(project2).toBeTruthy();
  expect(description2).toBeTruthy();
});

test('renders error message on fetch failure', async () => {
  // Forçando uma falha na API, você deve modificar a implementação do componente para permitir isso
  global.fetch = jest.fn(() => Promise.reject('API is down'));

  let component: any;

  await act(async () => {
    component = TestRenderer.create(<Favorites />);
  });

  const instance = component.root;

  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera pela simulação da resposta da API
  });

  const errorMessage = instance.findByProps({ children: /Erro ao buscar interações/i });
  expect(errorMessage).toBeTruthy();
});

});