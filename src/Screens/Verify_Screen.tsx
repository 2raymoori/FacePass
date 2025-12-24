import { Image, StyleSheet, View } from 'react-native';
import VerificationActionButton from '../Components/VerificationActionButton.tsx';
import TextLayer2 from '../Components/TextLayer2.tsx';
import TextLayer1 from '../Components/TextLayer1.tsx';
import TextLayer3 from '../Components/TextLayer3.tsx';

const VerifryScreen = ()=>{
  return (
    <View style={styles.container}>
      <TextLayer2 text={'Clock In'} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../Assets/veri_logo.png')}
          style={styles.logo}
          resizeMode={'stretch'}
        />
      </View>
      <View style={{marginTop:30,marginBottom:15}}>
        <TextLayer1 text={'Verifying Identity...'} />
      </View>
      <View>
        <TextLayer3 text={'Please be patient while we verify your identity'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    width: '80%',
    height: '50%',
    borderRadius: 20,
    marginTop:60,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 20,


  },
});
export default VerifryScreen;