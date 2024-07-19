import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonFormProps {
  style?: object;
  backgroundColor: string;
  textColor?: string;
  onPress: () => void;
  children: React.ReactNode; 
}

const ButtonForm: React.FC<ButtonFormProps> = ({ style, backgroundColor, textColor, onPress, children }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }, style]} onPress={onPress}>
      <Text style={[styles.text, { color: textColor || 'white' }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export default ButtonForm;
