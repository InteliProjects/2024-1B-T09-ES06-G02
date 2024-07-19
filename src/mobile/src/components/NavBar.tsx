import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const NavBar = ({ toggleSearch, name }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
        <TouchableOpacity onPress={toggleSearch}>
            <Image source={require('@/assets/images/search.png')} style={styles.image} />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    marginTop: 8,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginTop: 5,
  },
});

export default NavBar;
