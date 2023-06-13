import { StyleSheet, Text, View, FlatList, Pressable} from "react-native";
import { AppointmentType } from "../types/componentTypes";
import AllAppointments from "../components/appointmentComponents/allAppointments";
import DisplayModal from "../components/appointmentComponents/appointmentModal"
import type { StackScreenProps } from '@react-navigation/stack';
import type { CalendarStackParamList } from '../router/StackNavCalendar';
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import 'moment/locale/fr';
import { NGROK } from "./ngrokUrl";


type props = StackScreenProps<CalendarStackParamList, 'Appointment'>


export default function Appointments({route, navigation}:props){

    // const carerId = route.params.carerId
    //appointmentData contiendra toutes les données appointments d'un carer
    const [appointmentData, setAppointmentInfo] = useState<AppointmentType[]>();

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    //On stock toutes les infos d'un appointment spécifique dans selectedAppointment
    const [selectedAppointment, setselectedAppointment] = useState<AppointmentType>();

    //url en dur pour effectuer des tests
    const url = NGROK+"/carers/3/appointments"

    const fetchAppointmentInfo = ()=>{

        axios.get(url)
        .then((response) =>{
            const data = response.data;
            setAppointmentInfo(data);
            
        })
        .catch(error => console.log(error))
    }

    // fetch des données appointment
    useEffect(()=>{
        fetchAppointmentInfo()
    }, []);

    const onModalOpen = (item:AppointmentType)=>{

        setselectedAppointment(item)
        setIsModalVisible(true)
    }

    const onModalClose = ()=>{

        setIsModalVisible(false);

    }

    const cancelAppointment = ()=>{

        navigation.navigate('Unavailable', {carerId: 3});
        setIsModalVisible(false);

    };
    
    //Conversion des dates et heures au format fr
    const appointmentDate = moment(selectedAppointment?.date).format('DD MMMM YYYY');
    const startHour = moment(selectedAppointment?.startHour, "HH:mm:ss");
    const endHour = moment(selectedAppointment?.endHour, "HH:mm:ss");

    if(appointmentData?.length === 0){

        return(

            <View style={styles.appointmentContainer}>
        
                <View style={styles.subContainer}>

                    <Text style={styles.title}>A Do Mi</Text>

                    <Text style={styles.subtitle}>Vous n'avez aucun rendez-vous</Text>
                    
                </View>

            </View>

        )

    }
    else{

        return(

            <View style={styles.appointmentContainer}>
    
                <View style={styles.subContainer}>
    
                    <Text style={styles.title}>A Do Mi</Text>
    
                    <Text style={styles.subtitle}>Vos rendez-vous :</Text>
    
                    <FlatList 
    
                        data={appointmentData}
                        renderItem={({item}) => <Pressable onPress={()=>onModalOpen(item)} key={item.id}>
                                                    <AllAppointments {...item}/>
                                                </Pressable>
                                    }
                    />
                    
                    <DisplayModal isVisible={isModalVisible} onClose={onModalClose} id={selectedAppointment?.id} idMission={selectedAppointment?.idMission} date={appointmentDate} startHour={startHour.format("HH") + "H" + startHour.format("mm")} endHour={endHour.format("HH") + "H" + endHour.format("mm")} streetName={selectedAppointment?.streetName} streetNumber={selectedAppointment?.streetNumber} postCode={selectedAppointment?.postCode} city={selectedAppointment?.city} client={selectedAppointment?.mission.client} cancelFunction={cancelAppointment}/>
                </View>
                <View style={styles.bottomLine}/>
        
            </View>
        )

    }
    
}

const styles = StyleSheet.create({
    appointmentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center", 
        padding: 5
    },
    subContainer:{
        height: "80%",
        justifyContent: "center",
        alignItems: "center"

    },
    title:{
        fontSize:35,
        marginBottom: 15
    },
    subtitle:{
        fontSize:18,
        marginBottom: 20

    },
    buttonContainer:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "70%",
        backgroundColor: "#8e91e8"
    },
    actionButton:{
        fontSize: 20
    },
    bottomLine:{
        width: "70%",
        borderWidth: 0.7,
        borderColor: "#006080"
    }
})