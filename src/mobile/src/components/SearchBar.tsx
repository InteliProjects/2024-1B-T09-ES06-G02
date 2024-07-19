import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, setSearchText }) => (
  <TextInput
    style={styles.input}
    placeholder="Pesquisar..."
    value={searchText}
    onChangeText={text => setSearchText(text)}
  />
);

const styles = StyleSheet.create({
  input: {
    padding: 8,
    backgroundColor: '#ccc',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default SearchBar;
