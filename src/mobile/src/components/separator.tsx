import React from 'react';
import { View, StyleSheet } from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    width: '100%',
    marginBottom: 16,
  },
});

export default Separator;
