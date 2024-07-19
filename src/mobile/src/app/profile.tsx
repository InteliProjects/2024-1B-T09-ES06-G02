import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import NavBarCEO from "@/components/NavBarCEO";
import * as ImagePicker from 'expo-image-picker';
import api from '@/services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/User/active'); // Ajuste para buscar o usuário logado
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    if (isFocused) {
      fetchUser();
    }
  }, [isFocused]);

  const handleImagePicker = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "É necessária a permissão para acessar suas fotos.");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    if (user) {
      const formData = new FormData();
      formData.append('profile_image', {
        uri: pickerResult.uri,
        name: 'profile.jpg',
        type: 'image/jpeg'
      });

      try {
        const response = await api.put(`/api/User/${user.id}/profile-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setUser({ ...user, profile_image_path: response.data.profile_image_path });
      } catch (error) {
        console.error('Erro ao atualizar imagem de perfil:', error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {user && (
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={handleImagePicker}>
              <Image
                source={{ uri: user.profile_image_path || 'https://via.placeholder.com/150' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyProjects')}>
          <Text style={styles.buttonText}>Meus Projetos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('registerProject')}>
          <Text style={styles.buttonText}>Cadastrar projeto</Text>
        </TouchableOpacity>
      </ScrollView>
      <NavBarCEO />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#888',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#3A8A88',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Profile;
