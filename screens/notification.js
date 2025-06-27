import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../axios/axios'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import store from '../store/store'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Navbar from '../components/SetPlan/Navbar'

const Notification = () => {
  const navigation = useNavigation()
  const { user, notifications, setNotifications } = useContext(store)

  const fetchNotification = async () => {
    await axiosInstance.get('/user/notifications').then((res) => {
      console.log(res.data)
      setNotifications(res.data)
    }).catch((error) => {
      console.log(error)

      if (error?.response?.status === 500) {
        navigation.push('Error')
      }
      else if (error?.response?.status === 403) {
        Toast.show({
          type: 'error',
          text1: 'Login session expired.',
          text1Style: {
            fontSize: 16,
            color: "red"
          }
        })
        setTimeout(() => {
          Toast.show({
            type: 'error',
            text1: 'Redirecting to Login.',
            text1Style: {
              fontSize: 16,
              color: "red"
            }
          })
          navigation.push('Login')
        }, 2000)
      }
    })
  }
  useEffect(() => {
    if (user)
      fetchNotification()
  }, [])
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#f0f0f0',
      paddingHorizontal: wp(4)
    }}>
      <Navbar title='Notifications' />
      <View>
        {/* {
          notifications.length > 0 ?
            notifications.map((notification, index) => (

              <Card key={index} notification={notification} />
            ))
            :
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',

            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 10
              }}>
                No Notification Found
              </Text>
            </View>
        } */}
        <Card />
      </View>
    </SafeAreaView>
  )
}


const Card = ({ notification }) => {
  return (
    <View>
      <Text>HI</Text>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})