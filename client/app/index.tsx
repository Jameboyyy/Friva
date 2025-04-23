// app/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { supabase } from '../services/supabaseClient';
import { router } from 'expo-router';

export default function Index() {
  const [checking, setChecking] = useState(true);

const [fontsLoaded] = useFonts({
    Outfit: require('../assets/fonts/Outfit-VariableFont_wght.ttf'),
})

useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        router.replace('/home');
      } else {
        router.replace('/auth');
      }

      setChecking(false);
    };

    if (fontsLoaded) {
      checkUser();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded ||checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return null;
}
