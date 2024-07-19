import Home from "@/app/home";
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from "@/app/favorites";
import ProfileScreen from "@/app/profile";
import Projects from "@/app/Projects";
import RegisterProject from "@/app/registerProject";
import RegisterProjectStep2 from "@/app/registerProjectScreen2";

const Stack = createStackNavigator();

export default function CeoRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="favorites" component={Favorites} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="Projects" component={Projects} />
      <Stack.Screen name="registerProject" component={RegisterProject} />
      <Stack.Screen name="registerProjectScreen2" component={RegisterProjectStep2} />
    </Stack.Navigator>
  );
}
