import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './HienDai/components/Home/Home';
import LoginScreen from './HienDai/components/Login/login';
import ForgotAccountScreen from './HienDai/components/Login/forgotAccount';
import ProfileScreen from './HienDai/components/Profile/profile';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="login" component={LoginScreen} />
        <Tab.Screen name="forgotAccount" component={ForgotAccountScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
