import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import api from '@/services/api';
import axios from 'axios';

interface Project {
  id: number;
  name: string;
  description: string;
  inicial_date: string;
  final_date: string;
  status: number;
  target_audience: string;
  expected_impact: string;
}

const ProjectsScreen: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get<Project[]>('/api/Project');
        setProjects(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('Erro desconhecido');
        }
      }
    };

    fetchProjects();
  }, []);

  const renderItem = ({ item }: { item: Project }) => (
    <View style={styles.projectContainer}>
      <Text style={styles.projectName}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>Data Inicial: {new Date(item.inicial_date).toLocaleDateString()}</Text>
      <Text>Data Final: {new Date(item.final_date).toLocaleDateString()}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Público Alvo: {item.target_audience}</Text>
      <Text>Impacto Esperado: {item.expected_impact}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>Erro: {error}</Text>
      ) : (
        <FlatList
          data={projects}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  projectContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ProjectsScreen;