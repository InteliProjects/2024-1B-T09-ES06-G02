import React from 'react';
import '@testing-library/jest-native/extend-expect';
import { render, fireEvent } from '@testing-library/react-native';
import InterestQuestionnaire from '../../src/app/interestQuestionnaire';

describe('InterestQuestionnaire', () => {

  test('deve renderizar corretamente', () => {
    const { getByText } = render(<InterestQuestionnaire />);
    expect(getByText('Interesses')).toBeTruthy();
    expect(getByText('Escolha três ou mais interesses que você gostaria de ver no feed principal')).toBeTruthy();
  });

  });
  

  test('deve permitir continuar quando um ou mais subtemas estiverem selecionados', async () => {
    const { getByText, findByText } = render(<InterestQuestionnaire />);
    
    const subthemeButton = await findByText('Educação');
    
    fireEvent.press(subthemeButton);
    
    const continueButton = getByText('Continuar');
    expect(continueButton).not.toBeDisabled(); 
  });

