import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface InputWithIconProps extends TextInputProps {
  label: string;
  icon: any;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ label, icon, ...textInputProps }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name={icon} size={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          {...textInputProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
});

export default InputWithIcon;
