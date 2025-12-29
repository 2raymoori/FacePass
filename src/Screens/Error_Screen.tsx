import { Text, View, StyleSheet } from "react-native";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import TextLayer3 from "../Components/TextLayer3";
import TextLayer2 from "../Components/TextLayer2";
import TextLayer1 from "../Components/TextLayer1";
import VerificationActionButton from "../Components/VerificationActionButton";


const ErrorScreen = () => {
    return (
        <View style={styles.container}>

            <View style={styles.row1}>

                <FontAwesome6 name="circle-stop" color={'red'} size={100} iconStyle="solid" />
                <TextLayer1 text={'Verification Failed!!!'} />
                <View>
                    <TextLayer3 text={'We couldn\'t recognize your face. Please center your face in the frame and ensure you are in a well-lit environment.'} />
                </View>
            </View>

            <VerificationActionButton onPress={() => { console.log("This is a logging...") }} label={"Try Again"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
        justifyContent: 'center',
    },
    row1: {
        marginVertical: 40,
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 15,
    },

});

export default ErrorScreen;
