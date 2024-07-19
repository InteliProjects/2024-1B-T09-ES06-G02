import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Certifique-se de que você tem essa dependência instalada

const SearchSynergy = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const options = ['Unificar', 'Integrar', 'Aprender'];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder="Pesquisar" />
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterButton}>
          <Icon name="filter-list" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Listar sinergias por tema</Text>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  // Ação ao selecionar a opção
                  console.log(item);
                  setModalVisible(false);
                }} style={styles.optionButton}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#e5e7eb', // Equivalent to bg-gray-200
    borderRadius: 50,
    paddingHorizontal: 8,
    marginTop: 20,
    width: 345,
    height: 32,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  filterButton: {
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SearchSynergy;
