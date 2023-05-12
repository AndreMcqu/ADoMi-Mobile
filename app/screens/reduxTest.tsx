import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../redux/store'

const getApiData = () => {
    //console.log('Hé ho !')
    axios.get("https://658c-31-32-43-205.ngrok-free.app/carers/3", {
        headers: {
            'ngrok-skip-browser-warning': true,
            'User-Agent': 'adomi/1'
        }
    })
    .then(res => console.log(res.status))
    .catch((error: AxiosError) => {
        console.log("** FAILED ** ")
        if (error.response) {
            console.log("error response status : ", error.response.status)
            console.log("error response headers : ", error.response.headers)
            console.log("error response : ", error.response.data)
            return
        }
         if (error.request) {
            console.log("error request : ", error.request)
            return
        }
        console.log('Error unknown : ', error.message)
        //console.log(error.config);
    })
}


const resetToken = (token: string) => {
    return {
        type: 'token/new',
        payload: token
    }
}


export default function ReduxTest (){
        const [text, setText] = useState<string>()
        const token = useSelector((state: RootState) => state.token)
        const dispatch = useDispatch()    
        //getApiData()
    return (
        <View style={s.container}>
            <Text style={s.title}>Bonjour</Text>
            <TextInput style={s.textInput} onChangeText={(val) => setText(val)}/>
            <TouchableOpacity 
                style={s.button} 
                onPress={() => text && dispatch(resetToken(text))}
            >
                <Text style={s.buttonText}>Set Token</Text>
            </TouchableOpacity>
            <Text style={s.tokenText}>Token : { token }</Text>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        paddingTop: 73,
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: '400',
    },
    textInput: {
        width: 170,
        height: 30,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: 'black',
        marginTop: 67
    },
    button: {
        backgroundColor: 'lightblue',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 7,
        marginTop: 23,
        marginBottom: 55
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
    },
    tokenText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '400',
    }
})
