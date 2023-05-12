import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../router/StackNavProfile'

type props = StackScreenProps<ProfileStackParamList, 'Profile'>


export default function Profile ({route, navigation}: props){
    return (
        <View style={s.container}>
            <Text style={s.name}>Mme. Machin</Text>
            <TouchableOpacity style={s.apptButton} onPress={() => navigation.navigate('Unavailable', {carerId: 1})}>
                <Text style={s.apptButtonText}>Informer d'une indisponibilité</Text>
            </TouchableOpacity>
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
    }    
})