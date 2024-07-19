import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Text } from 'react-native';
import { Appbar, Button, Card } from 'react-native-paper';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '@/services/api';
import NavBarCEO from "@/components/NavBarCEO";

const Favorites = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const userId = 'd39feb51-9762-4af3-9518-5a036db268b7'; // Substitua pelo ID real do usuário

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(`/api/Interaction/${userId}`);
        console.log('API response:', response.data);

        const likedProjects = response.data.filter(interaction => interaction.interaction === 0);

        const detailedProjects = await Promise.all(
          likedProjects.map(async (project) => {
            const projectResponse = await api.get(`/api/Project/${project.project_id}`);
            if (projectResponse.status !== 200) {
              throw new Error(`Failed to fetch project details: ${projectResponse.statusText}`);
            }

            const projectDetails = projectResponse.data;
            return {
              ...project,
              name: projectDetails.name,
              description: projectDetails.description,
              photo_path: projectDetails.photo_path,
            };
          })
        );

        setProjects(detailedProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching interactions:', error);
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
            <Fontisto name="favorite" size={24} color="black" />
            <Text style={styles.headerText}>Favoritos</Text>
          </View>
          <Text style={styles.description}>
            Aqui estão guardados os projetos que você curtiu!
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
                  <Button mode="contained" onPress={() => navigation.navigate('Projects')} style={styles.button}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  description: {
    fontSize: 12,
    padding: 15,
    textAlign: 'center',
    marginBottom: 8,
    color: '#888888',
  },
  card: {
    width: 300,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#3A8A88',
  },
});

export default Favorites;
