import { createStackNavigator } from '@react-navigation/stack';
import Appointments from '../screens/appointments'
import AppointmentCancel from '../screens/apptCancel'
import MyCalendar from '../screens/Calendar'


export type CalendarStackParamList = {
    Calendar: {carerId: number}
    Appointment: {carerId: number}
    Unavailable: {carerId: number}
}


const Stack = createStackNavigator<CalendarStackParamList>()

export default function StackNavCalendar() {
    return (
      <Stack.Navigator initialRouteName="Calendar" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Calendar" component={MyCalendar}/>
        <Stack.Screen name="Appointment" component={Appointments}/>
        <Stack.Screen name="Unavailable" component={AppointmentCancel}/>
      </Stack.Navigator>
    )
  }