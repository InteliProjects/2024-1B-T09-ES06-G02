import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Text } from 'react-native';
import { Appbar, Button, Card } from 'react-native-paper';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '@/services/api';
import NavBarCEO from "@/components/NavBarCEO";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const userId = 'd39feb51-9762-4af3-9518-5a036db268b7'; // Substitua pelo ID real do usuário

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(`/api/Project`);
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.navigate('home')} />
        </Appbar.Header>
        <View style={styles.container}>
          <View style={styles.header}>
            <Fontisto name="list" size={24} color="black" />
            <Text style={styles.headerText}>Projetos</Text>
          </View>
          <Text style={styles.description}>
            Explore os projetos disponíveis na plataforma!
          </Text>
          {loading ? (
            <Text>Carregando...</Text>
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            projects.map((project, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <Image source={{ uri: project.photo_path || 'https://via.placeholder.com/50' }} style={styles.image} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{project.name || `Projeto ${project.project_id}`}</Text>
                    <Text style={styles.cardDescription}>
                      {project.description || `Breve descrição do projeto ${project.project_id}.`}
                    </Text>
                  </View>
                </Card.Content>
                <Card.Actions>
                  <Button mode="contained" onPress={() => navigation.navigate('ProjectDetails', { projectId: project.project_id })} style={styles.button}>
                    Saiba mais
                  </Button>
                </Card.Actions>
              </Card>
            ))
          )}
        </View>
      </ScrollView>
      <NavBarCEO />
    </View>
  );
};

export default Projects;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
