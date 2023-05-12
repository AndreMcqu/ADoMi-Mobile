import { Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function showButton({buttonFunction}:any){

    return (
        <Pressable onPress={buttonFunction}>
            
            <FontAwesome
                name="eye"
                size={18}
                color="#25292e"
                label= "Détails"
                style={styles.actionButton}
            />

        </Pressable>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        fontSize: 30
    }
  })
