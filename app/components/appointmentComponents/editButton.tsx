import { Pressable, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";

export default function editButton({buttonFunction}:any){
    
    return (
        <Pressable onPress={buttonFunction} style={styles.editButton}>
            
            <FontAwesome
                name="pencil"
                size={18}
                label= "Détails"
                style={styles.editIcon}

            />
        <Text style={styles.editText}>Modifier</Text>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    editButton:{
        flexDirection:"row",
        justifyContent:"center",
        backgroundColor: "#006080",
        width:"50%",
        marginLeft:75,
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