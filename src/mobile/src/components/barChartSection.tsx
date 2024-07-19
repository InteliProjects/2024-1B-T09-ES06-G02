import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import api from '@/services/api';

interface BarDataItem {
  value: number;
  label: string;
  color: string;
}

interface SubTheme {
  id: number;
  name: string;
  description: string | null;
  theme_id: number;
  created_at: string;
  projectCount: number;
}

const BarChartSection: React.FC = () => {
  const [subThemes, setSubThemes] = useState<SubTheme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubThemes = async () => {
      try {
        console.log('Fetching subthemes...');
        const response = await api.get('/api/Subthemes');
        console.log('API response:', response.data);

        if (response.data) {
          // Ensure projectCount is included in the data
          const formattedData = response.data.map((subtheme: any) => ({
            ...subtheme,
            projectCount: subtheme.projectCount || Math.floor(Math.random() * 30) + 1, // Dummy project count if not present
          }));

          setSubThemes(formattedData);
          setLoading(false);
        } else {
          console.log("No subtheme data found");
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching subthemes:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSubThemes();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  // Ordenar os dados pelo número de projetos em ordem decrescente
  const sortedData = subThemes.sort((a, b) => b.projectCount - a.projectCount);

  // Selecionar apenas os 6 primeiros itens
  const topSixData = sortedData.slice(0, 6);

  const formattedData: BarDataItem[] = topSixData.map(subtheme => ({
    value: subtheme.projectCount,
    label: subtheme.name,
    color: '#FFE6AF'
  }));

  return (
    <View style={styles.chartContainer}>
      <BarChart
        barWidth={20}
        noOfSections={6}
        barBorderRadius={12}
        data={formattedData}
        frontColor="#FFE6AF"
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{ color: 'black', fontSize: 10 }}
        renderTooltip={({ value }) => (
          <Text style={{ color: 'black' }}>{value}</Text>
        )}
        renderLabel={({ label, x, y, index }) => (
          <>
            <Text key={`label-${index}`} style={{ position: 'absolute', top: y + 10, left: x - 10, fontSize: 10, textAlign: 'center' }}>
              {label}
            </Text>
            <Text key={`value-${index}`} style={{ position: 'absolute', top: y - 20, left: x - 10, fontSize: 10, textAlign: 'center' }}>
              {formattedData[index].value}
            </Text>
          </>
        )}
      />
    </View>
  );
}

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
});

export default BarChartSection;
