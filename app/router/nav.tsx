import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import Home from '../screens/home'
import Appointments from '../screens/appointments';
import ReduxTest from '../screens/reduxTest';

import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
const Material = MaterialCommunityIcons;

const Tab = createBottomTabNavigator()

const screenOptions: {[key: string] : BottomTabNavigationOptions} = {
    home: {
        tabBarLabel:"Accueil",
        tabBarIcon: () => <Ionicons name="md-home" size={30} color="#DB7093" />,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500', color: '#DB7093' }
    },
    appointments: {
        tabBarLabel: "Rendez-vous",
        tabBarIcon: ()=> <Ionicons name="md-list" size={30} color="#DB7093"/>,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500', color: '#DB7093' }
    },
    reduxTest: {
        tabBarLabel: "Test-redux",
        tabBarIcon: ()=> <Material name="test-tube" size={30} color="#DB7093"/>,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500', color: '#DB7093' }
    }
}

export default function BottomTabNav(){
    return (
        <Tab.Navigator initialRouteName="home" screenOptions={{headerShown: false}} >
            <Tab.Screen name='home' options={screenOptions.home} component={Home}/>
            <Tab.Screen name='appointments' options={screenOptions.appointments} component={Appointments}/>
            <Tab.Screen name='reduxTest' options={screenOptions.reduxTest} component={ReduxTest}/>
        </Tab.Navigator>
    )
}
