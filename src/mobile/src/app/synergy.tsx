import React from 'react';
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import PieChartSynergy from '@/components/pieChartSynergy';
import SearchSynergy from '@/components/SearchSynergy';
import CardRow from '@/components/CardRow';

const pieData = [
  { value: 40, color: '#005957' },
  { value: 35, color: '#FFE6AF' },
  { value: 35, color: '#3A8A88' },
];

const Synergy = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/arrow-left.png')} style={styles.backArrow} />
      </View>
      <View style={styles.chartContainer}>
        <PieChartSynergy data={pieData} />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Sinergias</Text>
        <Image source={require('@/assets/images/line.png')} style={styles.sectionLine} />
      </View>
      <SearchSynergy />
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.cardsContainer}>
          {Array(2).fill(0).map((_, rowIndex) => (
            <CardRow key={rowIndex} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 80,
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backArrow: {
    height: 25,
    width: 29,
    marginLeft: 16,
    marginTop: 24,
  },
  chartContainer: {
    width: '100%',
    height: 230,
    alignItems: 'center',
  },
  sectionContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 24,
    marginLeft: 20,
  },
  sectionLine: {
    width: '90%',
    height: 1,
    alignSelf: 'center',
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 250,
  },
});

export default Synergy;
