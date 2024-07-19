// CardList.js
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CardItem from './CardItem';

const CardList = ({ data }) => {
  const renderItem = ({ item }) => (
    <CardItem image={{ uri: item.photo_path }} title={item.name} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      numColumns={4}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 15,
  },
});

export default CardList;
