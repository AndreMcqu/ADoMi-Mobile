import { Pressable, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function editButton({buttonFunction}:any){
    
    return (
        <Pressable onPress={buttonFunction} style={styles.editButton}>
            
            <FontAwesome
                name="pencil"
                size={18}
                color="#25292e"
                label= "Détails"
                style={styles.editIcon}

            />
            <Text>Modifier</Text>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    editButton:{
        flexDirection:"row",
        justifyContent:"center",
        backgroundColor: "#faf9e6",
        width:"50%",
        marginLeft:75,
        marginTop:10,
        borderRadius:9,
        padding:10
    },
    editIcon:{
        marginRight:10,
        color:"#74A9C1"
    }
})