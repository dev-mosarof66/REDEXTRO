// CalendarScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#2E86DE',
            selectedTextColor: '#fff',
          },
        }}
        theme={{
          todayTextColor: 'red',
          arrowColor: '#2E86DE',
          selectedDayBackgroundColor: '#2E86DE',
          calendarBackground:"transparent"
        }}
      />

      {selectedDate ? (
        <Text style={styles.selectedText}>Selected Date: {selectedDate}</Text>
      ) : null}
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
    color: '#2E86DE',
  },
});

export default CalendarScreen;
