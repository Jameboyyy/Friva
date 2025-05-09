import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import AppNavigator from './app/navigation/appNavigator';  // Your app's navigation component
import { useFonts } from 'expo-font';  // Importing expo-font for custom fonts
import * as SplashScreen from 'expo-splash-screen';  // Import SplashScreen API

// Prevent the splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();  

export default function App() {
  console.log('App is rendering');

  const [fontsLoaded, fontsError] = useFonts({
    'Outfit': require('./assets/fonts/Outfit-VariableFont_wght.ttf'),  // Custom font
  });

  // Add state to simulate a delay for testing
  const [isDelayed, setIsDelayed] = useState(true);

  // Simulate a 3-second delay for the loading screen (even after fonts load quickly)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayed(false);  // After 3 seconds, remove the loading state
    }, 3000);  // Set the delay time (in milliseconds)

    return () => clearTimeout(timer);  // Cleanup the timer
  }, []);

  // Hide splash screen once fonts are loaded or if there's an error
  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();  // Hide splash screen after fonts are loaded
    }
  }, [fontsLoaded, fontsError]);

  // Show loading screen with spinner while fonts are loading or until delay
  if (!fontsLoaded && !fontsError || isDelayed) {
    return (
      <View style={styles.loadingContainer}>
        <Image style={styles.logo} source={require('./assets/images/Friva_Logo_2.png')} />
        <Text style={styles.title}>Friva</Text>
        <ActivityIndicator style={styles.loading} size="small" color="#4CAF50" />
      </View>
    );
  }

  // If there was an error loading fonts, show the error message
  if (fontsError) {
    return (
      <View style={styles.container}>
        <Text>Error loading fonts. Please try again.</Text>
      </View>
    );
  }

  // Once fonts are loaded, render the main app
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F3',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#F9F7F3',
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontFamily: 'Outfit',
    fontSize: 54,
    color: '#374151',
    fontWeight: '400',
    marginBottom: 20,
  },
  loading: {
    marginTop: 20,
  },
});
