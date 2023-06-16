import {View, Text, StyleSheet} from 'react-native'
import { useState, useEffect } from 'react'
import FormulaireAppointment from '../components/aptCancel/form'
import { AppointmentType } from '../types/componentTypes'
import { StackScreenProps } from '@react-navigation/stack'
import { CalendarStackParamList } from '../router/StackNavCalendar'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, newUser } from '../redux/store'
import { getUserInfo } from '../apiCalls'

type props = StackScreenProps<CalendarStackParamList, 'AppointmentCancel'>


export default function AppointmentCancel ({navigation, route}: props){
    const user = useSelector((state: RootState) => state.user.info)
    const id = useSelector((state: RootState) => state.user.id)
    const token = useSelector((state: RootState) => state.token.token)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user){
            getUserInfo(id, token)
            .then(json => dispatch(newUser(json))) 
            .catch(err => console.log(err))
        }
    }, [])

    // async function callAPI() {
    //     try {
    //       const response = await axios.get('https://4ef8-31-32-43-205.ngrok-free.app/test');
    //       console.log(response.data);
    //       return response.data
    //     } catch (error) {
    //       console.error(error);
    //     }
    // }

    let appt = route.params.appointment

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Communiquer une indisponibilité</Text>
            <FormulaireAppointment appt={appt} user={user}></FormulaireAppointment>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightskyblue',
        alignItems: 'center',
        paddingTop: 70,
        
    },
    title: {
        color: 'black',
        fontSize: 26,
        fontWeight: '500',
        marginHorizontal: 50,
        textAlign: 'center'
    }

})
