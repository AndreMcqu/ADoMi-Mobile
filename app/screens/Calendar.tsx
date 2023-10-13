import React, { useEffect, useState } from 'react';
import {Domain, Scheme} from '../../env/api_conn';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Calendar, CalendarList, Agenda, AgendaEntry, AgendaSchedule } from 'react-native-calendars'
import { FontAwesome } from "@expo/vector-icons";
import type { StackScreenProps } from '@react-navigation/stack';
import type { CalendarStackParamList, } from '../router/StackNavCalendar';
import type { AppointmentType } from '../types/componentTypes'
import {centerVertical, centerHorizontal, windowHeight} from '../dimensions/dimensions'
//import AppointmentModal from '../components/appointmentComponents/appointmentModal'
import moment from 'moment';
import { getAppointments } from "../apiCalls";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { newAppts } from '../redux/store'

type props = StackScreenProps<CalendarStackParamList, 'Calendar'>


/*
const appointmentsExample: AppointmentType[] = [
  {
    city: "Versailles", date: "2023-06-14T11:00:00.000Z", endHour: '15:00:00', id: 1, idMission: 1, mission: { idClient: 1, idRecurrence: 1 }
    , postCode: "78000", startHour: "14:00:00", streetName: "Rue Jean Jaures", streetNumber: "2"
  },
  {
    city: "Versailles", date: "2023-06-13T11:00:00.000Z", endHour: "17:00:00", id: 2, idMission: 2, mission: { idClient: 1, idRecurrence: 2}
    , postCode: "78000", startHour: "16:00:00", streetName: "rue Albert Camus", streetNumber: "25"
  },
  {
    city: "Buc", date: "2023-06-15T11:00:00.000Z", endHour: "10:00:00", id: 2, idMission: 2, mission: { idClient: 1, idRecurrence: 2}
    , postCode: "78117", startHour: "08:45:00", streetName: "Avenue du troubadour", streetNumber: "73"
  },
  {
    city: "Elancourt", date: "2023-06-15T11:00:00.000Z", endHour: "20:00:00", id: 2, idMission: 2, mission: { idClient: 1, idRecurrence: 2}
    , postCode: "78117", startHour: "19:30:00", streetName: "Allée du machin", streetNumber: "11"
  }
]
*/

type MarkedDates = {
  [key: string]: {selected: boolean, selectedColor: string}
}

const formatDates = (appts: AppointmentType[]): AppointmentType[] => appts.map((appt) => ({ ...appt , date: moment(appt.date).format('YYYY-MM-DD') }) )

const formatHHMM = (time: string) => moment(time, 'hh:mm:ss').format('HH') + 'h' + moment(time, 'hh:mm:ss').format('mm')

const getMarkedDates = (apptList: AppointmentType []) => {
    let apptDates: MarkedDates = {}
    apptList.forEach(appt => {
      apptDates[appt.date] = {selected: true, selectedColor: 'pink'}
    })
    return apptDates
}

const getApptsOfTheDay = (date: string, appts: AppointmentType []): AppointmentType [] => {
    const dayAppts: AppointmentType [] = []
    appts.forEach((appt) => {
        if (appt.date == date) dayAppts.push(appt)
    })
    return dayAppts
}
 
