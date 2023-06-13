import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/profile'
import ClientList from '../screens/clientList'
import AppointmentCancel from '../screens/apptCancel'

export type ProfileStackParamList = {
  Profile: {carerId: number}
  "Client List": {carerId: number}
  Unavailable: {carerId: number}
}


const Stack = createStackNavigator<ProfileStackParamList>();

export default function StackNavProfile() {
    return (
      <Stack.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}} >
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Client List" component={ClientList} />
        <Stack.Screen name="Unavailable" component={AppointmentCancel} />
      </Stack.Navigator>
    )
  }