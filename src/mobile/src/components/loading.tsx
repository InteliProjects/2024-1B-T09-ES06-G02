import { ActivityIndicator, StyleSheet } from 'react-native'

export function Loading(){
  return <ActivityIndicator style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});