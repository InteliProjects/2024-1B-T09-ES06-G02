import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import LegendSynergy from './legendSynergy';
import api from '@/services/api';

const PieChartSynergy = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        console.log('Fetching interactions...');
        const response = await api.get('/api/Interaction');
        console.log('API response:', response.data);

        if (response.data) {
          // Validate and process data
          const interactionCounts = response.data.reduce((acc, interaction) => {
            if (typeof interaction.interaction !== 'number') {
              console.warn(`Unexpected interaction type: ${interaction.interaction}`);
              return acc;
            }

            acc[interaction.interaction] = (acc[interaction.interaction] || 0) + 1;
            return acc;
          }, {});

          console.log('Interaction counts:', interactionCounts);

          const pieChartData = [
            { value: interactionCounts[1] || 0, color: '#005957', text: `${interactionCounts[1] || 0}`, textColor: '#000000', label: 'Aprender' },
            { value: interactionCounts[2] || 0, color: '#FFE6AF', text: `${interactionCounts[2] || 0}`, textColor: '#000000', label: 'Integrar' },
            { value: interactionCounts[3] || 0, color: '#3A8A88', text: `${interactionCounts[3] || 0}`, textColor: '#000000', label: 'Unificar' },
          ];

          setData(pieChartData);
          setLoading(false);
        } else {
          console.log("No interaction data found");
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching interactions:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchInteractions();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chartInnerContainer}>
        <PieChart
          data={data}
          donut
          sectionAutoFocus
          radius={100}
          showText
          showTextBackground
          textBackgroundRadius={20}
          innerRadius={50}
          innerCircleColor={'white'}
        />
        <LegendSynergy />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  chartInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabelText: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  centerLabelValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default PieChartSynergy;
