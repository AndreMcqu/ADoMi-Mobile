import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';

interface Appointment {
  id: number;
  streetName: string;
  date: string;
}

const Calendar: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://ae8f-31-32-43-205.ngrok-free.app/customers/1/appointments');
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const renderAppointmentItem = ({ item }: { item: Appointment }) => {
    return (
      <TouchableOpacity>
        <Text>{item.streetName}</Text>
      </TouchableOpacity>
    );
  };

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={{ flex: 1 }}>
      <CalendarList
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' },
        }}
        onDayPress={onDayPress}
      />

      <Agenda
        items={{ [selectedDate]: appointments }}
        renderItem={renderAppointmentItem}
        renderEmptyData={() => <Text>No appointments found</Text>}
      />
    </View>
  );
};

export default Calendar;
