import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProjectsQuest from '../../app/Projects';
import '@testing-library/jest-native/extend-expect';

describe('ProjectsQuest component', () => {
  test('renders correctly with projects', async () => {
    const { findByText } = render(<ProjectsQuest user_id={"1"} project_id={1} />);
    await waitFor(() => {
      const project1 = findByText('Melhore a comunicação interna em uma organização, promovendo o fluxo de informações, o engajamento dos colaboradores e a construção de uma cultura organizacional positiva.');
      expect(project1).toBeDefined();
    });
  });
});
