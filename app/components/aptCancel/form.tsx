import {ChangeEvent, SyntheticEvent, useState} from 'react';
import { Button, StyleSheet, Alert, Pressable, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import sendEmail from './sendEmail';
import type { Carer } from '../../types/componentTypes'
import { AppointmentType } from '../../types/componentTypes'
import { Text, View } from 'react-native';
import moment from 'moment'
import {Keyboard} from 'react-native'
import { windowWidth } from '../../dimensions/dimensions'
import { postGeneralRequest } from '../../apiCalls'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store'


const formatHour = (time: string) => moment(time, 'hh:mm:ss').format('HH') + 'h' + moment(time, 'hh:mm:ss').format('mm')
type Props = {
    appt?: AppointmentType,
    user: Carer,
    type: ("cancel" | "simple_message")
}

export default function FormulaireAppointment(props: Props): JSX.Element {
    const token = useSelector((state: RootState) => state.token.token)

    let dateStart = new Date()
    let dateEnd = new Date()
    let defaultCancelText = (props.appt)
        ? ("Bonjour, je vous contacte car je souhaiterais annuler le rdv du " 
            + props.appt.date + " de " + formatHour(props.appt.startHour) + " à " 
            + formatHour(props.appt.endHour) + ", en raison d'une indisponibilité liée à un rdv médical important.")
            + "\n\nCordialement, "
        : "Bonjour, je vous contacte car je souhaiterais vous prévenir de mon incapacité à répondre aux missions prévues entre le " 
            + moment(dateStart).format('DD/MM/YYYY') + " à " + formatHour(dateStart.toISOString()) + " et le " + moment(dateEnd).format('DD/MM/YYYY') 
            + " à " + formatHour(dateEnd.toISOString()) + ", en raison d'une indisponibilité liée à un rdv médical important."
            + "\n\nCordialement, "
    let defaultMessageText = "\nVous pouvez écrire votre message ici, nous vous répondrons par mail ou téléphone si nécessaire."


    defaultCancelText += props.user ? `\n${props.user?.first_name} ${props.user?.last_name}, `: ""

    

    const [input, setInput] = useState(props.type === 'simple_message' ? defaultMessageText : defaultCancelText);
    const [isError, setError] = useState(false)
    const [isSuccess, setSuccess] = useState(false)

    const sendInput = async () => {
        if (input) {
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
        else {
            alert('Veuillez saisir un corps de message !')
        }
    }

    const postMessage = async () => {
        await postGeneralRequest(props.user.id!, token, input)
        .then((res) => { 
            if (res) setSuccess(true); setError(false) 
        })
        .catch((err) => { setError(true); setSuccess(false) })
    }


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={s.formulaire}>
                <TextInput
                    multiline = {true}
                    numberOfLines = {50}
                    style={s.textInput}
                    onChangeText={(value)=>{setInput(value)}}
                    value={input}
                />
                <Text style={[s.error, isError ? {display: 'flex'} : {display: 'none'}]}> Une erreur inconnue est survenue. </Text>
                <Text style={[s.success, isSuccess ? {display: 'flex'} : {display: 'none'}]}> Le message a bien été envoyé. </Text>

                <TouchableOpacity  style={s.pressableButton} onPress = { postMessage }>
                    <Text style={s.textButton}>Confirmer</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}


const s = StyleSheet.create({
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
        width: windowWidth * 0.80,
        marginHorizontal: windowWidth * 0.20,
        height: 370,
        borderWidth: 1.5,
        padding: 19,
        paddingTop: 20,
        borderRadius:5,
        fontSize: 17,
    },
    error: {
        marginTop: 29,
        marginBottom: -18,
        fontSize: 20,
        fontWeight: '500',
        color: 'red'
    }, 
    success: {
        marginTop: 29,
        marginBottom: -18,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green'
    }
    
  });