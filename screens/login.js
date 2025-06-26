import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    ImageBackground,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import store from '../store/store';
import bg from '../assets/images/bg.jpg';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axiosInstance from '../axios/axios';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(store);

    const handleLogin = async () => {
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'All fields are required',
                text1Style: {
                    color: "red",
                    fontSize: 14
                }
            })
            return;
        }
        console.log(email, password)

        await axiosInstance.post('/user/login', {
            email,
            password
        }).then((res) => {
            console.log(res.data);

            setUser(res?.data?.user)



            Toast.show({
                type: 'success',
                text1: 'Welcome back',
                text1Style: {
                    color: "green",
                    fontSize: 14
                }
            })

            navigation.navigate('tabs')

        }).catch((error) => {
            console.log('error in login', error);
        })
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <StatusBar backgroundColor='transparent' translucent />
                    <ImageBackground
                        style={{
                            width: wp('100%'),
                            height: hp('100%'),
                            justifyContent: 'center',
                            position: 'absolute'
                        }}
                        source={bg}
                    />

                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            top: hp(6),
                            left: 20,
                            zIndex: 99
                        }}
                        onPress={() => navigation.navigate('tabs')}
                    >
                        <Ionicons name="chevron-back-circle" size={30} color="#0077B6" />
                    </TouchableOpacity>

                    <View style={{
                        position: "absolute",
                        bottom: 0,
                        width: wp(100),
                        height: hp(70),
                        backgroundColor: "#CAF0F8",
                        borderTopRightRadius: 25,
                        borderTopLeftRadius: 25,
                        padding: wp(6),
                    }}>
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            <Text style={{
                                color: "black",
                                fontSize: wp(5.5),
                                fontWeight: "bold",
                                marginBottom: hp(3)
                            }}>
                                LOGIN
                            </Text>

                            <View style={styles.inputBox}>
                                <Zocial name='email' size={24} color='rgba(176, 176, 176, 0.74)' />
                                <TextInput
                                    style={styles.input}
                                    placeholder="johndoe@gmail.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputBox}>
                                <FontAwesome name='lock' size={26} style={{ paddingRight: 5 }} color='rgba(176, 176, 176, 0.74)' />
                                <TextInput
                                    style={styles.input}
                                    placeholder="password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                            </View>

                            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: hp(2),
                            }}>
                                <Text style={{ color: "gray", fontSize: wp(4.5) }}>
                                    Don't have an account?{' '}
                                </Text>
                                <TouchableOpacity onPress={() => navigation.push("Signup")}>
                                    <Text style={{ color: "black", fontSize: wp(4.5), fontWeight: "bold" }}>
                                        Signup
                                    </Text>
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
    inputBox: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: wp(4),
        paddingHorizontal: 10,
        borderRadius: 6,
        marginBottom: hp(2),
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#fff"
    },
    input: {
        flex: 1,
        paddingVertical: hp(1),
        fontSize: wp(4),
    },
    button: {
        backgroundColor: '#2196F3',
        paddingVertical: hp(1.5),
        borderRadius: 8,
        alignItems: 'center',
        marginTop: hp(2),
    },
    buttonText: {
        color: '#fff',
        fontSize: wp(4.5),
        fontWeight: 'bold',
    },
});
