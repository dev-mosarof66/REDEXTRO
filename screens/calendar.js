import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CALENDAR from '../components/Calendar/Calendar'
import Navbar from '../components/Calendar/Navbar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ScrollView } from 'react-native'

const Calendar = () => {
  return (
    <SafeAreaView style={{
      padding: wp(5)
    }}>
      <ScrollView>
        <Navbar />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Calendar

const styles = StyleSheet.create({})