import { StyleSheet, Text, View } from 'react-native'
import Calendar from '../components/Calendar/Calendar'
import Navbar from '../components/Calendar/Navbar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ScrollView } from 'react-native'
import { useContext, useState } from 'react'
import PlansOnDay from '../components/Calendar/PlansOnDay'
import PlansIcon from '../components/Calendar/PlansIcon'
import { useNavigation } from '@react-navigation/native'
import store from '../store/store'

const CalendarScreen = () => {
  const { startingDate, setStartingDate } = useContext(store)



  const navigation = useNavigation();


  const handlePlusIcon = () => {
    navigation.push('Plan', { startingDate })
  }

  return (
    <SafeAreaView style={{
      backgroundColor: "#CAF0F8",
      paddingHorizontal: wp(4),
      flex: 1,
      position: "relative"
    }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Navbar />
        <Calendar selectedDate={startingDate} setSelectedDate={setStartingDate} />
        <PlansOnDay selectedDate={startingDate} />
      </ScrollView>
      <PlansIcon handlePlusIcon={handlePlusIcon} />
    </SafeAreaView>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({})