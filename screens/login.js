import React, { useContext, useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ImageBackground,
    StatusBar,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import store from '../store/store';
import bg from '../assets/images/bg.jpg';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axiosInstance from '../axios/axios';
import ButtonComp from '../components/public/Button';
import { toast } from '@backpackapp-io/react-native-toast';
import colors from '../constants/colors';
import Loader from '../components/Loader';

const LoginScreen = () => {
    const navigation = useNavigation();
    const { setUser } = useContext(store);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = useCallback(async () => {
        console.log('inside the login')
        if (!email || !password) {
            toast.error("Please enter both email and password", {
                position: 'top',
                duration: 3000
            });
            return;
        }

        try {
            setLoading(true);
            const res = await axiosInstance.post('/user/login', { email, password });
            setUser(res?.data?.user);

            navigation.navigate('tabs');
            toast.success(`Welcome back ${res?.data?.user?.username}`, {
                position: 'top',
                duration: 3000
            });

        } catch (error) {
            const status = error?.response?.status;
            console.log(error)

            if (status === 401) {
                toast.error("Invalid credentials", {
                    position: 'top',
                    duration: 3000
                });
            } else if (status === 500) {
                navigation.push('Error');
            } else {
                toast.error("Something went wrong. Try again.", {
                    position: 'top',
                    duration: 3000
                });
            }

            console.log('Login error:', status, error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }, [email, password, navigation, setUser]);

    if (loading) return <Loader />;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={hp(2)} // Adjust as needed
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <StatusBar backgroundColor="transparent" translucent />
                    <ImageBackground source={bg} style={StyleSheet.absoluteFillObject} />

                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('tabs')}>
                        <Ionicons name="chevron-back-circle" size={30} color={colors.three} />
                    </TouchableOpacity>

                    <View style={styles.container}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            <Text style={styles.title}>LOGIN</Text>

                            <View style={styles.inputBox}>
                                <Zocial name="email" size={24} color={colors.four} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="johndoe@gmail.com"
                                    placeholderTextColor={colors.three}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputBox}>
                                <FontAwesome name="lock" size={26} color={colors.four} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="password"
                                    placeholderTextColor={colors.three}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                            </View>

                            <TouchableOpacity style={styles.forgot} onPress={() => navigation.navigate('ResetPassword')}>
                                <Text style={styles.forgotText}>Forget password</Text>
                            </TouchableOpacity>

                            <ButtonComp title="Login" onpress={handleLogin} />

                            <View style={styles.redirect}>
                                <Text style={styles.redirectText}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.push("Signup")}>
                                    <Text style={styles.signupLink}>Signup</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );

};

export default LoginScreen;

const styles = StyleSheet.create({
    backIcon: {
        position: 'absolute',
        top: hp(6),
        left: 20,
        zIndex: 99,
    },
    container: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(70),
        backgroundColor: colors.five,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: wp(6),
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        color: colors.one,
        fontSize: wp(5.5),
        fontWeight: 'bold',
        marginBottom: hp(3),
    },
    inputBox: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.three,
        borderRadius: 6,
        marginBottom: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 6,
        backgroundColor: colors.five,
    },
    input: {
        flex: 1,
        paddingVertical: hp(1),
        fontSize: wp(4),
        color: colors.two,
    },
    forgot: {
        alignSelf: 'flex-end',
        marginBottom: hp(2.5),
        marginTop: -6,
        marginRight: wp(2),
    },
    forgotText: {
        color: colors.three,
        fontSize: wp(4),
    },
    redirect: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(2),
    },
    redirectText: {
        color: colors.three,
        fontSize: wp(4.5),
    },
    signupLink: {
        color: colors.one,
        fontSize: wp(4.5),
        fontWeight: 'bold',
    },
});
