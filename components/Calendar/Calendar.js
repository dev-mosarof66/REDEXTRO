// CalendarScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import colors from '../../constants/colors';

const CalendarScreen = ({ selectedDate, setSelectedDate }) => {

  // console.log('date in calendar',selectedDate);


  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: colors.one,
            selectedTextColor: colors.five,
          },
        }}
        theme={{
          todayTextColor: 'red',
          arrowColor: '#2E86DE',
          selectedDayBackgroundColor: '#2E86DE',
          calendarBackground: "transparent"
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: colors.one,
  },
});

export default CalendarScreen;
