import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Dot from './dot';

const LegendSynergy = () => (
  <View style={styles.legendContainer}>
    <View style={styles.legendItem}>
      <Dot color="#005957" />
      <Text style={styles.legendText}>Aprender</Text>
    </View>
    <View style={styles.legendItem}>
      <Dot color="#FFE6AF" />
      <Text style={styles.legendText}>Integrar</Text>
    </View>
    <View style={styles.legendItem}>
      <Dot color="#3A8A88" />
      <Text style={styles.legendText}>Unificar</Text>
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

export default LegendSynergy;
