import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const CardRow = () => {
  const cardImage = require('@/assets/images/yellow_card.png');
  const shareIcon = require('@/assets/images/share_icon.png');
  const greenCardImage = require('@/assets/images/green_card.png');

  return (
    <View style={styles.cardRow}>
      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.cardContainer}>
          <Image source={cardImage} style={styles.cardImage} />
          <Image source={shareIcon} style={styles.shareIcon} />
          <Image source={greenCardImage} style={styles.cardImage} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 175,
    height: 100,
    backgroundColor: '#EFEDED',
    borderRadius: 10,
    marginHorizontal: 5,
    position: 'relative',
  },
  cardImage: {
    width: 67,
    height: 80,
  },
  shareIcon: {
    width: 14,
    height: 19,
    alignSelf: 'center',
  },
});

export default CardRow;
