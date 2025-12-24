import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IVerificationActionButtonProps {
  label: string
}
const VerificationActionButton = ({label}:IVerificationActionButtonProps)=>{
  return (
    <View style={{ paddingHorizontal: 30 }}>
      <TouchableOpacity style={styles.scanBtn}>
        <Text style={styles.scanBtnText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  scanBtn: {
    borderRadius: 10,
    shadowColor: 'black',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#3B9797',
  },
  scanBtnText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default VerificationActionButton;