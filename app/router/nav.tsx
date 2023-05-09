import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import Home from '../screens/home'
import { Ionicons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator()

const screenOptions: {[key: string] : BottomTabNavigationOptions} = {
    home: {
        tabBarLabel:"Accueil",
        tabBarIcon: () => <Ionicons name="md-home" size={30} color="#DB7093" />,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500', color: '#DB7093' }
    }
}

export default function Nav(){
    return (
        <Tab.Navigator backBehavior="firstRoute" screenOptions={{headerShown: false}}>
            <Tab.Screen name='home' options={screenOptions.home} component={Home}/>
        </Tab.Navigator>
    )
}
