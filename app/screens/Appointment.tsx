import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import type { CalendarStackParamList } from '../router/StackNavCalendar'
import { windowWidth, windowHeight } from '../dimensions/dimensions'
import { AppointmentType, Client } from '../types/componentTypes'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type props = StackScreenProps<CalendarStackParamList, 'Appointment'>


/*
      <View>
        <View>
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

*/
export default function LoneAppointment ({route, navigation}: props) {
    const carer = useSelector((state: RootState) => state.user.info)
    const id = useSelector((state: RootState) => state.user.id)
    const token = useSelector((state: RootState) => state.token.token)
    const dispatch = useDispatch()

    const appt = route.params.appointmentInfo
    //const appt = {date: '2023-11-02', startHour: '12:00:00', endHour: '13:30:00', streetName: 'cumbersome street', streetNumber: '7', postCode: '77001', city: 'Manchester'}
    const mission = route.params.appointmentInfo.mission
    const client = route.params.appointmentInfo.mission.client!
    const recurences = ['hebdomadaire', 'mensuel', 'bi-mensuel']


    console.warn(mission)
    
    return (
    <ScrollView style={s.container} contentContainerStyle={{alignItems: 'center',}}>

        <Text style={s.name}> Fiche de RDV </Text>

        <View style={s.infoContainer}>
            <View style={{flexDirection: 'column'}}>

                <View style={s.horizontal}>
                    <Text style={s.info}>Client : </Text>
                </View>
                <View style={[s.horizontal, {paddingTop: 10} ]}>
                    <Text style={s.info_value}> { client.first_name + " " +client.last_name} </Text>
                </View>

                <View style={s.horizontal}>
                    <Text style={s.info}>Adresse : </Text>
                </View>
                <View style={[s.horizontal, {paddingTop: 10} ]}>
                    <Text style={s.info_value}> { appt.streetNumber + " " + appt.streetName } </Text>
                    <Text style={s.info_value}> { appt.postCode  + ", " + appt.city } </Text>
                </View>

                <View style={s.horizontal}>
                    <Text style={s.info}>Email : </Text>
                </View>
                <View style={[s.horizontal, {paddingTop: 10} ]}>
                    <Text style={s.info_value}> { `${client.first_name.toLowerCase()}.${client.last_name.toLowerCase() + Math.floor(Math.random()*100)}@gmail.com` } </Text>
                </View>

                <View style={s.horizontal}>
                    <Text style={s.info}> Heure </Text>
                </View>
                <View style={[s.horizontal, {paddingTop: 10} ]}>
                    <Text style={s.info_value}> { appt.startHour } à {appt.endHour}</Text>
                </View>

            </View>
        </View>


        <TouchableOpacity style={[s.apptButton, { width: 215 }]}  onPress={() => navigation.navigate('AppointmentCancel', { carerId: parseInt(carer.id), type: 'simple_message' })}>
            <Text style={s.apptButtonText}> Envoyer une demande à l'agence </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[s.apptButton, { width: 185, paddingVertical: 12, backgroundColor: "#FFC0CB" }]} onPress={() => navigation.navigate('AppointmentCancel', { carerId: parseInt(carer.id), type: 'cancel', appointment: appt })}>
            <Text style={s.apptButtonText}>Informer d'une indisponibilité</Text>
        </TouchableOpacity>
        

    </ScrollView>

    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    name: {
        fontSize: 29,
        marginTop: 52,
        marginBottom: 38,
        fontWeight: '500',
    },
    apptButton: {
        backgroundColor: "#9EDEF3",
        width: 215,
        padding: 14,
        alignSelf: 'center',
        marginVertical: 12,
        borderRadius: 8
    },
    apptButtonText: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
    info: {
        fontSize: 18,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        marginRight: 11,
    },
    info_value: {
        paddingVertical: 0.6,
        fontSize: 16.5,
        flexWrap: 'wrap',
        fontWeight: '500',
        paddingLeft: 5,
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        textAlignVertical: 'center',
        paddingTop: 20,
        //maxWidth: windowWidth * 0.70
    },
    confirmDiv: {
        zIndex: 1,
        padding: 10,
        position: 'absolute',
        bottom: (windowHeight / 2) - 140,
        backgroundColor: 'white',
        paddingTop: 32,
        paddingBottom: 45,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    confirmButtonDiv: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    confirmButton: {
        backgroundColor: "#FFC0CB",
        minWidth: 93,
        padding: 12,
        alignSelf: 'center',
        borderRadius: 5.5
    },
    confirmText: {
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
        marginBottom: 35,
    },
    infoContainer: {
        flexDirection: 'row',
        backgroundColor: "#F9F7F5",
        borderRadius: 13,
        paddingTop: 12,
        paddingBottom: 30,
        paddingHorizontal: 35,
        marginBottom: 21,
        width: windowWidth * 0.87
    }
})
