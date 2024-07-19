import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';

export default function ProjectsQuest() {

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

  const [clickedStates, setClickedStates] = useState(Array(10).fill(false));
  const [selectAllClicked, setSelectAllClicked] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaV0gzZFR4cUc2Znp2QlpmZzVrUCJ9.eyJpc3MiOiJodHRwczovL2Rldi1kb21jb25uZWN0LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJuT3ZCbWxvUHVQUXFzQXFyWGMycVdFNkFyUjl1NFhjUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtZG9tY29ubmVjdC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcxNzg1OTMwOSwiZXhwIjoxNzE3OTQ1NzA5LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJuT3ZCbWxvUHVQUXFzQXFyWGMycVdFNkFyUjl1NFhjUCJ9.ga5e8jeFyO3PQC0OJvdjABHHJNEzYPZOIe6W-9deRuS-GybGQn3JGWi_VRAB-Nvh56O-m9aQmFxfKSuXVIpdfV5DlEwrZ7ZE20VSicY5ASi-4P9wNT9_rRIrFsElpnyfg-I1gNrHaB8V7EH_Xi3UF_GyX0D6F3TQolQ5Vcc2howVQKEIPV0_NBt30s4taAIN0hOdiaxdD422AKCSo-STIdIhm_nnNMvmmUR-pvEHKa8ifaE6FgPVbjyszrnykt-t6OVQNSgxBbor0jpfvqXyr8Cs5RneslZe3cibRHgHaBhRGQ22wC0qtRneIDjHdSNHD0Ghs12T2Yo0EO9MtAeCFQ";
  const userId = 10
  const photo_path = "https://picsum.photos/400/400 "

  const handlePress = async (index: number) => {
    const newClickedStates = [...clickedStates];
    newClickedStates[index] = !newClickedStates[index];
    setClickedStates(newClickedStates);
    setSelectAllClicked(false);
  };

  const handleSelectAll = () => {
    const newState = selectAllClicked ? Array(10).fill(false) : Array(10).fill(true);
    setClickedStates(newState);
    setSelectAllClicked(!selectAllClicked);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/Project', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Erro desconhecido');
        }
      }
    };

    fetchProjects();
  }, [token]);


  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../../mobile/assets/images/logo.png')} />
      <View style={styles.header}>
        <Octicons name="project" size={24} color="black" />
        <Text style={styles.headerText}>Projetos</Text>
        <TouchableOpacity onPress={handleSelectAll}>
          <Text style={styles.selectAllText}>Selecionar Tudo</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>
        Clique nos projetos com maior similaridade no seu perfil com base em seus interesses específicos
      </Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.projectsContainer}>
          {projects.map((project, index) => (
            <TouchableOpacity key={project.id} onPress={() => handlePress(index)}>
              <View style={{
                ...styles.card,
                ...(clickedStates[index] && styles.clickedCard)
              }}>
                <Image source={{ uri: photo_path }} style={styles.image} />
                <View style={styles.projectDetails}>
                <Text style={{
                    ...styles.projectName,
                    ...(clickedStates[index] && styles.clickedText)
                  }}>{project.name}</Text>
                  <Text style={{
                    ...styles.description,
                    ...(clickedStates[index] && styles.clickedText)
                  }}>{project.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* <View style={styles.continueButtonContainer}>
        <Button label="Continuar" labelClasses="text-white text-lg" />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 45,
  },
  logo: {
    width: 64,
    height: 64,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    paddingVertical: 2,
    gap: 6,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555555',
  },
  subtitle: {
    textAlign: 'center',
    color: '#757575',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 14,
  },
  scrollView: {
    width: '100%', // Corrigido para cobrir a largura total
    height: 450,
  },
  projectsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 4,
    marginVertical: 4,
  },
  card: {
    backgroundColor: '#EFEDED',
    borderRadius: 20,
    shadowColor: '#000',
    width: 300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  projectDetails: {
    marginLeft: 10,
    flex: 1,
  },
  clickedCard: {
    backgroundColor: '#3A8A88',
  },
  clickedText: {
    color: 'white',
  },
  continueButtonContainer: {
    marginTop: 26,
    backgroundColor: '#3A8A88',
    paddingVertical: 16,
    paddingHorizontal: 64,
    borderRadius: 50,
  },
});

