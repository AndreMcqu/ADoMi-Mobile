import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda, AgendaEntry, AgendaSchedule } from 'react-native-calendars'
import type { StackScreenProps } from '@react-navigation/stack';
import type { CalendarStackParamList, } from '../router/StackNavCalendar';
import type { AppointmentType } from '../types/componentTypes'
import moment from 'moment';

type props = StackScreenProps<CalendarStackParamList, 'Calendar'>

interface Appointment {
  id: number;
  streetName: string;
  date: string;
}


/*
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
*/

const appointmentExample = [
  {
    city: "Versailles", date: "2023-06-14T11:00:00.000Z", endHour: '15:00:00', id: 1, idMission: 1, mission: { idClient: 1, idRecurence: 1 }
    , postCode: "78000", startHour: "14:00:00", streetName: "Rue Jean Jaures", streetNumber: "2"
  },
  {
    city: "Versailles", date: "2023-06-13T11:00:00.000Z", endHour: "17:00:00", id: 2, idMission: 2, mission: { idClient: 1, idRecurence: 2}
    , postCode: "78000", startHour: "16:00:00", streetName: "rue Albert Camus", streetNumber: "25"
  },
  {
    city: "Versailles", date: "2023-06-15T11:00:00.000Z", endHour: "17:00:00", id: 2, idMission: 2, mission: { idClient: 1, idRecurence: 2}
    , postCode: "78000", startHour: "16:00:00", streetName: "rue Albert Camus", streetNumber: "25"
  }
]

const getDates = (apptList: Partial<AppointmentType>[]) => {
  let apptDates: {[key: string]: {selected: boolean, selectedColor: string}} = {}
  apptList.forEach(appt => {
    apptDates[moment(appt.date).format('YYYY-MM-DD')] = {selected: true, selectedColor: 'pink'}
  })
  return apptDates
}
const allMarkedDates = getDates(appointmentExample)
//console.warn(allMarkedDates)

export default function MyCalendar ({route, navigation}: props ) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    
  const onDayPress = (day: any) => {
    console.log(day);
    setSelectedDate(day.dateString);
  }


/*
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
*/
  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    return <Text style={{fontSize: 50}}> NOM DU CLIENT </Text>
  }



  /* VIEW */
  return (
    <View style={s.container}>
      <Text style={s.title}>Calendrier</Text>

      <View style={s.calendarContainer}>
        <Calendar style={{paddingBottom: 18}}
          markedDates={allMarkedDates}
          onDayPress={onDayPress}
        />
        <View style={{
          backgroundColor: 'lightgrey', 
          position: 'absolute',
          top 
          borderRadius: 10,
          zIndex:10, 
          padding: 120,
          }}>

          </View>
        {
        /*
          <Agenda
            theme={{
              calendarBackground: 'red'
            }}
            selected={'2023-05-01'}
            items={schedule}
            renderItem={renderItem}
            renderEmptyData={() => <Text>No appointments found</Text>}
          />
        */
        }
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
