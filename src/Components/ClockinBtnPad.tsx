import { Text, TouchableOpacity, StyleSheet } from "react-native"

interface IClockinBtnPadProps {
    label: string,
    extraStyle?: {}
    onPasswordChange: (char: string, deleteChar?: boolean) => void
}

const ClockinBtnPad: React.FC<IClockinBtnPadProps> = ({ label, extraStyle, onPasswordChange }) => {
    return (
        <TouchableOpacity style={{ ...styles.scanBtn, ...extraStyle }}
            onPress={() => {
                if (label == "⌫") {
                    onPasswordChange(label, true)
                } else {
                    onPasswordChange(label)
                }

            }}>
            <Text style={styles.scanBtnText}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    scanBtn: {
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        shadowColor: 'black',
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#3B9797',
    },
    scanBtnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});
export default ClockinBtnPad;