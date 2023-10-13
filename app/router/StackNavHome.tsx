import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import Appointments from "../screens/appointments";
import MyCalendar from "../screens/Calendar";
import AppointmentCancel from "../screens/apptCancel";
import StackNavCalendar from './StackNavCalendar'

export type HomeStackParamList = {
    Home: {carerId: number},
    Appointments : {carerId: number},
    calendar: {carerId: number}, 
}

const Stack = createStackNavigator<HomeStackParamList>();

export default function StackNavHome() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Appointments" component={Appointments}/>
            <Stack.Screen name="calendar" component={StackNavCalendar}/>
        </Stack.Navigator>
    )
}