import { StyleSheet, Text, View } from "react-native"
import ClockinBtnPad from "./ClockinBtnPad";

interface IClockInPadProps {
    onPasswordChange: (char: string, deleteChar?: boolean) => void
}
const ClockInPad: React.FC<IClockInPadProps> = ({ onPasswordChange }) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', gap: 5 }}>
                <ClockinBtnPad label="1" onPasswordChange={onPasswordChange} />
                <ClockinBtnPad label="2" onPasswordChange={onPasswordChange} />
                <ClockinBtnPad label="3" onPasswordChange={onPasswordChange} />
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
                <ClockinBtnPad label="4" onPasswordChange={onPasswordChange} />
                <ClockinBtnPad label="5" onPasswordChange={onPasswordChange} />
                <ClockinBtnPad label="6" onPasswordChange={onPasswordChange} />
            </View>

            <View style={{ flexDirection: 'row', gap: 5 }}>
                <ClockinBtnPad label="7" onPasswordChange={onPasswordChange} />
                <ClockinBtnPad label="8" onPasswordChange={onPasswordChange} />
                <ClockinBtnPad label="9" onPasswordChange={onPasswordChange} />
            </View>
            <View style={{ flexDirection: 'row', width: '40%' }}>
                <ClockinBtnPad label="0" extraStyle={{ width: '45%' }} onPasswordChange={onPasswordChange} />

                <ClockinBtnPad label="⌫" extraStyle={{ width: '45%' }} onPasswordChange={onPasswordChange} />
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
})
export default ClockInPad;