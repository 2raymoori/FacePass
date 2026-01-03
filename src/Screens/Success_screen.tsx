import { Text, View, StyleSheet } from "react-native";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import TextLayer3 from "../Components/TextLayer3";
import TextLayer2 from "../Components/TextLayer2";
import TextLayer1 from "../Components/TextLayer1";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";


const SuccessScreen = (props) => {
    const loginDate = props?.route?.params?.loginDate || "Sat Jan 03";
    const loginTime = props?.route?.params?.loginTime || '01:30:53';
    const userDetails = props?.route?.params?.userDetails || {
        "name": "Anya Sharma",
        "role": "Frontend Developer",
        "branch": "London Central"
    };
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

                <FontAwesome6 name="circle-check" color={'green'} size={100} iconStyle="solid" />
                <TextLayer3 text={'Clock-in Successful'} />
                <TextLayer3 text={'@'} />
                <View>
                    <TextLayer1 text={loginTime} />
                </View>
            </View>

            <View style={styles.row2}>
                <FontAwesome6 name="circle-check" color={'green'} size={20} iconStyle="solid" />
                <TextLayer3 text={`You are on time today. ${loginDate}`} />
            </View>

            <View style={styles.row3}>
                <FontAwesome6 name="user" color={'green'} size={100} iconStyle="solid" />
                <View>
                    <TextLayer2 text={userDetails.name} />
                    <TextLayer3 centerAlign={false} text={userDetails.role} />
                    <TextLayer3 centerAlign={false} text={userDetails.branch} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#132440',
        justifyContent: 'space-around',
        paddingBottom: 20,

    },
    row1: {
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 15,
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 15,
    },
    row3: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 15,
    }
});

export default SuccessScreen;
