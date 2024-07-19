// CustomTextInput.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ label, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      style={styles.input}
      theme={{
        roundness: 50,
        colors: {
          background: 'white',
          primary: '#3A8A88',
          outline: '#EFEDED',
        },
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    marginLeft: 7,
    fontSize: 16,
    color: '#000',
  },
  input: {
    backgroundColor: '#EFEDED',
  },
});

export default CustomTextInput;
