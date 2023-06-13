import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Client } from '../types/componentTypes'

const clientExemple = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'example@example.com',
    phone:'0610101010',
    street_number:'3',
    street_name:'rue Jean Jaures',
    post_code:'78000',
    city:'Versailles',
}
const clients: Client[] = []
clients.push(clientExemple)

const renderer = (itemObj: { item: Client }) => {
    let client = itemObj.item
    return (
        <View>
            <Text>{/*clients.first_name + client.last_name*/}</Text>
        </View>
    )
}

export default function ClientList (){
    return (
        <View style={s.container}>
            <Text style={s.title}>Mes clients</Text>
            <FlatList data={clients} renderItem={renderer} />
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
    }
})