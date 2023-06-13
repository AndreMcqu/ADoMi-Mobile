import {View, Text, StyleSheet} from 'react-native';

export default function Home (){
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>A Do Mi</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 70,

    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: '500',
    }

})
