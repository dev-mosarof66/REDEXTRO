import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import colors from '../constants/colors';
import ButtonComp from '../components/public/Button';
import { useNavigation } from '@react-navigation/native';
import { toast } from '@backpackapp-io/react-native-toast';
import axiosInstance from '../axios/axios';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [mailsent, setMailSent] = useState(false);
    const [error, setError] = useState({
        message: "",
        status: null
    })

    const handleSendCode = async () => {
        if (!email) {
            toast.error('Email cannot be empty.', {
                position: 'top',
                duration: 2000,
            });
            return;
        }

        try {
            console.log('inside try block')
            const res = await axiosInstance.post('/user/forget-password/send-code', {
                email: email,
            });

            toast.success('Check your mailbox for verification code.', {
                position: 'top',
                duration: 2000,
            });

            setMailSent(true); // ✅ Set to true to show code input
        } catch (err) {
            setError({
                message: err?.response.data.message,
                status: err?.response.status
            })


            if (error.status === 401) {
                toast.error(
                    error.message,
                    {
                        position: 'top',
                        duration: 2000,
                    }
                )
            }
            if (error.status === 402) {
                toast.error(
                    error.message,
                    {
                        position: 'top',
                        duration: 2000,
                    }
                )
            }
            if (error.status === 500) {
                toast.error(
                    error.message,
                    {
                        position: 'top',
                        duration: 2000,
                    }
                )
            }
        }

    };

    const handleVerifyCode = async () => {
        if (!code) {
            toast.error('Please enter the verification code.', {
                position: 'top',
                duration: 2000,
            });
            return;
        }

        try {
            const res = await axiosInstance.post('/user/forget-password/verify-code', {
                code,
            });

            toast.success('user identity confirmed.', {
                position: 'top',
                duration: 2000,
            });

            navigation.push('ResetPassword');
        } catch (err) {
            setError({
                message: err?.response.data.message,
                status: err?.response.status
            })


            if (error.status === 401) {
                toast.error(
                    error.message,
                    {
                        position: 'top',
                        duration: 2000,
                    }
                )
            }
            if (error.status === 402) {
                toast.error(
                    error.message,
                    {
                        position: 'top',
                        duration: 2000,
                    }
                )
            }
            if (error.status === 500) {
                toast.error(
                    error.message,
                    {
                        position: 'top',
                        duration: 2000,
                    }
                )
            }
        }

    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.box}>
                <Text style={styles.title}>Forgot Password</Text>

                {mailsent ? (
                    <View>
                        <Text style={styles.subtitle}>A code has been sent to your email.</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter verification code"
                            value={code}
                            onChangeText={setCode}
                            keyboardType="number-pad"
                            autoCapitalize="none"
                        />
                    </View>
                ) : (
                    <View>
                        <Text style={styles.subtitle}>Enter your email to reset your password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email address"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                )}

                <View>
                    {mailsent ? (
                        <ButtonComp title="Verify Code" onpress={handleVerifyCode} />
                    ) : (
                        <ButtonComp title="Send Code" onpress={handleSendCode} />
                    )}
                </View>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backToLogin}>← Back to Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.five,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    box: {
        width: '100%',
        backgroundColor: colors.five,
        padding: 25,
        borderRadius: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.one,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: colors.two,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 48,
        borderColor: colors.two,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 14,
        marginBottom: 20,
        fontSize: 16,
    },
    backToLogin: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
        color: colors.one,
    },
});
