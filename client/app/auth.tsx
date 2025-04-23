import React, { useState } from 'react';
import { 
    StyleSheet, 
    View,
    Image, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { supabase } from '../services/supabaseClient';
import { router } from 'expo-router';
const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert('Missing Info', 'Please enter both email and password.');
            return;
        }

        const { data, error } = isSignUp
            ? await supabase.auth.signUp({ email, password })
            : await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            Alert.alert('Authentication Failed', error.message);
        } else {
            router.replace(isSignUp ? '/onboarding': '/home');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1}}
        >
            <Image source={require('../assets/images/Friva_Logo_2.png')} style={styles.logo} />
            <Text style={styles.title}>Friva</Text>
            <View>
            
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    logo: {

    },
    title: {
        
    }
})

export default Auth;
