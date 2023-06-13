import React, { useEffect, useState } from 'react';
import { NGROK } from "./ngrokUrl";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda, AgendaEntry, AgendaSchedule } from 'react-native-calendars'
import type { StackScreenProps } from '@react-navigation/stack';
import type { CalendarStackParamList } from '../router/StackNavCalendar';
import moment from 'moment';

type props = StackScreenProps<CalendarStackParamList, 'Calendar'>

interface Appointment {
  id: number;
  streetName: string;
  date: string;
}

const appointmentExemple = [
  {
    city: "Versailles", date: "2023-02-14T11:00:00.000Z", endHour: '15:00:00', id: 1, idMission: 1, mission: { idClient: 1, idRecurence: 1 }
    , postCode: "78000", startHour: "14:00:00", streetName: "Rue Jean Jaures", streetNumber: 2
  },
  {
  "city": "Versailles", "date": "2023-02-21T11:00:00.000Z", "endHour": "17:00:00", "id": 2, "idMission": 2, "mission": { "idClient": 1, "idRecurence": 2}
  , "postCode": "78000", "startHour": "16:00:00", "streetName": "rue Albert Camus", "streetNumber": 25
  }
]

const entries1: AgendaEntry[] = [
  {
    name: 'John Doe',
    height: 50,
    day: 'Monday',
  },
  {
    name: 'Yvette Dumont',
    height: 15,
    day: 'Monday',
  }
]
const entries2: AgendaEntry[] = [
  {
    name: 'John Doe',
    height: 100,
    day: 'Friday',
  }
]

const schedule: AgendaSchedule = {
  '2023-05-01': entries1,
  '2023-05-05': entries2
}



export default function MyCalendar ({route, navigation}: props ) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(NGROK+'/customers/1/appointments');
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    return <Text style={{fontSize: 50}}> NOM DU CLIENT </Text>
  }

  const onDayPress = (day: any) => {

    setSelectedDate(day.dateString);
  }

  /* VIEW */
  return (
    <View style={s.container}>
      <Text style={s.title}>Calendrier</Text>
      <View style={s.calendarContainer}>
        <Calendar style={{paddingBottom: 18}}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'pink' },
          }}
          onDayPress={onDayPress}
        />
        <Agenda
          theme={{
            calendarBackground: 'red'
          }}
          selected={'2023-05-01'}
          items={schedule}
          renderItem={renderItem}
          renderEmptyData={() => <Text>No appointments found</Text>}
        />
      </View>

      <TouchableOpacity style={s.apptButton} onPress={() => navigation.navigate('Appointment', {carerId: 3})}>
        <Text style={s.apptButtonText}>Voir un rdv</Text>
      </TouchableOpacity>

    </View>
  )
}



const s = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 82,
    marginBottom: 72

  },
  calendarContainer: {
    //marginTop: 60
  },
  apptButton: {
    backgroundColor: "#FFC0CB",
    width: 130,
    padding: 17,
    alignSelf: 'center',
    marginTop: 62,
    borderRadius: 5.5
  },
  apptButtonText: {
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
  }
})
