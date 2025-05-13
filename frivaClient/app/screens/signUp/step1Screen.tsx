import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { supabase } from '../../services/supabaseClient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootParamList } from '../../navigation/types';

const Step1Screen = () => {
    const route = useRoute<RouteProp<RootParamList, 'Step1Screen'>>();
    const { email } = route.params;

    const [code, setCode] = useState(Array(6).fill(''));
    const [loading, setLoading] = useState(false);

    const handleChangeCode = (value: string, index: number) => {
        const newCode = [...code];
        newCode[index] =value;
        setCode(newCode);
    };

    const handleVerifyCode = async () => {
        setLoading(true);
        const verificationCode = code.join('');
        const { data, error } = await supabase.auth.verifyOTP({
            email,
            token: verificationCode,
            type: 'signup',
        });

        if(error) {
            Alert.alert('Error during verification: ' + error.message);
        } else {
            Alert.alert('Verification successful');
            console.log(data);
        }
        setLoading(false);
        
    };

    return (
        <View style={styles.container}>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F7F3',
    },
    title: {

    },
})

export default Step1Screen;
