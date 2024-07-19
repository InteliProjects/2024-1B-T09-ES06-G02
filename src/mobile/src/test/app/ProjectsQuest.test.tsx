import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import ProjectsQuest from '../app/ProjectsQuest';



  it('renders the component correctly', async () => {
    const { getByText} = render(<ProjectsQuest />);

    // Verifica se o título "Projetos" é renderizado
    await waitFor(() => {
      expect(getByText('Projetos')).toBeTruthy();
    });

    // Verifica se o subtítulo é renderizado
    expect(getByText('Clique nos projetos com maior similaridade no seu perfil com base em seus interesses específicos')).toBeTruthy();
  });

  describe('ProjectsQuest Component', () => {
    it('fetches and displays projects from the API', async () => {
      const { getByText, findByText } = render(<ProjectsQuest />);
  
      // Aguarde a API retornar os dados e os projetos serem exibidos
      await waitFor(() => {
        expect(getByText('Projetos')).toBeTruthy();
      });
  
      // Verifica se pelo menos um projeto foi exibido
      const projectName = 'Projetinho'; // Altere para um nome de projeto real retornado pela API
      await waitFor(() => {
        expect(findByText(projectName)).toBeTruthy();
      });
    });
  });