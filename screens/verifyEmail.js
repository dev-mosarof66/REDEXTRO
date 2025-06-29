import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { toast } from '@backpackapp-io/react-native-toast';
import colors from '../constants/colors';
import ButtonComp from '../components/public/Button';
import Loader from '../components/Loader';
import axiosInstance from '../axios/axios';

const VerifyEmailScreen = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        if (!email || !code) {
            toast.error("Please enter both email and code", {
                position: 'top',
                duration: 3000
            });
            return;
        }

        try {
            setLoading(true);

            // Replace this with your backend endpoint
            const response = await axiosInstance.post('/user/verify-email', {
                email,
                code
            });

            toast.success("Email verified successfully!", {
                position: 'top',
                duration: 3000
            });

            console.log(response.data);
        } catch (error) {
            console.log(error?.response?.data);
            toast.error("Verification failed", {
                position: 'top',
                duration: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Verify Your Email</Text>

            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.three}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Verification code"
                    placeholderTextColor={colors.three}
                    value={code}
                    onChangeText={setCode}
                    keyboardType="numeric"
                    maxLength={6}
                />
            </View>

            <ButtonComp title="Verify E-mail" onpress={handleVerify} />
        </ScrollView>
    );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: wp(6),
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: wp(6),
        fontWeight: 'bold',
        color: colors.one,
        textAlign: 'center',
        marginBottom: hp(4)
    },
    inputBox: {
        borderWidth: 1,
        borderColor: colors.three,
        borderRadius: 8,
        paddingHorizontal: wp(3),
        paddingVertical: hp(1),
        marginBottom: hp(2),
        backgroundColor: colors.five
    },
    input: {
        fontSize: wp(4.2),
        color: colors.two
    }
});
