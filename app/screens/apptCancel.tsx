import {View, Text, StyleSheet} from 'react-native'
import axios from 'axios'
import FormulaireAppointment from '../components/aptCancel/form'



export default function AppointmentCancel (){

    // async function callAPI() {
    //     try {
    //       const response = await axios.get('https://4ef8-31-32-43-205.ngrok-free.app/test');
    //       console.log(response.data);
    //       return response.data
    //     } catch (error) {
    //       console.error(error);
    //     }
    // }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Annuler ce rendez-vous ?</Text>
            <FormulaireAppointment></FormulaireAppointment>
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
        fontWeight: '400',
    }

})
