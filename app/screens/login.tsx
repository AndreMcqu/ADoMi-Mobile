import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { NGROK } from "../../ngrok/ngrokUrl";
import axios, {AxiosError} from 'axios'

const resetToken = (token: string) => {
    return {
        type: 'token/new',
        payload: token
    }
}

export default function Login(){
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const token = useSelector((state: RootState) => state.token)
    const dispatch = useDispatch()

    const signIn = () => {
        if (username.length == 0 || password.length == 0){
            return
        }
        // username: marie.Ddoupeter
        // password: Mdp1234*
        const options = {
            method: 'POST',
            url: "http://"+ NGROK + "/sign-in",
            headers: {
                'ngrok-skip-browser-warning': true,
                'User-Agent': 'adomi/1'
            },
            data: {
                username: username,
                password: password
            }
        }
        axios(options)
        .then(res => {
            console.log(res.status)
            dispatch(resetToken(res.data.token))
        })
        .catch((error: AxiosError) => {
            console.log("** FAILED ** ")
            if (error.response) {
                console.log("error response status : ", error.response.status)
                console.log("error response : ", error.response.data)
                return
            }
            if (error.request) {
                console.log("error request : ", error.request)
                return
            }
            console.log('Error unknown : ', error.message)
        })
        
    }

    return (
        <View>
            <Image
                style={s.logo}
                source={require('../../assets/Adomi_black.png')}
            />
            <Text style={s.title}>Veuillez vous connecter</Text>
            <TextInput style={s.input} placeholderTextColor={'#353535'} placeholder={"Nom d'utilisateur"} value={username} onChangeText={(text) => setUsername(text)}/>
            <TextInput style={s.input} placeholderTextColor={'#353535'} placeholder={"Mot de passe"} value={password} textContentType="password" secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
            
            <TouchableOpacity style={s.apptButton} onPress={() => signIn()}>
                <Text style={s.apptButtonText}>Se connecter</Text>
            </TouchableOpacity>

        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white' 
    },
    logo: {
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 65,
        marginBottom: 77,
    },
    title: {
        fontSize: 22,
        marginBottom: 66,
        alignSelf: 'center'
    },
    input: {
        marginVertical: 13,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        width: 190,
        alignSelf: 'center',
        backgroundColor: '#FFC0CB68',
        fontWeight: '400',
        paddingLeft: 15,
    },
    apptButton: {
        backgroundColor: "#9EDEF3",
        width: 130,
        padding: 17,
        alignSelf: 'center',
        marginTop: 62,
        borderRadius: 5.5
      },
    apptButtonText: {
        fontSize: 15,
        fontWeight: '500',
        alignSelf: 'center',
    },
    
    
})