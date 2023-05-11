import { View, Modal, Text, StyleSheet, Pressable} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import EditButton from "./editButton";
import { DisplayModalProps } from "../../types/componentTypes";
import { useEffect, useState } from "react";
import moment from "moment";
import 'moment/locale/fr';

export default function displayModal(props:DisplayModalProps){   

    const appointmentDate = moment(props.date).format('DD MMMM YYYY');
    const startHour = moment(props.startHour, "HH:mm:ss");
    const endHour = moment(props.endHour, "HH:mm:ss");
    const [editMode, setEditMode] = useState<boolean>(false);

    const editAppointment = ()=>{
        alert('fonction modif en construction');
        setEditMode(true);
    };

    return (

        <Modal animationType="slide" transparent={true} visible={props.isVisible}>

            <View style={styles.modalContent}>

                <Pressable onPress={props.onClose} style={styles.closeButton}>
                    <FontAwesome name="close" color="#fff" size={30} />
                </Pressable>

                <View style={styles.infosContainer}>

                    <Text>
                        <Text style={styles.infoLabel}>- Date : </Text> 
                        <Text>Le {appointmentDate}</Text>
                    </Text>
                    
                </View>

                <View style={styles.infosContainer}>

                    <Text>
                        <Text style={styles.infoLabel}>- Horaire : </Text> 
                        <Text>De {startHour.format("HH:mm")} à {endHour.format("HH:mm")}</Text>
                    </Text>

                </View>

                <View style={styles.infosContainer}>

                    <Text>
                        <Text style={styles.infoLabel}>- Adresse : </Text> 
                        <Text>{props.streetNumber}, {props.streetName}</Text>
                    </Text>

                </View>

                <View style={styles.infosContainer}>

                    <Text>
                        <Text style={styles.infoLabel}>- Ville : </Text> 
                        <Text>{props.city}, {props.postCode}</Text>
                    </Text>

                </View>



                
                <EditButton buttonFunction={editAppointment}/>

            </View>

        </Modal>

    )
}

const styles = StyleSheet.create({
    modalContent:{
        justifyContent:"center",
        alignItems:"flex-start",
        padding: 10,
        width: '90%',
        backgroundColor: '#a2a8b0',
        borderRadius: 18,
        position: 'absolute',
        top: 200,
        left:20

    },
    infosContainer:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 5,
        marginBottom:2
    },
    infoLabel:{
        fontWeight:"bold",
        fontSize: 16

    },
    closeButton:{
        alignSelf:"flex-end",
    }
})
