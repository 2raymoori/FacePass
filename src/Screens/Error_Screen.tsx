import { View, StyleSheet, ActivityIndicator } from "react-native";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import TextLayer3 from "../Components/TextLayer3";
import TextLayer1 from "../Components/TextLayer1";
import VerificationActionButton from "../Components/VerificationActionButton";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";


const ErrorScreen = (props) => {

    const navigation = useNavigation()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'auth' }],
            })
        }, 5000)

        return () => clearTimeout(timer) // cleanup
    }, [navigation])
    return (
        <View style={styles.container}>

            <View style={styles.row1}>

                <FontAwesome6 name="circle-stop" color={'red'} size={100} iconStyle="solid" />
                <TextLayer1 text={'Verification Failed!!!'} />
                <View>
                    <TextLayer3 text={'Sorry we couldn\'t recognize your face. Please center your face in the frame and ensure you are in a well-lit environment.'} />
                </View>
            </View>

            <VerificationActionButton onPress={() => { props.navigation.navigate('auth') }} label={"Try Again"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //marginTop: 40,
        flex: 1,
        justifyContent: 'center',

        //      flex: 1,
        backgroundColor: '#132440',
        // justifyContent: 'space-around',
        paddingBottom: 20,
    },
    row1: {
        marginVertical: 40,
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 15,
    },

});

export default ErrorScreen;



