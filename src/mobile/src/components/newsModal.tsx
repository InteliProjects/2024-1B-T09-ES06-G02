import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Linking } from 'react-native';

interface NewsModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  url: string;
  publisher: string;
  publishedDate: string;
}

const NewsModal: React.FC<NewsModalProps> = ({ visible, onClose, title, url, publisher, publishedDate }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.publisher}>Publicado por: {publisher}</Text>
          <Text style={styles.date}>{new Date(publishedDate).toLocaleDateString()}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(url)} style={styles.readMoreButton}>
            <Text style={styles.readMoreButtonText}>Ler Mais</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  publisher: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  readMoreButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#3A8A88',
    borderRadius: 5,
    marginBottom: 20,
  },
  readMoreButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#3A8A88',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NewsModal;
