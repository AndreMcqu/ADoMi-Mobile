import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import type { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../router/StackNavProfile'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, deleteToken, deleteUser } from '../redux/store';
import { centerVertical, windowHeight } from '../dimensions/dimensions'

type props = StackScreenProps<ProfileStackParamList, 'Profile'>


export default function Profile({ route, navigation }: props) {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.info)
    const [logoutModalDisplay, setLogoutModalDisplay] = useState<boolean>(false)

    function logout() {
        dispatch(deleteUser())
        dispatch(deleteToken())
    }

    return  (
        <View style={s.container}>
            <Text style={s.name}>{ user?.first_name}</Text>

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
                <Text> {user?.email}</Text>
            </View>

            <TouchableOpacity style={s.apptButton} onPress={() => navigation.navigate('AppointmentCancel', { carerId: 1 })}>
                <Text style={s.apptButtonText}>Informer d'une indisponibilité</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[s.apptButton, {backgroundColor: '#FFC0CB'}]} onPress={() => setLogoutModalDisplay(true)}>
                <Text style={s.apptButtonText}>Se déconnecter</Text>
            </TouchableOpacity>

            {
                logoutModalDisplay && 
                <View style={s.confirmDiv}>
                    <Text style={s.confirmText}> Êtes vous certain de vouloir vous déconnecter ? </Text>
                    <View style={s.confirmButtonDiv}>
                        <TouchableOpacity style={s.confirmButton} onPress={ () => logout() }>
                            <Text style={s.apptButtonText} >Oui </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[s.confirmButton, {backgroundColor: '#9EDEF3'}]} onPress={ () => setLogoutModalDisplay(false) }>
                            <Text style={s.apptButtonText} >Non </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
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
        backgroundColor: "#9EDEF3",
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
    },
    confirmDiv: {
        zIndex: 1,
        padding: 10,
        position: 'absolute',
        bottom: (windowHeight / 2) - 140,
        backgroundColor: 'white',
        paddingTop: 32,
        paddingBottom: 45,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    confirmButtonDiv: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    confirmButton: {
        backgroundColor: "#FFC0CB",
        minWidth: 93,
        padding: 12,
        alignSelf: 'center',
        borderRadius: 5.5
    },
    confirmText: {
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
        marginBottom: 35,
    }
})