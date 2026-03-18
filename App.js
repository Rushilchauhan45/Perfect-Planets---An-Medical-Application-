// App.js
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { View, ActivityIndicator } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { COLORS } from './theme';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ...Ionicons.font,
        ...MaterialCommunityIcons.font,
        ...FontAwesome.font,
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ActivityIndicator size="large" color={COLORS.buttonBg} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor="#FFF0F5" />
      <AppNavigator />
    </>
  );
}