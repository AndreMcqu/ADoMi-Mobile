import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Calendar, CalendarList, Agenda, AgendaEntry, AgendaSchedule } from 'react-native-calendars'
import { FontAwesome } from "@expo/vector-icons";
import type { StackScreenProps } from '@react-navigation/stack';
import type { CalendarStackParamList, } from '../router/StackNavCalendar';
import type { AppointmentType } from '../types/componentTypes'
import {centerVertical, centerHorizontal} from '../dimensions/dimensions'
import AppointmentModal from '../components/appointmentComponents/appointmentModal'
import moment from 'moment';

type props = StackScreenProps<CalendarStackParamList, 'Calendar'>

const appointmentsExample = [
  {
    city: "Versailles", date: "2023-06-14T11:00:00.000Z", endHour: '15:00:00', id: 1, idMission: 1, mission: { idClient: 1, idRecurence: 1 }
    , postCode: "78000", startHour: "14:00:00", streetName: "Rue Jean Jaures", streetNumber: "2"
  },
  {
    city: "Versailles", date: "2023-06-13T11:00:00.000Z", endHour: "17:00:00", id: 2, idMission: 2, mission: { idClient: 1, idRecurence: 2}
    , postCode: "78000", startHour: "16:00:00", streetName: "rue Albert Camus", streetNumber: "25"
  },
  {
    city: "Buc", date: "2023-06-15T11:00:00.000Z", endHour: "10:00:00", id: 2, idMission: 2, mission: { idClient: 1, idRecurence: 2}
    , postCode: "78117", startHour: "08:45:00", streetName: "Avenue du troubadour", streetNumber: "73"
  },
  {
    city: "Buc", date: "2023-06-15T11:00:00.000Z", endHour: "20:00:00", id: 2, idMission: 2, mission: { idClient: 1, idRecurence: 2}
    , postCode: "78117", startHour: "19:30:00", streetName: "Avenue du machin", streetNumber: "73"
  }

]

const appts = appointmentsExample.map((appt) => { return { ...appt , date: moment(appt.date).format('YYYY-MM-DD') } })

const getMarkedDates = (apptList: AppointmentType[]) => {
    let apptDates: {[key: string]: {selected: boolean, selectedColor: string}} = {}
    apptList.forEach(appt => {
      apptDates[appt.date] = {selected: true, selectedColor: 'pink'}
    })
    return apptDates
}
const allMarkedDates = getMarkedDates(appts)

const getApptFromDate = (date: string, appts: AppointmentType[]): AppointmentType[] => {
    const fetchedAppts: AppointmentType[] = []
    appts.forEach((appt) => {
        if (appt.date == date) fetchedAppts.push(appt)
    })
    return fetchedAppts
}

export default function MyCalendar ({route, navigation}: props ) {
  const [appointments, setAppointments] = useState<AppointmentType[]>([])
  const [modalDisplay, setModalDisplay] = useState(false)
  const [apptCount, setApptCount] = useState(0)


  const onDayPress = (day: any) => {
    if (allMarkedDates[day.dateString]){
      setAppointments(getApptFromDate(day.dateString, appts))
      setModalDisplay(true)
    }
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
          backgroundColor: '#E8E8E8', 
          position: 'absolute',
          height: 290,
          width: 290,
          top: centerVertical(290) - 20,
          left: centerHorizontal(290),
          borderRadius: 10,
          zIndex: 2, 
          display: modalDisplay ? 'flex' : 'none'
          }}>
              <Text style={{fontSize: 21, fontWeight: '700', alignSelf: 'center', paddingTop: 21, marginBottom: -26}}>Rdv n° {apptCount+1}</Text>
              <TouchableOpacity onPress={() => { setModalDisplay(false); setApptCount(0) }} style={s.closeButton}>
                  <FontAwesome name="close" color="black" size={28}/>
              </TouchableOpacity>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-evenly'}}>
                  <TouchableOpacity onPress={() => apptCount > 0 && setApptCount(apptCount - 1)} style={s.leftArrowModal}>
                      <FontAwesome name="chevron-left" color="black" size={24}/>
                  </TouchableOpacity>
                  <View style={{backgroundColor: 'white', padding: 25, borderRadius: 7}}>
                      <Text style={s.modalText}>{appointments[apptCount]?.date}</Text>
                      <Text style={s.modalText}>{appointments[apptCount]?.city}</Text>
                      <Text style={s.modalText}>{appointments[apptCount]?.streetName}</Text>
                      <Text style={s.modalText}> {appointments[apptCount] ? "De " + appointments[apptCount]?.startHour + " à " + appointments[apptCount]?.endHour : null}</Text>
                  </View>
                  <TouchableOpacity onPress={() => apptCount < appointments.length-1 && setApptCount(apptCount + 1)} style={s.rightArrowModal}>
                      <FontAwesome name="chevron-right" color="black" size={24}/>
                  </TouchableOpacity>
              </View>

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
  },
  closeButton:{
    alignSelf:"flex-end",
    paddingHorizontal: 17,
    paddingBottom: 25,
  },
  leftArrowModal:{
    alignSelf: "center",
    paddingHorizontal: 15,
  },
  rightArrowModal:{
    alignSelf: "center",
    paddingHorizontal: 15,
  },
  modalText: {
    fontSize: 16,

  }

})
