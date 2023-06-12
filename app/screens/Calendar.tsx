import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';

// interface Appointment {
//   id: number;
//   streetName: string;
//   date: string;
// }

export type Client = {
    first_name?: string
    last_name?: string
}

export type AppointmentType = {
    id?: number
    idMission: number
    date: string
    startHour: string
    endHour: string
    streetName: string
    streetNumber?: string
    postCode: string
    city: string,
    mission: {
        client:Client
        idClient?: number
        idReccurence?: number
    }
}

const Calendar: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    fetchAppointments();
  }, []);



  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://ae8f-31-32-43-205.ngrok-free.app/carers/3/appointments');
      const data = await response.json();
      setAppointments(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  console.log('Fetching appointments',appointments);
  

  const renderAppointmentItem = ({ item }: { item: AppointmentType }) => {
    return (
      <TouchableOpacity>
        <Text>{item.id}</Text>
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
