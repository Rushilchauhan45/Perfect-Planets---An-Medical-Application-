// navigation/AppNavigator.js

import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens Import
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import BirthChartScreen from '../screens/services/BirthChartScreen';

import NakshtraScreen from '../screens/services/NakshtraScreen';

import MiscarriageScreen from '../screens/services/MiscarriageScreen';
import SvaraVigyanScreen from '../screens/services/SvaraVigyanScreen';
import ContactScreen from '../screens/services/ContactScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FFF0F5' },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="BirthChart" component={BirthChartScreen} />
        <Stack.Screen name="Nakshtra" component={NakshtraScreen} />
        <Stack.Screen name="Miscarriage" component={MiscarriageScreen} />
        <Stack.Screen name="SvaraVigyan" component={SvaraVigyanScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}