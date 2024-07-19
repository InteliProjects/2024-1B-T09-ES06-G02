import { Divider, Appbar } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Button from '@/components/Button2'; 
import { NavigationProp } from '@react-navigation/native';
import api from '@/services/api';


interface SubTheme {
  id: number;
  name: string;
  description: string | null;
  theme_id: number;
  created_at: string;
}

interface RegisterProjectStep2Props {
  navigation: NavigationProp<any, any>;
}

const RegisterProjectStep2: React.FC<RegisterProjectStep2Props> = ({ navigation }) => {
  const [selectedSubtheme, setSelectedSubtheme] = useState<number | null>(null);
  const [subthemes, setSubthemes] = useState<SubTheme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubthemes = async () => {
      try {
        const response = await api.get('/api/Subthemes');
        console.log('API response:', response.data);

        if (response.data) {
          setSubthemes(response.data);
          setLoading(false);
        } else {
          throw new Error('No subthemes data found');
        }
      } catch (error) {
        console.error('Error fetching subthemes:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSubthemes();
  }, []);

  const handleSubthemeButtonClick = (subtheme: number) => {
    if (selectedSubtheme === subtheme) {
      setSelectedSubtheme(null); // Deselect if already selected
    } else {
      setSelectedSubtheme(subtheme); // Select the new subtheme
    }
  };

  const handleContinue = async () => {
    if (!selectedSubtheme) {
      Alert.alert('Please select a subtheme');
      return;
    }

  const projectId = 1; 

  try {
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaV0gzZFR4cUc2Znp2QlpmZzVrUCJ9.eyJpc3MiOiJodHRwczovL2Rldi1kb21jb25uZWN0LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJuT3ZCbWxvUHVQUXFzQXFyWGMycVdFNkFyUjl1NFhjUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtZG9tY29ubmVjdC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcxODE5ODc5MiwiZXhwIjoxNzE4Mjg1MTkyLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJuT3ZCbWxvUHVQUXFzQXFyWGMycVdFNkFyUjl1NFhjUCJ9.TDZ4jGo3DzqVM7JQIXms6KZvKzK9geSbA-L9PJgMpGHNCJjft15w7EHu-xdkoTjbh7ANnTNDspG4MELjhUwMBxgxg8LYqOjBE9JwV2_-WcOaIo_MExZ9fYJ9coMXz5iwwHRrxS-Fw8bI3o07YWSvarXiUBYFjMztJmz3p9YmeYaAd0IJtlm03rHrAAVQk2XpD35K034JEgnQALAmXJee8PEC2a0C8Ke_FFO14DIlI4TTyJws8_xNq_Utx4_KJmT5F_9AGM_-UVqYlP0glReCnHJ994DLtgAGk_Se_CQL88TsTFhQfG9uqDwJLysx7Pwkmun2NzuWTNENBrOJHUWOew';
    const response = await fetch('http://localhost:8000/api/ProjectSubthemes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        sub_theme_id: selectedSubtheme,
        project_id: projectId
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to post subtheme: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Success:', data);
    // Navegar para a próxima etapa ou exibir uma mensagem de sucesso
  } catch (error) {
    console.error('Error posting subtheme:', error);
    Alert.alert('Error', 'Failed to post subtheme');
  }
};


  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.navigate('registerProject')} />
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Novo projeto</Text>
        <Divider style={styles.separator} />

        <Text style={styles.instruction}>
          Escolha o tema que está relacionado ao projeto:
        </Text>
        <View style={styles.subthemesContainer}>
          {subthemes.map((subtheme) => (
            <View key={subtheme.id} style={styles.subtheme}>
              <Button
                variant={selectedSubtheme === subtheme.id ? 'secondary' : 'default'}
                label={subtheme.name}
                onPress={() => handleSubthemeButtonClick(subtheme.id)}
              />
            </View>
          ))}
        </View>

        <View style={styles.continueButtonContainer}>
          <Button
            variant='continue'
            label="Continuar"
            onPress={handleContinue}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    alignItems: 'center',
    marginLeft: 87,
    marginVertical: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    backgroundColor: '#ddd',
  },
  instruction: {
    textAlign: 'center',
    fontSize: 15,
    color: '#7F7F7F',
    marginVertical: 20,
  },
  scrollView: {
    maxHeight: 420,
    width: '100%',
  },
  subthemesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  subtheme: {
    marginVertical: 8,
    paddingHorizontal: 1,
  },
  continueButtonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
});

export default RegisterProjectStep2;
