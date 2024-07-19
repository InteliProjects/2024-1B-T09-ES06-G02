import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputField = ({ label, value, onChangeText }) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      {label}
    </Text>
    <TextInput 
      accessibilityLabel={label}
      style={styles.input} 
      value={value} 
      onChangeText={onChangeText} 
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: '400',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  input: {
    width: 360,
    height: 35,
    backgroundColor: '#e5e7eb', // Equivalent to bg-gray-200
    borderRadius: 50,
    paddingHorizontal: 8,
    alignSelf: 'center',
    marginTop: 15,
  },
});

export default InputField;
