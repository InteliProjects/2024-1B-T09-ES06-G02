import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle } from 'react-native';

interface ButtonProps {
  variant?: 'default' | 'secondary' | 'continue';
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', label, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, variant === 'continue' && styles.continueButtonText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginHorizontal: 1,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: '#F5f5f5',
  },
  secondary: {
    backgroundColor: '#C5C0C0',
  },
  continue: {
    width: 206,
    height: 50,
    backgroundColor: '#3A8A88',
    borderRadius: 27,
  },
  buttonText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: 'normal',
  },
  continueButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 15,

  },
});

export default Button;
