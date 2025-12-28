import { StyleSheet, Text, View } from 'react-native';

interface ITextProps {
  text: string
  centerAlign?: boolean
}
const TextLayer3 = ({ text, centerAlign = true }: ITextProps) => {
  return (
    <View>
      <Text style={[styles.textStyle, { textAlign: centerAlign ? 'center' : 'left' }]}>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    opacity: 0.5,
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});
export default TextLayer3;
