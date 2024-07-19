import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import SectionTitle from '../components/sectionTitle';
import Separator from '../components/separator';
import PieChartSection from '../components/pieChartSection';
import BarChartSection from '../components/barChartSection';
import PieChartSynergy from '@/components/pieChartSynergy';
import api from '@/services/api';
import NavBarFDC from '../components/NavBarFDC';
import LoadingIndicator from '../components/LoadingIndicator'; // Importando o LoadingIndicator

interface SubTheme {
  id: number;
  name: string;
  description: string | null;
  theme_id: number;
  created_at: string;
  projectCount: number;
}

const HomeScreen = () => {
  const [subThemes, setSubThemes] = useState<SubTheme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubThemes = async () => {
      try {
        const response = await api.get('/api/Subthemes');

        if (response.data) {
          const formattedData = response.data.map((subtheme: any) => ({
            ...subtheme,
            projectCount: subtheme.projectCount || Math.floor(Math.random() * 30) + 1,
          }));

          formattedData.sort((a, b) => b.projectCount - a.projectCount);
          const topSubThemes = formattedData.slice(0, 10);

          setSubThemes(topSubThemes);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSubThemes();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const pieData = [
    { value: 47, color: '#FFE6AF' },
    { value: 40, color: '#3A8A88' },
  ];

  const barData = subThemes.map(subtheme => ({
    projectCount: subtheme.projectCount,
    subthemeName: subtheme.name,
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <SectionTitle title="Situação dos projetos" />
        <Separator />
        <PieChartSection data={pieData} />
        <SectionTitle title="Projetos por macrotema" />
        <Separator />
        <BarChartSection data={barData} />
        <SectionTitle title="Tipos de sinergia" />
        <Separator />
        <PieChartSynergy />
        <View style={{ paddingBottom: 20 }} />
      </View>
      <NavBarFDC />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default HomeScreen;
