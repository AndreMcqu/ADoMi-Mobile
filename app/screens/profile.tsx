import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import type { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../router/StackNavProfile'
import NGROK from '../../ngrok/ngrokUrl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, newUser, newId } from '../redux/store';
import { getUserInfo } from '../apiCalls'

type props = StackScreenProps<ProfileStackParamList, 'Profile'>

/*
type useStateReturn<T> = [() => T|null, (newVal: T) => void]
function useState2<T>(initial: T, callback: () => void): useStateReturn<T>{
    let state: T|null = initial ?? null
    const getState = () => state
    const setState = (newVal: T) => {
        state = newVal
        callback()
    }
    return [getState, setState]
}
*/

export default function Profile({ route, navigation }: props) {
    //const [b, triggerReload] = useState<boolean>(true)
    //const [info, setInfo] = useState2({}, () => triggerReload(!b))
    const dispatch = useDispatch()
    const token = useSelector((state: RootState) => state.token.token)
    const id = useSelector((state: RootState) => state.user.id)
    const user = useSelector((state: RootState) => state.user.info)

    useEffect(() => {
        getUserInfo(token, id)
            .then((json) =>  dispatch(newUser(json)))
            .catch((err) => undefined )
    }, [])


    //console.log(user)

    
     return user 
        ?
            (
                <View style={s.container}>
                    <Text style={s.name}>{ user.first_name}</Text>

                    <View style={s.horizontal}>
                        <Text style={s.cap}>Secteur :</Text>
                        <Text> Yvelines</Text>
                    </View>

                    <View style={s.horizontal}>
                        <Text style={s.cap}>Agence :</Text>
                        <Text> Yvelines</Text>
                    </View>

                    <View style={s.horizontal}>
                        <Text style={s.cap}>E-mail :</Text>
                        <Text> {user.email}</Text>
                    </View>

                    <TouchableOpacity style={s.apptButton} onPress={() => navigation.navigate('AppointmentCancel', { carerId: 1 })}>
                        <Text style={s.apptButtonText}>Informer d'une indisponibilité</Text>
                    </TouchableOpacity>
                </View>
            )
        : 
            (
                <View style={s.container}>
                </View>
            )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 75,
    },
    name: {
        fontSize: 25
    },
    apptButton: {
        backgroundColor: "#FFC0CB",
        width: 215,
        padding: 14,
        alignSelf: 'center',
        marginTop: 62,
        borderRadius: 5.5
    },
    apptButtonText: {
        fontSize: 15,
        fontWeight: '500',
        alignSelf: 'center',
    },
    cap: {
        fontWeight: 'bold'

    },
    horizontal: {
        flexDirection: 'row',
        paddingTop: 20,
    }
})