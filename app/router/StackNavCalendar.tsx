import { createStackNavigator } from '@react-navigation/stack';
import AppointmentCancel from '../screens/apptCancel'
import MyCalendar from '../screens/Calendar'
import { AppointmentType } from '../types/componentTypes'
import LoneAppointment from '../screens/Appointment';

export type CalendarStackParamList = {
    Calendar: {carerId: number};
    Appointment: {carerId: number, appointmentInfo: AppointmentType};
    AppointmentCancel: {carerId: number, type: ('cancel' | 'simple_message'), appointment?: AppointmentType};
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



