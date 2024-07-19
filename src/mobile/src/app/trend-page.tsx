import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import NavBarFDC from '../components/NavBarFDC'; 
import CardList from '../components/CardList';
import api from "@/services/api"; 

const TrendPage = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    setSearchText('');
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const interactionResponse = await api.get('/api/Interaction');
        const interactions = interactionResponse.data;

        // Calcular as curtidas por projeto
        const likesCount = interactions.reduce((acc, interaction) => {
          if (interaction.interaction === 0) {
            acc[interaction.project_id] = (acc[interaction.project_id] || 0) + 1;
          }
          return acc;
        }, {});

        // Ordenar os projetos por curtidas (mais curtidos primeiro)
        const sortedProjectsIds = Object.keys(likesCount)
          .sort((a, b) => likesCount[b] - likesCount[a])
          .slice(0, 32); // Pegando os 32 mais curtidos

        // Buscar dados dos projetos mais curtidos
        const projectRequests = sortedProjectsIds.map(id => api.get(`/api/Project/${id}`));
        const projectResponses = await Promise.all(projectRequests);
        const sortedProjects = projectResponses.map(response => response.data);

        console.log(sortedProjects);
        setProjects(sortedProjects);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3A8A88" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} data-testid={dataLoaded ? 'data-loaded' : undefined}>
      <NavBar toggleSearch={toggleSearch} name={'Em alta'} />
      {searchVisible && <SearchBar searchText={searchText} setSearchText={setSearchText} />}
      <CardList data={projects} />
      <NavBarFDC /> 
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrendPage;
