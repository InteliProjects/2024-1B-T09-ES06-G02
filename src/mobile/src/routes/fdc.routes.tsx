import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/app/home.fdc';
import Synergy from '@/app/synergy';
import SynergyDetail from '@/app/SynergyDetail';
import ProfileScreen from '@/app/profileFDC';
import ProjectFDC from '@/app/projectFDC';
import TrendPage from '@/app/trend-page';

const Stack = createStackNavigator();

export default function FdcRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home.fdc" component={HomeScreen} />
      <Stack.Screen name="SynergyDetail" component={SynergyDetail} />
      <Stack.Screen name="profileFDC" component={ProfileScreen}/>
      <Stack.Screen name="projectFDC" component={ProjectFDC}/>
      <Stack.Screen name="trend-page" component={TrendPage}/>
    </Stack.Navigator>
  );
}
