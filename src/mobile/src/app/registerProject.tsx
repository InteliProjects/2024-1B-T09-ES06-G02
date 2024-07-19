import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/customTextInput';
import StatusSelector from '../components/statusSelector';
import { Octicons } from '@expo/vector-icons';
import api from '@/services/api';
import NavBarCEO from "@/components/NavBarCEO";

const RegisterProject = () => {
  const [name, setName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [expectedImpact, setExpectedImpact] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Em andamento');
  const [inicialDate, setInicialDate] = useState(new Date().toISOString());
  const [finalDate, setFinalDate] = useState(new Date().toISOString());

  const navigation = useNavigation();

  const handleSubmit = async () => {
    const statusValue = status === 'Em andamento' ? 1 : 2;

    const projectData = {
      name: name,
      description,
      inicial_date: inicialDate,
      final_date: finalDate,
      status: statusValue,
      target_audience: targetAudience,
      expected_impact: expectedImpact,
      photo_path: "https://picsum.photos/400/400"
    };

    try {
      const response = await api.post('/api/Project', projectData);
      if (response.status === 201) {
        Alert.alert('Success', 'Project created successfully!');
        navigation.navigate('registerProjectScreen2');
      } else {
        const errorData = response.data;
        Alert.alert('Error', `Failed to create project: ${errorData.message}`);
      }
    } catch (error) {
      Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Novo projeto</Text>
          <Divider style={styles.separator} />

          <CustomTextInput label="Nome" value={name} onChangeText={setName} />
          <CustomTextInput label="Público Alvo" value={targetAudience} onChangeText={setTargetAudience} />
          <CustomTextInput label="Impacto esperado" value={expectedImpact} onChangeText={setExpectedImpact} />
          <CustomTextInput label="Descrição" value={description} onChangeText={setDescription} />

          <Divider style={styles.separator} />
          <Text style={styles.title}>Status</Text>
          <View style={styles.statusContainer}>
            <StatusSelector status={status} setStatus={setStatus} />
            <TouchableOpacity onPress={handleSubmit}>
              <Octicons name="arrow-right" size={30} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <NavBarCEO />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginBottom: 20,
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  icon: {
    marginBottom: 6,
    marginRight: 10,
  },
});

export default RegisterProject;
