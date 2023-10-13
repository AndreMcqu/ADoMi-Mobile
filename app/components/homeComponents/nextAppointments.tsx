import { Text, View, StyleSheet } from "react-native";
import { AppointmentType } from "../../types/componentTypes";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import 'moment/locale/fr';

export default function nextAppointments(appointment: AppointmentType){

    const appointmentDate = moment(appointment.date).format('dddd DD MMMM YYYY');
    const startHour = moment(appointment.startHour, "HH:mm:ss");
    const endHour = moment(appointment.endHour, "HH:mm:ss");

    return (

        <View style={styles.appointmentContainer}>

            <View style={styles.mainInfos}>
                <Text  style={styles.appointmentInfos}>{appointmentDate}</Text>

                <View style={styles.appointmentTime}>
                    <Text style={styles.appointmentInfos}>
                        {startHour.format("HH")}h{startHour.format("mm")}
                    </Text>
                    <FontAwesome
                            name="arrow-right"
                            size={17}
                            color="black"
                            style={styles.arrowIcon}
                        />
                    <Text style={styles.appointmentInfos}>
                        {endHour.format("HH")}h{endHour.format("mm")}
                    </Text>
                </View>

                <Text style={[styles.appointmentInfos, styles.clientName]}>{appointment?.mission.client?.first_name} {appointment?.mission.client?.last_name}</Text>
            </View> 

            <View>
                <Text style={styles.appointmentDirection}>{appointment.streetNumber}, {appointment.streetName}</Text>
            </View>

            <View>
                <Text style={styles.appointmentDirection}>{appointment.postCode} {appointment.city}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    appointmentContainer:{
        backgroundColor: "#99e6ff",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        marginBottom: 10
    },
    mainInfos:{
        justifyContent:"center",
        alignItems: "center",
        marginBottom: 17,
        marginTop: -5,
    },
    arrowIcon:{
        marginTop:10,
        marginHorizontal:5,
        height:20
    },
    appointmentInfos:{
        fontSize:22,
        marginVertical:5,
        marginHorizontal:5
    },
    appointmentTime:{
        flexDirection:"row",
        justifyContent:"center"
    },
    clientName:{
        fontWeight:"bold"
    },
    appointmentDirection:{
        fontSize: 17,
        fontStyle: "italic",
        marginVertical: 2
    },

})