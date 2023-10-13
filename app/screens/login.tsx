import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, newToken, newUser, newId } from '../redux/store'
import type {UserInit, UserAction, TokenInit, TokenAction} from '../redux/store'
import { getUserInfo, signIn } from '../apiCalls'
import {Domain, Scheme} from "../../env/api_conn";


export default function Login() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [authError, setAuthError] = useState<string>('')
    //const token = useSelector((state: RootState) => state.token.token)
    const dispatch = useDispatch()

    const handleSignIn = () => {
        // username: marie.Ddoupeter
        // password: Mdp1234*
        if (username.length == 0 || password.length == 0){
            return
        }
        signIn(username, password)
        .then(json => {
            dispatch(newToken(json.token))
            dispatch(newId(json.id))
            getUserInfo(json.id, json.token)
                .then((json) =>  dispatch(newUser(json)))
                .catch((err) => console.log("err at getUserInfo dans login \n", err) )
        })
        .catch(err => {
            setAuthError(typeof err === "string" ? err : "Une erreur inconnue est survenue")
        })
    }

    return (
        <View>
            <Image
                style={s.logo}
                source={require('../../assets/Adomi_black.png')}
            />
            <Text style={s.title}>Veuillez vous connecter</Text>
            <Text style={s.error}> { authError } </Text>
            <TextInput style={s.input} placeholderTextColor={'#353535'} placeholder={"Nom d'utilisateur"} value={username} onChangeText={(text) => setUsername(text)}/>
            <TextInput style={s.input} placeholderTextColor={'#353535'} placeholder={"Mot de passe"} value={password} textContentType="password" secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
            
            <TouchableOpacity style={s.apptButton} onPress={() => handleSignIn()}>
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
        marginBottom: 45,
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
    error: {
        fontSize: 17.5,
        marginBottom: 22,
        marginHorizontal: 10,
        textAlign: 'center',
        alignSelf: 'center',
        color: 'red',
        fontWeight: '500',
    },

    
})