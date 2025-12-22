import { StyleSheet, Text, View } from 'react-native';

interface ITextProps {
  text: string;
}
const TextLayer2 = ({ text }: ITextProps) => {
  return (
    <View>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
export default TextLayer2;
