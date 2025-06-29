import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import colors from '../constants/colors';
import ButtonComp from '../components/public/Button';
import axiosInstance from '../axios/axios';
import { toast } from '@backpackapp-io/react-native-toast';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {
  const navigation = useNavigation()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState({
    message: "",
    status: null
  })

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error('all fields are required.', {
        position: 'top-right',
        duration: 2000,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('password and confirm password should be same.', {
        position: 'top',
        duration: 2000,
      });
      return;
    }

    console.log('hi from below frontenderror')

    try {
      const res = await axiosInstance.post('/user/reset-password', {
        password: newPassword,
        confirmPassword

      })
      toast.success('password reseted successfully .', {
        position: 'top',
        duration: 2000,
      });

      navigation.push('Login')


    } catch (err) {

      console.log(err?.response?.data?.message)

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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.box}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Please provide strong password</Text>

        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor={colors.three}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          placeholderTextColor={colors.three}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <ButtonComp title='RESET PASSWORD' onpress={handleReset} />


        <TouchableOpacity onPress={() => navigation.push('Login')}>
          <Text style={styles.backToLogin}>← Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;

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
    padding: 25
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
    color: colors.six,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderColor: colors.three,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 15,
    fontSize: 16,
  },

  status: {
    textAlign: 'center',
    marginTop: 15,
    color: colors.six,
    fontSize: 14,
  },
  backToLogin: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: colors.one,
  },
});
