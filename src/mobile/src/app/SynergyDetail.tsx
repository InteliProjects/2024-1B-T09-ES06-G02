import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import NavBarFDC from '@/components/NavBarFDC';
import LoadingIndicator from '@/components/LoadingIndicator'; // Importando o LoadingIndicator

export default function SynergyDetail() {
  const [loading, setLoading] = useState(false); // Adicione o estado de loading

  const projects = [
    {
      id: 1,
      name: "Projeto Verde Sustentável",
      description: "Iniciativa para promover a sustentabilidade urbana através do plantio de árvores e criação de áreas verdes em centros urbanos.",
      imageUri: "https://picsum.photos/500/400",
    },
    {
      id: 2,
      name: "Diversidade na Tecnologia",
      description: "Programa que visa aumentar a diversidade no setor de tecnologia, oferecendo treinamentos e oportunidades para grupos sub-representados.",
      imageUri: "https://picsum.photos/400/300",
    },
  ];

  const synergys = ["Aprendizagem", "Integração"];
  const impacts = ["+1.000"];

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{ flex: 1, padding: 5 }}>
      <ScrollView style={{ marginBottom: 2 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 25, marginTop: 25, marginBottom: 20, paddingLeft: 6 }}>
          <AntDesign name="arrowleft" size={24} color="black" style={{ paddingLeft: 2 }} />
          <Text style={{ fontSize: 24, fontWeight: 'bold', paddingRight: 90 }}>Detalhes da Sinergia</Text>
        </View>
        <ScrollView horizontal={true}>
          {projects.map(project => (
            <View key={project.id} style={{ backgroundColor: '#EFEDED', borderRadius: 10, padding: 16, marginBottom: 16, width: 280, marginRight: 15, marginLeft: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>{project.name}</Text>
                <Image source={{ uri: project.imageUri }} style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 8 }} />
                <Text style={{ fontSize: 16, color: '#333' }}>{project.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={{ marginLeft: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>Tipo de Sinergia</Text>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 8 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20, gap: 15 }}>
            {synergys.map(synergy => (
              <Text key={synergy} style={{ backgroundColor: 'rgba(58, 138, 136, 0.6)', borderRadius: 9999, padding: 12, width: 130, color: 'white', textAlign: 'center' }}>
                {synergy}
              </Text>
            ))}
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Período</Text>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 10 }} />
          <Text style={{ color: '#777', fontSize: 15, marginTop: 8, marginBottom: 16 }}>
            Desde 15/05/2024
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pessoas Impactadas</Text>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 10 }} />
          {impacts.map(impact => (
            <Text key={impact} style={{ backgroundColor: 'rgba(58, 138, 136, 0.6)', borderRadius: 9999, padding: 12, width: 130, color: 'white', textAlign: 'center' }}>
              {impact}
            </Text>
          ))}
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <NavBarFDC />
      </View>
    </View>
  );
}
