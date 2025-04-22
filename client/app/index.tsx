// app/index.tsx
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { router } from 'expo-router';

export default function Index() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        // ✅ User is logged in — go to home/dashboard (or whatever you call it later)
        router.replace('/home');
      } else {
        // 👤 No user, go to auth screen
        router.replace('/auth');
      }

      setChecking(false);
    };

    checkUser();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return null;
}
