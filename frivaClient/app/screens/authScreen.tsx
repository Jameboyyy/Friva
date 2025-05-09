import React, { useState } from 'react';
import { 
    StyleSheet, 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';
import { supabase } from '../services/supabaseClient';
import Icon from 'react-native-vector-icons/FontAwesome';

const AuthScreen = () => {

    console.log('AuthScreen is rendering');
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAuth = async () => {
        setLoading(true);
        if (isSignUp) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });

            if (error) {
                Alert.alert('Error during signup: ' + error.message);
            } else {
                Alert.alert('Signup successful');
                console.log(data.user);

            }

        } else {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                Alert.alert('Error during login: ' + error.message);
            } else {
                Alert.alert('Login successful');
                console.log(data.user);
            }
        }
        setLoading(false);
    };

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/Friva_Logo_2.png')}
                />  
                <Text style={styles.title}>Friva</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputWrapper} >
                    <Icon style={styles.icon}name="envelope" size={20} color="#374151" />
                    <TextInput
                        placeholder="example@email.com"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Icon style={styles.icon} name="lock" size={20} color="#374151" />
                    <TextInput
                        placeholder="**********"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                </View> 
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F9F7F3',
    },
    logoContainer: {
        marginTop: 25,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    logo: {
        width: 150,
        height: 150,
        margin: 0,
        },
    title: {
        fontFamily: 'Outfit',
        fontSize: 48,
        fontWeight: '400',
        color: '#374151',
    },
    formContainer: {
        marginVertical: 20,
    },
    inputWrapper: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#D9BBA0',
        height: 50,
        width: 300,
    },
    input: {
        marginLeft: 10,
        flex: 1,
        height: 40,
        fontFamily: 'Outfit',
        color: '#374151',
        fontWeight: '400',
        fontSize: 16,
    },
    icon: {
        marginHorizontal: 10,
        height: 20,
        width: 20,
        alignItems: 'center',
    }
});

export default AuthScreen;
