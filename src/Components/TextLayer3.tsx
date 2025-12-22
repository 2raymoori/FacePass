import { StyleSheet, Text, View } from 'react-native';

interface ITextProps {
  text: string;
}
const TextLayer3 = ({ text }: ITextProps) => {
  return (
    <View>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    opacity:0.5,
    fontSize: 20,
    fontWeight: 'normal',
  },
});
export default TextLayer3;
