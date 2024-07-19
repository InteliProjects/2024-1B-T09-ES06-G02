import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Dot from './dot';

const Legend = () => (
  <View style={styles.legendContainer}>
    <View style={styles.legendItem}>
      <Dot color="#FFE6AF" />
      <Text style={styles.legendText}>Finalizados</Text>
    </View>
    <View style={styles.legendItem}>
      <Dot color="#3A8A88" />
      <Text style={styles.legendText}>Em andamento</Text>
    </View>

  </View>
);

const styles = StyleSheet.create({
  legendContainer: {
    marginLeft: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#000',
  },
});

export default Legend;
