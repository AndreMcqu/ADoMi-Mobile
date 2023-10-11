import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import Appointments from "../screens/appointments";
import MyCalendar from "../screens/Calendar";
import AppointmentCancel from "../screens/apptCancel";

export type HomeStackParamList = {
    Home: {carerId: number},
    Appointments : {carerId: number},
    Calendar: {carerId: number}, 
}

const Stack = createStackNavigator<HomeStackParamList>();

export default function StackNavHome() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Appointments" component={Appointments}/>
            <Stack.Screen name="Calendar" component={MyCalendar}/>
        </Stack.Navigator>
    )
}