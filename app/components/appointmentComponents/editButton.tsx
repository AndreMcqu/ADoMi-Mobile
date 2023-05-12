import { Pressable, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";

export default function editButton({buttonFunction}:any){
    
    return (
        <Pressable onPress={buttonFunction} style={styles.editButton}>
            
            {/* <FontAwesome
                name="pencil"
                size={18}
                label= "Détails"
                style={styles.editIcon}

            /> */}
        <Text style={styles.editText}>Annuler le rendez-vous</Text>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    editButton:{
        flexDirection:"row",
        justifyContent:"center",
        backgroundColor: "#ff471a",
        width:"60%",
        marginLeft:65,
        marginTop:10,
        borderRadius:9,
        padding:10
    },
    editIcon:{
        marginRight:10,
        color:"white"
    },
    editText:{
        color: "white"
    }
})