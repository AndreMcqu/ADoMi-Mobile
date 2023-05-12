import {View, Text, StyleSheet} from 'react-native'

export default function Home (){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aloha</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        paddingTop: 70,

    },
    title: {
        color: 'black',
        fontSize: 26,
        fontWeight: '400',
    }

})
