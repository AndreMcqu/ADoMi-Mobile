import { Pressable, Text, StyleSheet } from "react-native";

export default function cancelButton({cancelFunction}:any){
    
    return (
        <Pressable onPress={cancelFunction} style={styles.editButton}>

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