import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import type { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../router/StackNavProfile'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, deleteToken, deleteUser } from '../redux/store';
import { centerVertical, windowHeight } from '../dimensions/dimensions'
import { ScrollView } from 'react-native-gesture-handler';

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
        <ScrollView style={s.container} contentContainerStyle={{alignItems: 'center',}}>
            <Text style={s.name}>{ user?.first_name +  " " + user?.last_name}</Text>

            <View style={s.infoContainer}>
                <View style={{flexDirection: 'column'}}>
                    <View style={s.horizontal}>
                        <Text style={s.info}>Role : </Text>
                    </View>
                    <View style={s.horizontal}>
                        <Text style={s.info}>Secteur : </Text>
                    </View>
                    <View style={s.horizontal}>
                        <Text style={s.info}>Agence : </Text>
                    </View>
                    <View style={s.horizontal}>
                        <Text style={s.info}>Située à : </Text>
                    </View>
                    <View style={s.horizontal}>
                        <Text style={s.info}>Email : </Text>
                    </View>
                    <View style={s.horizontal}>
                        <Text style={s.info}>Username : </Text>
                    </View>
                </View>

                <View style={{flexDirection: 'column'}}>
                    <View style={s.horizontal}>
                        <Text style={s.info_value}> Auxiliaire de vie </Text>
                    </View>
                    <View style={s.horizontal}>
                        <Text style={s.info_value}> Yvelines </Text>
                    </View>
                    <View style={s.horizontal}>
                        <Text style={s.info_value}> {user.agency.name} </Text>
                    </View>
                    <View style={s.horizontal}>
                        <Text style={s.info_value}> {user.agency.adress.length > 35 ? user.agency.adress.substring(0, 32) + "..." : user.agency.adress} </Text>
                    </View>
                    <View style={s.horizontal}>
                        <Text style={s.info_value}> {user.email}</Text>
                    </View>
                    <View style={s.horizontal}>
                        <Text style={s.info_value}> {user.user_name} </Text>
                    </View>
                </View>
            </View>


            <TouchableOpacity style={[s.apptButton, { width: 215 }]}  onPress={() => navigation.navigate('AppointmentCancel', { carerId: parseInt(user.id), type: 'simple_message' })}>
                <Text style={s.apptButtonText}> Envoyer une demande à l'agence </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[s.apptButton, { width: 185, paddingVertical: 12 }]} onPress={() => navigation.navigate('AppointmentCancel', { carerId: parseInt(user.id), type: 'cancel' })}>
                <Text style={s.apptButtonText}>Informer d'une indisponibilité</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[s.apptButton, {backgroundColor: '#FFC0CB', width: 155, paddingVertical: 16.5}]} onPress={() => setLogoutModalDisplay(true)}>
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
        </ScrollView>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    name: {
        fontSize: 29,
        marginTop: 52,
        marginBottom: 38,
    },
    apptButton: {
        backgroundColor: "#9EDEF3",
        width: 215,
        padding: 14,
        alignSelf: 'center',
        marginVertical: 12,
        borderRadius: 8
    },
    apptButtonText: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
    info: {
        fontWeight: 'bold',
        fontSize: 15.5,
        marginRight: 11,
    },
    info_value: {
        fontSize: 15,
        textAlign: 'right',
        flexWrap: 'wrap'
    },
    horizontal: {
        flexDirection: 'row',
        paddingTop: 20,
        flexWrap: 'wrap'
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
    },
    infoContainer: {
        flexDirection: 'row',
        backgroundColor: "#F9F7F5",
        borderRadius: 13,
        paddingTop: 12,
        paddingBottom: 30,
        paddingHorizontal: 35,
        marginBottom: 21,
    }
})