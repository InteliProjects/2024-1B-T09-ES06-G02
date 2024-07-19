import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBarFDC from "../components/NavBarFDC";
import LoadingIndicator from '../components/LoadingIndicator'; // Importando o LoadingIndicator

const ProfileScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome6 name="bars" size={24} color="#ffffff" style={styles.icon} />
        <Text style={styles.title}>Perfil</Text>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profileImage} />
        <Text style={styles.userName}>Bianca</Text>
        <Text style={styles.userCompany}>Santander</Text>
      </View>
      
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Projetos</Text>
          <Text style={styles.statCount}>455</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Temas</Text>
          <Text style={styles.statCount}>12</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>CEOs</Text>
          <Text style={styles.statCount}>82</Text>
        </View>
      </View>

      <View style={styles.options}>
        <View style={styles.optionRow}>
          <Text style={styles.optionItem}>Macro-temas</Text>
          <FontAwesome6 name="arrow-right" size={20} color="black" />
        </View>
        <View style={styles.separator} />

        <View style={styles.optionRow}>
          <Text style={styles.optionItem}>Projetos em alta</Text>
          <FontAwesome6 name="arrow-right" size={20} color="black" />
        </View>
        <View style={styles.separator} />

        <View style={styles.optionRow}>
          <Text style={styles.optionItem}>Editar conta</Text>
          <FontAwesome6 name="arrow-right" size={20} color="black" />
        </View>
        <View style={styles.separator} />

        <View style={styles.optionRow}>
          <Text style={styles.optionItem}>Configurações</Text>
          <FontAwesome6 name="arrow-right" size={20} color="black" />
        </View>
        <View style={styles.separator} />
      </View>
      <NavBarFDC />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#3A8A88',
    height: 269,
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 5,
  },
  userName: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 5,
  },
  userCompany: {
    fontSize: 16,
    color: '#fff',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  statCount: {
    fontSize: 15,
    color: '#555',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  options: {
    paddingHorizontal: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    marginRight: 10,
  },
  optionItem: {
    fontSize: 15,
  },
});

export default ProfileScreen;
