import { createStackNavigator } from '@react-navigation/stack';
import Appointments from '../screens/appointments'
import AppointmentCancel from '../screens/apptCancel'
import MyCalendar from '../screens/Calendar'
import { AppointmentType } from '../types/componentTypes'
import type { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Text, View, FlatList, Pressable} from "react-native";


export type CalendarStackParamList = {
    Calendar: {carerId: number};
    Appointment: {carerId: number, appointmentId: number};
    AppointmentCancel: {carerId: number, appointment?: AppointmentType};
}


const Stack = createStackNavigator<CalendarStackParamList>()

export default function StackNavCalendar() {
    return (
      <Stack.Navigator initialRouteName="Calendar" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Calendar" component={MyCalendar}/>
        <Stack.Screen name="Appointment" component={LoneAppointment}/>
        <Stack.Screen name="AppointmentCancel" component={AppointmentCancel}/>
      </Stack.Navigator>
    )
  }


type props = StackScreenProps<CalendarStackParamList, 'Appointment'>
const LoneAppointment = ({route, navigation}: props) => {
    const apptId = route.params.appointmentId
    const appt = {date: '2023-11-02', startHour: '12:00:00', endHour: '13:30:00', streetName: 'cumbersome street', streetNumber: '7', postCode: '77001', city: 'Manchester'}
    const mission = {idRecurrence: 1}
    const client = {firstName: 'Gigi', lastName: 'D\'Agostino'}
    const recurences = ['hebdomadaire', 'mensuel', 'bi-mensuel']
    return (
      <View>
        <View>
          <Text style={{marginBottom: 20}}> Fiche de RDV </Text>
          <Text> Le {appt.date} </Text>
          <Text> de {appt.startHour} à {appt.endHour} </Text>
        </View>
        <View>
          <Text style={{marginBottom: 20, marginTop: 10}}> Fiche mission </Text>
          <Text> Au {appt.streetNumber} {appt.streetName} </Text>
          <Text> {appt.postCode} {appt.city} </Text>
          <Text> Avec {client.firstName} {client.lastName} </Text>
          <Text> Récurence de la mission : {recurences[mission.idRecurrence]} </Text>
        </View>
      </View>
    )
}

