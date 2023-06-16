import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/profile'
import ClientList from '../screens/clientList'
import AppointmentCancel from '../screens/apptCancel'
import { AppointmentType } from '../types/componentTypes'


export type ProfileStackParamList = {
  Profile: {carerId: number}
  "Client List": {carerId: number}
  AppointmentCancel: {carerId: number, appointment?: AppointmentType};
}


const Stack = createStackNavigator<ProfileStackParamList>();

export default function StackNavProfile() {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}} >
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Client List" component={ClientList} />
          <Stack.Screen name="AppointmentCancel" component={AppointmentCancel} />
        </Stack.Navigator>
    )
  }