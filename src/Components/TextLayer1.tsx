import { StyleSheet, Text, View } from 'react-native';

interface ITextProps {
  text: string;
}
const TextLayer1 = ({text}:ITextProps)=>{
  return (
    <View>
      <Text style={styles.textStyle}>
        {text}
      </Text>
      </View>
  )
}
const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default TextLayer1;