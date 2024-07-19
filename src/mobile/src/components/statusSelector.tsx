import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

interface StatusSelectorProps {
  status: string;
  setStatus: (status: string) => void;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({ status, setStatus }) => (
  <View>
    {[ 'Em andamento', 'Finalizado'].map((option) => (
      <View key={option} style={styles.option}>
        <RadioButton
          value={option}
          status={status === option ? 'checked' : 'unchecked'}
          onPress={() => setStatus(option)}
          color="#3A8A88"
        />
        <Text>{option}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    flex: 1, // Adiciona flexibilidade para o texto
  },
});

export default StatusSelector;
