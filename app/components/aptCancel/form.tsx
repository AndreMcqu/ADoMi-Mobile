import {ChangeEvent, SyntheticEvent, useState} from 'react';
import { Button, StyleSheet, Alert, Pressable, TextInput, TouchableOpacity } from 'react-native';
import sendEmail from './sendEmail';
import { AppointmentType } from '../../types/componentTypes'
import { Text, View } from 'react-native';
import moment from 'moment'

const formatHour = (time: string) => moment(time, 'hh:mm:ss').format('HH') + 'h' + moment(time, 'hh:mm:ss').format('mm')


export default function FormulaireAppointment(props: {appt: AppointmentType}): JSX.Element {

    const defaultText = "Bonjour, je vous contacte car je souhaiterais annuler le rdv du " + props.appt.date + " de " + formatHour(props.appt.startHour) + " à " + formatHour(props.appt.endHour) + ", en raison d'une indisponibilité liée à un rdv médical important."
    const [input, setInput] = useState(defaultText);


    const sendInput = async () => {
        if(input){
            console.log(input);
            sendEmail(
                'konomoha@hotmail.fr',
                'Annulation de rendez-vous',
                input,
                'andre@ironman.com; theo@rouille.fr; lucas@linux.gmail'
            ).then(() => {
                console.log('Message envoyé!');
            }).catch((err)=>{
                console.log(err);
            })
        }
        else{
            alert('Veuillez saisir un corps de message !')
        }
    }

    return(
        <View style={styles.formulaire}>
            <TextInput
                multiline = {true}
                numberOfLines = {20}
                style={styles.textInput}
                onChangeText={(value)=>{setInput(value)}}
                value={input}
            />
            <TouchableOpacity  style={styles.pressableButton} onPress={sendInput}>
                <Text style={styles.textButton}>Confirmer</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    formulaire: {
      marginVertical: 49,
      alignItems:'center'
    },
    pressableButton:{
        backgroundColor: "#FFC0CB",
        borderWidth:1,
        borderRadius:6,
        paddingVertical: 15,
        paddingHorizontal: 26,
        marginTop: 48,
    },
    textButton:{
        textAlign:'center',
        justifyContent:'center',
        fontWeight: "600",
        fontSize: 16,
    },
    textInput:{
        backgroundColor:"#edf2f7",
        marginHorizontal: '8%',
        height: 200,
        borderWidth: 1.5,
        padding: 21,
        paddingTop: 18,
        borderRadius:5,
        fontSize: 17,
    }
    
  });