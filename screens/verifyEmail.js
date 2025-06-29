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
import { useNavigation } from '@react-navigation/native';

const VerifyEmailScreen = ({ route }) => {
    const { user } = route.params
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()

    const handleVerify = async () => {

        try {
            setLoading(true);

            // Replace this with your backend endpoint
            const response = await axiosInstance.post(`/user/verify-email/${user?.token}`, {
                email: user?.email,
                username: user?.username,
                password: user?.password,
                code: code
            });

            toast.success("Email verified successfully!", {
                position: 'top',
                duration: 2000
            });
            toast.success("You can login now.", {
                position: 'top',
                duration: 2000
            });
            navigation.push('Login')

            console.log(response.data);
        } catch (error) {
            const status = error?.response?.status;
            if (status === 400) {
                toast.error('This email is in use. Try another one', {
                    position: 'top',
                    duration: 3000,
                });
            } else if (status === 500) {
                navigation.push('Error');
            } else if (status === 401) {
                toast.error('Please provide a valid verification code.', {
                    position: 'top',
                    duration: 3000,
                });
            }
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
        backgroundColor: colors.five
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
        marginBottom: hp(2),
        backgroundColor: colors.five
    },
    input: {
        fontSize: wp(4.2),
        color: colors.three
    }
});
