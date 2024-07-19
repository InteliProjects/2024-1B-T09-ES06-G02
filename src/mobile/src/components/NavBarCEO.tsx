import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavBarCEO: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('home')}>
        <Image source={require('../assets/images/home-icon.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('news-page')}>
        <Image source={require('../assets/images/search-icon.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('favorites')}>
        <Image source={require('../assets/images/bulb-icon.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('profile')}>
        <Image source={require('../assets/images/user-icon.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default NavBarCEO;
