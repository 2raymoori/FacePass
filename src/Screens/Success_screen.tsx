import { Text, View, StyleSheet } from "react-native";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import TextLayer3 from "../Components/TextLayer3";
import TextLayer2 from "../Components/TextLayer2";
import TextLayer1 from "../Components/TextLayer1";


const SuccessScreen = () => {
    return (
        <View style={styles.container}>

            <View style={styles.row1}>

                <FontAwesome6 name="circle-check" color={'green'} size={100} iconStyle="solid" />
                <TextLayer3 text={'Clock-in Successful'} />
                <View>
                    <TextLayer1 text={'09:00'} />
                    <TextLayer3 text={'AM'} />
                </View>
            </View>

            <View style={styles.row2}>
                <FontAwesome6 name="circle-check" color={'green'} size={20} iconStyle="solid" />
                <TextLayer3 text="You are on time today. Mon Oct 24" />
            </View>

            <View style={styles.row3}>
                <FontAwesome6 name="user" color={'green'} size={100} iconStyle="solid" />
                <View>
                    <TextLayer2 text="Welcome back, Alex!" />
                    <TextLayer3 centerAlign={false} text="Fullstack Engineer" />
                    <TextLayer3 centerAlign={false} text="Berlin Brandenburg" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
    },
    row1: {
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 15,
    },
    row2: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 15,
    },
    row3: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 15,
    }
});

export default SuccessScreen;
