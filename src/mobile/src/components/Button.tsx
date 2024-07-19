import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from 'react-native';


interface ButtonProps {
  label: string;
  labelClasses?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg';
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  labelClasses,
  variant = 'default',
  size = 'default',
  onPress,
}) => {
  // Determinar estilos com base nas props
  const buttonStyles: ViewStyle = [
    styles.button,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'destructive' && styles.destructiveButton,
    variant === 'ghost' && styles.ghostButton,
    variant === 'link' && styles.linkButton,
    size === 'sm' && styles.smallButton,
    size === 'lg' && styles.largeButton,
  ].reduce<ViewStyle>((acc, curr) => {
    return { ...acc, ...curr }; // Combina todos os estilos válidos em um único objeto
  }, {});
  
  const labelStyles: TextStyle = [
    styles.label,
    variant === 'secondary' && styles.secondaryLabel,
    variant === 'destructive' && styles.destructiveLabel,
    variant === 'ghost' && styles.ghostLabel,
    variant === 'link' && styles.linkLabel,
    size === 'sm' && styles.smallLabel,
    size === 'lg' && styles.largeLabel,
    labelClasses && labelClasses.split(' '),
  ].reduce<TextStyle>((acc, curr) => {
    return { ...acc, ...curr }; // Combina todos os estilos válidos em um único objeto
  }, {});

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={labelStyles}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  destructiveButton: {
    backgroundColor: '#dc3545',
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  linkButton: {
    backgroundColor: 'transparent',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 16,
    color: '#fff',
  },
  secondaryLabel: {
    color: '#000',
  },
  destructiveLabel: {
    color: '#fff',
  },
  ghostLabel: {
    color: '#007BFF',
  },
  linkLabel: {
    color: '#007BFF',
  },
  smallLabel: {
    fontSize: 16,
  },
  largeLabel: {
    fontSize: 18,
  },
});

export default Button;
