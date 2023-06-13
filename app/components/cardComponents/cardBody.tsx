import { StyleSheet, Text, View} from "react-native";


export default function CardBody (){
const Place = () => {}

    return (
    <View style={styles.container}>
        <View style={styles.client}>
            <Text>Mme.</Text>
            <Text>Nom</Text>
            <Text>Prenom</Text>
        </View>
        <View style={styles.rdv}>
            <Text>RDV</Text>
            <Text>date</Text>
        </View>
        <View style={styles.adresse}>
         <Text>Adresse:</Text>
         <Text>street_number / street_name</Text>
         <Text>post_code</Text>
         <Text>city</Text>
        </View>
        
    </View>
    )
}

const styles = StyleSheet.create({
    container:{},
    client:{},
    rdv:{},
    adresse:{},
})