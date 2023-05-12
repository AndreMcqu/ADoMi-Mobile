import React ,{ChangeEvent, SyntheticEvent, useState} from 'react';
import { Button, StyleSheet, Alert, Pressable, TextInput } from 'react-native';

import { Text, View } from 'react-native';

export default function FormulaireAppointment(): JSX.Element {

    const [input, setInput] = React.useState('');

    const sendInput = () => {
        //imaginer un envoi de mail
    }

    return(
        <View style={styles.formulaire}>
            <TextInput
                style={styles.input}
                onChangeText={(value)=>{setInput(value)}}
                placeholder="Raison de l'annulation"
            />
            <Pressable  style={styles.pressableButton} onPress={sendInput}>
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