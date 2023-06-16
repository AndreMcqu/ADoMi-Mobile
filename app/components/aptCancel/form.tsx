import {ChangeEvent, SyntheticEvent, useState} from 'react';
import { Button, StyleSheet, Alert, Pressable, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import sendEmail from './sendEmail';
import type { Carer } from '../../types/componentTypes'
import { AppointmentType } from '../../types/componentTypes'
import { Text, View } from 'react-native';
import moment from 'moment'
import {Keyboard} from 'react-native'

const formatHour = (time: string) => moment(time, 'hh:mm:ss').format('HH') + 'h' + moment(time, 'hh:mm:ss').format('mm')


export default function FormulaireAppointment(props: {appt?: AppointmentType, user?: Carer}): JSX.Element {

    let dateStart = Date()
    let dateEnd = Date()
    let defaultText = (props.appt) 
        ? ("Bonjour, je vous contacte car je souhaiterais annuler le rdv du " 
            + props.appt.date + " de " + formatHour(props.appt.startHour) + " à " 
            + formatHour(props.appt.endHour) + ", en raison d'une indisponibilité liée à un rdv médical important.")
            + "\n\nCordialement, "
        : "Bonjour, je vous contacte car je souhaiterais vous prévenir de mon incapacité à répondre aux missions prévues entre le " 
            + moment(dateStart).format('DD/MM/YYYY') + " à " + formatHour(dateStart) + " et le " + moment(dateEnd).format('DD/MM/YYYY') 
            + " à " + formatHour(dateEnd) + ", en raison d'une indisponibilité liée à un rdv médical important."
            + "\n\nCordialement, "

    defaultText += props.user ? `\n${props.user?.first_name} ${props.user?.last_name}, `: ""

    

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.formulaire}>
            <TextInput
                multiline = {true}
                numberOfLines = {50}
                style={styles.textInput}
                onChangeText={(value)=>{setInput(value)}}
                value={input}
            />
            <TouchableOpacity  style={styles.pressableButton} onPress={sendInput}>
                <Text style={styles.textButton}>Confirmer</Text>
            </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
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
        height: 370,
        borderWidth: 1.5,
        padding: 19,
        paddingTop: 20,
        borderRadius:5,
        fontSize: 17,
    }
    
  });