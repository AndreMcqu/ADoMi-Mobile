import { StyleSheet, Text, View} from "react-native";
import { AppointmentType } from "../../types/componentTypes";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import 'moment/locale/fr';

export default function AllAppointments(appointment: AppointmentType){

    const appointmentDate = moment(appointment.date).format('DD MMMM YYYY');

    return (

        <View style={styles.bouttonRdv}>
            <Text style={styles.appointmentText}>{appointmentDate}</Text>

            <FontAwesome
                name="search"
                size={18}
                color="#25292e"
                style={styles.searchIcon}
            />
        </View>

    )
  }

  const styles = StyleSheet.create({
    bouttonRdv:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical:10,
        padding:10,
        backgroundColor: "beige",
        minWidth: 225,
        borderRadius: 8
    },
    searchIcon:{
        marginLeft:15,
        marginRight:10,
        fontSize:30,
        color: "#74A9C1"
    },
    appointmentText:{
        fontSize: 25,
        fontStyle: "italic",
        marginLeft:15
    }
  })
