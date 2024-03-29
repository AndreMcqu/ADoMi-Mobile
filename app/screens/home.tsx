import { View, Text, StyleSheet, FlatList, Pressable, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { fetchLatestAppointments, getAppointments } from '../apiCalls'
import {Scheme, Domain} from '../../env/api_conn';
import { useState, useEffect } from "react";
import { AppointmentType } from '../types/componentTypes';
import axios from 'axios';
import NextAppointments from '../components/homeComponents/nextAppointments';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../router/StackNavHome';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../redux/store'

type props = StackScreenProps<HomeStackParamList, "Home">

export default function Home({ route, navigation }: props) {

    const [appointmentData, setAppointmentData] = useState<AppointmentType[]>([]);
    const token = useSelector((state: RootState) => state.token.token)
    const userId = useSelector((state: RootState) => state.user.id)

    const fetchAppts = () => getAppointments(userId, token)
    .then((appts: AppointmentType[]) => { 
            let todayIndex = appts.reverse().findIndex((a) => new Date(a.date) >= new Date())
            appts = appts.slice(todayIndex)
            setAppointmentData(appts)
    })

    useEffect(() => {
            fetchAppts()
            const i = setInterval(() => {
                fetchAppts()
            }, 30000)
        return () => clearInterval(i)
    }, [])


    if (!appointmentData?.length) {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>A Do Mi</Text>

                <View style={styles.appointmentSection}>
                    <Text style={styles.subtitle}>Aucun rendez-vous prévu prochainement</Text>

                    <TouchableOpacity style={styles.apptButton} onPress={() => navigation.navigate('Appointments', { carerId: 3 })}>
                        <Text style={styles.apptButtonText}>Voir tous les rendez-vous</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.apptButton} onPress={() => navigation.navigate("calendar", { carerId: 3 })}>
                        <Text style={styles.apptButtonText}>Consulter le calendrier</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>A Do Mi</Text>
            <Text style={styles.subtitle}>Prochains rendez-vous :</Text>

            <FlatList
                data={appointmentData}
                renderItem={({ item }) =>
                        <NextAppointments key={item.id} {...item} />
                }
            />

            <TouchableOpacity style={styles.apptButton} onPress={() => navigation.navigate('Appointments', { carerId: 3 })}>
                <Text style={styles.apptButtonText}>Voir tous les rendez-vous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.apptButton, {marginTop: 3, marginBottom: 11}]} onPress={() => navigation.navigate("calendar", { carerId: 3 })}>
                <Text style={styles.apptButtonText}>Consulter le calendrier</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'pink',
        alignItems: 'center',
        paddingTop: 70,
        height: "100%",
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    test: {
        borderWidth: 1,
        borderColor: "black"
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: '500',
        marginTop: 14,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 21,
        marginBottom: 22,
        textAlign: "center",
    },
    appointmentSection: {
        width: "80%",
        marginTop: 25,
    },
    buttonsContainer: {
        marginTop: 0
    },
    apptButton: {
        backgroundColor: "#FFC0CB",
        width: "80%",
        padding: 17,
        alignSelf: 'center',
        borderRadius: 5.5,
        marginTop: 5,
        marginBottom: 7
    },
    apptButtonText: {
        fontSize: 15,
        fontWeight: '500',
        alignSelf: 'center',
    }

})