/* Main Component */ 
export default function MyCalendar ({navigation, route}: props ) {
  const [appointments, setAppointments] = useState<AppointmentType[]>([])
  const [dayAppts, setDayAppts] = useState<AppointmentType[]>([])
  const [markedDates, setMarkedDates] = useState<MarkedDates>({})
  const [modalDisplay, setModalDisplay] = useState(false)
  const [apptCount, setApptCount] = useState(0)

  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.token.token)
  const id = useSelector((state: RootState) => state.user.id)
  //const user = useSelector((state: RootState) => state.user.info)

  const onDayPress = (day: any) => {
      if (markedDates[day.dateString]) {
        setDayAppts(getApptsOfTheDay(day.dateString, appointments))
        setModalDisplay(true)
      }
  }


  useEffect(() => {
      getAppointments(id, token)
      .then((appts) => {
            appts = formatDates(appts)
            dispatch(newAppts(appts))
            setAppointments(appts)
            setMarkedDates(getMarkedDates(appts))
            //console.log("appts", appts)
            //console.log(formatHHMM(appts[0]?.endHour))
      })
      .catch((err) => {
        console.error("error: ", err)
      })

  }, [])


  //console.log("appointments : ", appointments)

  const ModalItem = () => {
      return (
        <Pressable style={s.backgroundModal} onPress={() => { setModalDisplay(false); setApptCount(0) }}>
            <View style={s.modalitem}>
                <Text style={{fontSize: 21, fontWeight: '700', alignSelf: 'center', paddingTop: 21, marginBottom: -26}}>Rdv n° {apptCount+1}</Text>
                
                <TouchableOpacity onPress={() => { setModalDisplay(false); setApptCount(0) }} style={s.closeButton}>
                    <FontAwesome name="close" color="black" size={28}/>
                </TouchableOpacity>
                
                <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-evenly'}}>
                    <TouchableOpacity onPress={() => apptCount > 0 && setApptCount(apptCount - 1)} style={s.leftArrowModal}>
                        <FontAwesome name="chevron-left" color="black" size={24}/>
                    </TouchableOpacity>
                    <View style={{backgroundColor: 'white', padding: 25, borderRadius: 7}}>
                        <Text style={s.modalText}><Text style={s.bold}>Le </Text>{moment(dayAppts[apptCount].date).format('DD/MM/YYYY')}</Text>
                        <Text style={s.modalText}><Text style={s.bold}>Ville: </Text>{dayAppts[apptCount].city}</Text>
                        <Text style={s.modalText}>{dayAppts[apptCount].streetName}</Text>
                        <Text style={s.modalText}><Text style={s.bold}>De </Text>{formatHHMM(dayAppts[apptCount].startHour)}</Text>
                        <Text style={s.modalText}><Text style={s.bold}>À </Text>{formatHHMM(dayAppts[apptCount].endHour)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => apptCount < dayAppts.length-1 && setApptCount(apptCount + 1)} style={s.rightArrowModal}>
                        <FontAwesome name="chevron-right" color="black" size={24}/>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: -58}}>
                    <TouchableOpacity style={s.apptButton} onPress={() => navigation.navigate('AppointmentCancel', {carerId: 3, type:'cancel', appointment: dayAppts[apptCount]})}>
                        <Text style={s.apptButtonText}>Annuler ce rdv</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.apptButton} onPress={() => navigation.navigate('Appointment', { carerId: 3, appointmentInfo: dayAppts[apptCount] })}>
                        <Text style={s.apptButtonText}>Détails rdv</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Pressable>
      )
  }


  /* MAIN VIEW */
  return (
    <View style={s.container}>
      <Text style={s.title}>Calendrier</Text>

      <View style={s.calendarContainer}>
        <Calendar style={{paddingBottom: 18}}
          markedDates={markedDates}
          onDayPress={onDayPress}
        />
        {
          modalDisplay ? ModalItem() : null
        }
      </View>

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
    paddingVertical: 17,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 62,
    borderRadius: 5.5
  },
  apptButtonText: {
    fontSize: 13.5,
    fontWeight: '500',
    alignSelf: 'center',
  },
  closeButton:{
    alignSelf:"flex-end",
    paddingHorizontal: 17,
    paddingBottom: 12,
  },
  leftArrowModal:{
    alignSelf: "center",
    paddingHorizontal: 15,
  },
  rightArrowModal:{
    alignSelf: "center",
    paddingHorizontal: 15,
  },
  modalitem: {
    backgroundColor: 'white', //'#E8E8E8', 
    position: 'absolute',
    height: 290,
    width: 290,
    top: centerVertical(290) - 20,
    left: centerHorizontal(290),
    borderRadius: 10,
    zIndex: 3,
  },
  modalText: {
    fontSize: 17,
    fontWeight: '400'
  },
  bold: {
    fontSize: 17,
    fontWeight: '500'
  },
  backgroundModal: {
    backgroundColor: 'rgba(05, 05, 05, 0.1)', //red
    height: windowHeight,
    position: 'absolute',
    //paddingTop: 200,
    width: '100%',
    zIndex: 2,

  }

})
