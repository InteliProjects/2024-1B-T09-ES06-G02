import React from 'react';
import { View, StyleSheet } from 'react-native';

interface DotProps {
  color: string;
}

const Dot: React.FC<DotProps> = ({ color }) => (
  <View style={[styles.dot, { backgroundColor: color }]} />
);

const styles = StyleSheet.create({
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 8,
  },
});

export default Dot;
