import { StyleSheet, Text, View, FlatList, Pressable} from "react-native";
import { AppointmentType } from "../types/componentTypes";
import AllAppointments from "../components/appointmentComponents/allAppointments";
import DisplayModal from "../components/appointmentComponents/appointmentModal"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Appointments(){

    //appointmentData contiendra toutes les données appointments d'un carer
    const [appointmentData, setAppointmentInfo] = useState<AppointmentType[]>();

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    //On stock toutes les infos d'un appointment spécifique dans selectedAppointment
    const [selectedAppointment, setselectedAppointment] = useState<AppointmentType>();

    //url en dur pour effectuer des tests
    const url = "https://3428-31-32-43-205.ngrok-free.app/carers/3/appointments"

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

    const appointmentObj = (selectedAppointment)? {
            id: selectedAppointment.id,
            idMission: selectedAppointment.idMission,
            isVisible: isModalVisible,
            onClose: {onModalClose},
            date: selectedAppointment.date,
            startHour: selectedAppointment.startHour,
            endHour: selectedAppointment.endHour,
            streetName: selectedAppointment.streetName,
            streetNumber: selectedAppointment.streetNumber,
            postCode: selectedAppointment.postCode,
            city: selectedAppointment.city,
        } : null

    return(
        <View style={styles.appointmentContainer}>

            <View style={styles.subContainer}>

                <Text style={styles.title}>Liste de vos rendez-vous</Text>

                <FlatList 

                    data={appointmentData}
                    renderItem={({item}) => <Pressable onPress={()=>onModalOpen(item)} key={item.id}>
                                                <AllAppointments {...item}/>
                                            </Pressable>
                                }
                />
                

                <DisplayModal isVisible={isModalVisible} onClose={onModalClose} id={selectedAppointment?.id} idMission={selectedAppointment?.idMission} date={selectedAppointment?.date} startHour={selectedAppointment?.startHour} endHour={selectedAppointment?.endHour} streetName={selectedAppointment?.streetName} streetNumber={selectedAppointment?.streetName} postCode={selectedAppointment?.postCode} city={selectedAppointment?.city}/>
            </View>
            <View style={styles.bottomLine}/>
    
        </View>
    )
}

const styles = StyleSheet.create({
    appointmentContainer: {
        flex: 1,
        backgroundColor: "#e4f0ec",
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
        color: "white",
        backgroundColor: "#94A7AF",
        fontSize:25,
        borderWidth: 3,
        borderColor: "#3E4C52",
        borderRadius: 8,
        padding: 10,
        marginBottom: 5
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
        borderColor: "grey"
    }
})