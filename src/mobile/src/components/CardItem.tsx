// CardItem.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CardItem = ({ image, title }) => {
  const randomImageUrl = `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/80/96`;
  return (
    <View style={styles.card}>
      <Image source={{ uri: randomImageUrl }} style={styles.cardImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  cardImage: {
    width: 80,
    height: 96,
    marginBottom: 4,
    borderRadius: 10,
  },
});

export default CardItem;
