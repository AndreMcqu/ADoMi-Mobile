
import React ,{ChangeEvent, SyntheticEvent, useState} from 'react';
import { Button, StyleSheet, Alert, Pressable, TextInput } from 'react-native';

import { Text, View } from 'react-native';
import { AppointmentProps } from '../../types/componentTypes';

export default function FormulaireAppointment(appointment: AppointmentProps): JSX.Element {

    const [input, setInput] = React.useState('');

    const dispAppt = appointment.id
    let message = 'Bonjour {client.prenom} {client.nom},'
    message += 'Vous recevez ce message pour vous informer que votre rendez-vous du {appointment.date} doit être annulé par votre Carer {carer.nom}.'
    message += 'Nous essayons maintenant de trouver un remplacement pour cette préstation. Vous recevrez un mail de confirmation quand cela sera fait.'
    message += 'Si vous souhaitez effectué un changement sur votre préstation, rendez-vous sur notre site web.'

    const sendInput = (contenuMessage: string) => {
        //imaginer un envoi de mail
        console.log(contenuMessage)
        return void
    }

    return(
        <View style={styles.formulaire}>
            <TextInput
                style={styles.input}
                onChangeText={(value)=>{setInput(value)}}
                placeholder={message}
                value={message}
            />
            <Pressable  style={styles.pressableButton} onPress={sendInput(input)}>
                <Text style={styles.textButton}>Confirmer</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    formulaire: {
      width:'80%',
      marginVertical: '5%',
      marginHorizontal:'10%',
      alignItems:'center'
    },
    pressableButton:{
        width:'50%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
    },
    textButton:{
        borderWidth:1,
        borderRadius:5,
        padding:10,
        textAlign:'center',
        justifyContent:'center'
    },
    input:{
        textAlign:'center',
        height: 200,
        width:'80%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:5,
    }
    
  });