import {View, Text, StyleSheet} from 'react-native'
import axios from 'axios'


//https://42ff-31-32-43-205.ngrok-free.app



// axios.get('https://42ff-31-32-43-205.ngrok-free.app/test')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   });

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
