import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import Legend from './legend';
import api from '@/services/api';


interface PieChartSectionProps {
  data: Array<{
    value: number;
    color: string;
    legendLabel?: string;
    legendFontColor?: string;
    legendFontSize?: number;
  }>;
}

const PieChartSection: React.FC<PieChartSectionProps> = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [statusCounts, setStatusCounts] = useState({ status1: 0, status2: 0 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/api/Project');
        console.log("API response:", response.data);
        if (response.data) {
          setProjectCount(response.data.length);
          const status1Count = response.data.filter((project: { status: number }) => project.status === 1).length;
          const status2Count = response.data.filter((project: { status: number }) => project.status === 2).length;
          setStatusCounts({ status1: status1Count, status2: status2Count });
        } else {
          console.log("No project data found");
        }
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const pieData = [
    { value: statusCounts.status1, color: '#FFE6AF' },
    { value: statusCounts.status2, color: '#3A8A88' }
  ];

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chartInnerContainer}>
        <PieChart
          data={pieData}
          donut
          sectionAutoFocus
          radius={60}
          innerRadius={50}
          innerCircleColor={'#f5f5f5'}
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <Text style={styles.centerLabelText}>Total</Text>
              <Text style={styles.centerLabelValue}>{projectCount}</Text>
            </View>
          )}
        />
        <Legend />
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

export default PieChartSection;
