import 'expo-dev-client';
import React from 'react';
import { AuthContextProvider } from '@/context/AuthContext';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import { Loading } from '@/components/loading';
import { Routes } from '@/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    'ClearSans-Bold': require('../../assets/fonts/ClearSans-Bold.ttf'),
    'ClearSans-Light': require('../../assets/fonts/ClearSans-Light.ttf'),
    'ClearSans-Medium': require('../../assets/fonts/ClearSans-Medium.ttf')
  });

  return (
    <AuthContextProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      
      {fontsLoaded ? <Routes /> : <Loading />}
    </AuthContextProvider>
  );
}