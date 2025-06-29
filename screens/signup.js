import React, { useContext, useState, useCallback, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
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
import Loader from '../components/Loader';
import colors from '../constants/colors';

const SignupScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(store);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const timeoutRef = useRef(null);

  const handleSignup = useCallback(async () => {
    if (!email || !password || !username) {
      toast.error('Please fill in all fields', {
        position: 'top',
        duration: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post('/user/signup', {
        email,
        password,
        username,
      });

      toast.success('Registration successful. Please login to access', {
        position: 'top',
        duration: 3000,
      });

      timeoutRef.current = setTimeout(() => {
        navigation.navigate('Login');
      }, 3000);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 400) {
        toast.error('This email is in use. Try another one', {
          position: 'top',
          duration: 3000,
        });
      } else if (status === 500) {
        navigation.push('Error');
      } else {
        toast.error('Something went wrong', {
          position: 'top',
          duration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [email, password, username, navigation]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (loading) return <Loader />;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={hp(4)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ImageBackground source={bg} style={StyleSheet.absoluteFillObject} />

          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('tabs')}>
            <Ionicons name="chevron-back-circle" size={30} color={colors.three} />
          </TouchableOpacity>

          <View style={styles.formContainer}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.title}>SIGN UP</Text>

              <View style={styles.inputBox}>
                <FontAwesome name="user" size={24} color={colors.four} />
                <TextInput
                  style={styles.input}
                  placeholder="johndoe"
                  placeholderTextColor={colors.three}
                  value={username}
                  onChangeText={setUsername}
                />
              </View>

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

              <ButtonComp title="Sign up" onpress={handleSignup} />

              <View style={styles.loginRedirect}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    top: hp(6),
    left: 20,
    zIndex: 99,
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    width: wp(100),
    height: hp(75),
    backgroundColor: colors.five,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: wp(6),
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
    gap: 6,
    backgroundColor: colors.five,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: hp(1),
    fontSize: wp(4),
    color: colors.two,
  },
  loginRedirect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  loginText: {
    color: colors.three,
    fontSize: wp(4.5),
  },
  loginLink: {
    color: colors.one,
    fontSize: wp(4.5),
    fontWeight: 'bold',
  },
});
